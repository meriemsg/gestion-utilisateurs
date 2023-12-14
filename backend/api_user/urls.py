from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileListViewSet, UserProfileUpdateViewSet, UserProfileCreateViewSet

router = DefaultRouter()
router.register(r'profiles-list', UserProfileListViewSet, basename='profiles-list')
router.register(r'profiles-update', UserProfileUpdateViewSet, basename='profiles-update')
router.register(r'profiles-create', UserProfileCreateViewSet, basename='profiles-create')

urlpatterns = [
    path('', include(router.urls)),
]
