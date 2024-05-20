from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Car, CarPhoto, RentalInfo

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'age')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            age=validated_data.get('age', None)
        )
        return user

class CarPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPhoto
        fields = ['id', 'photo']

class CarSerializer(serializers.ModelSerializer):
    photos = CarPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = ['id', 'year', 'make', 'model', 'type', 'price', 'vin', 'license_plate', 'owner_name', 'owner_contact', 'photos', 'seats', 'cylinder', 'pet_friendly', 'child_seat', 'description', 'drivetrain', 'zero_to_sixty', 'fuel_consumption', 'option_camera', 'option_navigation', 'option_carplay', 'option_blindspot', 'option_parkingassist', 'option_sunroof', 'option_heatcoolseat', 'option_keyless']

    def create(self, validated_data):
        car = Car.objects.create(**validated_data)
        return car

    def update(self, instance, validated_data):
        instance.year = validated_data.get('year', instance.year)
        instance.make = validated_data.get('make', instance.make)
        instance.model = validated_data.get('model', instance.model)
        instance.vin = validated_data.get('vin', instance.vin)
        instance.license_plate = validated_data.get('license_plate', instance.license_plate)
        instance.owner_name = validated_data.get('owner_name', instance.owner_name)
        instance.owner_contact = validated_data.get('owner_contact', instance.owner_contact)
        instance.cylinder = validated_data.get('cylinder', instance.cylinder)
        instance.seats = validated_data.get('seats', instance.seats)
        instance.pet_friendly = validated_data.get('pet_friendly', instance.pet_friendly)
        instance.child_seat = validated_data.get('child_seat', instance.child_seat)
        instance.description = validated_data.get('description', instance.description)
        instance.zero_to_sixty = validated_data.get('zero_to_sixty', instance.zero_to_sixty)
        instance.fuel_consumption = validated_data.get('fuel_consumption', instance.fuel_consumption)
        instance.drivetrain = validated_data.get('drivetrain', instance.drivetrain)
        instance.option_camera = validated_data.get('option_camera', instance.option_camera)
        instance.option_navigation = validated_data.get('option_navigation', instance.option_navigation)
        instance.option_carplay = validated_data.get('option_carplay', instance.option_carplay)
        instance.option_blindspot = validated_data.get('option_blindspot', instance.option_blindspot)
        instance.option_parkingassist = validated_data.get('option_parkingassist', instance.option_parkingassist)
        instance.option_sunroof = validated_data.get('option_sunroof', instance.option_sunroof)
        instance.option_heatcoolseat = validated_data.get('option_heatcoolseat', instance.option_heatcoolseat)
        instance.option_keyless = validated_data.get('option_keyless', instance.option_keyless)
        instance.save()
        return instance

class RentalInfoSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)

    class Meta:
        model = RentalInfo
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        rental_info = RentalInfo.objects.create(user=user, **validated_data)
        return rental_info






















