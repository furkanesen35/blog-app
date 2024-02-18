from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib.auth.models import User
from .models import Post,Comment,PostView,Like
from .forms import PostForm,CommentForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def home(request):
 posts = Post.objects.filter(status="p")
 context = {
  "posts": posts,
 }
 return render(request, "blog/blogs.html", context)

@login_required()
def add(request):
 form = PostForm()
 if request.method == "POST":
  form = PostForm(request.POST, request.FILES)
  if form.is_valid():
   post = form.save(commit=False)
   post.author = request.user
   post.save()
   messages.success(request, "Post created successfully!")
   return redirect("home")
 context = {
  "form" : form
 }
 return render(request, "blog/add.html", context)

def details(request,slug):
 form = CommentForm()
 obj = get_object_or_404(Post, slug=slug)
 if request.user.is_authenticated:
  PostView.objects.get_or_create(user=request.user, post=obj)
 if request.method == "POST":
  form = CommentForm(request.POST)
  if form.is_valid():
   comment = form.save(commit=False)
   comment.user = request.user
   comment.post = obj
   comment.save()
   return redirect("details", slug=slug)
 context = {
  'object': obj,
  'form': form,
 } 
 return render(request, 'blog/details.html', context)

@login_required()
def update(request,slug):
 post = get_object_or_404(Post, slug=slug)
 form = PostForm(request.POST or None, request.FILES or None, instance=post)
 if request.user.id != post.author.id:
  messages.warning(request, "You are not authorized!!!")
  return redirect("home")
 if form.is_valid():
  form.save()
  messages.success(request, "Post Updated!")
  return redirect("home")
 context = {
  "post": post,
  "form": form,
 }
 return render(request, 'blog/update.html', context)

def delete(request,slug):
 post = get_object_or_404(Post, slug=slug)
 if request.method == "POST":
  post.delete()
  return redirect("home")
 context = {
  'post': post,
 }
 return render(request, 'blog/delete.html', context)

@login_required()
def like(request, slug):
 if request.method == "POST":
  obj = get_object_or_404(Post, slug=slug)
  like_qs = Like.objects.filter(user=request.user, post=obj)
  if like_qs.exists():
   like_qs[0].delete()
  else:
   Like.objects.create(user=request.user, post=obj)
  return redirect("details", slug=slug)
 return redirect("details", slug=slug)