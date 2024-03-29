from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Debes introducir una direccion de correo valida')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        
        user.set_password(password) #automatic hash
        user.save()
        
        return user
    
    def create_superuser(self, email, name, password):
        # Aca si vamos a tener que crear una password
        user = self.create_user(email, name, password)
        
        user.is_superuser = True
        user.is_staff = True
        user.save()
        
        return user
        

# Models
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserAccountManager()

    # Por defecto, Django usa un username para las autenticaciones. Lo sobreescribimos
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name'] # email ya viene como campo requerido por defecto
    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name
    def __str__(self): # Pasamos nuestro modelo a string, para poder visualizarlo
        return self.email