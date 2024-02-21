from django.urls import path
from .views import register,user_login,all_users,get_csrf_token

urlpatterns = [
 path('register/', register, name="register"),
 path('login/', user_login, name="login"),
 path('all_users/', all_users, name="all_users"),
 path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]
