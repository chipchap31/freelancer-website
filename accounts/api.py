from utils import CustomEmail
import string
import secrets
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .models import ProfileModel
from django.contrib.auth import authenticate, logout, login

from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer, ProfileSerializer, RegisterSerializer
from .serializers import ChangePasswordSerializer
import sys
email_sender = CustomEmail()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({'message': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return (self.request.user)


class ProfileView(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def retrieve(self, request, pk):
        queryset = ProfileModel.objects.all()
        profile = get_object_or_404(ProfileModel, owner=pk)

        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data)


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # TODO learn more about strings and secrets
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(10))
        # set the email to the username
        user_serializer = self.get_serializer(data={
            'username': request.data.get('email'),
            'password': password
        })
        # check if the user already exist
        user_serializer.is_valid(raise_exception=True)
        # save the user if the user does not exist
        user = user_serializer.save()
        _, token = AuthToken.objects.create(user)

        # save profile
        # change the mobile phone if starts with 0

        profile_serializer = ProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save(owner=user)
        # set the email receiver
        email_sender.receiver = user.username

        # using the send_user_info method send the email and the raw password
        if not 'test' in sys.argv:
            email_sender.send_user_info(user.username, password)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token
        })


class CheckUserExist(generics.GenericAPIView):
    def post(self, request):

        queryset = User.objects.filter(username=request.data.get('email'))

        obj = get_object_or_404(queryset)

        serializer = UserSerializer(obj, many=False)
        return Response(serializer.data)


class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def post(self, request):

        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password_old = serializer.data.get('password_old')
        password_new = serializer.data.get('password_new')

        if not user.check_password(password_old):
            return Response({'message': 'Old password is invalid'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password_new)
        user.save()

        profile = ProfileModel.objects.get(owner=user)
        profile.password_changed = 1
        profile.save()

        return Response({'message': True}, status=status.HTTP_200_OK)


class DeleteAccount(generics.GenericAPIView):
    model = User
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def post(self, request):
        user = self.get_object()
        user.delete()
        return Response({}, status=status.HTTP_200_OK)


class UpdateProfile(generics.GenericAPIView):
    serializer_class = ProfileSerializer

    def post(self, request, id):
        profile = get_object_or_404(ProfileModel, owner=id)

        serializer = self.get_serializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
