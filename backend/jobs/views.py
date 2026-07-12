from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Job, JobCategory
from .serializers import JobSerializer, JobListSerializer, JobCategorySerializer
from .filters import JobFilter
from applications.models import Application
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class JobListView(generics.ListCreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = JobFilter
    search_fields = ['title', 'company', 'description', 'skills_required']
    ordering_fields = ['created_at', 'salary_min', 'salary_max']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Job.objects.filter(is_active=True)
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return JobListSerializer
        return JobSerializer

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        if self.request.user != serializer.instance.employer:
            raise permissions.PermissionDenied("You can only edit your own jobs")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.employer:
            raise permissions.PermissionDenied("You can only delete your own jobs")
        instance.delete()

class JobCategoryListView(generics.ListAPIView):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    permission_classes = [permissions.AllowAny]

class EmployerJobsView(generics.ListAPIView):
    serializer_class = JobListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(employer=self.request.user)

class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            employer=self.request.user
        )

class JobDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(
            employer=self.request.user
        )

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        jobs = Job.objects.filter(employer=request.user)

        total_jobs = jobs.count()
        active_jobs = jobs.filter(is_active=True).count()
        total_applications = Application.objects.filter(
            job__employer=request.user
        ).count()

        return Response({
            "total_jobs": total_jobs,
            "active_jobs": active_jobs,
            "total_applications": total_applications,
        })

class PopularSearchesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        searches = (
            Job.objects.values_list("title", flat=True)
            .distinct()
            .order_by("title")[:8]
        )

        return Response(list(searches))