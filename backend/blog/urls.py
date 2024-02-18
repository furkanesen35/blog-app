from django.urls import path
from .views import home,add,update,delete,details,like

urlpatterns = [
 path('', home, name="home"),
 path('add/', add, name="add"),
 path('<str:slug>/update', update, name="update"),
 path('<str:slug>/delete', delete, name="delete"),
 path('<str:slug>/details', details, name="details"),
 path('<str:slug>/like', like, name="like"),
]