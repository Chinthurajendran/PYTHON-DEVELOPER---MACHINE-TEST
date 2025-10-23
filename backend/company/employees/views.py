from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import permissions, status
from .serializers import *
from .models import *
from rest_framework.exceptions import AuthenticationFailed, ParseError
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .auth_backends import RefreshTokenAuth


class Register(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            if CustomUser.objects.filter(email=serializer.validated_data['email']).exists():
                return Response({"error": "This email is already registered. Please use a different email."},
                                status=status.HTTP_403_FORBIDDEN)
            else:
                user = CustomUser.objects.create(
                    email=serializer.validated_data['email'],
                    username=serializer.validated_data['username'],
                )
                user.set_password(serializer.validated_data['password'])
                user.save()

                return Response({"message": "Registration successful! Welcome aboard!"},
                                status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        if not CustomUser.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')

        user = authenticate(request, username=email, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid Password')

        login(request, user)

        refresh = RefreshToken.for_user(user)
        refresh['username'] = str(user.username)
        content = {
            'user_refresh_token': str(refresh),
            'user_access_token': str(refresh.access_token),
            'user_id': user.id,
        }

        return Response(content, status=status.HTTP_200_OK)


class UserRefreshTokenView(APIView):

    authentication_classes = [RefreshTokenAuth]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.auth
        new_access = refresh_token.access_token
        return Response({"access_token": str(new_access)})

# create new  employees
class EmployeeCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "detail": "Employee created successfully",
                "employee": serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List all employees (exclude soft deleted)
class EmployeeList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.filter(is_deleted=False)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)


# Update an employee
class EmployeeUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk, is_deleted=False)
        except Employee.DoesNotExist:
            return Response({"detail": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(
            employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Employee updated successfully", "employee": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Soft delete an employee
class EmployeeDelete(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk, is_deleted=False)
        except Employee.DoesNotExist:
            return Response({"detail": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        employee.is_deleted = True
        employee.save()
        return Response({"detail": "Employee deleted successfully"})
