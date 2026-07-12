from django.urls import path
from .views import JobListView, JobDetailView, JobCategoryListView, EmployerJobsView,JobUpdateView,JobDeleteView,DashboardStatsView,PopularSearchesView

urlpatterns = [
    path('', JobListView.as_view(), name='job-list'),
    path('categories/', JobCategoryListView.as_view(), name='job-categories'),
    path('employer/', EmployerJobsView.as_view(), name='employer-jobs'),
    path("dashboard-stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("<int:pk>/update/", JobUpdateView.as_view(), name="job-update"),
    path("<int:pk>/delete/", JobDeleteView.as_view(), name="job-delete"),
    path('<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path("popular-searches/",PopularSearchesView.as_view(), name="popular-searches"),

]