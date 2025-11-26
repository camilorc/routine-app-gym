# � Strongo - Fitness App

## ⚡ Modern Workout Routine Manager

A React Native + Expo + Supabase fitness application for creating, managing, and tracking workout routines with a comprehensive exercise database.

### 🎯 Key Features:
- 📱 Create custom workout routines
- �️ Extensive exercise database (50+ exercises)
- 📊 Track sets, reps, weight, and RIR
- � User authentication with Supabase
- 💾 Persistent draft routines
- 🎨 Modern dark theme UI

## 🏗️ What's Included

### 🔐 **Authentication System**
- ✅ Login/Register with email
- ✅ Form validation & error handling
- ✅ Supabase Auth integration
- ✅ Session persistence with AsyncStorage
- ✅ Secure user profile management

### 💪 **Workout Management** 
- ✅ Create custom routines
- ✅ Add exercises from database
- ✅ Configure sets, reps, weight, RIR
- ✅ Search exercises by name/muscle/equipment
- ✅ Draft routines with auto-save
- ✅ Edit and delete routines

### 🏋️ **Exercise Database**
- ✅ 50+ pre-loaded exercises
- ✅ Multiple muscle groups
- ✅ Various equipment types
- ✅ Difficulty levels
- ✅ Instructions for each exercise
- ✅ Create custom exercises

### 🎨 **Modern UI/UX**
- ✅ NativeWind v4 (TailwindCSS for RN)
- ✅ Dark theme implementation
- ✅ Consistent design system
- ✅ Professional styling
- ✅ SafeArea compatible

### 🧭 **Navigation**
- ✅ React Navigation v7
- ✅ Bottom tabs (Home, Routines, Profile)
- ✅ Stack navigation
- ✅ Auth flow integration

### 🔧 **TypeScript Support**
- ✅ Gradual migration in progress
- ✅ Type-safe service layer
- ✅ Organized type definitions
- ✅ Database schema types

## 📱 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.81.4 | Mobile framework |
| **Expo** | ~54.0.10 | Development platform |
| **Supabase** | ^2.58.0 | Backend, Auth & Database |
| **NativeWind** | ^4.2.1 | Styling system |
| **React Navigation** | ^7.1.17 | Navigation |
| **TypeScript** | ~5.9.2 | Type safety (migration) |
| **AsyncStorage** | ^2.2.0 | Local persistence |

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/camilorc/appStrongo.git
cd appStrongo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase

**Important**: You must configure Supabase before running the app.

1. Create a project in [Supabase](https://supabase.com)
2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Edit `.env` with your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. Run database migrations:
   - Go to Supabase SQL Editor
   - Execute `scripts/supabase-schema.sql`
   - Execute `scripts/supabase-seed.sql`

📖 **See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions**

### 4. Run Your App
```bash
npm start
# Then press 'a' for Android or 'i' for iOS
```

## 📁 Project Structure

```
├── 🔐 auth/                      # Authentication module
│   ├── AuthContext.js            # Global auth state
│   ├── supabaseClient.js         # Configured Supabase client
│   └── index.js                  # Module exports
│
├── 📱 screens/
│   ├── auth/                     # Auth screens
│   │   ├── AuthContainer.js      # Main auth coordinator
│   │   ├── LoginScreen.js        # Login interface
│   │   ├── RegisterScreen.js     # Registration form
│   │   └── ProfileScreen.js      # User profile
│   ├── HomeScreen.js             # Main dashboard
│   ├── CreateRoutineScreen.js    # Routine creation
│   └── AddExerciseScreen.js      # Exercise selection
│
├── 🧩 components/
│   └── auth/                     # Reusable auth UI
│       ├── AuthInput.js          # Input field
│       ├── AuthButton.js         # Action buttons
│       ├── AuthHeader.js         # Screen headers
│       ├── AuthToggle.js         # Login/Register toggle
│       └── AuthLayout.js         # Base layout
│
├── 🪝 hooks/                     # Custom hooks
│   ├── useAuthForm.js            # Form state management
│   └── useAuthValidation.js      # Input validation
│
├── 🗄️ services/                  # Backend services (TypeScript)
│   ├── routineService.ts         # Routine CRUD operations
│   ├── exerciseService.ts        # Exercise queries
│   └── index.ts                  # Service exports
│
├── 📦 contexts/                  # State management
│   └── RoutinesContext.tsx       # Routines & drafts state
│
├── 🎨 types/                     # TypeScript definitions
│   ├── database.ts               # Supabase schema types
│   ├── exercise.ts               # Exercise types
│   ├── routine.ts                # Routine types
│   ├── auth.ts                   # Auth types
│   ├── context.ts                # Context types
│   └── index.ts                  # Central exports
│
├── 🛠️ scripts/                   # Database scripts
│   ├── supabase-schema.sql       # Database schema
│   └── supabase-seed.sql         # Initial data
│
└── ⚙️ config/                    # Configuration files
    ├── metro.config.js
    ├── tailwind.config.js
    └── babel.config.js
```

## 🎨 Customization

### Change Theme Colors
Edit `theme/colors.js`:
```javascript
export const styleStrongDark = {
  primary: '#22C55E',        // Main green accent
  background: '#0A0A0A',     // Dark background
  surface: '#1A1A1A',        // Card background
  // ... more colors
}
```

### Add Custom Exercises
Use the app interface to create custom exercises, or insert directly into Supabase:
```sql
INSERT INTO exercises (name, muscle_group, equipment, is_global, created_by)
VALUES ('My Exercise', 'pecho', 'mancuernas', false, 'user-id-here');
```

### Extend Routine Features
- Add routine templates (is_template = true)
- Implement routine sharing (is_public = true)
- Add workout history tracking
- Implement progress analytics

### Future Features (Roadmap)
- 📊 Workout history and progress tracking
- 📈 Charts and analytics
- 👥 Trainer-student system (using routine_assignments)
- 🔄 Clone public routines
- 📸 Exercise demonstration videos
- ⏱️ Timer for rest periods

## 📚 Documentation

- 📖 [Complete Architecture Guide](./ARCHITECTURE.md)
- 🔐 [Authentication Module Docs](./auth/README.md)
- �️ [Supabase Setup Guide](./SUPABASE_SETUP.md)
- 🏗️ [Database Schema](./scripts/supabase-schema.sql)

## 🏋️ Database Schema

### Main Tables:
- **exercises**: Exercise catalog (global and user-created)
- **routines**: User workout routines
- **routine_exercises**: Exercises within routines
- **exercise_sets**: Set configurations (reps, weight, RIR)
- **routine_assignments**: Trainer-to-student assignments

### Key Features:
- Row Level Security (RLS) enabled on all tables
- Automatic timestamps with triggers
- Foreign key relationships with cascading deletes
- Indexed for performance
- Support for custom exercises

## 🚀 Building for Production

### Android APK
```bash
# Build with EAS
eas build --platform android --profile preview

# Or local build
npx expo run:android --variant release
```

### iOS
```bash
# Build with EAS
eas build --platform ios --profile preview
```

See `eas.json` for build configurations.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**💪 Built with passion for fitness enthusiasts**