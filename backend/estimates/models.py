from django.db import models
from django.utils import timezone

class CanvasType(models.TextChoices):
    AIRBOAT = 'AIRBOAT', 'Airboat'
    BOAT = 'BOAT', 'Boat or Yacht'
    VEHICLE = 'VEHICLE', 'Car or Truck'
    FLEET = 'FLEET', 'Buses or Fleets'
    PRINT = 'PRINT', 'Signs & Print Materials'
    GRAPHICS = 'GRAPHICS', 'Digital Graphics'
    APPAREL = 'APPAREL', 'Custom Apparel'
    BRANDING = 'BRANDING', 'Branding Design'

class Estimate(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    special_requests = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.created_at.strftime('%b %d, %Y @ %I:%M %p')}"

class EstimateItem(models.Model):
    estimate = models.ForeignKey(Estimate, related_name='items', on_delete=models.CASCADE)
    canvas_type = models.CharField(max_length=30, choices=CanvasType.choices)
    sub_type = models.CharField(max_length=100, blank=True, null=True)

class InspirationImage(models.Model):
    estimate_item = models.ForeignKey(EstimateItem, related_name='inspiration_images', on_delete=models.CASCADE)
    image_url = models.URLField()
    preference_order = models.PositiveIntegerField()

class Upload(models.Model):
    estimate_item = models.ForeignKey(EstimateItem, related_name='uploads', on_delete=models.CASCADE)
    image_file = models.ImageField(upload_to='uploads/') 
