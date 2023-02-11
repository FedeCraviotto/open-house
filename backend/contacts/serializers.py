from rest_framework import serializers
from .models import Contact

class ContactSerielizer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'