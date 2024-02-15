from django.urls import path
from .views import home,add,update

urlpatterns = [
 path('', home, name="home"),
 path('add/', add, name="add"),
 path('update/<str:slug>', update, name="update"),
]