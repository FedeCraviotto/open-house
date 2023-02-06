from django.urls import path
from .views import SignupView

# Vistas para el endpoint ==> api/accounts/
urlpatterns = [
    # El '.as_view()' se agrega porque es una vista basada en una clase, a la que le pasamos APIView
    path('signup', SignupView.as_view()),
]