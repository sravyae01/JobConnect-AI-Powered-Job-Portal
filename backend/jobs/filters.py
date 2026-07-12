from django_filters import rest_framework as filters
from django.db import models 
from .models import Job

class JobFilter(filters.FilterSet):
    min_salary = filters.NumberFilter(field_name='salary_min', lookup_expr='gte')
    max_salary = filters.NumberFilter(field_name='salary_max', lookup_expr='lte')  # ✅ Fixed: gte → lte
    
    # Search filter
    search = filters.CharFilter(method='filter_search')
    
    employment_type = filters.CharFilter(field_name='employment_type', lookup_expr='iexact')
    experience_level = filters.CharFilter(field_name='experience_level', lookup_expr='iexact')
    category = filters.NumberFilter(field_name='category__id')
    
    location = filters.CharFilter(field_name='location', lookup_expr='icontains')

    class Meta:  
        model = Job
        fields = ['search', 'location', 'employment_type', 'experience_level', 
                  'category', 'min_salary', 'max_salary']

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            models.Q(title__icontains=value) |      # ← Added |
            models.Q(company__icontains=value) |     # ← Added |
            models.Q(description__icontains=value) | # ← Added |
            models.Q(skills_required__icontains=value)
        )