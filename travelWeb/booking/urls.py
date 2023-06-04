from django.urls import path,include
from .views import *
urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('sign-up', SignUpView.as_view(), name='sign_up'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('bookings', BookingsView.as_view(), name='bookings'),
]
