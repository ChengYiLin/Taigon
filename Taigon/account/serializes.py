from rest_framework import serializers
from rest_framework import fields
from account.models import account

# Account Serializers
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = account
        fields = '__all__'