from django.urls import path
from .views import get_all_post,add_new_post,post_detail,post_edit,category

urlpatterns = [
 path('post/get/', get_all_post, name="get"),
 path('post/add/', add_new_post, name="add"),
 path('<str:slug>/post_detail', post_detail, name="post_detail"),
 path('<str:slug>/post_edit', post_edit, name="post_edit"),
 path('categories/', category, name="categories")
 # path('<str:slug>/like', like, name="like"),
]