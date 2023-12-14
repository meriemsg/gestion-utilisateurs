# User Management Project

## Introduction

Welcome to the User Management Project! This is a demo project created for a technical test, showcasing the use of Python/Django for the backend and React for the frontend.

### Frontend

1. Navigate to the frontend/user-search directory: `cd frontend/user-search`.
2. Install dependencies: `npm install`.
3. Start the React development server: `npm start`.

### Backend

1. Navigate to the backend directory: `cd backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Apply database migrations: `python manage.py migrate`.
4. Create a superuser for admin access: `python manage.py createsuperuser`.
5. Run the Django development server: `python manage.py runserver`.
6. Access the admin interface at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) to manage users.

## Creating Users

To create users, follow these steps:

1. Execute `python manage.py createsuperuser` to create an admin account.
2. Run `python manage.py runserver` to start the Django server.
3. Access the admin interface at [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin).
4. Log in with the superuser credentials.
5. Create and manage users using the admin dashboard.

Now you are all set to explore and manage users in this User Management Project!
