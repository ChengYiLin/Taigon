from django.urls import path,include
from .api import getUserData, LoginAPI, RegisteAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/login/', LoginAPI.as_view()),
    path('api/register/', RegisteAPI.as_view()),
    path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/user/', getUserData.as_view())
]