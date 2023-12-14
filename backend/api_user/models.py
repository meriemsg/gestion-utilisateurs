from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    class Gender(models.TextChoices):
        FEMALE = 'Female', 'Female'
        MALE = 'Male', 'Male'

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hometown = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=Gender.choices)
