from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    enrolled_courses = models.ManyToManyField('Course', blank=True)

    def __str__(self):
        return self.user.username


class Course(models.Model):
    name = models.CharField(max_length=200)
    image = models.URLField(blank=True, null=True)
    concept = models.TextField()
    concept_elaborate = models.TextField()
    tutor = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    courses = models.ManyToManyField(Course, blank=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class ContactFormSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"