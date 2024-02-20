from django.shortcuts import get_object_or_404
from .models import Post,Comment,Category
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

@api_view(["GET"])
def get_comments(request):
 comments = Comment.objects.all()
 serializer = CommentSerializer(comments, many=True)
 return Response(serializer.data)

@api_view(["GET","POST"])
def post_detail(request,slug):
 post = get_object_or_404(Post,slug=slug)
 if request.method == "GET":
  serializer = PostSerializer(post)
 elif request.method == "POST":
  serializer = CommentSerializer(data=request.data)
  serializer.post = post
  if serializer.is_valid():
   serializer.save()
   return Response(request.data)
 return Response(request.data, status=status.HTTP_200_OK)

@api_view(["POST"])
def post_comment(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = CommentSerializer(data=request.data)
 if serializer.is_valid():
  serializer.post = post
  serializer.save()
  data = { "message": "Comment created successfully" }
  return Response(data, status=status.HTTP_201_CREATED)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def post_edit(request,slug):
 post = get_object_or_404(Post,slug=slug)
 serializer = PostSerializer(post, data=request.data, partial=True)
 if serializer.is_valid():
  serializer.save()
  data = { "message": "Post updated successfully" }
  return Response(data)
 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def post_delete(request,slug):
 post = get_object_or_404(Post,slug=slug)
 post.delete()
 data = { "message": "Post deleted successfully" }
 return Response(data)

@api_view(["GET","POST"])
def category(request):
 categories = Category.objects.all()
 if request.method == "GET":
  serializer = CategorySerializer(categories, many=True)
  return Response(serializer.data)
 elif request.method == "POST":
  serializer = CategorySerializer(data=request.data)
  if serializer.is_valid():
   serializer.save()
   data = { "message": "Category created successfully" }
   return Response(data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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