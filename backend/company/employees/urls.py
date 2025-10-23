from django.urls import path
from .views import*

urlpatterns = [
    path('register', Register.as_view()),
    path('login', LoginView.as_view(),name="login"),
    path("user_refresh_token/", UserRefreshTokenView.as_view(), name="refresh"),
    path('employees/', EmployeeList.as_view(), name='employee-list'),
    path('employees/add/', EmployeeCreate.as_view(), name='employee-add'),
    path('employees/<int:pk>/update/', EmployeeUpdate.as_view(), name='employee-update'),
    path('employees/<int:pk>/delete/', EmployeeDelete.as_view(), name='employee-delete'),
]