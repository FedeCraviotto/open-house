from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    # recomended paths from jwt documentation
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # recomended paths from jwt documentation
    path('api/accounts/', include('accounts.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ^ with alt+94
# To catch all the other routes that aren't in here
# All those routes on our frontend are going to be catch here
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]