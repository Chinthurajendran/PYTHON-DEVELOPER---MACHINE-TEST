# 🧠 Employee Management Backend (Django + DRF)

This project is a **Django REST Framework (DRF)** backend for managing employee records.  
It includes APIs for adding, listing, updating, and deleting employees — with authentication, validation, and image upload support.

---

## 🚀 Features

- ✅ Create, Read, Update, and Delete (CRUD) employee records  
- ✅ JWT-based authentication (login/logout)  
- ✅ Unique email validation  
- ✅ PostgreSQL database integration  
- ✅ CORS setup for frontend (React)  
- ✅ Environment variable support using `.env`

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| Framework | Django 5 + Django REST Framework |
| Database | PostgreSQL |
| Authentication | JWT (`djangorestframework-simplejwt`) |
| Environment Variables | `python-decouple` |
| CORS | `django-cors-headers` |


.env

# Django settings
DEBUG=
SECRET_KEY=''


# Allowed hosts (comma-separated)
ALLOWED_HOSTS=''

# Database settings
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
DB_HOST=
DB_PORT=

# CORS
CORS_ALLOWED_ORIGINS=''


