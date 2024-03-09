from django.contrib.auth import authenticate,login
from .serializers import RegisterSerializer,LoginSerializer,UserSerializer
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class ChangeUserInfoAndPassword(APIView):
 def put(self, request):
  user = request.user
  data = request.data
  serializer = UserSerializer(user, data=data, partial=True)
  if serializer.is_valid():
   if 'old_password' in data:
    old_password = data.pop('old_password')
    if not user.check_password(old_password):
     return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')
    if new_password != confirm_password:
     return Response({"confirm_password": ["Passwords do not match."]}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(new_password)
   serializer.save()
   return Response(serializer.data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(TokenObtainPairView):
 def post(self, request, *args, **kwargs):
  response = super().post(request, *args, **kwargs)
  serializer = LoginSerializer(data=request.data)
  if serializer.is_valid():
   username = serializer.validated_data.get('username')
   password = serializer.validated_data.get('password')
   user = authenticate(request, username=username, password=password)
   if user is not None:
    login(request, user)
    token = response.data["access"]
    return Response({'message': 'Login successful', "TOKEN": token.key})
   response.set_cookie("access_token", token, httponly=True)
  return response
 
@api_view(['POST'])
def logout(request):
 try:
  refresh_token = request.COOKIES.get('refresh_token')
  if refresh_token is not None:
   token = RefreshToken(refresh_token)
   token.blacklist()
   return Response({'message': 'Logout successful'})
  else:
   return Response({'message': 'User not logged in'})
 except Exception as e:
  return Response({'message': 'Error logging out'}, status=500)