from django.urls import path,include
from .api import LoginAPI, RegisteAPI
# from knox import views as knox_views

urlpatterns = [
    path('api/login/', LoginAPI.as_view()),
    path('api/register/', RegisteAPI.as_view())
]