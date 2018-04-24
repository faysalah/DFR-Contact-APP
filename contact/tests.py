from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status
from contact.models import Contact
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse



class ContactAPITestCase(APITestCase):
    def setUp(self):
        user_obj = User(username='faysal', email='faysal@test.com')
        user_obj.set_password("testpassword")
        user_obj.save()
        contact = Contact.objects.create(
                added_by=user_obj, 
                name='Yehia Abid',
                mobile='017234787',
                email='abid@gmail.com',
                address='village-village,zilla-chittagong')

    def test_single_user(self):
        user_count = User.objects.count()
        self.assertEqual(user_count, 1)

    def test_single_contact(self):
        contact_count = Contact.objects.count()
        self.assertEqual(contact_count, 1)

    def test_get_contactlist(self):
        data = {}
        url = api_reverse("contact-list")
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_contact(self):
        data = {"name": "Yehia Abid",
                "mobile": "017234787",
                "email": "abid@gmail.com",
                "address": "village-village,zilla-chittagong",
                "added_by" : 1}
        url = api_reverse("contact-list")
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_contact(self):
        contact = Contact.objects.first()
        url = contact.get_api_url()
        data = {}
        response = self.client.get(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_contact(self):
        contact = Contact.objects.first()
        url = contact.get_api_url()
        data = {"name": "Yehia Abid c",
                "mobile": "0172347876",
                "email": "abidc@gmail.com",
                "address": "village-na,zilla-chittagong",
                "added_by": 1}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_contact(self):
        contact = Contact.objects.first()
        data = {}
        url = contact.get_api_url()
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)