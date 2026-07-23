from flask_sqlalchemy import SQLAlchemy
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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
