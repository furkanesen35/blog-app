from django.shortcuts import get_object_or_404
from .models import Post,Comment,Category
from django.contrib.auth.models import User
from .serializer import PostSerializer,CategorySerializer,CommentSerializer
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(["GET"])
def get_all_post(request):
 posts = Post.objects.all()
 serializer = PostSerializer(posts, many=True)
 return Response(serializer.data)

@api_view(["POST"])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def add_new_post(request):
 serializer = PostSerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Post created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def post_delete(request,slug):
 post = get_object_or_404(Post,slug=slug)
 post.delete()
 data = { "message": "Post deleted successfully" }
 return Response(data)

@api_view(["PUT"])
def post_edit(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = PostSerializer(post, data=request.data, partial=True)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Post updated successfully" }
  return Response(data)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def post_detail(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = PostSerializer(post)
 return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_comments(request):
 comments = Comment.objects.all()
 serializer = CommentSerializer(comments, many=True)
 return Response(serializer.data)

@api_view(["POST"])
def post_comment(request,slug):
 post = get_object_or_404(Post,slug=slug)
 user = User.objects.get(id=request.user.id)
 request.data["post"] = post.id
 request.data["user"] = user.id
 serializer = CommentSerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Comment created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def get_categories(request):
 categories = Category.objects.all()
 serializer = CategorySerializer(categories, many=True)
 return Response(serializer.data)

@api_view(["POST"])
def add_category(request):
 serializer = CategorySerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Category created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)