from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):
 def create(self,validated_data):
  validated_data["password"] = make_password(validated_data["password"])
  return super(RegisterSerializer,self).create(validated_data)
 class Meta:
  model = User
  fields = "__all__"

class LoginSerializer(serializers.Serializer):
 username = serializers.CharField()
 password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
 class Meta:
  model = User
  fields = ['username', 'password']  # Add other fields as needed
  extra_kwargs = {'password': {'write_only': True}}
 def update(self, instance, validated_data):
  instance.username = validated_data.get('username', instance.username)
  instance.set_password(validated_data.get('password', instance.password))
  instance.save()
  return instance