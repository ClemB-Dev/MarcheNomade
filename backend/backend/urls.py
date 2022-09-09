
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('marche_nomade.api.urls')),
    path('marche_nomade/', include('marche_nomade.urls'))
]
