import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// In-memory state store for user sessions and health tracking
let currentUser = {
  id: "usr_101",
  name: "Alex Morgan",
  email: "alex.health@example.com",
  age: 28,
  gender: "female" as "male" | "female" | "other",
  heightCm: 168,
  weightKg: 64,
  goal: "maintain" as "lose_weight" | "maintain" | "gain_muscle" | "improve_stamina",
  activityLevel: "moderate" as "sedentary" | "moderate" | "active" | "athlete",
  token: "jwt_mock_token_healthmate_2026",
};

let currentMetrics = {
  weightKg: 64,
  bmi: 22.7,
  bmiCategory: "Normal weight",
  waterIntakeMl: 1750,
  waterGoalMl: 2500,
  sleepHours: 7.5,
  sleepGoalHours: 8,
  caloriesBurned: 480,
  caloriesGoal: 600,
  stepsCount: 7420,
  stepsGoal: 10000,
  heartRateBpm: 72,
  systolicBp: 118,
  diastolicBp: 78,
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

let medicineReminders = [
  { id: "med_1", name: "Multivitamin", dosage: "1 Tablet", time: "08:00 AM", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], takenToday: true },
  { id: "med_2", name: "Omega-3 Fish Oil", dosage: "1 Capsule", time: "01:00 PM", days: ["Mon", "Wed", "Fri"], takenToday: false },
  { id: "med_3", name: "Vitamin D3", dosage: "1000 IU", time: "09:00 PM", days: ["Sun"], takenToday: false },
];

let moodLogs: Array<{ id: string; moodLevel: 1 | 2 | 3 | 4 | 5; moodLabel: string; notes: string; aiSuggestion: string; timestamp: string }> = [
  { id: "mood_1", moodLevel: 4, moodLabel: "Good", notes: "Had a great morning workout and productive workday.", aiSuggestion: "Keep up the momentum! Staying physically active in the morning boosts dopamine and focus throughout the day.", timestamp: "Today, 09:30 AM" },
  { id: "mood_2", moodLevel: 3, moodLabel: "Okay", notes: "Felt slightly tired after lunch.", aiSuggestion: "Post-lunch energy slumps are common. A 10-minute walk or a glass of cold water can help restore alertness.", timestamp: "Yesterday, 02:15 PM" },
];

let waterLogs = [
  { id: "w_1", amountMl: 250, timestamp: "08:15 AM" },
  { id: "w_2", amountMl: 500, timestamp: "11:00 AM" },
  { id: "w_3", amountMl: 500, timestamp: "02:30 PM" },
  { id: "w_4", amountMl: 500, timestamp: "05:00 PM" },
];

// Hospital list mock database
const HOSPITALS = [
  { id: "h_1", name: "St. Jude Memorial Hospital", address: "1244 Healthcare Blvd, Medical District", distanceKm: 1.2, rating: 4.8, phone: "+1 (555) 234-5678", lat: 37.7749, lng: -122.4194, open24h: true, emergencyServices: true },
  { id: "h_2", name: "City General Medical Center", address: "890 Wellness Way, Downtown", distanceKm: 2.5, rating: 4.6, phone: "+1 (555) 876-5432", lat: 37.7833, lng: -122.4167, open24h: true, emergencyServices: true },
  { id: "h_3", name: "Apex Community Health Clinic", address: "450 Hope Avenue, Westside", distanceKm: 3.8, rating: 4.4, phone: "+1 (555) 345-6789", lat: 37.765, lng: -122.43, open24h: false, emergencyServices: false },
  { id: "h_4", name: "Valley Urgent Care & ER", address: "102 Sunrise Blvd, North Valley", distanceKm: 5.1, rating: 4.7, phone: "+1 (555) 901-2345", lat: 37.79, lng: -122.405, open24h: true, emergencyServices: true },
];

// --- REST API ENDPOINTS ---

