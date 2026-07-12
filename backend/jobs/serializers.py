from rest_framework import serializers
from .models import Job, JobCategory
from users.serializers import UserSerializer

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ['id', 'name', 'icon']

class JobSerializer(serializers.ModelSerializer):
    employer_detail = UserSerializer(source='employer', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'employer', 'employer_detail', 'title', 'description', 
            'company', 'location', 'category', 'category_name', 
            'employment_type', 'experience_level', 'salary_min', 'salary_max',
            'skills_required', 'requirements', 'benefits', 'is_active', 
            'is_featured', 'views_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'employer', 'views_count', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['employer'] = self.context['request'].user
        return super().create(validated_data)

class JobListSerializer(serializers.ModelSerializer):
    employer_name = serializers.CharField(source='employer.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'location', 'category_name', 
            'employment_type', 'experience_level', 'salary_min', 'salary_max',
            'employer_name', 'is_featured', 'created_at'
        ]