from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from booking.models import User, Booking
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

class HomeView(APIView):
    def get(self, request):
        return render(request, 'home.html')
    


class SignUpView(APIView):
    def post(self, request):
        data = {}
        data["first_name"] = request.data.get('firstname')
        data["last_name"] = request.data.get('lastname')
        data["emailid"] = request.data.get('email')
        data["mobile"] = request.data.get('phone')
        data["password"] = request.data.get('password')

        try:
            User.objects.create_user(**data)
            return Response(dict(status=1,message="User Created Successfully"))
        except Exception as e:
            return Response(dict(status=0,message=str(e)))

    def get(self, request):
        return redirect('/')


class LoginView(APIView):

    def post(self, request):
        
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)
        user = authenticate(emailid=email, password=password)

        if user is not None:
            login(request, user)
            return Response(dict(status=1,message="Login Successfull"))
        else:
            return Response(dict(status=0,message="Invalid Credentials"))

    def get(self, request):
        return redirect('/')


class LogoutView(APIView):

    def get(self, request):
        logout(request)
        
        return redirect('/')
    
class BookingsView(APIView):
    
    @method_decorator(login_required)
    def get(self, request):
        bookings=Booking.objects.filter(user=request.user)
        print(bookings)
        return render(request, 'bookings.html',{'bookings':bookings})

    
    def post(self, request):
        data = {}
        data["destination"] = request.POST.get('destination')
        data["total_members"] = request.POST.get('total_members')
        data["arrival_date"] = request.POST.get('arrival_date')
        data["departure_date"] = request.POST.get('departure_date')

        try:
            Booking.objects.create(**data,user=request.user)
            bookings=Booking.objects.filter(user=request.user)
            return render(request, 'bookings.html',{'bookings':bookings})
        except Exception as e:
            return redirect('/')