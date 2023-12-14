from rest_framework import viewsets, status
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.response import Response

class UserProfileListViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = UserProfile.objects.all()
        hometown = self.request.query_params.get('hometown')
        min_age = self.request.query_params.get('min_age')
        max_age = self.request.query_params.get('max_age')
        gender = self.request.query_params.get('gender')

        if hometown:
            queryset = queryset.filter(hometown__icontains=hometown)

        if min_age is not None:
            queryset = queryset.filter(age__gte=min_age)

        if max_age is not None:
            queryset = queryset.filter(age__lte=max_age)

        if gender:
            queryset = queryset.filter(gender=gender)

        return queryset

class UserProfileUpdateViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()

        user_profile.age = request.data.get('age', user_profile.age)
        user_profile.hometown = request.data.get('hometown', user_profile.hometown)
        user_profile.save()

        return super().update(request, *args, **kwargs)

class UserProfileCreateViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer

    def create(self, request, *args, **kwargs):
        try:
            user_data = {
                'username': request.data['username'],
                'password': request.data['password']
            }

            user_serializer = UserSerializer(data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()

            profile_data = {
                'user': user.id,
                'age': request.data['age'],
                'hometown': request.data['hometown'],
                'gender': request.data['gender'],
            }
            profile_serializer = self.get_serializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()

            return Response(profile_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
