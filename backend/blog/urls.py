from django.urls import path
from .views import get_all_post,add_new_post,post_detail,post_edit,get_categories,get_comments,post_delete,post_comment,add_category

urlpatterns = [
 path('post/get/', get_all_post, name="get"),
 path('post/add/', add_new_post, name="add"),
 path('<str:slug>/post_edit', post_edit, name="post_edit"),
 path('<str:slug>/post_delete', post_delete, name="post_delete"),
 path('<str:slug>/post_detail', post_detail, name="post_detail"),
 path('comments/', get_comments, name="comments"),
 path('<str:slug>/post_comment', post_comment, name="post_comment"),
 path('get_categories/', get_categories, name="get_categories"),
 path('add_category/', add_category, name="add_category"),
 # path('<str:slug>/like', like, name="like"),
]