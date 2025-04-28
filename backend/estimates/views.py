# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Estimate
from .serializers import EstimateSerializer
import json

class EstimateViewSet(viewsets.ModelViewSet):
    queryset = Estimate.objects.all()
    serializer_class = EstimateSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Parse the JSON data manually from 'data' field in form-data
            raw_data = request.data.get('data')
            if not raw_data:
                return Response({"error": "Missing JSON payload in 'data' field."}, status=400)

            parsed_data = json.loads(raw_data)

            # Get files manually and map them to the proper estimate items
            file_map = {}
            for key in request.FILES:
                # Key format: "uploads_0", "uploads_1", etc.
                if key.startswith("uploads_"):
                    index = int(key.split("_")[1])
                    file_map.setdefault(index, []).append(request.FILES[key])

            # Inject uploads into parsed data
            for idx, item in enumerate(parsed_data.get('items', [])):
                if idx in file_map:
                    item['uploads'] = file_map[idx]

            # Use context to pass request to the serializer (needed for file handling)
            serializer = self.get_serializer(data=parsed_data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
