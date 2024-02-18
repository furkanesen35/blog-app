from django.shortcuts import render,get_object_or_404
from django.contrib.auth.models import User
from .models import Post,Comment,PostView,Like
from .serializer import PostSerializer
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET","POST"])
def add(request):
 if request.method == "GET":
  posts = Post.objects.all()
  serializer = PostSerializer(posts, many=True)
  return Response(serializer.data)
 elif request.method == "POST":
  serializer = PostSerializer(data=request.data)
  if serializer.is_valid():
   serializer.save(author=request.user)
   data = { "message": "Post created successfully" }
   return Response(data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET","PUT","DELETE","PATCH"])
def get_update_delete(request,slug):
 post = get_object_or_404(Post,slug=slug)
 if request.method == "GET":
  serializer = PostSerializer(post)
  return Response(serializer.data, status=status.HTTP_200_OK)
 elif request.method == "PUT":
  serializer = PostSerializer(post, data=request.data)
  if serializer.is_valid():
   serializer.save()
   data = { "message": "Post updated successfully" }
   return Response(data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 elif request.method == "PATCH":
  serializer = PostSerializer(post, data=request.data, partial=True)
  if serializer.is_valid():
   serializer.save()
   data = { "message": "Post updated successfully1" }
   return Response(data)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 elif request.method == "DELETE":
  post.delete()
  data = { "message": "Post deleted successfully" }
  return Response(data)

# def details(request,slug):
#  form = CommentForm()
#  obj = get_object_or_404(Post, slug=slug)
#  if request.user.is_authenticated:
#   PostView.objects.get_or_create(user=request.user, post=obj)
#  if request.method == "POST":
#   form = CommentForm(request.POST)
#   if form.is_valid():
#    comment = form.save(commit=False)
#    comment.user = request.user
#    comment.post = obj
#    comment.save()
#    return redirect("details", slug=slug)
#  context = {
#   'object': obj,
#   'form': form,
#  } 
#  return render(request, 'blog/details.html', context)

# @login_required()
# def like(request, slug):
#  if request.method == "POST":
#   obj = get_object_or_404(Post, slug=slug)
#   like_qs = Like.objects.filter(user=request.user, post=obj)
#   if like_qs.exists():
#    like_qs[0].delete()
#   else:
#    Like.objects.create(user=request.user, post=obj)
#   return redirect("details", slug=slug)
#  return redirect("details", slug=slug)