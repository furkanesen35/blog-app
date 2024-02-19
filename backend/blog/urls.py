from django.urls import path
from .views import add,get_update_delete,category

urlpatterns = [
 path('', add, name="add"),
 path('<str:slug>/get_update_delete', get_update_delete, name="get_update_delete"),
 path('categories/', category, name="categories")
 # path('<str:slug>/like', like, name="like"),
]