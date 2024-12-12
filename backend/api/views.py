from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from .models import Course, Cart, ContactFormSubmission
from .serializers import CourseSerializer, CartSerializer, ContactFormSerializer, UserSerializer

@csrf_exempt
@api_view(['POST', 'GET', 'PUT', 'DELETE'])
def root_view(request):
    return JsonResponse({"message": "Welcome to the E-commerce API!"})

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    @action(detail=True, methods=['get'])
    def fetch_details(self, request, pk=None):
        """Fetch detailed information about a specific course"""
        course = self.get_object()
        serializer = self.get_serializer(course)
        return Response(serializer.data)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request):
        user = request.user
        cart= Cart.objects.get_or_create(user=user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def create(self, request):
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
        cart, _ = Cart.objects.get_or_create(user=user)
        try:
            course = cart.courses.get(id=pk)
            cart.courses.remove(course)
            cart.save()
            return Response({'message': 'Course removed from cart.'}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found in cart.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def confirm(self, request):
        user = request.user
        cart, _ = Cart.objects.get_or_create(user=user)
        if cart.courses.exists():
            cart.courses.clear()
            cart.save()
            return Response({'message': 'Enrollment confirmed.'})
        return Response({'error': 'No courses in cart.'}, status=status.HTTP_400_BAD_REQUEST)

class ContactFormViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ContactFormSubmission.objects.all()
    serializer_class = ContactFormSerializer

class UserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        userData = request.data.get('username')
        username = userData["name"]
        email = userData["email"]
        password = userData["password"]
        user = User.objects.create_user(username=username, email=email, password=password)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def login(self, request):
        userData = request.data.get('credentials')
        email = userData["email"]
        password = userData["password"]

        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                userLogin = authenticate(request, username=email, password=password)
                if userLogin:
                    login(request, userLogin)
                    csrf_token = get_token(request)
                    serializer = UserSerializer(user)
                    return Response({
                        'user': serializer.data,
                        'csrf_token': csrf_token
                    })
                return Response({'error': 'Authentication failed.'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'error': 'Invalid password.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)