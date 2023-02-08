from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Realtor
from .serializers import RealtorSerializer

class RealtorListView(ListAPIView):
    # Por defecto tenes que estar autenticado, por eso AllowAny, para poder usarlo sin estar auth
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    # Por defecto cada lista va a estar paginada. No queremos eso
    pagination_class = None

# Esta clase devuelve 1 solo vendedor, por ID
class RealtorView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    # Aca si vamos a querer estar autenticados para poder verlo
    # Aca nos va a devolver solo un objeto, no una lista. Por eso no pagination settings
    
class TopSellerView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.filter(top_seller=True)
    serializer_class = RealtorSerializer
    # Devuelve 1 lista de 1 solo resultado, pero una lista al fin
    pagination_class = None