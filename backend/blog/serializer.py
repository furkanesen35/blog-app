from rest_framework import serializers
from .models import Post,PostView,Category,Like,Comment

class PostSerializer(serializers.ModelSerializer):
 class Meta:
  model = Post
  fields = ["title","content","category","status",]