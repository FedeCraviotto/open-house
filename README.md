#### Command notes:

Create requirements:
pip freeze > requirements.txt

Turn off the virtualenv:
deactivate


#### Intallation Guide:
1) Install postgres from the official website
Be sure the path to postgres is set in the your OS enviroment variables.
If not, set it manually. For Windows users is usually in C:\Program Files\PostgreSQL\15\bin

User default is postgres
PORT = 5432 

Then, from CMD:
psql -U postgres

If there are any issues concerning login:
postgres=# alter user postgres with password 'NEW_PASSWORD';

Then, you can go ahead from the command line, or from the pgAdmin executing the .exe file. 
For Windows users : C:\Program Files\PostgreSQL\15\pgAdmin 4\bin

Create a DB for your models.
CREATE DATABASE name enconding location locale

For example:
CREATE DATABASE open_house WITH ENCODING 'UTF8' LC_COLLATE='English_United Kingdom' LC_CTYPE='English_United Kingdom';


2) Install requirements:
-Create virtual enviroment (with virtualenv):
virtualenv venv
- Activate it:
source venv/Scripts/activate
- Select you Python interpreter. If it's not listed, look for it into your venv/Scripts/python.exe 
- Then standing on the same folder of the requirements.txt with the terminal:
pip install -r requirements.txt

3) Create your .env file:
DB_DATABASE_NAME=
DB_USERNAME=
DB_PASSWORD=
GOOGLE_PASSWORD=
GOOGLE_USER=

4) Set your password, username, and schema (DATABASE_NAME) in the main project settings.py:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['DB_DATABASE_NAME'],
        'USER': os.environ['DB_USERNAME'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': 'localhost'
    }
}

5) Set your google account double authentication, then set your app key. For 'Website'.
Set you env variables for this lines in your settings.py

EMAIL_HOST_USER = os.environ['GOOGLE_USER']
EMAIL_HOST_PASSWORD = os.environ['GOOGLE_PASSWORD']

6) Create your admin superuser:
python manage.py createsuperuser


7) POSTMAN TESTING:
- signin
- Copy the accessToken from the Response
- Set your headers in the for the request in which authentication is needed
(reaplace <token> for your token. Remember to erase de < and >)
KEY	            VALUE
Authorization	Bearer <token>

