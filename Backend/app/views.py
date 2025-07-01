import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import random
import json
from datetime import timedelta
from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, EmailMessage
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.http import urlsafe_base64_decode
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken
from rest_framework_simplejwt.exceptions import TokenError
from jose import jwt
import requests
from .email import send_reset_password_email
from .writing_evaluator import IELTSWritingEvaluator
from .speaking_evaluator import IELTSSpeakingEvaluator
from .models import (
    Profile, Book, Video, Ppt, Pdf, Notification, LogActivities,
    Test, SiteSetting, ListeningTest, ListeningQuestion,
    WritingTest, ReadingTest, ReadingQuestion, SpeakingEvaluation, Question, QuestionTypeModel
)

from .serializers import (
    UserSerializer, ProfileSerializer, BookSerializer, VideoSerializer, PdfSerializer, PptSerializer,
    NotificationSerializer, LogActivitiesSerializer, TestSerializer, QuestionSerializer, QuestionTypeSerializer, 
    SiteSettingSerializer, ListeningTestSerializer, ListeningQuestionSerializer,
    WritingTestSerializer, ReadingTestSerializer, SpeakingEvaluationSerializer
)

AUTH0_DOMAIN = settings.AUTH0_DOMAIN
API_IDENTIFIER = settings.API_IDENTIFIER
ALGORITHMS = settings.AUTH0_ALGORITHMS

class VerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        stored_otp = cache.get(email)

        if not stored_otp:
            return Response({'error': 'OTP expired or not found'}, status=status.HTTP_400_BAD_REQUEST)

        if otp != str(stored_otp):
            return Response({'error': 'Incorrect OTP'}, status=status.HTTP_400_BAD_REQUEST)

        cache.delete(email)
        return Response({'message': 'OTP verified successfully'}, status=200)


class SendOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        expiry_seconds = 120

        otp = random.randint(100000, 999999)
        cache.set(email, otp, timeout=expiry_seconds)

        send_mail(
            'Verify Otp',
            f'Your OTP is {otp}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({
            'message': 'OTP sent successfully',
            'expires_in': expiry_seconds
        }, status=status.HTTP_200_OK)
    
class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirmPassword')

        # Check if passwords match
        if password != confirm_password:
            return Response({'error': 'Password and Confirm Password do not match'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'A user with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'A user with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({'message': 'Registered Successfully'}, status=status.HTTP_200_OK)


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username_or_email = request.data.get('username_or_email')
        password = request.data.get('password')

        # Check if user exists by email
        try:
            user_obj = User.objects.get(email=username_or_email)
            username = user_obj.username
        except User.DoesNotExist:
            username = username_or_email  # fallback to using as username

        user = authenticate(request, username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            access['is_staff'] = user.is_staff
            access['username'] = user.username
            access['email'] = user.email

            return Response({
                'refresh': str(refresh),
                'access': str(access),
                'message': 'Login successful.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class SocialLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('access_token')
        if not token:
            return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)

        jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
        jwks = requests.get(jwks_url).json()
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }

        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_IDENTIFIER,
                    issuer=f'https://{AUTH0_DOMAIN}/'
                )
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.JWTClaimsError:
                return Response({'error': 'Incorrect claims'}, status=status.HTTP_401_UNAUTHORIZED)
            except Exception:
                return Response({'error': 'Unable to parse authentication token.'}, status=status.HTTP_400_BAD_REQUEST)

            email = payload.get('email')
            if not email:
                return Response({'error': 'Email not provided'}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(username=email, defaults={'email': email})
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'Login successful.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Unable to find appropriate key'}, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):
    permission_classes = [AllowAny]

    def put(self, request, username, *args, **kwargs):
        new_password = request.data.get('password')
        print(new_password)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"error": f"User with email '{username}' does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Password changed successfully."},
            status=status.HTTP_200_OK
        )
    
