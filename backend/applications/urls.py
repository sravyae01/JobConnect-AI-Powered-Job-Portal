from django.urls import path
from .views import (
    ApplyJobView, MyApplicationsView, EmployerApplicationsView,
    ApplicationStatusUpdateView, SaveJobView, SavedJobsView, UnsaveJobView
)

urlpatterns = [
    path('apply/<int:job_id>/', ApplyJobView.as_view(), name='apply-job'),
    path('my/', MyApplicationsView.as_view(), name='my-applications'),
    path('employer/', EmployerApplicationsView.as_view(), name='employer-applications'),
    path('<int:pk>/status/', ApplicationStatusUpdateView.as_view(), name='update-status'),
    path('save/<int:job_id>/', SaveJobView.as_view(), name='save-job'),
    path('saved/', SavedJobsView.as_view(), name='saved-jobs'),
    path('unsave/<int:job_id>/', UnsaveJobView.as_view(), name='unsave-job'),
]