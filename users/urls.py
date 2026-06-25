from django.urls import path
from .views import hello_vault, register_user, login_user, current_user

urlpatterns = [
    path("hello/", hello_vault),
    path("register/", register_user),
    path("login/", login_user),
    path("me/", current_user),
]