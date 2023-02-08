from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor

class Listing(models.Model):
    class SaleType(models.TextChoices):
        FOR_SALE = 'For Sale'
        FOR_RENT = 'For Rent'
        
    class HomeType(models.TextChoices):
        HOUSE = 'House'
        CONDO = 'Condo'
        TOWNHOUSE = 'Townhouse'
    # Seteamos el comportamiento ante un delete del padre.
    # Podriamos haber hecho models.CASCADE
    realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
    slug = models.CharField(max_length=200, unique=True) #instead of ID
    title = models.CharField(max_length=150)
    address= models.CharField(max_length=150)
    city= models.CharField(max_length=100)
    state= models.CharField(max_length=100)
    zipcode= models.CharField(max_length=15)
    description= models.TextField(blank=True)
    sale_type= models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.IntegerField()
    bedrooms= models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
    sqft = models.IntegerField()
    open_house = models.BooleanField(default=False)
    main_image = models.ImageField(upload_to='photos/%Y/%M/%d/')
    image_1 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_2 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_3 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_4 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_5 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_6 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_7 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_8 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_9 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    image_10 = models.ImageField(upload_to='photos/%Y/%M/%d/', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)
    
    def __str__(self):
        return self.title