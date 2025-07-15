
# Django React Auth System

A full-stack authentication system built with Django (backend) and React (frontend), supporting traditional login, JWT authentication, and Google OAuth, powered by TiDB as the database.

## Features

- **User Registration & Login** (JWT)
- **Google OAuth2 Social Login** (via `social-auth-app-django`)
- **Secure JWT Authentication** (using `djangorestframework-simplejwt`)
- **User Profile API**
- **React Frontend** (with user flows)
- **TiDB Database** (cloud-native, MySQL-compatible)
- **No token blacklisting** (see below)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Carbon14-48/django_react_project.git
cd django_react_project
```

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Database

- Set up your TiDB database and update `backend/settings.py` with your connection info.
- Example `.env` (or direct settings):

  ```
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME': '<your_db_name>',
          'USER': '<your_db_user>',
          'PASSWORD': '<your_db_password>',
          'HOST': '<your_tidb_host>',
          'PORT': '4000',
      }
  }
  ```

#### Migrate

```bash
python manage.py migrate
```

#### Run Backend

```bash
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

- The React app should be configured to call your Django backend (usually at `http://localhost:8000/`).

### 4. Google OAuth Setup

- Configure your Google OAuth client in the Django admin or settings.
- Set your Google client ID/secret and redirect URI.

## Notes

- **Token Blacklisting Disabled**: Due to TiDB incompatibility, JWT token blacklisting is not enabled. Tokens cannot be revoked before expiry.
- **For production**: Always keep secrets (`.env`, keys, passwords) out of your repo.

## Folder Structure

```
django_react_project/
├── backend/    # Django REST API
│   ├── accounts/       # Custom user app
│   ├── ...             # Other Django apps
│   └── manage.py
├── frontend/   # React app
│   ├── src/
│   └── package.json
├── README.md
├── .gitignore
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

[MIT](LICENSE)
