from django.shortcuts import render
import datetime, random, string
from django.core.mail import send_mail

from datetime import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions

from .serializers import UserSerializer
from .models import User, UserToken, Reset

from .authentication import create_access_token, create_refresh_token, decode_refresh_token, JWTAuthentication

class RegisterAPIView(APIView):
    def post(self, request):
        data =  request.data
        
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match')
        
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)
    
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid credentials')
        
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid credentials')
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        UserToken.objects.create(
            user_id=user.id, 
            token=refresh_token, 
            expired_at=datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(seconds=30)
        )

        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data = {
            'token': access_token
        }
        return response
    

class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        return Response(UserSerializer(request.user).data)
    

class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)

        if not UserToken.objects.filter(
            user_id=id, 
            token=refresh_token, 
            expired_at__gt=datetime.datetime.now(tz=timezone.utc)
        ).exists():
            raise exceptions.AuthenticationFailed('unauthenticated')
        
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class LogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete()

        response = Response()
        response.delete_cookie('refresh_token')
        response.data = {
            'message': 'success'
        }
        
        return response
    
class ForgotAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(10))
        
        Reset.objects.create(
            email=email,
            token=token
        )
        
        url='http://localhost:4200/reset/' + token
        
        send_mail(
            subject='Reset your password',
            message='Click <a href="%s" >here</a> to reset your password' % url,
            from_email= email,
            recipient_list=[email]
        )
        
        return Response({
            'message': 'success'
        })
        
class ResetAPIView(APIView):
    def post(self, request):
        data =  request.data
        
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match')
        
        reset_password = Reset.objects.filter(token=data['token']).first()
        
        if not reset_password:
            raise exceptions.APIException('Invalid link!')
        
        user = User.objects.filter(email=reset_password.email).first()

        if not user:
            raise exceptions.APIException('User not found!')
        
        user.set_password(data['password'])
        user.save()
        
        return Response({
            'message': 'success'
        })