from django.contrib.auth import authenticate,login
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
def register(request):
 data = request.data
 serializer = RegisterSerializer(data=data)
 if serializer.is_valid():
  serializer.save()
  data = { "message" : f"Student {serializer.validated_data.get("username")} saved successfully!"}
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
 username = request.data.get('username')
 password = request.data.get('password')
 user = authenticate(username=username, password=password)
 if user is not None:
  login(request,user)
  return Response({'message': 'Login successful'})
 else:
  return Response({'message': 'Invalid username or password'}, status=400)