// Auth Endpoints
app.post("/api/register", (req, res) => {
  const { name, email, password, age, heightCm, weightKg, gender } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  currentUser = {
    ...currentUser,
    name: name || currentUser.name,
    email,
    age: Number(age) || currentUser.age,
    heightCm: Number(heightCm) || currentUser.heightCm,
    weightKg: Number(weightKg) || currentUser.weightKg,
    gender: gender || currentUser.gender,
  };
  return res.json({ token: currentUser.token, user: currentUser });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  currentUser.email = email;
  return res.json({ token: currentUser.token, user: currentUser });
});

app.get("/api/profile", (req, res) => {
  res.json(currentUser);
});

app.put("/api/profile", (req, res) => {
  currentUser = { ...currentUser, ...req.body };
  // Recalculate BMI
  if (currentUser.heightCm && currentUser.weightKg) {
    const heightM = currentUser.heightCm / 100;
    const bmiVal = Number((currentUser.weightKg / (heightM * heightM)).toFixed(1));
    currentMetrics.weightKg = currentUser.weightKg;
    currentMetrics.bmi = bmiVal;
    if (bmiVal < 18.5) currentMetrics.bmiCategory = "Underweight";
    else if (bmiVal < 25) currentMetrics.bmiCategory = "Normal weight";
    else if (bmiVal < 30) currentMetrics.bmiCategory = "Overweight";
    else currentMetrics.bmiCategory = "Obese";
  }
  res.json(currentUser);
});

// BMI Calculator API
app.post("/api/bmi", (req, res) => {
  const { heightCm, weightKg, age, gender } = req.body;
  const h = Number(heightCm) || currentUser.heightCm;
  const w = Number(weightKg) || currentUser.weightKg;
  const heightM = h / 100;
  const bmi = Number((w / (heightM * heightM)).toFixed(1));

  let category = "Normal weight";
  let color = "#10B981"; // emerald
  let suggestions: string[] = [];

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#3B82F6";
    suggestions = [
      "Increase calorie intake with nutrient-dense foods (nuts, avocado, whole grains).",
      "Incorporate strength training to build healthy muscle mass.",
      "Consult a dietitian for a personalized mass-gaining plan."
    ];
  } else if (bmi < 25) {
    category = "Normal weight";
    color = "#10B981";
    suggestions = [
      "Maintain a balanced diet rich in protein, lean fibers, and healthy fats.",
      "Engage in 150 minutes of moderate aerobic activity per week.",
      "Keep consistent sleep hygiene and stay hydrated with 2.5L water daily."
    ];
  } else if (bmi < 30) {
    category = "Overweight";
    color = "#F59E0B";
    suggestions = [
      "Incorporate regular cardiovascular exercises (swimming, cycling, brisk walking).",
      "Reduce processed sugar and refined carbohydrate intake.",
      "Focus on portion control and mindful eating practices."
    ];
  } else {
    category = "Obese";
    color = "#EF4444";
    suggestions = [
      "Consult a healthcare professional or doctor for structured guidance.",
      "Start with low-impact exercises such as water aerobics or walking.",
      "Focus on gradual, sustainable lifestyle changes rather than rapid crash diets."
    ];
  }

  res.json({ heightCm: h, weightKg: w, bmi, category, color, suggestions });
});

// Health Dashboard API
app.get("/api/health", (req, res) => {
  res.json(currentMetrics);
});

