# HealthGuardian AI - Production-Ready Flask Backend & Android Ecosystem

HealthGuardian AI is a production-grade health companion backend built with **Python Flask**, **Gunicorn**, **Flask-CORS**, **JWT Authentication**, **SQLAlchemy ORM**, and **Google Gemini AI API (`gemini-3.6-flash`)**.

---

## 🚀 Features

- 🏥 **Health Check Endpoint (`GET /`)**: Render & Cloud deployment readiness
- 🔐 **JWT Authentication**: Secure register, login, and bearer token handling
- 🩺 **AI Symptom Analyzer**: Gemini AI powered medical triage and advisory
- 💊 **AI Prescription Reader**: Decodes handwritten & printed prescriptions into actionable timetables
- 📊 **Health Metrics Tracking**: BMI, hydration, sleep, steps, and heart rate management
- 📱 **Android Retrofit Compatible**: Fully pre-configured for Android Java REST client integration

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Python Flask 3.0+
- **WSGI Server**: Gunicorn 22.0+
- **Database**: SQLite / PostgreSQL / MySQL via SQLAlchemy
- **Authentication**: Flask-JWT-Extended & Werkzeug Bcrypt
- **AI Integration**: `@google/genai` (Gemini API)
- **Deployment Platform**: Render / Cloud Run / Heroku

---

## 📋 Environment Variables

Copy `.env.example` to `.env` for local execution:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `FLASK_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET_KEY` | Secret key for signing JWT tokens | `super-secret-jwt-key` |
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` |
| `DATABASE_URL` | Database connection URI | `sqlite:///healthguardian.db` |

---

## 💻 Local Installation & Running

### 1. Create & Activate Virtual Environment
```bash
# Clone repository
git clone https://github.com/your-username/healthguardian-ai-backend.git
cd healthguardian-ai-backend

# Create virtual environment
python -m venv venv

# Activate on Linux/macOS:
source venv/bin/activate

# Activate on Windows:
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Development Server
```bash
python app.py
```
The server will start on `http://127.0.0.1:5000` or `http://0.0.0.0:5000`.

### 4. Test Production WSGI Server (Gunicorn)
```bash
gunicorn app:app --bind 0.0.0.0:5000
```

---

## 🌐 Deploying to Render

### Option A: Automatic Blueprint Deployment (Recommended)
1. Push your code repository to **GitHub** or **GitLab**.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your repository — Render will automatically detect `render.yaml` and configure the Web Service with Gunicorn, build commands, and health checks.

### Option B: Manual Web Service Setup
1. Click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Health Check Path**: `/`
4. Add Environment Variables under **Environment**:
   - `JWT_SECRET_KEY`: *(Your secret key)*
   - `GEMINI_API_KEY`: *(Your Google Gemini API key)*
   - `PYTHON_VERSION`: `3.11.9`

---

## 📑 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Render Health Check | No |
| `GET` | `/api/health-check` | Detailed Service Status | No |
| `POST` | `/api/register` | User Registration & JWT issue | No |
| `POST` | `/api/login` | User Login & Token retrieval | No |
| `POST` | `/api/symptom-check` | Gemini AI Symptom Triage | Optional |
| `POST` | `/api/prescription-analyze` | AI Prescription Reader & Timetable | Optional |

---

## 📂 Project Structure

```
healthguardian-ai-backend/
├── app.py                 # Main Flask REST API & Gemini router
├── models.py              # SQLAlchemy DB models (User, HealthRecord, etc.)
├── requirements.txt       # Production python dependencies
├── Procfile               # Render WSGI start command (gunicorn app:app)
├── runtime.txt            # Python runtime specification (python-3.11.9)
├── render.yaml            # Render Infrastructure as Code specification
├── .env.example           # Template for environment variables
├── .gitignore             # Python, IDE, and secret exclusions
├── database.sql           # MySQL / SQLite schema backup script
└── README.md              # Deployment guide & API docs
```
