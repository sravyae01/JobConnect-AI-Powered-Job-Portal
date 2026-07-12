from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Application, SavedJob
from .serializers import (
    ApplicationSerializer,
    ApplicationStatusUpdateSerializer,
    SavedJobSerializer,
)

from jobs.models import Job


class ApplyJobView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        job_id = self.kwargs.get("job_id")

        job = get_object_or_404(Job, id=job_id)

        profile = self.request.user.profile

        serializer.save(
            applicant=self.request.user,
            job=job,
            resume=profile.resume,
        )

    def create(self, request, *args, **kwargs):
        job_id = self.kwargs.get("job_id")

        if Application.objects.filter(
            job_id=job_id,
            applicant=request.user
        ).exists():
            return Response(
                {"error": "You have already applied for this job"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().create(request, *args, **kwargs)


class MyApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(applicant=self.request.user)


class EmployerApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(job__employer=self.request.user)


class ApplicationStatusUpdateView(generics.UpdateAPIView):
    serializer_class = ApplicationStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(
            job__employer=self.request.user
        )


class SaveJobView(generics.CreateAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        job_id = self.kwargs.get("job_id")

        job = get_object_or_404(Job, id=job_id)

        if SavedJob.objects.filter(
            job=job,
            user=request.user
        ).exists():
            return Response(
                {"error": "Job already saved"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        saved_job = SavedJob.objects.create(
            job=job,
            user=request.user,
        )

        serializer = self.get_serializer(saved_job)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SavedJobsView(generics.ListAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user)


class UnsaveJobView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        job_id = self.kwargs.get("job_id")

        saved_job = get_object_or_404(
            SavedJob,
            job_id=job_id,
            user=request.user,
        )

        saved_job.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)