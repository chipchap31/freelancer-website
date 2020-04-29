from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .serializers import QuoteSerializer
from .models import QuoteModel
from utils.email_sender import CustomEmail


class QuoteViewSet(generics.GenericAPIView):
    serializer_class = QuoteSerializer

    def post(self, request, *args, **kwargs):
        quote_email = CustomEmail()
        serializer = self.get_serializer(
            data={**request.data, "quote_price": '99'})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        quote_email.receiver = request.data.get('email')
        send = quote_email.send_quote(request.data)
        return Response({"price": 300})
