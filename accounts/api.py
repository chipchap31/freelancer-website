from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from knox.models import AuthToken
from .serializers import LoginSerializer, UserSerializer
from django.contrib.auth import authenticate, logout, login


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
