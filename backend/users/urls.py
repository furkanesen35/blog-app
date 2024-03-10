from django.urls import path
from .views import register,all_users,logout,UserLogin,ChangeUserInfoAndPassword
from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView,
)

urlpatterns = [
 path('all_users/', all_users, name="all_users"),
 path('register/', register, name="register"),
 path('change_profile', ChangeUserInfoAndPassword, name="change_profile"),
 path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
 path('api/token/refresh/', UserLogin.as_view(), name='token_refresh'),
 path('api/logout/', logout, name='logout'),
]