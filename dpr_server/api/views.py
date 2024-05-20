from django.contrib.auth import get_user_model, authenticate
from rest_framework import generics, permissions, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import CustomUserSerializer, CarSerializer, RentalInfoSerializer
from .models import Car, RentalInfo
from django.utils.dateparse import parse_date
from django.db.models import Q

User = get_user_model()

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "username": user.username})
        else:
            return Response({"error": "Invalid credentials"}, status=400)

class CurrentUserView(views.APIView):
    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

class CarListCreateView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.AllowAny]

class CarDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class InventoryListView(generics.ListAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.AllowAny]

class RentalInfoListCreateView(generics.ListCreateAPIView):
    queryset = RentalInfo.objects.all()
    serializer_class = RentalInfoSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data
        pick_up_date = parse_date(data.get('pick_up_date'))
        drop_off_date = parse_date(data.get('drop_off_date'))
        car_id = data.get('car')

        if RentalInfo.objects.filter(car_id=car_id, pick_up_date__lt=drop_off_date, drop_off_date__gt=pick_up_date).exists():
            return Response({'error': 'This car is already booked for the selected dates.'}, status=400)

        user = request.user if request.user.is_authenticated else None

        rental_info = RentalInfo.objects.create(
            user=user,
            car_id=car_id,
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            driver_license=data.get('driver_license'),
            driver_state=data.get('driver_state'),
            driver_address=data.get('driver_address'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            pick_up_date=pick_up_date,
            pick_up_time=data.get('pick_up_time'),
            drop_off_date=drop_off_date,
            drop_off_time=data.get('drop_off_time'),
            location=data.get('location'),
            rental_days=data.get('rental_days'),
            daily_rate=data.get('daily_rate'),
            insurance_rate=data.get('insurance_rate'),
            credit_card_number=data.get('credit_card_number'),
            billing_address=data.get('billing_address'),
            expire_date=data.get('expire_date'),
            security_number=data.get('security_number')
        )

        serializer = self.get_serializer(rental_info)
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return RentalInfo.objects.filter(user=user)
        return RentalInfo.objects.none()

class RentalInfoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RentalInfo.objects.all()
    serializer_class = RentalInfoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]





























