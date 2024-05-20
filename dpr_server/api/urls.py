from django.urls import path
from .views import UserCreate, LoginView, CurrentUserView, CarListCreateView, CarDetailView, InventoryListView, RentalInfoListCreateView, RentalInfoDetailView

urlpatterns = [
    path('register/', UserCreate.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', CurrentUserView.as_view(), name='current-user'),
    path('cars/', CarListCreateView.as_view(), name='car-list'),
    path('cars/<int:pk>/', CarDetailView.as_view(), name='car-detail'),
    path('inventorylist/', InventoryListView.as_view(), name='inventorylist'),
    path('rentals/', RentalInfoListCreateView.as_view(), name='rental-list'),
    path('rentals/<int:pk>/', RentalInfoDetailView.as_view(), name='rental-detail'),
]



















