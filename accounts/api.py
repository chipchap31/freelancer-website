from checkout.views import quote
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer, ProfileSerializer, RegisterSerializer
from django.contrib.auth import authenticate, logout, login
from .models import ProfileModel
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
import secrets
import string
from utils import CustomEmail
email_sender = CustomEmail()


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        print(request.data)
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


class ProfileView(generics.RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = self.request.user.profile.all()

        return queryset


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
        profile_serializer = ProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)
        profile_serializer.save(owner=user)
        # set the email receiver
        email_sender.receiver = user.username

        # using the send_user_info method send the email and the raw password
        email_sender.send_user_info(user.username, password)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token
        })


class CheckUserExist(generics.GenericAPIView):
    def post(self, request):

        queryset = User.objects.filter(username=request.data.get('email'))
        print(queryset)
        obj = get_object_or_404(queryset)

        serializer = UserSerializer(obj, many=False)
        return Response(serializer.data)