// Water Logger API
app.post("/api/water", (req, res) => {
  const { amountMl } = req.body;
  const amt = Number(amountMl) || 250;
  currentMetrics.waterIntakeMl += amt;
  const newLog = {
    id: `w_${Date.now()}`,
    amountMl: amt,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  waterLogs.unshift(newLog);
  res.json({ currentMetrics, waterLogs });
});

// Medicine Reminder API
app.get("/api/medicine", (req, res) => {
  res.json(medicineReminders);
});

app.post("/api/medicine", (req, res) => {
  const { name, dosage, time, days, notes } = req.body;
  const newMed = {
    id: `med_${Date.now()}`,
    name: name || "New Medicine",
    dosage: dosage || "1 Dose",
    time: time || "09:00 AM",
    days: days && days.length ? days : ["Daily"],
    takenToday: false,
    notes: notes || "",
  };
  medicineReminders.push(newMed);
  res.json(medicineReminders);
});

app.put("/api/medicine/:id/toggle", (req, res) => {
  const { id } = req.params;
  medicineReminders = medicineReminders.map(m =>
    m.id === id ? { ...m, takenToday: !m.takenToday } : m
  );
  res.json(medicineReminders);
});

// Mood Tracker API
app.get("/api/mood", (req, res) => {
  res.json(moodLogs);
});

app.post("/api/mood", async (req, res) => {
  const { moodLevel, moodLabel, notes } = req.body;
  let aiSuggestion = "Take deep breaths and enjoy a restful evening.";

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `The user feels "${moodLabel}" (level ${moodLevel}/5) with notes: "${notes}". Provide a short, uplifting 2-sentence wellness advice for mindfulness and emotional health.`,
      });
      if (response.text) {
        aiSuggestion = response.text.trim();
      }
    } catch (e) {
      console.error("Gemini Mood error:", e);
    }
  }

  const newLog = {
    id: `mood_${Date.now()}`,
    moodLevel: Number(moodLevel) as 1|2|3|4|5,
    moodLabel: moodLabel || "Okay",
    notes: notes || "",
    aiSuggestion,
    timestamp: "Just now",
  };
  moodLogs.unshift(newLog);
  res.json(moodLogs);
});

