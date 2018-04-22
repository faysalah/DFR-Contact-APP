from django.contrib import admin
from django.urls import path, include
from contact import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', views.index),
    path('api/v1/contact', views.ContactListView.as_view(), name='contact-list'),
    path('api/v1/contact', views.ContactListView.as_view(), name='contact-list'),
    path('api/v1/contact/<int:pk>/', views.ContactRudView.as_view(), name='contact-rud'),
    path('api/login/', obtain_jwt_token, name='api-login'),
    path('api/register/', views.UserView.as_view(), name='api-register'),
    path('admin', admin.site.urls)
]