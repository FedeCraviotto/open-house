from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Listing
from .serializers import ListingSerializer, ListingDetailSerializer
from datetime import datetime, timezone, timedelta

class ListingsView(ListAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer
    lookup_field = 'slug'
    
class ListingView(RetrieveAPIView):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    serializer_class = ListingDetailSerializer
    lookup_field = 'slug'
    
class SearchView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ListingSerializer
    
    # Tener en cuenta que con APIView vamos a poder hacer todos los tipos de API requests (patch, put, delete...no solamente post)
    def post(self, requests, format=None):
        # No tiene porque ser queryset necesariamente
        queryset = Listing.objects.order_by('list_date').filter(is_published=True)
        data = self.request.data
        
        sale_type = data['sale_type']
        # A ver si en la DB los datos coinciden en la DB, si el sale_type es FOR_SALE, o FOR_RENT. Despues los vamos a filtrar
        queryset = queryset.filter(sale_type__iexact = sale_type)
        
        price = data['price']
        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1,000,000+':
            price = 1000000
        elif price == '$1,200,000+':
            price = 1200000
        elif price == '$1,500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1
        
        if price != -1:
            # Si no especifico un precio, NO filtramos...
            queryset = queryset.filter(price__gte = price)
        
        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms = 0
        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        
        queryset = queryset.filter(bedrooms__gte=bedrooms)
        
        home_type = data['home_type']
        queryset = queryset.filter(home_type__iexact=home_type)
        
        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms = 0.0
        elif bathrooms == '1+':
            bathrooms = 1.0
        elif bathrooms == '2+':
            bathrooms = 2.0
        elif bathrooms == '3+':
            bathrooms = 3.0
        elif bathrooms == '4+':
            bathrooms = 4.0
        
        queryset = queryset.filter(bathrooms__gte = bathrooms)
        
        sqft = data['sqft']
        if sqft == '1000+':
            sqft = 1000
        elif sqft == '1200+':
            sqft = 1200
        elif sqft == '1500+':
            sqft = 1500
        elif sqft == '2000+':
            sqft = 2000
        elif sqft == 'Any':
            sqft = 0
            
        if sqft != 0:
            queryset = queryset.filter(sqft__gte=sqft)
        
        days_passed = data['days_listed']
        if days_passed == '1 or less':
            days_passed = 1
        elif days_passed == '2 or less':
            days_passed = 2
        elif days_passed == '5 or less':
            days_passed = 5
        elif days_passed == '10 or less':
            days_passed = 10
        elif days_passed == '20 or less':
            days_passed = 20
        elif days_passed == 'Any':
            days_passed = 0
        
        for query in queryset:
            num_days = (datetime.now(timezone.utc) - query.list_date).days
            
            if days_passed != 0:
                # El cliente selecciona 6 (o menos), pero pasaron 9 dias
                if num_days > days_passed:
                    # Los sacamos como si fuera por ID, pero por slug
                    slug = query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
                    
        has_images = data['has_images']
        if has_images == '1+':
            has_images = 1
        elif has_images == '3+':
            has_images = 3
        elif has_images == '5+':
            has_images = 5
        elif has_images == '10+':
            has_images = 10
        elif has_images == '15+':
            has_images = 15
        
        for query in queryset:
            count = 0
            # Van ifs porque queremos checkear la existencia de cada una de ellas
            if query.image_1:
                count += 1
            if query.image_2:
                count += 1
            if query.image_3:
                count += 1
            if query.image_4:
                count += 1
            if query.image_5:
                count += 1
            if query.image_6:
                count += 1
            if query.image_7:
                count += 1
            if query.image_8:
                count += 1
            if query.image_9:
                count += 1
            if query.image_10:
                count += 1
            
            if count < has_images:
                # Si la persona eligio que quiere ver 10 fotos y tenemos 9, no vamos a mostrarle el listado
                slug = query.slug
                queryset = queryset.exclude(slug__iexact=slug)
                
        open_house = data['open_house']
        queryset = queryset.filter(open_house__iexact= open_house)
        
        keywords = data['keywords']
        queryset = queryset.filter(description__icontains=keywords)
        
        # para que sea un JSON
        serializer = ListingSerializer(queryset, many=True)
        print(data)
        return Response(serializer.data)