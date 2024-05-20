from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)

class Car(models.Model):
    year = models.IntegerField()
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    vin = models.CharField(max_length=255)
    license_plate = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    owner_contact = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    type = models.CharField(max_length=50, default='Sedan')
    seats = models.IntegerField(default=5)
    cylinder = models.IntegerField(default=3)
    drivetrain = models.CharField(max_length=255, default='Front Wheel Drive')
    pet_friendly = models.BooleanField(default=False)
    child_seat = models.BooleanField(default=True)
    zero_to_sixty = models.CharField(max_length=255, default='6.0 Seconds')
    fuel_consumption = models.CharField(max_length=255, default='30 mpg')

    option_camera = models.CharField(max_length=255, default='Backup Camera')
    option_navigation = models.CharField(max_length=255, default='Navigation System')
    option_carplay = models.CharField(max_length=255, default='Apple Carplay')
    option_blindspot = models.CharField(max_length=255, default='Blind Spot Monitor')
    option_parkingassist = models.CharField(max_length=255, default='Parking Assist')
    option_sunroof = models.CharField(max_length=255, default='Sunroof')
    option_heatcoolseat = models.CharField(max_length=255, default='Heated and Cooled Seat')
    option_keyless = models.CharField(max_length=255, default='Keyless Start and Keyless Entry')

    def __str__(self):
        return f"{self.make} {self.model} {self.year}"

class CarPhoto(models.Model):
    car = models.ForeignKey(Car, related_name='photos', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='photos/')

    def __str__(self):
        return f"Photo for {self.car.make} {self.car.model} {self.car.year}"

class RentalInfo(models.Model):
    user = models.ForeignKey(CustomUser, related_name='rentals', on_delete=models.CASCADE, null=True, blank=True)
    car = models.ForeignKey(Car, related_name='rentals', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    driver_license = models.CharField(max_length=255)
    driver_state = models.CharField(max_length=2, default="TX")
    driver_address = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    drop_off_date = models.DateField()
    drop_off_time = models.TimeField()
    location = models.CharField(max_length=255)
    rental_days = models.IntegerField()
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)
    insurance_rate = models.DecimalField(max_digits=10, decimal_places=2, default=39.00)
    
    credit_card_number = models.IntegerField(default=0)
    billing_address = models.CharField(max_length=255, default='')
    expire_date = models.DateField(null=True, blank=True)
    security_number = models.IntegerField(default=0)

    def __str__(self):
        return f"Rental by {self.first_name} {self.last_name} for {self.car.make} {self.car.model}"
