from django.contrib import admin
from .models import User, Booking
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('emailid','firstname','lastname', 'get_full_name','mobile','created_at')
    search_fields = ('firstname','emailid')
    
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user','destination','total_members','arrival_date','departure_date','created_at')
    search_fields = ('destination','user__emailid')
    
