from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app.views import (
    VerifyOTP, SendOTP, Register, Login, ResetPassword, Dashboard, DeleteUser,
    CheckAndUpdateProfile, RetrieveProfile, DeleteProfile, SocialLogin,
    AddBook, RetrieveBook, EditBook, DeleteBook, AddPdf, RetrievePdf, AddPpt, RetrievePpt, AddVideo, RetrieveVideo,
    AddNotification, RetrieveNotification, DeleteNotification, AddLogActivities, RetrieveLogActivities,
    SubmitListeningTest, SubmitReadingTest,
    WritingEvaluationView,
    SpeakingEvaluationView, SpeakingQuestionListView, SpeakingOverallBandView,
    AddTest, SiteSettingsView, SendEmailView, TestCreateView, RetrieveTest, DeleteTest
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('verify-otp/', VerifyOTP.as_view()),
    path('send-otp/', SendOTP.as_view()),
    path('register/', Register.as_view()),
    path('login/', Login.as_view()),
    path('log-activities/', AddLogActivities.as_view()),
    path('retrieve-log-activities/', RetrieveLogActivities.as_view()),
    path('social-login/', SocialLogin.as_view(), name='social_login'),
    path('reset-password/<str:email>/', ResetPassword.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('dashboard/', Dashboard.as_view()),
    path('dashboard/user/delete/<str:username>/', DeleteUser.as_view()),
    path('check-and-update-profile/<str:username>/', CheckAndUpdateProfile.as_view()),
    path('retrieve-profile/<str:username>/', RetrieveProfile.as_view()),
    path('profile/delete/<str:username>/', DeleteProfile.as_view()),
    path('add-book/', AddBook.as_view()),
    path('retrieve-book/<str:book_type>/', RetrieveBook.as_view()),
    path('edit-book/<str:title>/', EditBook.as_view()),
    path('delete-book/<str:title>/', DeleteBook.as_view()),
    path('add-pdf/', AddPdf.as_view()),
    path('retrieve-ppt/<str:type>/', RetrievePdf.as_view()),
    path('add-ppt/', AddPpt.as_view()),
    path('retrieve-pdf/<str:type>/', RetrievePpt.as_view()),
    path('add-video/', AddVideo.as_view()),
    path('retrieve-video/<str:type>/', RetrieveVideo.as_view()),
    path('add-test/', AddTest.as_view()),
    path('add-notification/', AddNotification.as_view()),
    path('retrieve-notification/', RetrieveNotification.as_view()),
    path('delete-notification/<str:id>', DeleteNotification.as_view()),
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('send-email/', SendEmailView.as_view(), name='send_email'),
    path('tests/', TestCreateView.as_view(), name='test-create'),
    path('retrieve-test/', RetrieveTest.as_view(), name='retrieve-test'),
    path('delete-test/<str:name>/', DeleteTest.as_view(), name='delete-test'),
    path('api/listening/submit/', SubmitListeningTest.as_view()),  
    path('api/reading/submit/', SubmitReadingTest.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/writing/evaluate/', WritingEvaluationView.as_view()),  
    path('api/speaking/questions/', SpeakingQuestionListView.as_view()),
    path('api/speaking/part1/evaluate/', SpeakingEvaluationView.as_view(), {'part': 1}),
    path('api/speaking/part2/evaluate/', SpeakingEvaluationView.as_view(), {'part': 2}),
    path('api/speaking/part3/evaluate/', SpeakingEvaluationView.as_view(), {'part': 3}),
    path('api/speaking/overall-band/', SpeakingOverallBandView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)