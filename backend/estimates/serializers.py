from rest_framework import serializers
from .models import Estimate, EstimateItem, InspirationImage, Upload

class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = ['image_file']

class InspirationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InspirationImage
        fields = ['image_url', 'preference_order']

class EstimateItemSerializer(serializers.ModelSerializer):
    uploads = UploadSerializer(many=True, required=False)
    inspiration_images = InspirationImageSerializer(many=True, required=False)

    class Meta:
        model = EstimateItem
        fields = ['canvas_type', 'sub_type', 'uploads', 'inspiration_images']

    def create(self, validated_data):
        uploads_data = validated_data.pop('uploads', [])
        inspirations_data = validated_data.pop('inspiration_images', [])
        item = EstimateItem.objects.create(**validated_data)
        for up in uploads_data:
            Upload.objects.create(estimate_item=item, **up)
        for insp in inspirations_data:
            InspirationImage.objects.create(estimate_item=item, **insp)
        return item

class EstimateSerializer(serializers.ModelSerializer):
    items = EstimateItemSerializer(many=True)

    class Meta:
        model = Estimate
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'special_requests', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        estimate = Estimate.objects.create(**validated_data)
        for item_data in items_data:
            EstimateItemSerializer().create({**item_data, 'estimate': estimate})
        return estimate