class Dashboard(APIView):
    def get(self, request):
        jwt_token = request.headers.get('authorization')

        if not jwt_token or not jwt_token.startswith("Bearer "):
            return Response({'error': 'Invalid or missing Authorization header.'}, status=status.HTTP_400_BAD_REQUEST)
        jwt_token = jwt_token.split(" ")[1]

        try:
            verified_token = UntypedToken(jwt_token)
            user_id = verified_token.payload.get('user_id')
            user = User.objects.get(id=user_id)

            if user.is_staff:
                users = User.objects.all()
                serializer = UserSerializer(users, many=True)
                return Response({
                    'users': serializer.data
                }, status=status.HTTP_200_OK)

            response = self.get_user_profile(user)
        
            if response.status_code == 200:
                return Response({"Response": response.data, "username": user.username, "email": user.email, "status": response.status_code}, status=status.HTTP_200_OK)
    
            return Response({"error": "Profile not found or incomplete data", "username": user.username, "email": user.email, "status": response.status_code})

        except TokenError as e:
            return self.handle_token_error(e, request)

    # def get_user_profile(self, user):
    #     factory = APIRequestFactory()
    #     drf_request = factory.get(f'/profile/{user.username}/')
    #     force_authenticate(drf_request, user=user)
    #     view = RetrieveProfile.as_view()
    #     return view(drf_request, username=user.username)
    
    def handle_token_error(self, error, request):
        if str(error) == "Token is invalid or expired":
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({'error': 'Refresh token required for reauthentication.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = str(refresh.access_token)
                return Response({'message': 'Token refreshed successfully.', 'access': new_access_token}, status=status.HTTP_200_OK)

            except TokenError as e:
                return Response({'error': 'Refresh token invalid or expired.', 'details': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'error': 'Invalid token.', 'details': str(error)}, status=status.HTTP_401_UNAUTHORIZED)

class DeleteUser(DestroyAPIView):
    queryset = User.objects.all()
    lookup_field = 'username'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({'message': 'User Deleted Successfully'}, status=status.HTTP_200_OK)

class CreateProfile(CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class RetrieveProfile(RetrieveAPIView): 
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

class UpdateProfile(UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    def update(self, request, *args, **kwargs):
        # Profile instance ko dhoondhna
        instance = self.get_object()

        # Serializer ko update karte hain, aur partial=True isliye diya hai taake sirf request mein diye gaye fields update ho
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        # Agar serializer valid hai, toh update perform karo
        if serializer.is_valid():
            serializer.save()  # Data ko save karna

            return Response({'message': 'Profile Updated Successfully'}, status=status.HTTP_200_OK)
        else:
            # Agar validation fail hoti hai, toh error return karo
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteProfile(DestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # 🔥 Check if image exists, then delete it from storage
        if instance.image:
            instance.image.delete(save=False)  # Don't save again after deleting file

        self.perform_destroy(instance)
        return Response({'message': 'Profile Deleted Successfully'}, status=status.HTTP_200_OK)

class CheckAndUpdateProfile(APIView):
    def post(self, request, username):
        try:
            print("POST received for username:", username)
            print("Request data:", request.data)

            profile = Profile.objects.filter(username=username).first()
            print("Profile found:", profile)

            if profile:
                serializer = ProfileSerializer(profile, data=request.data, partial=True)
                print("Serializer (update):", serializer)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
                print("Serializer errors (update):", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = ProfileSerializer(data=request.data)
                print("Serializer (create):", serializer)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"message": "Profile created successfully."}, status=status.HTTP_201_CREATED)
                print("Serializer errors (create):", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            import traceback
            print("Error in CheckAndUpdateProfile:", traceback.format_exc())
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AddBook(CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
class RetrieveBook(ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        book_type = self.kwargs.get("type")
        return Book.objects.filter(type=book_type)

class EditBook(UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'title'

class DeleteBook(DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'title'

class AddPdf(CreateAPIView):
    queryset = Pdf.objects.all()
    serializer_class = PdfSerializer

class RetrievePdf(ListAPIView):
    serializer_class = PdfSerializer

    def get_queryset(self):
        pdf_type = self.kwargs.get("type")
        return Pdf.objects.filter(type=pdf_type)

class AddPpt(CreateAPIView):
    queryset = Ppt.objects.all()
    serializer_class = PptSerializer

class RetrievePpt(ListAPIView):
    serializer_class = PptSerializer

    def get_queryset(self):
        Ppt_type = self.kwargs.get("type")
        return Ppt.objects.filter(type=Ppt_type)

class AddVideo(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class RetrieveVideo(ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        Video_type = self.kwargs.get("type")
        return Video.objects.filter(type=Video_type)

class AddTest(CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    
class RetrieveTest(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class DeleteTest(DestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    lookup_field = 'name'

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionTypeViewSet(viewsets.ModelViewSet):
    queryset = QuestionTypeModel.objects.all()
    serializer_class = QuestionTypeSerializer

class AddNotification(CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def create(self, request, *args, **kwargs):
        notification = request.data.get("notification")
        notif_type = request.data.get("type")

        if not notif_type:
            return Response({"error": "type is required."}, status=status.HTTP_400_BAD_REQUEST)

        new_data = {
            "type": notif_type,
            "notification": notification,
            "count": 1
        }

        serializer = self.get_serializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class RetrieveNotification(ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class DeleteNotification(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'id'

class AddLogActivities(CreateAPIView):
    queryset = LogActivities.objects.all()
    serializer_class = LogActivitiesSerializer

class RetrieveLogActivities(ListAPIView):
    queryset = LogActivities.objects.all()
    serializer_class = LogActivitiesSerializer

class SiteSettingsView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        setting, _ = SiteSetting.objects.get_or_create(id=1)
        serializer = SiteSettingSerializer(setting)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        setting, _ = SiteSetting.objects.get_or_create(id=1)
        serializer = SiteSettingSerializer(setting, data=request.data, partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Settings saved successfully",
                "logo_url": setting.logo.url if setting.logo else None,
                "resources_notifications": setting.resources_notifications  # Return the status of notifications
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class SendEmailView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)

            user_email = body.get('email')
            subject = body.get('subject')
            message = body.get('message')

            if not all([user_email, subject, message]):
                return Response({'error': 'Missing fields'}, status=400)

            # Full message with sender info
            full_message = f"From: {user_email}\n\n{message}"

            email = EmailMessage(
                subject=subject,
                body=full_message,
                from_email=settings.EMAIL_HOST_USER,
                to=[settings.EMAIL_HOST_USER],
                reply_to=[user_email],
            )

            email.send(fail_silently=False)

            return Response({'message': 'Email sent successfully'})

        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class TestCreateView(CreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class SignUp(AV):
    def post(self, req):
        un = req.data.get('username')
        em = req.data.get('email')
        pw = req.data.get('password')
        
        if U.objects.filter(username=un).exists():
            return R({'error': 'User exists'}, st.HTTP_400_BAD_REQUEST)
        
        u = U.objects.create_user(username=un, email=em, password=pw)
        return R({'msg': 'Done'}, st.HTTP_200_OK)

class LogIn(AV):
    def post(self, req):
        un = req.data.get('username_or_email')
        pw = req.data.get('password')
        
        u = auth(username=un, password=pw)
        if u:
            rt = RT.for_user(u)
            return R({
                'refresh': str(rt),
                'access': str(rt.access_token)
            })
        return R({'error': 'Wrong'}, st.HTTP_401_UNAUTHORIZED)

class ProfileStuff(AV):
    def get(self, req, un):
        p = Profile.objects.filter(username=un).first()
        if p:
            s = ProfileSerializer(p)
            return R(s.data)
        return R({'error': 'No profile'}, st.HTTP_404_NOT_FOUND)

    def post(self, req, un):
        p = Profile.objects.filter(username=un).first()
        if p:
            s = ProfileSerializer(p, data=req.data, partial=True)
        else:
            s = ProfileSerializer(data=req.data)
        
        if s.is_valid():
            s.save()
            return R(s.data)
        return R(s.errors, st.HTTP_400_BAD_REQUEST)

class BookView(AV):
    def get(self, req, bt):
        bs = Book.objects.filter(type=bt)
        s = BookSerializer(bs, many=True)
        return R(s.data)

class TestView(AV):
    def get(self, req):
        ts = Test.objects.all()
        s = TestSerializer(ts, many=True)
        return R(s.data)

class WriteJudge(AV):
    judge = MessyIELTSWritingThing()
    
    def post(self, req):
        t1 = req.data.get('task1', '')
        t2 = req.data.get('task2', '')
        
        if not t1 or not t2:
            return R({"error": "Need both"}, st.HTTP_400_BAD_REQUEST)

        r1 = self.judge.check_writing(t1, 1) or {}
        r2 = self.judge.check_writing(t2, 2) or {}
        
        return R({
            'task1': r1,
            'task2': r2
        })

class SpeakJudge(AV):
    def post(self, req, part):
        q = req.data.get('question', '')
        a = req.data.get('response', '')
        
        if not q or not a:
            return R({"error": "Need Q&A"}, st.HTTP_400_BAD_REQUEST)
        
        j = CrazySpeakingJudge()
        e = j.judge_speaking(a, {"q": q}, part)
        
        if 'error' in e:
            return R({"error": e['error']}, st.HTTP_400_BAD_REQUEST)
        
        return R(e)

class ListenTest(AV):
    scores = {
        40:9.0,39:8.5,38:8.0,37:7.5,36:7.0,35:6.5,
        34:6.0,33:5.5,32:5.5,31:5.5,30:5.0,29:5.0,
        28:5.0,27:4.5,26:4.5,25:4.5,24:4.0,23:4.0,
        22:4.0,21:3.5,20:3.5,19:3.5,18:3.0,17:3.0,
        16:3.0,15:3.0,14:2.5,13:2.5,12:2.5,11:2.0,
        10:2.0,9:2.0,8:1.5,7:1.5,6:1.5,5:1.0,4:1.0,
        3:1.0,2:0.5,1:0.5,0:0.0
    }

    def post(self, req):
        tn = req.data.get('test_number')
        ca = req.data.get('correct_answers', {})
        ua = req.data.get('user_answers', {})
        
        if not tn or not ca or not ua:
            return R({'error': 'Missing stuff'}, st.HTTP_400_BAD_REQUEST)
        
        s = 0
        rs = []
        
        for qn, can in ca.items():
            uan = str(ua.get(str(qn), "")).strip().lower()
            correct = uan == str(can).strip().lower()
            rs.append({
                'q': qn,
                'user': uan,
                'correct': can,
                'right': correct
            })
            if correct:
                s += 1
        
        return R({
            'test': tn,
            'score': s,
            'band': self.scores.get(s, 0.0),
            'results': rs
        })