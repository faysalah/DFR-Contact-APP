from rest_framework import serializers
from contact import models
from django.contrib.auth.models import User

class ContactSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = models.Contact
        fields = ('url','pk','name','mobile','email','address', 'added_by')
        read_only_fields = ('pk',)

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request=request)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ('password', 'first_name', 'last_name', 'email','username')
        fields = ('password','email','username')
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)
 
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user