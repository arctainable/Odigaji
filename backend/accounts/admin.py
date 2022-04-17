from django.contrib import admin
from .models import User

class UserProfileAdmin(admin.ModelAdmin):
    profilefields = ['nickname','photo','point']

admin.site.register(User, UserProfileAdmin)
    