// AI Symptom Checker API
app.post("/api/symptom-check", async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || typeof symptoms !== "string") {
    return res.status(400).json({ error: "Symptoms description is required." });
  }

  const defaultDisclaimer = "DISCLAIMER: This response is generated by AI for informational purposes only. It is NOT a medical diagnosis or a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a medical emergency, call emergency services (e.g. 911) immediately.";

  if (!ai) {
    return res.json({
      symptoms: [symptoms],
      probableCauses: [
        { title: "Common Cold or Mild Viral Infection", likelihood: "Moderate", description: "Frequently causes low fever, fatigue, nasal congestion, or sore throat." },
        { title: "Seasonal Allergies", likelihood: "Low", description: "Triggered by airborne pollen, dust mites, or pet dander." }
      ],
      recommendation: "Rest adequately, maintain high hydration with water/electrolytes, and monitor symptoms. If fever exceeds 102°F or persists over 3 days, consult a physician.",
      urgency: "Routine",
      disclaimer: defaultDisclaimer
    });
  }

  try {
    const prompt = `Analyze these user-reported symptoms carefully: "${symptoms}".
Return a JSON object matching this schema:
{
  "probableCauses": [
    {"title": "string", "likelihood": "Low" | "Moderate" | "High", "description": "string"}
  ],
  "recommendation": "string concise advice",
  "urgency": "Routine" | "Non-urgent" | "Urgent Medical Attention Required"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert AI triage health assistant. Provide objective medical information while emphasizing that you are an AI and not a doctor.",
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      symptoms: [symptoms],
      probableCauses: parsed.probableCauses || [],
      recommendation: parsed.recommendation || "Maintain hydration and rest. Seek medical consultation if symptoms worsen.",
      urgency: parsed.urgency || "Routine",
      disclaimer: defaultDisclaimer
    });
  } catch (err: any) {
    console.error("Gemini Symptom Checker Error:", err);
    return res.status(500).json({
      error: "Failed to analyze symptoms.",
      disclaimer: defaultDisclaimer
    });
  }
});

// AI Diet Planner API
app.post("/api/diet-plan", async (req, res) => {
  const { age, gender, heightCm, weightKg, goal } = req.body;
  const userAge = age || currentUser.age;
  const userGender = gender || currentUser.gender;
  const userHeight = heightCm || currentUser.heightCm;
  const userWeight = weightKg || currentUser.weightKg;
  const userGoal = goal || currentUser.goal;

  if (!ai) {
    return res.json({
      dailyCalories: userGoal === 'lose_weight' ? 1800 : userGoal === 'gain_muscle' ? 2400 : 2100,
      macros: { proteinG: 130, carbsG: 220, fatG: 65 },
      meals: {
        breakfast: { name: "Oatmeal & Protein Berry Bowl", items: ["1 cup rolled oats cooked in almond milk", "1 scoop whey protein", "1/2 cup blueberries & chia seeds"], calories: 450, proteinGrams: 32, carbsGrams: 55, fatGrams: 8 },
        lunch: { name: "Grilled Chicken Quinoa Salad", items: ["150g grilled chicken breast", "1 cup cooked quinoa", "Mixed greens, cherry tomatoes, olive oil dressing"], calories: 580, proteinGrams: 45, carbsGrams: 48, fatGrams: 16 },
        dinner: { name: "Baked Salmon & Steamed Asparagus", items: ["160g Atlantic salmon fillet", "Steamed asparagus & sweet potato mash"], calories: 520, proteinGrams: 38, carbsGrams: 35, fatGrams: 20 },
        snacks: { name: "Greek Yogurt & Almonds", items: ["150g plain 0% Greek yogurt", "15 raw almonds"], calories: 250, proteinGrams: 18, carbsGrams: 12, fatGrams: 12 }
      },
      keyAdvice: [
        "Drink 500ml of water 30 minutes before each main meal.",
        "Ensure protein intake is spread evenly across all 4 daily meals.",
        "Prioritize whole, minimally processed foods over refined sugars."
      ]
    });
  }

  try {
    const prompt = `Create a customized daily diet plan for a ${userAge} year old ${userGender} (${userHeight} cm, ${userWeight} kg) with goal "${userGoal}".
Return a JSON object:
{
  "dailyCalories": number,
  "macros": {"proteinG": number, "carbsG": number, "fatG": number},
  "meals": {
    "breakfast": {"name": string, "items": string[], "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number},
    "lunch": {"name": string, "items": string[], "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number},
    "dinner": {"name": string, "items": string[], "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number},
    "snacks": {"name": string, "items": string[], "calories": number, "proteinGrams": number, "carbsGrams": number, "fatGrams": number}
  },
  "keyAdvice": string[]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const plan = JSON.parse(response.text || "{}");
    res.json(plan);
  } catch (err) {
    console.error("Gemini Diet Plan Error:", err);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});

// AI Workout Planner API
app.post("/api/workout", async (req, res) => {
  const { goal, fitnessLevel } = req.body;
  const targetGoal = goal || currentUser.goal;

  if (!ai) {
    return res.json({
      fitnessGoal: targetGoal,
      weeklySchedule: [
        {
          day: "Monday - Push Day (Chest, Shoulders, Triceps)",
          focus: "Upper Body Hypertrophy",
          exercises: [
            { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", targetMuscle: "Upper Chest", instructions: "Control the eccentric phase for 2 seconds." },
            { name: "Seated Overhead Dumbbell Press", sets: 3, reps: "12", targetMuscle: "Deltoids", instructions: "Keep core tight, do not arch lower back." },
            { name: "Tricep Rope Pushdowns", sets: 3, reps: "15", targetMuscle: "Triceps", instructions: "Squeeze at peak contraction." }
          ]
        },
        {
          day: "Wednesday - Pull Day (Back, Biceps)",
          focus: "Back & Core Strength",
          exercises: [
            { name: "Lat Pulldowns / Pull-ups", sets: 4, reps: "8-10", targetMuscle: "Lats", instructions: "Drive down with elbows." },
            { name: "Seated Cable Rows", sets: 3, reps: "12", targetMuscle: "Rhomboids / Mid-Back", instructions: "Retract shoulder blades." },
            { name: "Hammer Curls", sets: 3, reps: "12", targetMuscle: "Biceps & Brachialis", instructions: "Keep elbows glued to sides." }
          ]
        },
        {
          day: "Friday - Legs & Abs",
          focus: "Lower Body Power",
          exercises: [
            { name: "Goblet Squats or Barbell Back Squat", sets: 4, reps: "10", targetMuscle: "Quadriceps & Glutes", instructions: "Break parallel cleanly." },
            { name: "Romanian Deadlifts", sets: 3, reps: "10", targetMuscle: "Hamstrings", instructions: "Hinge strictly at hips." },
            { name: "Hanging Leg Raises", sets: 3, reps: "15", targetMuscle: "Abdominals", instructions: "Avoid swinging momentum." }
          ]
        }
      ],
      tips: [
        "Warm up for 5-8 minutes with dynamic stretches prior to resistance work.",
        "Stay hydrated and aim for 7-8 hours of sleep for optimal muscular recovery."
      ]
    });
  }

  try {
    const prompt = `Create a structured 3-day weekly workout plan for a person with goal "${targetGoal}".
Return JSON object:
{
  "fitnessGoal": "${targetGoal}",
  "weeklySchedule": [
    {
      "day": string,
      "focus": string,
      "exercises": [{"name": string, "sets": number, "reps": string, "targetMuscle": string, "instructions": string}]
    }
  ],
  "tips": string[]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const workout = JSON.parse(response.text || "{}");
    res.json(workout);
  } catch (e) {
    console.error("Gemini Workout error:", e);
    res.status(500).json({ error: "Failed to generate workout plan" });
  }
});

// AI Health Chatbot API
app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message text is required" });
  }

  if (!ai) {
    return res.json({
      reply: "I am HealthMate AI Assistant. I can assist you with tracking hydration, calculating BMI, analyzing symptoms, planning meals, or analyzing prescriptions! How can I help you today?"
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction: "You are HealthMate AI, a friendly, encouraging health and fitness expert chatbot. Provide clear, empathetic, and scientifically backed health advice. Always include a brief note reminding users to consult medical professionals for actual medical conditions."
      }
    });

    return res.json({ reply: response.text || "I am here to help you achieve your health goals!" });
  } catch (err) {
    console.error("Gemini Chatbot Error:", err);
    return res.json({ reply: "I apologize, but I am currently having trouble processing that query. Please try asking again in a moment." });
  }
});

// AI Prescription Analyzer API
app.post("/api/prescription-analyze", async (req, res) => {
  const { prescriptionText, imageBase64, presetId } = req.body;

  const defaultDisclaimer = "DISCLAIMER: This analysis is AI-generated for informational guidance only. Always confirm with a qualified pharmacist or your prescribing doctor before starting or changing any medication.";

  const sampleDefaultAnalysis = {
    id: "rx_" + Date.now(),
    rxTitle: presetId === 'cardio' ? "Cardiovascular Care Prescription" : presetId === 'diabetes' ? "Endocrine & Metabolic Prescription" : "Doctor's Rx - Respiratory Care & Infection",
    prescribingDoctor: "Dr. Sarah Lin, MD (Internal Medicine)",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    diagnosisIndication: presetId === 'cardio' ? "Essential Hypertension & Lipid Management" : presetId === 'diabetes' ? "Type-2 Diabetes Mellitus & Glycemic Control" : "Acute Upper Respiratory Tract Infection & Inflammation",
    overallGuideline: "Follow this regimen strictly. Take antibiotics continuously at exact 12-hour intervals, complete the entire course, and take stomach protective medication before breakfast.",
    medications: [
      {
        name: presetId === 'cardio' ? "Amlodipine 5mg" : presetId === 'diabetes' ? "Metformin 500mg" : "Amoxicillin-Clavulanate 625mg",
        category: presetId === 'cardio' ? "Calcium Channel Blocker (BP)" : presetId === 'diabetes' ? "Antidiabetic (Biguanide)" : "Broad-Spectrum Antibiotic",
        dosage: "1 Tablet (625mg)",
        frequency: "Twice Daily (Every 12 Hours)",
        duration: "7 Days",
        timing: "After Meals",
        instructionsWhatToDo: "Swallow whole strictly after breakfast and dinner with a full glass of water. DO NOT skip doses or stop early to prevent bacterial resistance.",
        precautions: ["Take with food to minimize gastric irritation", "Avoid dairy or calcium supplements within 2 hours of dose"],
        sideEffects: ["Mild stomach upset", "Temporary metallic taste", "Loose stools"]
      },
      {
        name: presetId === 'cardio' ? "Atorvastatin 10mg" : presetId === 'diabetes' ? "Glimepiride 1mg" : "Paracetamol (Acetaminophen) 650mg",
        category: presetId === 'cardio' ? "Statin (Cholesterol)" : presetId === 'diabetes' ? "Sulfonylurea" : "Antipyretic & Analgesic (Fever/Pain)",
        dosage: "1 Tablet (650mg)",
        frequency: "3 Times Daily (As Needed)",
        duration: "3 to 5 Days",
        timing: "After Meals",
        instructionsWhatToDo: "Take when body temperature exceeds 100.4°F (38°C) or for fever/body pain. Do not exceed 4 tablets in 24 hours.",
        precautions: ["Do not combine with other acetaminophen meds", "Avoid alcohol consumption while taking pain relievers"],
        sideEffects: ["Drowsiness if fatigued", "Mild sweating"]
      },
      {
        name: "Omeprazole 20mg",
        category: "Proton Pump Inhibitor (Gastro-protective)",
        dosage: "1 Capsule (20mg)",
        frequency: "Once Daily",
        duration: "7 Days",
        timing: "Before Meals",
        instructionsWhatToDo: "Swallow whole 30 minutes before breakfast. Protects stomach lining from medication irritation.",
        precautions: ["Do not crush or chew capsule"],
        sideEffects: ["Mild headache", "Dry mouth"]
      }
    ],
    dailySchedule: [
      {
        timeSlot: "Morning (08:00 AM)",
        medsToTake: ["Omeprazole 20mg (30 mins before food)", "Amoxicillin 625mg (after breakfast)"],
        actionSteps: "Drink 300ml warm water. Eat breakfast before taking Amoxicillin to protect your stomach."
      },
      {
        timeSlot: "Afternoon (01:30 PM)",
        medsToTake: ["Paracetamol 650mg (if fever/pain present)"],
        actionSteps: "Take after lunch if experiencing fever or headache. Stay well-hydrated."
      },
      {
        timeSlot: "Evening / Night (08:00 PM)",
        medsToTake: ["Amoxicillin 625mg (after dinner)"],
        actionSteps: "Ensure 12-hour gap from morning dose. Drink plenty of water before sleeping."
      }
    ],
    warningFlags: [
      "⚠️ CRITICAL: Finish the full antibiotic course even if feeling 100% recovered.",
      "🚨 Emergency Alert: If facial swelling, difficulty breathing, or severe skin rash occurs, seek immediate ER care."
    ],
    disclaimer: defaultDisclaimer
  };

  if (!ai || (!prescriptionText && !imageBase64 && presetId)) {
    return res.json(sampleDefaultAnalysis);
  }

  try {
    const prompt = `You are an expert clinical pharmacist and AI medical assistant.
Analyze the following prescription text or image carefully:
"${prescriptionText || 'Prescription Image Uploaded'}"

Extract and organize all details. Return a JSON object with this EXACT schema:
{
  "id": "string",
  "rxTitle": "string brief summary title",
  "prescribingDoctor": "string doctor name/specialty if found or General Practitioner",
  "date": "string date or Today",
  "diagnosisIndication": "string inferred health condition/purpose",
  "overallGuideline": "string summary of what the user needs to do overall",
  "medications": [
    {
      "name": "string medication name & strength",
      "category": "string drug class",
      "dosage": "string e.g. 1 Tablet",
      "frequency": "string e.g. Twice Daily",
      "duration": "string e.g. 7 Days",
      "timing": "Before Meals" | "After Meals" | "With Food" | "Bedtime" | "As Needed",
      "instructionsWhatToDo": "string detailed actionable guide on what to do for this medication (how to take, water intake, timing)",
      "precautions": ["string precautions e.g. avoid alcohol, avoid dairy"],
      "sideEffects": ["string common side effects"]
    }
  ],
  "dailySchedule": [
    {
      "timeSlot": "Morning (08:00 AM)" | "Afternoon (01:30 PM)" | "Evening (08:00 PM)" | "Bedtime (10:00 PM)",
      "medsToTake": ["string med names"],
      "actionSteps": "string clear steps to follow during this time"
    }
  ],
  "warningFlags": ["string safety warnings or red flags"],
  "disclaimer": "${defaultDisclaimer}"
}`;

    let contentsArray: any = prompt;
    if (imageBase64 && imageBase64.includes('data:image')) {
      const parts = imageBase64.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const base64Data = parts[1];

      contentsArray = [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Data } }
          ]
        }
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contentsArray,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a professional medical AI prescription reader. Provide precise, actionable medication instructions, timing schedules, and safety guidelines for the patient."
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      id: "rx_" + Date.now(),
      rxTitle: parsed.rxTitle || "Prescription Analysis",
      prescribingDoctor: parsed.prescribingDoctor || "Doctor / Physician",
      date: parsed.date || new Date().toLocaleDateString(),
      diagnosisIndication: parsed.diagnosisIndication || "Medication Regimen",
      overallGuideline: parsed.overallGuideline || "Take medications as prescribed with proper timing and dietary precautions.",
      medications: parsed.medications || sampleDefaultAnalysis.medications,
      dailySchedule: parsed.dailySchedule || sampleDefaultAnalysis.dailySchedule,
      warningFlags: parsed.warningFlags || sampleDefaultAnalysis.warningFlags,
      disclaimer: defaultDisclaimer
    });
  } catch (err: any) {
    console.error("Gemini Prescription Analyzer Error:", err);
    return res.json(sampleDefaultAnalysis);
  }
});


// Nearby Hospitals API
app.get("/api/hospitals", (req, res) => {
  const { query, open24h } = req.query;
  let list = HOSPITALS;
  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    list = list.filter(h => h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q));
  }
  if (open24h === 'true') {
    list = list.filter(h => h.open24h);
  }
  res.json(list);
});

// Health Reports API
app.get("/api/reports", (req, res) => {
  res.json({
    weeklySteps: [
      { day: "Mon", steps: 8200 },
      { day: "Tue", steps: 9400 },
      { day: "Wed", steps: 7100 },
      { day: "Thu", steps: 10200 },
      { day: "Fri", steps: 8900 },
      { day: "Sat", steps: 11500 },
      { day: "Sun", steps: 7420 },
    ],
    weeklyWater: [
      { day: "Mon", waterLiters: 2.2 },
      { day: "Tue", waterLiters: 2.5 },
      { day: "Wed", waterLiters: 2.0 },
      { day: "Thu", waterLiters: 2.8 },
      { day: "Fri", waterLiters: 2.4 },
      { day: "Sat", waterLiters: 2.7 },
      { day: "Sun", waterLiters: 1.75 },
    ],
    weeklySleep: [
      { day: "Mon", hours: 7.2 },
      { day: "Tue", hours: 7.8 },
      { day: "Wed", hours: 6.5 },
      { day: "Thu", hours: 8.0 },
      { day: "Fri", hours: 7.5 },
      { day: "Sat", hours: 8.5 },
      { day: "Sun", hours: 7.5 },
    ],
    monthlyWeight: [
      { date: "W1", weightKg: 65.5 },
      { date: "W2", weightKg: 65.0 },
      { date: "W3", weightKg: 64.6 },
      { date: "W4", weightKg: 64.0 },
    ],
    insights: [
      "Your step count was highest on Saturday (11,500 steps). Excellent activity level!",
      "Hydration averaged 2.3L per day. You met your 2.5L goal on 4 out of 7 days.",
      "Sleep quality remained consistent with an average of 7.6 hours per night.",
      "Weight trend shows a steady, healthy maintenance trajectory over the past month."
    ]
  });
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
