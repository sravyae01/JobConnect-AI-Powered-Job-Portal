from rest_framework import serializers
from .models import Application, SavedJob
from jobs.serializers import JobListSerializer
from users.serializers import UserSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_detail = UserSerializer(source="applicant", read_only=True)
    job_detail = JobListSerializer(source="job", read_only=True)
    applicant_name = serializers.CharField(source="applicant.username", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "job_detail",
            "job_title",
            "applicant",
            "applicant_detail",
            "applicant_name",
            "resume",
            "cover_letter",
            "status",
            "notes",
            "applied_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "job",
            "applicant",
            "resume",
            "status",
            "notes",
            "applied_at",
            "updated_at",
        ]

        extra_kwargs = {
            "job": {"required": False},
            "resume": {"required": False},
            "cover_letter": {"required": False},
        }

    def create(self, validated_data):
        return Application.objects.create(**validated_data)


class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ["status", "notes"]


class SavedJobSerializer(serializers.ModelSerializer):
    job_detail = JobListSerializer(source="job", read_only=True)

    class Meta:
        model = SavedJob
        fields = ["id", "job", "job_detail", "saved_at"]
        read_only_fields = ["id", "user", "saved_at"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)