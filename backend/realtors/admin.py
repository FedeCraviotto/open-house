from django.contrib import admin
from .models import Realtor

class RealtorAdmin(admin.ModelAdmin):
    # Campos que se van a mostrar cuando estemos en el panel de admin y veamos a los realtors creados
    list_display = ('id', 'name', 'email','date_hired')
    # Clicks sobre los cuales vamos a poder clickear
    list_display_links = ('id', 'name')
    # Criteria for search input
    search_fields = ('name', )
    list_per_page = 25

admin.site.register(Realtor, RealtorAdmin)