from django.urls import path
from .views import add,get_update_delete

urlpatterns = [
 path('', add, name="add"),
 path('<str:slug>/get_update_delete', get_update_delete, name="get_update_delete"),
 # path('<str:slug>/like', like, name="like"),
]