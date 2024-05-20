from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Car, CarPhoto, RentalInfo, CustomUser

class CarPhotoInline(admin.TabularInline):
    model = CarPhoto
    extra = 1

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['year', 'make', 'model', 'vin', 'license_plate', 'owner_name', 'owner_contact']
    inlines = [CarPhotoInline]

@admin.register(CarPhoto)
class CarPhotoAdmin(admin.ModelAdmin):
    list_display = ['car', 'photo']

@admin.register(RentalInfo)
class RentalInfoAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'car', 'pick_up_date', 'drop_off_date', 'location']
    search_fields = ['first_name', 'last_name', 'car__make', 'car__model']
    list_filter = ['pick_up_date', 'drop_off_date', 'location']

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']
    list_filter = ['is_staff', 'is_active', 'groups']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['username']







