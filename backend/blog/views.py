from django.shortcuts import get_object_or_404
from .models import Post,Comment,Category,Like,PostView
from django.contrib.auth.models import User
from .serializer import PostSerializer,CategorySerializer,CommentSerializer,LikeSerializer,ViewSerializer
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_all_post(request):
 posts = Post.objects.all()
 serializer = PostSerializer(posts, many=True)
 return Response(serializer.data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def add_new_post(request):
 user = User.objects.get(id=request.user.id)
 userid = str(user.id)
 request.data["author"] = userid
 serializer = PostSerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Post created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def post_detail(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = PostSerializer(post)
 return Response(serializer.data, status=status.HTTP_200_OK)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["PUT"])
def post_edit(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = PostSerializer(post, data=request.data, partial=True)
 print(request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Post updated successfully" }
  return Response(data)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["DELETE"])
def post_delete(request,slug):
 post = get_object_or_404(Post,slug=slug)
 post.delete()
 data = { "message": "Post deleted successfully" }
 return Response(data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_comments(request):
 comments = Comment.objects.all()
 serializer = CommentSerializer(comments, many=True)
 return Response(serializer.data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def add_comment(request,slug):
 data = request.data
 user = User.objects.get(id=request.user.id)
 userid = str(user.id)
 post_id = str(get_object_or_404(Post,slug=slug).id)
 data["post"] = post_id
 data["user"] = userid
 serializer = CommentSerializer(data=data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Comment created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_category(request):
 categories = Category.objects.all()
 serializer = CategorySerializer(categories, many=True)
 return Response(serializer.data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def add_category(request):
 serializer = CategorySerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Category created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_likes(request):
 likes = Like.objects.all()
 serializer = LikeSerializer(likes, many=True)
 return Response(serializer.data)

class PostLikeAPIView(APIView):
#  authentication_classes = [TokenAuthentication]
#  permission_classes = [IsAuthenticated]
 def post(self, request, slug):
  if not request.user.is_authenticated:
   return Response({'message': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
  
  post = get_object_or_404(Post, slug=slug)
  user = request.user
  data = {'post': post.pk, 'user': user.pk}
  return Response(print(data))
  # serializer = LikeSerializer(data=data)
  # if serializer.is_valid():
  #  serializer.save()
  #  return Response({'message': 'Like created successfully'}, status=status.HTTP_201_CREATED)
  # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 def delete(self, request, slug):
  post = get_object_or_404(Post, slug=slug)
  user = request.user
  like = Like.objects.filter(post=post, user=user)
  if like.exists():
   like.delete()
   return Response({'message': 'Like deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
  return Response({'message': 'Like does not exist'}, status=status.HTTP_404_NOT_FOUND)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def delete_like(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = LikeSerializer(data=request.data)
 serializer.delete()
 data = { "message": "Like deleted" }
 return Response(data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def get_views(request):
 views = PostView.objects.all()
 serializer = LikeSerializer(views, many=True)
 return Response(serializer.data)

@api_view(["POST"])
def post_blog_view(request,slug):
 post = get_object_or_404(Post,slug=slug)
 user = User.objects.get(id=request.user.id)
 request.data["post"] = post.id
 request.data["user"] = user.id
 serializer = ViewSerializer(data=request.data)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "View created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)