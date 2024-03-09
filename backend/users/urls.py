from django.urls import path
from .views import register,all_users,logout,UserLogin,ChangeUserInfoAndPassword
from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView,
)

urlpatterns = [
 path('register/', register, name="register"),
 path('all_users/', all_users, name="all_users"),
 path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
 path('api/token/refresh/', UserLogin.as_view(), name='token_refresh'),
 path('api/logout/', logout, name='logout'),
 path('change_profile', ChangeUserInfoAndPassword.as_view(), name="change_profile")
]