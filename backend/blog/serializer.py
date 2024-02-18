from rest_framework import serializers
from .models import Post,PostView,Category,Like,Comment

class CommentSerializer(serializers.ModelSerializer):
 class Meta:
  model = Comment
  fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
 comments = CommentSerializer(many=True, read_only=True)
 likes = serializers.StringRelatedField(read_only=True, many=True)
 class Meta:
  model = Post
  fields = ["title","content","category","status","comments","likes"]