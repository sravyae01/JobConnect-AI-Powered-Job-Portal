from django.contrib import admin
from .models import Job, JobCategory

@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'icon', 'created_at']

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'employer', 'location', 'is_active', 'is_featured', 'created_at']
    list_filter = ['is_active', 'is_featured', 'employment_type', 'experience_level', 'category']
    search_fields = ['title', 'company', 'description']
    readonly_fields = ['views_count', 'created_at', 'updated_at']