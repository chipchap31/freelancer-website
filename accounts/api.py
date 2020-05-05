from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer
from django.contrib.auth import authenticate, logout, login


class LoginView(generics.GenericAPIView):

    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        # authenticate the user
        user = authenticate(username=username, password=password)

        if not user:

            return Response({'message': 'Invalid username or password.'},
                            status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
        print(request.user.is_authenticated)
        return Response({'user': user.username})
