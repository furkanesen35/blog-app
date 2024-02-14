from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import authenticate,login

def home(request):
 return HttpResponse("welcome")

def register(request):
 form = UserCreationForm()
 if request.method == "POST":
  form = UserCreationForm(request.POST)
  if form.is_valid():
   form.save()
   return redirect("home")
 context = {
  "form": form,
 }
 return render(request, 'users/register.html', context)
