export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  goal: 'lose_weight' | 'maintain' | 'gain_muscle' | 'improve_stamina';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  token?: string;
}

export interface HealthMetrics {
  weightKg: number;
  bmi: number;
  bmiCategory: string;
  waterIntakeMl: number;
  waterGoalMl: number;
  sleepHours: number;
  sleepGoalHours: number;
  caloriesBurned: number;
  caloriesGoal: number;
  stepsCount: number;
  stepsGoal: number;
  heartRateBpm: number;
  systolicBp?: number;
  diastolicBp?: number;
  lastUpdated: string;
}

export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: string;
}

export interface MedicineReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  days: string[];
  takenToday: boolean;
  notes?: string;
}

export interface MoodLog {
  id: string;
  moodLevel: 1 | 2 | 3 | 4 | 5; // 1: Terrible, 2: Low, 3: Okay, 4: Good, 5: Energetic
  moodLabel: string;
  notes: string;
  aiSuggestion?: string;
  timestamp: string;
}

export interface SymptomCheckResult {
  symptoms: string[];
  probableCauses: { title: string; likelihood: 'Low' | 'Moderate' | 'High'; description: string }[];
  recommendation: string;
  urgency: 'Routine' | 'Non-urgent' | 'Urgent Medical Attention Required';
  disclaimer: string;
}

export interface Meal {
  name: string;
  items: string[];
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface DietPlan {
  dailyCalories: number;
  macros: { proteinG: number; carbsG: number; fatG: number };
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal;
  };
  keyAdvice: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  targetMuscle: string;
  instructions: string;
}

export interface WorkoutPlan {
  fitnessGoal: string;
  weeklySchedule: {
    day: string;
    focus: string;
    exercises: Exercise[];
  }[];
  tips: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  phone: string;
  lat: number;
  lng: number;
  open24h: boolean;
  emergencyServices: boolean;
}

export interface HealthReport {
  weeklySteps: { day: string; steps: number }[];
  weeklyWater: { day: string; waterLiters: number }[];
  weeklySleep: { day: string; hours: number }[];
  monthlyWeight: { date: string; weightKg: number }[];
  insights: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface CodeFile {
  path: string;
  language: 'java' | 'python' | 'xml' | 'sql' | 'json' | 'markdown' | 'yaml' | 'plaintext';
  content: string;
  category: 'Android App' | 'Flask Backend' | 'Database Schema' | 'API Docs' | 'README';
  description: string;
}

export interface PrescribedMedication {
  name: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: 'Before Meals' | 'After Meals' | 'With Food' | 'Bedtime' | 'As Needed';
  instructionsWhatToDo: string;
  precautions: string[];
  sideEffects: string[];
}

export interface PrescriptionAnalysis {
  id: string;
  rxTitle: string;
  prescribingDoctor?: string;
  date?: string;
  diagnosisIndication: string;
  overallGuideline: string;
  medications: PrescribedMedication[];
  dailySchedule: {
    timeSlot: string;
    medsToTake: string[];
    actionSteps: string;
  }[];
  warningFlags: string[];
  disclaimer: string;
}

