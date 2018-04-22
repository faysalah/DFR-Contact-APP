from django.shortcuts import render
from contact import serializers
from contact import models
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def index(request):
    return render(request, 'index.html')

class ContactListView(APIView):
    permission_classes = []
    def get(self, request):
        contacts = models.Contact.objects.all()
        serializer = serializers.ContactSerializer(contacts,context={'request': request},many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactRudView(APIView):
    permission_classes = [] 
    def get(self, request, pk):
        try:
            contact = models.Contact.objects.get(pk=pk)
        except contact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.ContactSerializer(contact)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            contact = models.Contact.objects.get(pk=pk)
        except contact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.ContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            contact = models.Contact.objects.get(pk=pk)
        except contact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
