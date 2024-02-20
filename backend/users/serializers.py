from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer):
 class Meta:
  model = User
  # fields = ["username","email","password"]
  fields = "__all__"

class LoginSerializer(serializers.Serializer):
 class Meta:
  model = User
  fields = ["username","password"]