from django.db import models
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse

class Contact(models.Model):
    name = models.CharField(max_length=250)
    mobile = models.CharField(max_length=250)
    email = models.CharField(max_length=250, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def get_api_url(self, request=None):
        return api_reverse("contact-rud", kwargs={'pk': self.pk}, request=request)

    @property
    def owner(self):
        return self.user
