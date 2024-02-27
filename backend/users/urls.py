from django.urls import path
from .views import register,user_login,all_users,logout
from rest_framework_simplejwt.views import (
 TokenObtainPairView,
 TokenRefreshView,
)

urlpatterns = [
 path('register/', register, name="register"),
 path('login/', user_login, name="login"),
 path('all_users/', all_users, name="all_users"),
 path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
 path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
 path('api/logout/', logout, name='logout'),
]