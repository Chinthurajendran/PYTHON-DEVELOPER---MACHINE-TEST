from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'is_staff', 'password']


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'is_active']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'email',
                  'date_joined', 'updated_at', 'is_deleted']
        read_only_fields = ['id', 'date_joined', 'updated_at']

        
    def validate_email(self, value):
        """Ensure email is unique for new employees"""
        if self.instance:
            if Employee.objects.filter(email=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("This email is already used by another employee.")
        else:
            if Employee.objects.filter(email=value).exists():
                raise serializers.ValidationError("This email is already used by another employee.")
        return value
