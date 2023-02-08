from rest_framework import serializers
from .models import Realtor

class RealtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realtor
        # Trae todos los campos
        fields = '__all__'