from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.views import APIView
import random
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            self.get_object(),
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = request.user.profile

        if "resume" not in request.FILES:
            return Response(
                {"error": "No resume uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.resume = request.FILES["resume"]
        profile.save()

        return Response({
            "message": "Resume uploaded successfully",
            "resume": profile.resume.url
        })

class SendResetOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)

            # Generate 6-digit OTP
            otp = str(random.randint(100000, 999999))

            # Save OTP
            user.reset_otp = otp
            user.otp_created_at = timezone.now()
            user.save()

            # Send Email
            send_mail(
                subject="JobConnect Password Reset OTP",
                message=f"""
Hello {user.username},

Your OTP for resetting your JobConnect password is:

{otp}

This OTP is valid for 5 minutes.

If you did not request this, please ignore this email.

Regards,
JobConnect Team
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response(
                {
                    "message": "OTP sent successfully."
                },
                status=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            return Response(
                {
                    "error": "No account found with this email."
                },
                status=status.HTTP_404_NOT_FOUND
            )

class VerifyResetOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = str(request.data.get("otp")).strip()

        if not email or not otp:
            return Response(
                {"error": "Email and OTP are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email__iexact=email.strip())

            print("Entered OTP :", repr(otp))
            print("Stored OTP  :", repr(user.reset_otp))
            print("Email        :", email)

            # Verify OTP
            if str(user.reset_otp).strip() != otp:
                return Response(
                    {"error": "Invalid OTP."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verify Expiry
            if timezone.now() > user.otp_created_at + timedelta(minutes=5):
                return Response(
                    {"error": "OTP has expired."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(
                {
                    "message": "OTP Verified Successfully."
                },
                status=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            return Response(
                {
                    "error": "No account found with this email."
                },
                status=status.HTTP_404_NOT_FOUND
            )

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp = str(request.data.get("otp")).strip()
        password = request.data.get("password")

        if not email or not otp or not password:
            return Response(
                {"error": "Email, OTP and Password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email__iexact=email.strip())

            # Verify OTP
            if str(user.reset_otp).strip() != otp:
                return Response(
                    {"error": "Invalid OTP."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check OTP expiry
            if timezone.now() > user.otp_created_at + timedelta(minutes=5):
                return Response(
                    {"error": "OTP has expired."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update password
            user.set_password(password)

            # Clear OTP
            user.reset_otp = None
            user.otp_created_at = None
            user.save()

            return Response(
                {
                    "message": "Password reset successfully."
                },
                status=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            return Response(
                {
                    "error": "User not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )