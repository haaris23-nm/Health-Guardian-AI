import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NavigationDrawer } from './components/NavigationDrawer';
import { DashboardView } from './components/DashboardView';
import { BmiCalculatorView } from './components/BmiCalculatorView';
import { WaterTrackerView } from './components/WaterTrackerView';
import { MedicineReminderView } from './components/MedicineReminderView';
import { SymptomCheckerVIew } from './components/SymptomCheckerVIew';
import { DietPlannerView } from './components/DietPlannerView';
import { WorkoutPlannerView } from './components/WorkoutPlannerView';
import { MoodTrackerView } from './components/MoodTrackerView';
import { HospitalsMapView } from './components/HospitalsMapView';
import { HealthReportsView } from './components/HealthReportsView';
import { ChatbotView } from './components/ChatbotView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { PrescriptionView } from './components/PrescriptionView';
import { QuickLogModal } from './components/QuickLogModal';
import { AuthView } from './components/AuthView';
import { UserProfile, HealthMetrics, MedicineReminder, WaterLog, MoodLog } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [quickLogOpen, setQuickLogOpen] = useState<boolean>(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('health_guardian_auth_user');
    return saved !== null;
  });

  // Apply dark mode class to html document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // User Profile State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('health_guardian_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Haarisrafi2006',
      email: 'haarisrafi2006@gmail.com',
      age: 30,
      gender: 'male',
      heightCm: 175,
      weightKg: 72,
      goal: 'maintain',
    };
  });

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    localStorage.setItem('health_guardian_auth_user', JSON.stringify(loggedInUser));
    if (loggedInUser.email) {
      localStorage.setItem(`health_user_${loggedInUser.email.toLowerCase()}`, JSON.stringify(loggedInUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('health_guardian_auth_user');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Health Metrics State
  const [metrics, setMetrics] = useState<HealthMetrics>(() => {
    const saved = localStorage.getItem('health_guardian_metrics');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      bmi: 23.5,
      bmiCategory: 'Normal weight',
      weightKg: 72,
      heightCm: 175,
      waterIntakeMl: 0,
      waterGoalMl: 2500,
      sleepHours: 7.5,
      sleepGoalHours: 8.0,
      caloriesBurned: 1840,
      caloriesGoal: 2200,
      stepsCount: 8420,
      stepsGoal: 10000,
      heartRateBpm: 72,
      systolicBp: 118,
      diastolicBp: 78,
    };
  });

  useEffect(() => {
    localStorage.setItem('health_guardian_metrics', JSON.stringify(metrics));
  }, [metrics]);

  // Water Logs State
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>(() => {
    const saved = localStorage.getItem('health_guardian_water_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'w1', amountMl: 500, timestamp: '08:15 AM' },
      { id: 'w2', amountMl: 250, timestamp: '10:30 AM' },
      { id: 'w3', amountMl: 500, timestamp: '01:00 PM' },
      { id: 'w4', amountMl: 500, timestamp: '03:45 PM' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('health_guardian_water_logs', JSON.stringify(waterLogs));
  }, [waterLogs]);

  // Medicine Reminders State
  const [reminders, setReminders] = useState<MedicineReminder[]>(() => {
    const saved = localStorage.getItem('health_guardian_reminders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'm1',
        name: 'Multivitamin Complex',
        dosage: '1 Tablet',
        time: '08:00 AM',
        days: ['Daily'],
        takenToday: true,
        notes: 'Take after morning breakfast with water',
      },
      {
        id: 'm2',
        name: 'Omega 3 Fish Oil',
        dosage: '1000 mg',
        time: '01:30 PM',
        days: ['Daily'],
        takenToday: true,
        notes: 'Supports cardiovascular & heart rate health',
      },
      {
        id: 'm3',
        name: 'Magnesium Glycinate',
        dosage: '200 mg',
        time: '09:30 PM',
        days: ['Mon', 'Wed', 'Fri'],
        takenToday: false,
        notes: 'Promotes muscle relaxation & deep REM sleep',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('health_guardian_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Mood Logs State
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const saved = localStorage.getItem('health_guardian_mood_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'mood_1',
        moodLevel: 4,
        moodLabel: 'Good',
        notes: 'Finished morning jog and felt energized!',
        aiSuggestion: 'Great momentum! Physical morning exercise triggers endorphin release.',
        timestamp: 'Today at 09:30 AM',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('health_guardian_mood_logs', JSON.stringify(moodLogs));
  }, [moodLogs]);

  const handleUpdateUserProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updated };
      localStorage.setItem('health_guardian_auth_user', JSON.stringify(newUser));
      if (newUser.email) {
        localStorage.setItem(`health_user_${newUser.email.toLowerCase()}`, JSON.stringify(newUser));
      }
      return newUser;
    });

    if (updated.weightKg || updated.heightCm) {
      setMetrics((prev) => {
        const h = updated.heightCm || prev.heightCm;
        const w = updated.weightKg || prev.weightKg;
        const heightM = h / 100;
        const bmiVal = Number((w / (heightM * heightM)).toFixed(1));
        let category = 'Normal weight';
        if (bmiVal < 18.5) category = 'Underweight';
        else if (bmiVal < 25) category = 'Normal weight';
        else if (bmiVal < 30) category = 'Overweight';
        else category = 'Obese';

        return {
          ...prev,
          heightCm: h,
          weightKg: w,
          bmi: bmiVal,
          bmiCategory: category,
        };
      });
    }
  };

  // Handlers
  const handleUpdateBmiMetrics = (heightCm: number, weightKg: number) => {
    const heightM = heightCm / 100;
    const bmiVal = Number((weightKg / (heightM * heightM)).toFixed(1));

    let category = 'Normal weight';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Normal weight';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'Obese';

    setMetrics((prev) => ({
      ...prev,
      heightCm,
      weightKg,
      bmi: bmiVal,
      bmiCategory: category,
    }));

    setUser((prev) => ({ ...prev, heightCm, weightKg }));
  };

  const handleAddWater = (amountMl: number) => {
    setMetrics((prev) => ({
      ...prev,
      waterIntakeMl: prev.waterIntakeMl + amountMl,
    }));

    const newLog: WaterLog = {
      id: `w_${Date.now()}`,
      amountMl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setWaterLogs((prev) => [newLog, ...prev]);
  };

  const handleToggleMedicineTaken = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, takenToday: !r.takenToday } : r))
    );
  };

  const handleAddMedicineReminder = (med: Omit<MedicineReminder, 'id' | 'takenToday'>) => {
    const newMed: MedicineReminder = {
      ...med,
      id: `m_${Date.now()}`,
      takenToday: false,
    };
    setReminders((prev) => [...prev, newMed]);
  };

  const handleLogMood = async (moodLevel: 1 | 2 | 3 | 4 | 5, moodLabel: string, notes: string) => {
    try {
      const res = await fetch('/api/mood-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moodLevel, moodLabel, notes }),
      });

      const data = await res.json();
      const newMoodItem: MoodLog = {
        id: `mood_${Date.now()}`,
        moodLevel,
        moodLabel,
        notes,
        aiSuggestion: data.suggestion || 'Stay positive and practice deep breathing!',
        timestamp: 'Just now',
      };

      setMoodLogs((prev) => [newMoodItem, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  // If user is not logged in, render the Auth Gateway
  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={handleLoginSuccess} defaultEmail="" />;
  }

  return (
    <div className="min-h-screen bg-[#F3F4F9] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200 font-sans flex flex-col">
      
      {/* Top Sleek Navbar */}
      <Navbar
        onOpenDrawer={() => setDrawerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenCodeVault={() => setCurrentView('code_vault')}
        onOpenProfile={() => setCurrentView('profile')}
        onLogout={handleLogout}
        activeView={currentView}
        userName={user.name}
      />

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentView={currentView}
        userName={user.name}
        userEmail={user.email}
        onLogout={handleLogout}
        onNavigate={(view) => {
          setCurrentView(view);
          setDrawerOpen(false);
        }}
      />

      {/* Main Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'dashboard' && (
          <DashboardView
            metrics={metrics}
            user={user}
            onNavigate={(v) => setCurrentView(v)}
            onQuickLogWater={handleAddWater}
            onOpenFAB={() => setQuickLogOpen(true)}
          />
        )}

        {currentView === 'bmi' && (
          <BmiCalculatorView user={user} onUpdateMetrics={handleUpdateBmiMetrics} />
        )}

        {currentView === 'water' && (
          <WaterTrackerView
            waterIntakeMl={metrics.waterIntakeMl}
            waterGoalMl={metrics.waterGoalMl}
            waterLogs={waterLogs}
            onAddWater={handleAddWater}
          />
        )}

        {currentView === 'medicine' && (
          <MedicineReminderView
            reminders={reminders}
            onToggleTaken={handleToggleMedicineTaken}
            onAddReminder={handleAddMedicineReminder}
          />
        )}

        {currentView === 'prescription' && (
          <PrescriptionView
            user={user}
            onNavigate={(v) => setCurrentView(v)}
            onAddMedicineReminder={handleAddMedicineReminder}
          />
        )}

        {currentView === 'symptom_checker' && <SymptomCheckerVIew />}

        {currentView === 'diet_planner' && <DietPlannerView user={user} />}

        {currentView === 'workout_planner' && <WorkoutPlannerView user={user} />}

        {currentView === 'mood' && (
          <MoodTrackerView moodLogs={moodLogs} onLogMood={handleLogMood} />
        )}

        {currentView === 'hospitals' && <HospitalsMapView />}

        {currentView === 'reports' && <HealthReportsView />}

        {currentView === 'chatbot' && <ChatbotView />}

        {currentView === 'profile' && (
          <ProfileView
            user={user}
            onUpdateUser={handleUpdateUserProfile}
            onLogout={handleLogout}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
      </main>

      {/* Quick FAB Modal */}
      <QuickLogModal
        isOpen={quickLogOpen}
        onClose={() => setQuickLogOpen(false)}
        onLogWater={handleAddWater}
        onNavigate={(v) => setCurrentView(v)}
      />

      {/* Bottom Navigation for Mobile */}
      <BottomNav
        currentView={currentView}
        onNavigate={(v) => setCurrentView(v)}
        onOpenFAB={() => setQuickLogOpen(true)}
      />

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );

}
