from rest_framework import viewsets
from .models import Estimate
from .serializers import EstimateSerializer

class EstimateViewSet(viewsets.ModelViewSet):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer
