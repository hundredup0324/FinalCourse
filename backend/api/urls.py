from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CartViewSet, ContactFormViewSet, UserViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='courses')
router.register(r'contact', ContactFormViewSet, basename='contact')

urlpatterns = [
    path('', include(router.urls)),
    path('cart/', include([
        path('', CartViewSet.as_view({'get': 'list', 'post': 'create'}), name='cart-list-create'),
        path('<int:pk>/', CartViewSet.as_view({'delete': 'destroy'}), name='cart-destroy'),
        path('confirm/', CartViewSet.as_view({'post': 'confirm'}), name='cart-confirm'),
    ])),
    path('users/', include([
        path('', UserViewSet.as_view({'post': 'create'}), name='user-create'),
        path('login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
    ])),
]
