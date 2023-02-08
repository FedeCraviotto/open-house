from django.urls import path
from .views import RealtorListView, RealtorView, TopSellerView

urlpatterns = [
    # Todos endpoints GET
    
    # Esta va a ser /api/realtors/ de las urls.py del proyecto
    path('', RealtorListView.as_view()),
    path('topseller', TopSellerView.as_view()),
    # La pk va a ser el ID que pasamos como dynamic param
    path('<pk>', RealtorView.as_view()),
]