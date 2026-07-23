import { CodeFile } from '../types';

export const ANDROID_FLASK_CODEBASE: CodeFile[] = [
  {
    path: 'README.md',
    language: 'markdown',
    category: 'README',
    description: 'Complete setup guide and project documentation for Android Studio & Flask',
    content: `# HealthMate AI - Full Stack Android & Python Flask Application

HealthMate AI is a modern health management ecosystem built with **Android Studio (Java, MVVM, Retrofit, Room, Material Design 3)** and a **Python Flask REST Backend** integrated with the **Gemini AI API**.

---

## 📱 Android Application (Java & MVVM)
- **Architecture**: Model-View-ViewModel (MVVM)
- **UI Framework**: Material Design 3 (MD3) with Bottom Navigation & Drawer
- **Networking**: Retrofit 2 + Gson Converter + OkHttp Logging Interceptor
- **Local Database**: Room Persistence Library (SQLite)
- **Local Notifications**: Android NotificationManager & AlarmManager

---

## 🐍 Backend API (Python Flask)
- **Framework**: Flask RESTful API
- **Database**: SQLite / MySQL via SQLAlchemy ORM
- **Authentication**: JWT (JSON Web Tokens) with Passlib Bcrypt Hashing
- **AI Integration**: Google Gemini API (\`gemini-3.6-flash\`)
- **CORS**: Flask-CORS for cross-origin requests

---

## 🚀 Quick Setup Instructions

### 1. Flask Backend Setup
\`\`\`bash
# Clone repository and navigate to backend directory
cd healthmate-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Set Environment Variables
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
export JWT_SECRET_KEY="super-secret-jwt-key"

# Run Flask server
python app.py
\`\`\`
The backend server will run on \`http://0.0.0.0:5000\`.

---

### 2. Android Studio Setup
1. Open **Android Studio** (Koala / Ladybug or newer).
2. Select **Open an Existing Project** and choose \`healthmate-android\`.
3. Synchronize Gradle files (\`build.gradle\`).
4. Update \`RetrofitClient.java\` BASE_URL to your server IP (e.g. \`http://10.0.2.2:5000/api/\` for Android Emulator).
5. Build and run on an Emulator or Physical Android Device (Android 8.0+ / API 26+).

---

## 📑 REST API Documentation
- \`POST /api/register\`: User registration
- \`POST /api/login\`: JWT Authentication
- \`GET /api/profile\`: Fetch user profile
- \`POST /api/bmi\`: Calculate BMI & retrieve recommendations
- \`POST /api/symptom-check\`: AI Symptom analysis with Gemini
- \`POST /api/diet-plan\`: Custom AI diet planner
- \`POST /api/workout\`: AI workout routine generation
- \`POST /api/chatbot\`: Interactive health chatbot query
`
  },
  {
    path: 'android/AndroidManifest.xml',
    language: 'xml',
    category: 'Android App',
    description: 'Android Application Manifest with permissions and activities',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.healthmate.ai">

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:name=".HealthMateApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.HealthMateAI"
        android:usesCleartextTraffic="true">

        <activity
            android:name=".ui.MainActivity"
            android:exported="true"
            android:theme="@style/Theme.HealthMateAI">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver android:name=".receiver.MedicineAlarmReceiver" android:exported="false"/>

    </application>

</manifest>`
  },
  {
    path: 'android/build.gradle',
    language: 'java',
    category: 'Android App',
    description: 'Module build.gradle with Retrofit, Room, and Material 3 dependencies',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.healthmate.ai'
    compileSdk 34

    defaultConfig {
        applicationId "com.healthmate.ai"
        minSdk 26
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        viewBinding true
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    // UI & Material Design 3
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.navigation:navigation-fragment:2.7.7'
    implementation 'androidx.navigation:navigation-ui:2.7.7'

    // Architecture Components (MVVM)
    implementation 'androidx.lifecycle:lifecycle-viewmodel:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata:2.7.0'

    // Retrofit & OkHttp
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.12.0'

    // Room Database
    implementation 'androidx.room:room-runtime:2.6.1'
    annotationProcessor 'androidx.room:room-compiler:2.6.1'

    // MPAndroidChart for Health Reports
    implementation 'com.github.PhilJay:MPAndroidChart:v3.1.0'
}`
  },
  {
    path: 'android/java/com/healthmate/ai/network/ApiService.java',
    language: 'java',
    category: 'Android App',
    description: 'Retrofit interface for HealthMate REST API endpoints',
    content: `package com.healthmate.ai.network;

import com.healthmate.ai.model.*;
import retrofit2.Call;
import retrofit2.http.*;

import java.util.List;

public interface ApiService {

    @POST("register")
    Call<AuthResponse> registerUser(@Body RegisterRequest request);

    @POST("login")
    Call<AuthResponse> loginUser(@Body LoginRequest request);

    @GET("profile")
    Call<UserProfile> getUserProfile(@Header("Authorization") String token);

    @POST("bmi")
    Call<BmiResponse> calculateBmi(@Body BmiRequest request);

    @POST("symptom-check")
    Call<SymptomResponse> checkSymptoms(@Header("Authorization") String token, @Body SymptomRequest request);

    @POST("diet-plan")
    Call<DietPlanResponse> getDietPlan(@Header("Authorization") String token, @Body DietRequest request);

    @POST("workout")
    Call<WorkoutResponse> getWorkoutPlan(@Header("Authorization") String token, @Body WorkoutRequest request);

    @POST("chatbot")
    Call<ChatResponse> sendChatMessage(@Header("Authorization") String token, @Body ChatRequest request);

    @GET("health")
    Call<HealthMetrics> getHealthMetrics(@Header("Authorization") String token);

    @POST("water")
    Call<Void> logWater(@Header("Authorization") String token, @Body WaterLogRequest request);

    @POST("medicine")
    Call<MedicineReminder> addMedicine(@Header("Authorization") String token, @Body MedicineReminder medicine);
}`
  },
  {
    path: 'android/java/com/healthmate/ai/viewmodel/DashboardViewModel.java',
    language: 'java',
    category: 'Android App',
    description: 'MVVM Dashboard ViewModel with LiveData state management',
    content: `package com.healthmate.ai.viewmodel;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.healthmate.ai.model.HealthMetrics;
import com.healthmate.ai.repository.HealthRepository;

public class DashboardViewModel extends AndroidViewModel {

    private final HealthRepository repository;
    private final MutableLiveData<HealthMetrics> metricsLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoading = new MutableLiveData<>(false);
    private final MutableLiveData<String> errorMessage = new MutableLiveData<>();

    public DashboardViewModel(@NonNull Application application) {
        super(application);
        repository = new HealthRepository(application);
    }

    public LiveData<HealthMetrics> getMetrics() {
        return metricsLiveData;
    }

    public LiveData<Boolean> getIsLoading() {
        return isLoading;
    }

    public LiveData<String> getErrorMessage() {
        return errorMessage;
    }

    public void loadHealthMetrics(String token) {
        isLoading.setValue(true);
        repository.fetchHealthMetrics(token, new HealthRepository.ApiCallback<HealthMetrics>() {
            @Override
            public void onSuccess(HealthMetrics data) {
                isLoading.setValue(false);
                metricsLiveData.setValue(data);
            }

            @Override
            public void onError(String error) {
                isLoading.setValue(false);
                errorMessage.setValue(error);
            }
        });
    }

    public void addWaterIntake(int amountMl) {
        HealthMetrics current = metricsLiveData.getValue();
        if (current != null) {
            current.setWaterIntakeMl(current.getWaterIntakeMl() + amountMl);
            metricsLiveData.setValue(current);
        }
    }
}`
  },
  {
    path: 'android/java/com/healthmate/ai/ui/MainActivity.java',
    language: 'java',
    category: 'Android App',
    description: 'Main Activity with Material 3 Drawer and Bottom Navigation',
    content: `package com.healthmate.ai.ui;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.navigation.NavigationView;
import com.healthmate.ai.R;

public class MainActivity extends AppCompatActivity {

    private DrawerLayout drawerLayout;
    private NavController navController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        drawerLayout = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);
        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);

        NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager()
                .findFragmentById(R.id.nav_host_fragment);
        
        if (navHostFragment != null) {
            navController = navHostFragment.getNavController();
            NavigationUI.setupWithNavController(bottomNav, navController);
            NavigationUI.setupWithNavController(navigationView, navController);
        }
    }
}`
  },
  {
    path: 'backend/app.py',
    language: 'python',
    category: 'Flask Backend',
    description: 'Main Python Flask REST Application with Gemini API integration',
    content: `import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from google import genai

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'healthmate-secret-key-2026')
jwt = JWTManager(app)

# Initialize Gemini Client
GEMINI_KEY = os.environ.get('GEMINI_API_KEY')
ai_client = genai.Client(api_key=GEMINI_KEY) if GEMINI_KEY else None

# In-memory DB / SQLite fallback
users_db = {}
health_records = {}

@app.route('/api/health-check', methods=['GET'])
def health_check():
    return jsonify({"status": "active", "service": "HealthMate AI Flask Backend"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', 'HealthMate User')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if email in users_db:
        return jsonify({"error": "User already exists"}), 409

    users_db[email] = {
        "email": email,
        "password": generate_password_hash(password),
        "name": name,
        "age": data.get('age', 25),
        "heightCm": data.get('heightCm', 175),
        "weightKg": data.get('weightKg', 70),
        "gender": data.get('gender', 'male')
    }

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user": users_db[email]}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_db.get(email)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user": user}), 200

@app.route('/api/symptom-check', methods=['POST'])
def symptom_check():
    data = request.get_json()
    symptoms = data.get('symptoms', '')

    prompt = f"""
    You are a medical triage AI assistant. Analyze these user-reported symptoms: "{symptoms}".
    Provide a JSON response with:
    1. probableCauses: list of {{title, likelihood, description}}
    2. recommendation: string
    3. urgency: one of ['Routine', 'Non-urgent', 'Urgent Medical Attention Required']
    4. disclaimer: string stating this is informational only and not a medical diagnosis.
    """

    try:
        if ai_client:
            response = ai_client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )
            return jsonify({"result": response.text}), 200
        else:
            return jsonify({
                "probableCauses": [
                    {"title": "Viral Upper Respiratory Infection", "likelihood": "Moderate", "description": "Common cold symptoms."}
                ],
                "recommendation": "Rest, stay hydrated, and monitor temperature.",
                "urgency": "Routine",
                "disclaimer": "This response is AI-generated for informational purposes only and is not a medical diagnosis. Consult a qualified doctor."
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)`
  },
  {
    path: 'backend/models.py',
    language: 'python',
    category: 'Flask Backend',
    description: 'SQLAlchemy database schemas for MySQL & SQLite',
    content: `from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, default=25)
    gender = db.Column(db.String(10), default='male')
    height_cm = db.Column(db.Float, default=170.0)
    weight_kg = db.Column(db.Float, default=70.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class HealthRecord(db.Model):
    __tablename__ = 'health_records'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bmi = db.Column(db.Float)
    water_intake_ml = db.Column(db.Integer, default=0)
    sleep_hours = db.Column(db.Float, default=0.0)
    calories_burned = db.Column(db.Integer, default=0)
    steps_count = db.Column(db.Integer, default=0)
    heart_rate_bpm = db.Column(db.Integer, default=72)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)

class MedicineReminder(db.Model):
    __tablename__ = 'medicine_reminders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50))
    time = db.Column(db.String(10)) # e.g. "08:00 AM"
    days = db.Column(db.String(100)) # e.g. "Mon,Wed,Fri"
    taken_today = db.Column(db.Boolean, default=False)

class MoodLog(db.Model):
    __tablename__ = 'mood_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mood_level = db.Column(db.Integer) # 1-5
    mood_label = db.Column(db.String(20))
    notes = db.Column(db.Text)
    ai_suggestion = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)`
  },
  {
    path: 'database.sql',
    language: 'sql',
    category: 'Database Schema',
    description: 'MySQL / SQLite Table Schema Definition Script',
    content: `-- HealthMate AI Database Schema (MySQL / MariaDB / SQLite)

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(256) NOT NULL,
    name VARCHAR(80) NOT NULL,
    age INT DEFAULT 25,
    gender VARCHAR(10) DEFAULT 'male',
    height_cm FLOAT DEFAULT 170.0,
    weight_kg FLOAT DEFAULT 70.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS health_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bmi FLOAT,
    water_intake_ml INT DEFAULT 0,
    sleep_hours FLOAT DEFAULT 0.0,
    calories_burned INT DEFAULT 0,
    steps_count INT DEFAULT 0,
    heart_rate_bpm INT DEFAULT 72,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medicine_reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    time VARCHAR(10) NOT NULL,
    days VARCHAR(100) DEFAULT 'Daily',
    taken_today BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS water_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount_ml INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mood_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mood_level INT NOT NULL,
    mood_label VARCHAR(20),
    notes TEXT,
    ai_suggestion TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`
  }
];
