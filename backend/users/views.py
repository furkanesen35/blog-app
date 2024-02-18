from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

def home(request):
 return HttpResponse("welcome")

@api_view(["GET","POST"])
def register(request):
 if request.method == "GET":
  users = User.objects.all()
  serializer = RegisterSerializer(users, many=True)
  return Response(serializer.data)
 elif request.method == "POST":
  serializer = RegisterSerializer(data=request.data)
  if serializer.is_valid():
   serializer.save()
   data = { "message" : f"Student {serializer.validated_data.get("username")} saved successfully!"}
   return Response(data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
 if request.method == 'POST':
  username = request.data.get('username')
  password = request.data.get('password')
  user = authenticate(username=username, password=password)
  if user:
   login(request,user)
   return Response({'message': 'Login successful'})
  else:
   return Response({'message': 'Invalid username or password'}, status=400)
 else:
  return Response({'message': 'Method not allowed'}, status=405)