from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.utils import timezone

class CustomUser(AbstractUser):
    status = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, verbose_name=_('groups'), blank=True, related_name='customuser_groups')
    user_permissions = models.ManyToManyField(Permission, verbose_name=_('user permissions'), blank=True, related_name='customuser_user_permissions')

    def __str__(self):
        return self.username

class SiteSetting(models.Model):
    logo = models.ImageField(upload_to='logos/', null=True, blank=True, default='logos/finalLogo.png')
    resources_notifications = models.BooleanField(default=False)

    def __str__(self):
        return "Site Settings"

    @property
    def logo_url(self):
        return self.logo.url if self.logo else None

class Profile(models.Model):
    username = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images', null=True, blank=True, default="default_profile.png")

    def __str__(self):
        return self.username

class Book(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='Book Type')
    file = models.FileField(upload_to='books/', default="default_profile.png")

    def __str__(self):
        return self.title

class Pdf(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='Pdf Type')
    file = models.FileField(upload_to='pdfs/', default="default_profile.png")

    def __str__(self):
        return self.title
    
class Ppt(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='Ppt Type')
    file = models.FileField(upload_to='ppts/', default="default_profile.png")

    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='Book Type')
    file = models.FileField(upload_to='videos/', default="default_profile.png")

    def __str__(self):
        return self.title

class PastPaper(models.Model):
    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, default='Book Type')
    file = models.FileField(upload_to='books/', default="default_profile.png")

    def __str__(self):
        return self.title

class Notification(models.Model):
    notification = models.CharField(max_length=100)

class LogActivities(models.Model):
    username_or_email = models.CharField(max_length=100, default='No User')
    activities = models.JSONField(default=list)

    def __str__(self):
        return self.username_or_email
    
class QuestionTypeModel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Test(models.Model):
    name = models.CharField(max_length=255)
    test_type = models.CharField(max_length=50, default='listening')
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_tests')
    date_created = models.DateTimeField(default=timezone.now)
    last_updated = models.DateTimeField(auto_now=True)
    attempted_users = models.ManyToManyField(User, blank=True, related_name="attempted_tests")

    def __str__(self):
        return self.name

class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='questions')
    question_type = models.ForeignKey(QuestionTypeModel, on_delete=models.SET_NULL, null=True)
    text = models.TextField()
    options = models.JSONField(blank=True, null=True)
    correct_answer = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Q: {self.text[:50]}"

class ListeningTest(models.Model):
    TEST_CHOICES = [(1, 'Test 1'), (2, 'Test 2'), (3, 'Test 3')]
    test_number = models.IntegerField(choices=TEST_CHOICES, unique=True)
    title = models.CharField(max_length=100)
    duration = models.IntegerField(default=40)

class ListeningQuestion(models.Model):
    QUESTION_TYPES = [('FIB', 'Fill in Blank'), ('MCQ', 'Multiple Choice'), ('TF', 'True/False')]
    test = models.ForeignKey(ListeningTest, on_delete=models.CASCADE, related_name='questions')
    question_number = models.IntegerField()
    question_text = models.TextField()
    question_type = models.CharField(max_length=3, choices=QUESTION_TYPES)
    correct_answer = models.CharField(max_length=200)
    options = models.JSONField(default=list)                                      
    
    class Meta:
        ordering = ['question_number']
        unique_together = ['test', 'question_number']

    def __str__(self):
        return f"Q{self.question_number}: {self.question_text[:50]}..."

class WritingTest(models.Model):
    TEST_CHOICES = [
        (1, 'Test 1 - Academic'), (2, 'Test 1 - Essay'), (3, 'Test 2 - Academic'), 
        (4, 'Test 2 - Essay'), (5, 'Test 3 - Academic'), (6, 'Test 3 - Essay')
    ]
    test_type = models.IntegerField(choices=TEST_CHOICES)
    user_answer = models.TextField()
    word_count = models.IntegerField()
    ta_band = models.FloatField()
    cc_band = models.FloatField()
    lr_band = models.FloatField()
    gra_band = models.FloatField()
    overall_band = models.FloatField()
    feedback = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class ReadingTest(models.Model):
    TEST_CHOICES = [(1, 'Reading Test 1'), (2, 'Reading Test 2'), (3, 'Reading Test 3')]
    test_number = models.IntegerField(choices=TEST_CHOICES, unique=True)
    title = models.CharField(max_length=100)
    duration = models.IntegerField(default=60)  

class ReadingQuestion(models.Model):
    QUESTION_TYPES = [
        ('MCQ', 'Multiple Choice'), ('TF', 'True/False/Not Given'),
        ('FIB', 'Fill in Blank'), ('MATCH', 'Matching')
    ]
    test = models.ForeignKey(ReadingTest, on_delete=models.CASCADE, related_name='questions')
    question_number = models.IntegerField()
    question_text = models.TextField()
    question_type = models.CharField(max_length=5, choices=QUESTION_TYPES)
    correct_answer = models.CharField(max_length=200)
    options = models.JSONField(default=list)
    
    class Meta:
        ordering = ['question_number']
        unique_together = ['test', 'question_number']

    def __str__(self):
        return f"Q{self.question_number}: {self.question_text[:50]}..."

class SpeakingEvaluation(models.Model):
    question = models.TextField()
    response = models.TextField()
    fluency = models.FloatField()
    grammar = models.FloatField()
    vocabulary = models.FloatField()
    pronunciation = models.FloatField()
    relevance = models.FloatField()
    overall_band = models.FloatField()
    part = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Speaking Part {self.part} Evaluation: {self.question[:50]}..."