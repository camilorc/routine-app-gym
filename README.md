# 🚀 RN Expo Supabase Template

## ⚡ Production-Ready Starter Template

A modern, scalable React Native + Expo + Supabase starter template with complete authentication system, modular architecture, and best practices built-in.

### 🎯 Perfect For:
- 📱 Mobile apps with user authentication
- 🏢 Business applications
- 🎮 Social platforms  
- 📊 Dashboard apps
- 🛍️ E-commerce apps

## 🏗️ What's Included

### 🔐 **Complete Auth System**
- ✅ Login/Register screens
- ✅ Form validation & error handling
- ✅ Supabase integration
- ✅ Session persistence
- ✅ Modular components

### 🧩 **Modular Architecture** 
- ✅ Reusable UI components
- ✅ Custom hooks (useAuthForm, useAuthValidation)
- ✅ Organized folder structure
- ✅ Separation of concerns
- ✅ Easy to extend

### 🎨 **Modern UI/UX**
- ✅ NativeWind v4 (TailwindCSS for RN)
- ✅ Dark theme implementation
- ✅ Consistent design system
- ✅ Professional green palette
- ✅ SafeArea compatible

### 🧭 **Navigation Ready**
- ✅ React Navigation v6
- ✅ Bottom tabs configured
- ✅ Auth flow integration
- ✅ TypeScript support

## 📱 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.81.4 | Mobile framework |
| **Expo** | ~54.0.10 | Development platform |
| **NativeWind** | ^4.0.0 | Styling system |
| **Supabase** | ^2.58.0 | Backend & Auth |
| **React Navigation** | ^7.1.17 | Navigation |
| **TypeScript** | ~5.9.2 | Type safety |

## 🚀 Quick Start

### 1. Use This Template
```bash
# On GitHub: Click "Use this template" → "Create a new repository"
# Or clone directly:
git clone https://github.com/camilorc/rn-expo-supabase-template.git my-new-app
cd my-new-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit with your Supabase credentials
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Your App
```bash
npx expo start
```

## 📁 Project Structure

```
├── 🔐 auth/                   # Authentication module
│   ├── AuthContext.js         # Global auth state
│   ├── supabaseClient.js      # Configured client
│   └── index.js               # Module exports
│
├── 📱 screens/
│   ├── auth/                  # Auth screens
│   │   ├── AuthContainer.js   # Main auth coordinator
│   │   ├── LoginScreen.js     # Login interface
│   │   ├── RegisterScreen.js  # Registration form
│   │   └── ProfileScreen.js   # User profile
│   └── HomeScreen.js          # Main app screen
│
├── 🧩 components/
│   └── auth/                  # Reusable auth UI
│       ├── AuthInput.js       # Consistent input field
│       ├── AuthButton.js      # Action buttons
│       ├── AuthHeader.js      # Screen headers
│       ├── AuthToggle.js      # Login/Register toggle
│       └── AuthLayout.js      # Base layout
│
├── 🪝 hooks/                  # Custom hooks
│   ├── useAuthForm.js         # Form state management
│   └── useAuthValidation.js   # Input validation
│
└── ⚙️ config/                 # Configuration files
    ├── metro.config.js
    ├── tailwind.config.js
    └── babel.config.js
```

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',      // Main accent
      background: '#YOUR_BG',      // Background
      surface: '#YOUR_SURFACE',    // Cards/surfaces
    }
  }
}
```

### Add New Screens
1. Create in `screens/`
2. Register in navigation
3. Add to bottom tabs if needed

### Extend Auth System
- Add social login (Google, Apple, etc.)
- Implement password reset
- Add profile picture upload
- Create user roles system

## 📚 Documentation

- 📖 [Complete Architecture Guide](./ARCHITECTURE.md)
- 🔐 [Authentication Module Docs](./auth/README.md)
- 🛠️ [Template Setup Guide](./TEMPLATE_SETUP.md)

## 🤝 Contributing

1. Fork this template
2. Create your feature branch
3. Commit your changes
4. Push to the branch  
5. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**🎉 Start building amazing React Native apps in minutes, not hours!**

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge)](https://github.com/camilorc/rn-expo-supabase-template/generate)