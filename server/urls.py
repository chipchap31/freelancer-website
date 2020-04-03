from django.urls import include, path



urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls'))  
]