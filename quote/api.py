from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .serializers import QuoteSerializer
from .models import QuoteModel
from utils.email_sender import CustomEmail


class QuoteViewSet(generics.GenericAPIView):
    serializer_class = QuoteSerializer

    def post(self, request, *args, **kwargs):

        try:
            quote_email = CustomEmail()
            quote_email.receiver = request.data.get('email')
            print(quote_email.receiver)
            quote_email.send_quote()
            return Response({'message': 'received'})
        except:

            return Response({'message': 'error'})
