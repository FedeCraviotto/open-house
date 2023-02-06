from django.contrib.auth import get_user_model
# Traemos el usuario cuando creamos el modelo de custom user
User = get_user_model()
# Definir AUTH_USER_MODEL = 'accounts.UserAccount' en settings.py del proyecto, para que Djnago -por defecto- use nuestro modelo para la autenticacion
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions

# Solo hacemos el Signup, porque el Signin lo va a manejar el JWT API

class SignupView(APIView):
    # Autorizamos a cualquier a tener acceso a esta ruta
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        
        if password == password2:
            # Revisamos si el email ya fue registrado
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Cuenta de correo en uso. Elige otra cuenta o recupera tu constrasenia'})
            else:
                if len(password) < 6:
                    return Response({'error': 'La contrasenia debe tener al menos 6 caracteres'})
                else:
                    user = User.objects.create_user(email=email, password=password, name=name)
                    user.save()
                    return Response({'success':'Usuario creado exitosamente'})
        
        else:
            return Response({'error': 'Las contrasenias no coinciden'})