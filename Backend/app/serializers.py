from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *
from datetime import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_staff']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class SiteSettingSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetting
        fields = ['id', 'logo', 'logo_url', 'resources_notifications']

    def get_logo_url(self, obj):
        return obj.logo.url if obj.logo else None

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'image']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class PdfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pdf
        fields = '__all__'

class PptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ppt
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class PastPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastPaper
        fields = '__all__'

class TestSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%Y-%m-%d")
    last_updated = serializers.DateTimeField(format="%Y-%m-%d")
    creator = serializers.CharField()

    class Meta:
        model = Test
        fields = ['name', 'test_type', 'creator', 'date_created', 'last_updated']

    def create(self, validated_data):
        username = validated_data.pop('creator')
        user = User.objects.get(username=username)
        return Test.objects.create(creator=user, **validated_data)

class QuestionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionTypeModel
        fields = ['id', 'name']

class QuestionSerializer(serializers.ModelSerializer):
    question_type = QuestionTypeSerializer(read_only=True)
    question_type_id = serializers.PrimaryKeyRelatedField(
        queryset=QuestionTypeModel.objects.all(), source='question_type', write_only=True
    )

    class Meta:
        model = Question
        fields = ['id', 'text', 'question_type', 'question_type_id', 'test', 'options', 'correct_answer']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class LogActivitiesSerializer(serializers.ModelSerializer):
    activities = serializers.JSONField()

    class Meta:
        model = LogActivities
        fields = ['username_or_email', 'activities']

    def create(self, validated_data):
        log_activity = LogActivities.objects.filter(username_or_email=validated_data['username_or_email']).first()
        if not log_activity:
            log_activity = LogActivities.objects.create(username_or_email=validated_data['username_or_email'])
        
        if log_activity.activities is None:
            log_activity.activities = []
        
        new_activity = validated_data.get('activities')
        if new_activity and isinstance(new_activity, list):
            for activity in new_activity:
                if 'login' in activity:
                    log_activity.activities.append({'login': activity['login']})
                elif 'logout' in activity:
                    if log_activity.activities and 'logout' not in log_activity.activities[-1]:
                        log_activity.activities[-1]['logout'] = activity['logout']
                    else:
                        log_activity.activities.append({'logout': activity['logout']})

        log_activity.save()
        return log_activity

class ListeningTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeningTest
        fields = ['id', 'test_number', 'title', 'duration']

class ListeningQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListeningQuestion
        fields = ['id', 'test', 'question_number', 'question_text', 
                'question_type', 'correct_answer', 'options', 'audio_file']

class WritingTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WritingTest
        fields = '__all__'
        read_only_fields = ['created_at']

class ReadingQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingQuestion
        fields = ['id', 'test', 'question_number', 'question_text', 
                'question_type', 'correct_answer', 'options']

class ReadingTestSerializer(serializers.ModelSerializer):
    questions = ReadingQuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = ReadingTest
        fields = ['id', 'test_number', 'title', 'duration', 'questions']

class SpeakingEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeakingEvaluation
        fields = '__all__'
        read_only_fields = ('created_at',)