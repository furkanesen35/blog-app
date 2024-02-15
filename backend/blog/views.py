from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from .models import Post,Comment,PostView,Like
from .forms import PostForm,CommentForm

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