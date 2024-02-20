from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):
 def create(self,validated_data):
  validated_data["password"] = make_password(validated_data["password"])
  return super(RegisterSerializer,self).create(validated_data)
 class Meta:
  model = User
  # fields = ["username","email","password"]
  fields = "__all__"

class LoginSerializer(serializers.Serializer):
 username = serializers.CharField()
 password = serializers.CharField()