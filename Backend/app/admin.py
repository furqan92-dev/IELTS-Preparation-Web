from django.contrib import admin
from .models import Book, Profile, Pdf, Ppt, Video, PastPaper, Notification, LogActivities, CustomUser, Test, SiteSetting, Question, QuestionTypeModel
from django.contrib.auth.admin import UserAdmin
from .models import QuestionTypeModel 

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Info', {'fields': ('bio', 'birth_date')}),
    )

@admin.register(Profile)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['username', 'image']

@admin.register(Book)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['title','type', 'file']

@admin.register(Pdf)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'file']

@admin.register(Ppt)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'file']

@admin.register(Video)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'file']

@admin.register(PastPaper)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'file']


@admin.register(Notification)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['notification']

@admin.register(LogActivities)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['username_or_email', 'activities']

@admin.register(SiteSetting)
class RegisterAdmin(admin.ModelAdmin):
    list_display = ['id', 'logo', 'resources_notifications']

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('name', 'test_type', 'creator', 'date_created', 'last_updated', 'get_attempted_users')
    list_filter = ('test_type', 'creator', 'date_created')
    search_fields = ('name', 'creator__username')
    readonly_fields = ('date_created', 'last_updated')

    def get_attempted_users(self, obj):
        return ", ".join([user.username for user in obj.attempted_users.all()])
    get_attempted_users.short_description = "Attempted Users"
    
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'question_type', 'test', 'correct_answer')
    search_fields = ('text',)
    list_filter = ('question_type', 'test')
    

@admin.register(QuestionTypeModel)
class QuestionTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)