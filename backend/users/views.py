from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import authenticate,login
from .forms import UserForm,UserProfileForm

def home(request):
 return HttpResponse("welcome")

def register(request):
 form_user = UserForm()
 form_profile = UserProfileForm()
 if request.method == "POST":
  form_user = UserForm(request.POST)
  form_profile = UserProfileForm(request.POST,request.FILES)
  if form_user.is_valid():
   user = form_user.save()
   profile = form_profile.save(commit=False)
   profile.user = user
   profile.save()
   login(request,user)
   return redirect("home")
 context = {
  'form_user': form_user,
  'form_profile': form_profile,
 }
 return render(request, 'users/register.html', context)

def user_login(request):
 form = AuthenticationForm(request, data=request.POST or None)
 if form.is_valid():
  user = form.get_user()
  login(request,user)
  return redirect("register")
 context = {
  "form": form,
 }
 return render(request, 'users/login.html', context)