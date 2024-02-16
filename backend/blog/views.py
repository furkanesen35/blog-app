from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib.auth.models import User
from .models import Post,Comment,PostView,Like
from .forms import PostForm,CommentForm
from django.contrib import messages

def home(request):
 posts = Post.objects.filter(status="p")
 context = {
  "posts": posts,
 }
 return render(request, "blog/blogs.html", context)

def add(request):
 form = PostForm()
 if request.method == "POST":
  form = PostForm(request.POST)
  if form.is_valid():
   post = form.save(commit=False)
   post.author = request.user
   post.save()
   return redirect("home")
 context = {
  "form" : form
 }
 return render(request, "blog/add.html", context)

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