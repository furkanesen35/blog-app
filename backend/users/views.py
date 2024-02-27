from django.contrib.auth import authenticate,login
from .serializers import RegisterSerializer,LoginSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(["GET"])
def all_users(request):
 users = User.objects.all()
 serializer = RegisterSerializer(users, many=True)
 return Response(serializer.data)

@api_view(["POST"])
def register(request):
 serializer = RegisterSerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message" : f"Student {serializer.validated_data.get("username")} saved successfully!"}
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
 serializer = LoginSerializer(data=request.data)
 if serializer.is_valid():
  username = serializer.validated_data.get('username')
  password = serializer.validated_data.get('password')
  user = authenticate(request, username=username, password=password)
  if user is not None:
   token, created = Token.objects.get_or_create(user=user)
   login(request, user)
   return Response({'message': 'Login successful', "TOKEN": token.key})
  else:
   return Response(user, status=status.HTTP_401_UNAUTHORIZED)
 else:
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
 def post(self, request, *args, **kwargs):
  response = super().post(request, *args, **kwargs)
  token = response.data["access"]
  response.set_cookie("access_token", token, httponly=True)
  return response