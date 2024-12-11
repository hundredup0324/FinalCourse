from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Course, Cart, ContactFormSubmission
from .serializers import CourseSerializer, CartSerializer, ContactFormSerializer, UserSerializer
from django.http import JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@csrf_exempt
@api_view(['POST'])

def root_view(request):
    return JsonResponse({"message": "Welcome to the E-commerce API!"})



class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def fetch_details(self, request, pk=None):
        """Fetch detailed information about a specific course"""
        course = self.get_object()
        serializer = self.get_serializer(course)
        return Response(serializer.data)


class CartViewSet(viewsets.ViewSet):
    def list(self, request):
        """Fetch all items in the user's cart"""
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def create(self, request):
        """Add a course to the user's cart"""
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        course_id = request.data.get('id')
        try:
            course = Course.objects.get(id=course_id)
            cart.courses.add(course)
            cart.save()
            return Response({'message': 'Course added to cart.'}, status=status.HTTP_201_CREATED)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        user = request.user
        print(f"Attempting to remove course ID: {pk} for user: {user.username}")
        cart, _ = Cart.objects.get_or_create(user=user)
        try:
            course = cart.courses.get(id=pk)
            cart.courses.remove(course)
            cart.save()
            print(f"Successfully removed course ID: {pk}")
            return Response({'message': 'Course removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            print(f"Course ID: {pk} not found in cart")
            return Response({'error': 'Course not found in cart.'}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=False, methods=['post'])
    def confirm(self, request):
        """Confirm enrollment for all courses in the user's cart"""
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        if cart.courses.exists():
            cart.courses.clear()
            cart.save()
            return Response({'message': 'Enrollment confirmed.'})
        return Response({'error': 'No courses in cart.'}, status=status.HTTP_400_BAD_REQUEST)


class ContactFormViewSet(viewsets.ModelViewSet):
    """Handle contact form submissions"""
    queryset = ContactFormSubmission.objects.all()
    serializer_class = ContactFormSerializer


class UserViewSet(viewsets.ViewSet):
    """Handle user registration and login"""
    permission_classes = [AllowAny] 

    def create(self, request):
        """Register a new user"""
        userData=request.data.get('username')
        username = userData["name"]
        email = userData["email"]
        password = userData["password"]
        user = User.objects.create_user(username=username, email=email, password=password)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """Login an existing user"""
        print(request.data)
        userData=request.data.get('credentials')
        email = userData["email"]
        password = userData["password"]
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                serializer = UserSerializer(user)
              
                return Response(serializer.data)
            return Response({'error': 'Invalid password.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
