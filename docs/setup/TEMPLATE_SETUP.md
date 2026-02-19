# 🔧 Setup Instructions para Template

Sigue estos pasos para preparar este proyecto como template reutilizable:

## 1️⃣ Convertir a Template Repository (Recomendado)

### En GitHub.com:
1. Ve a: https://github.com/camilorc/routine-app-gym
2. Clic en **Settings** (⚙️)
3. Scroll down hasta **Template repository**
4. ✅ Check **Template repository**
5. **Save**

### Para usar en futuros proyectos:
1. Ve al repo template
2. Clic en **"Use this template"** 🟢
3. **"Create a new repository"**
4. Nombra tu nuevo proyecto
5. ✅ **Create repository**

## 2️⃣ Alternativa: Rama Template

```bash
# Crear rama base limpia
git checkout -b template-base
git push origin template-base

# Para nuevos proyectos
git clone https://github.com/camilorc/routine-app-gym.git
cd routine-app-gym
git checkout template-base
# Renombrar carpeta y configurar nuevo remote
```

## 3️⃣ Estructura de Carpetas para Copiar

Si prefieres copiar manualmente:

```bash
# Estructura a copiar para nuevos proyectos
mi-template-base/
├── 📱 Core (copiar siempre)
│   ├── App.tsx
│   ├── index.ts
│   ├── package.json
│   ├── metro.config.js
│   ├── tailwind.config.js
│   ├── babel.config.js
│   └── tsconfig.json
│
├── 🔐 auth/ (copiar completo)
├── 📱 screens/ (copiar completo) 
├── 🧩 components/ (copiar completo)
├── 🪝 hooks/ (copiar completo)
├── 🎨 assets/ (personalizar)
│
└── 📄 Docs (personalizar)
    ├── README.md
    ├── ARCHITECTURE.md
    └── .env.example
```

## 🎯 Ventajas de cada método:

### Template Repository ⭐ (Mejor)
- ✅ GitHub lo reconoce como template oficial
- ✅ Botón "Use this template" visible
- ✅ Nuevos repos independientes
- ✅ Sin historial de commits anterior
- ✅ Fácil de encontrar y usar

### Rama Template
- ✅ Control de versiones del template
- ✅ Actualizaciones fáciles
- ❌ Requiere más pasos manuales

### Copia Manual
- ✅ Control total
- ❌ Tedioso para proyectos repetitivos
- ❌ Sin versionado del template

## 🚀 Recomendación Final:

**Usa Template Repository** para máxima facilidad y profesionalismo.