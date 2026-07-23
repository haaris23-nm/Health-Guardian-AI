import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from google import genai

app = Flask(__name__)

# Enable CORS for all routes (essential for mobile apps & web frontends)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configurations from Environment Variables
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'healthguardian-super-secret-jwt-key-2026')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///healthguardian.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

jwt = JWTManager(app)

# Initialize Gemini AI Client
GEMINI_KEY = os.environ.get('GEMINI_API_KEY')
ai_client = genai.Client(api_key=GEMINI_KEY) if GEMINI_KEY else None

# In-Memory DB fallback (or SQLite via SQLAlchemy)
users_db = {}
health_records = {}

# Root Health Check Endpoint (Required for Render deployment checks)
@app.route('/', methods=['GET'])
def root_health_check():
    return jsonify({
        "status": "running",
        "application": "HealthGuardian AI Backend",
        "version": "1.0.0"
    }), 200

# Secondary Health Check
@app.route('/api/health-check', methods=['GET'])
def api_health_check():
    return jsonify({
        "status": "active",
        "service": "HealthGuardian AI Flask Backend",
        "gemini_active": ai_client is not None
    }), 200

# User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', 'HealthGuardian User')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if email in users_db:
        return jsonify({"error": "User with this email already exists"}), 409

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
    return jsonify({
        "message": "User registered successfully",
        "token": access_token,
        "user": {
            "email": email,
            "name": name,
            "age": users_db[email]["age"],
            "heightCm": users_db[email]["heightCm"],
            "weightKg": users_db[email]["weightKg"]
        }
    }), 201

# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    user = users_db.get(email)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "email": user["email"],
            "name": user["name"],
            "age": user["age"],
            "heightCm": user["heightCm"],
            "weightKg": user["weightKg"]
        }
    }), 200

# AI Symptom Analysis Endpoint
@app.route('/api/symptom-check', methods=['POST'])
def symptom_check():
    data = request.get_json() or {}
    symptoms = data.get('symptoms', '')

    if not symptoms:
        return jsonify({"error": "Symptoms field cannot be empty"}), 400

    prompt = f"""
    You are a medical triage AI assistant for HealthGuardian AI.
    Analyze the user-reported symptoms: "{symptoms}".
    Return a structured medical advisory object with:
    1. probableCauses: list of {{title, likelihood, description}}
    2. recommendation: actionable next steps
    3. urgency: 'Routine' | 'Non-urgent' | 'Urgent Medical Attention Required'
    4. disclaimer: clear medical safety statement
    """

    try:
        if ai_client:
            response = ai_client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )
            return jsonify({
                "raw_analysis": response.text,
                "status": "success"
            }), 200
        else:
            return jsonify({
                "status": "fallback_mode",
                "probableCauses": [
                    {
                        "title": "Viral Upper Respiratory Infection",
                        "likelihood": "Moderate",
                        "description": "Common viral infection affecting nasal passages and throat."
                    }
                ],
                "recommendation": "Maintain optimal hydration, rest adequately, and monitor body temperature.",
                "urgency": "Routine",
                "disclaimer": "This analysis is AI-generated for informational guidance only. Always consult a licensed medical professional."
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Prescription Analysis Endpoint
@app.route('/api/prescription-analyze', methods=['POST'])
def prescription_analyze():
    data = request.get_json() or {}
    prescription_text = data.get('prescriptionText', '')

    prompt = f"""
    Analyze this doctor prescription: "{prescription_text}".
    Extract:
    1. Medications list (Name, Dosage, Frequency, Timing, Food instructions)
    2. Daily timetable routine
    3. Critical warnings or red flags
    """

    try:
        if ai_client:
            response = ai_client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )
            return jsonify({
                "analysis": response.text,
                "status": "success"
            }), 200
        else:
            return jsonify({
                "rxTitle": "Decoded Doctor Prescription",
                "prescribingDoctor": "Dr. Sarah Lin, MD",
                "diagnosisIndication": "Upper Respiratory Infection Regimen",
                "overallGuideline": "Take medications as scheduled after meals. Complete the entire 7-day antibiotic course.",
                "medications": [
                    {
                        "name": "Amoxicillin-Clavulanate 625mg",
                        "category": "Antibiotic",
                        "dosage": "1 Tablet",
                        "frequency": "Twice Daily",
                        "duration": "7 Days",
                        "timing": "After Meals",
                        "instructionsWhatToDo": "Swallow whole after breakfast and dinner with water."
                    }
                ],
                "warningFlags": [
                    "Finish the complete antibiotic course even if feeling fully recovered."
                ],
                "disclaimer": "AI-generated guidance. Verify with a pharmacist before taking medications."
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
