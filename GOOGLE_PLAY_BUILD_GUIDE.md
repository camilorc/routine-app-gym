# 📱 Guía de Compilación para Google Play Store

## 🎯 Objetivo
Compilar la aplicación **Strongo** para distribución en Google Play Store usando Expo Application Services (EAS).

---

## 📋 Requisitos Previos

### 1. Cuenta de Google Play Console
- ✅ Cuenta de desarrollador de Google Play ($25 USD pago único)
- ✅ Acceso a Google Play Console

### 2. Cuenta de Expo
- ✅ Cuenta en [expo.dev](https://expo.dev)
- ✅ Instalación de EAS CLI

### 3. Herramientas Necesarias
```bash
# Node.js instalado (verificar)
node --version

# npm o yarn instalado
npm --version
```

---

## 🚀 PASO 1: Instalar EAS CLI

```bash
# Instalar EAS CLI globalmente
npm install -g eas-cli

# Verificar instalación
eas --version
```

---

## 🔐 PASO 2: Iniciar Sesión en Expo

```bash
# Login en Expo
eas login

# Verificar cuenta
eas whoami
```

---

## ⚙️ PASO 3: Configurar app.json

Actualizar la configuración de la aplicación con información para producción.

### Campos importantes a configurar:

```json
{
  "expo": {
    "name": "Routine Gym",
    "slug": "routine-gym-app",
    "version": "1.0.0",
    "android": {
      "package": "com.camilorc.routinegym",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0B0F0E"
      },
      "permissions": []
    }
  }
}
```

**Campos clave:**
- `name`: Nombre visible de la app
- `slug`: Identificador único en Expo
- `version`: Versión semántica (1.0.0)
- `android.package`: Identificador único de Android (com.tuempresa.tunombre)
- `android.versionCode`: Número de versión interna (incrementa en cada build)

---

## 🛠️ PASO 4: Inicializar EAS Build

```bash
# Inicializar configuración de EAS
eas build:configure
```

Este comando creará el archivo `eas.json` con la configuración de builds.

---

## 📝 PASO 5: Configurar eas.json

El archivo `eas.json` define los perfiles de compilación:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

**Tipos de build:**
- `apk`: Para pruebas locales (preview)
- `app-bundle`: Para Google Play Store (production)

---

## 🏗️ PASO 6: Build de Prueba (APK)

Primero, crear un APK para probar localmente:

```bash
# Build de preview (APK)
eas build --platform android --profile preview
```

**Proceso:**
1. EAS preguntará si quieres generar un nuevo Keystore → **Yes**
2. Subirá el código a los servidores de Expo
3. Compilará en la nube (15-30 minutos)
4. Te dará un link para descargar el APK

**Descargar y probar:**
- Descarga el APK desde el link proporcionado
- Instala en un dispositivo Android
- Prueba todas las funcionalidades

---

## 📦 PASO 7: Build de Producción (AAB)

Una vez probado el APK, crear el Android App Bundle para Google Play:

```bash
# Build de producción (AAB)
eas build --platform android --profile production
```

**Resultado:**
- Archivo `.aab` (Android App Bundle)
- Link de descarga del build

---

## 🔑 PASO 8: Obtener el Keystore (Importante)

Para futuras actualizaciones, necesitas guardar el keystore:

```bash
# Descargar keystore
eas credentials
```

**Seleccionar:**
1. Android
2. Production
3. Keystore: Download

**⚠️ IMPORTANTE:** 
- Guarda el keystore en un lugar seguro
- Sin este archivo NO podrás actualizar la app en el futuro

---

## 📤 PASO 9: Preparar Assets para Google Play

Necesitarás crear los siguientes assets:

### Screenshots (Obligatorios)
- **Teléfono:** Mínimo 2 screenshots
  - Tamaño: 16:9 o 9:16
  - Resolución mínima: 320px
  - Resolución máxima: 3840px

### Gráficos (Obligatorios)
- **Icono de la app:** 512x512px (PNG)
- **Banner destacado:** 1024x500px (PNG/JPEG)

### Información de la App
- Descripción corta (80 caracteres)
- Descripción completa (4000 caracteres)
- Título (50 caracteres)

---

## 🎮 PASO 10: Subir a Google Play Console

### 10.1 Crear Aplicación

1. Ve a [Google Play Console](https://play.google.com/console)
2. **Crear aplicación**
3. Completa la información básica

### 10.2 Configurar Ficha de la Tienda

1. **Detalles de la aplicación**
   - Nombre de la app
   - Descripción corta
   - Descripción completa

2. **Elementos gráficos**
   - Icono
   - Banner destacado
   - Screenshots

3. **Categorización**
   - Categoría: Salud y bienestar
   - Público objetivo

### 10.3 Subir el AAB

1. **Producción** → **Crear nuevo lanzamiento**
2. **Subir** el archivo `.aab` descargado de EAS
3. Agregar **notas de la versión**
4. **Revisar lanzamiento**

### 10.4 Completar el Cuestionario de Contenido

1. Calificación de contenido
2. Público objetivo
3. Política de privacidad (URL requerida)

### 10.5 Enviar para Revisión

1. Revisar que todo esté completo ✅
2. **Enviar para revisión**
3. Esperar aprobación (1-7 días)

---

## 🔄 PASO 11: Actualizaciones Futuras

Para actualizar la app:

### 11.1 Actualizar Versiones

```json
// app.json
{
  "version": "1.0.1",  // Incrementar versión
  "android": {
    "versionCode": 2   // Incrementar código (debe ser mayor)
  }
}
```

### 11.2 Build y Deploy

```bash
# Nueva compilación
eas build --platform android --profile production

# Descargar nuevo AAB
# Subir a Google Play Console
```

---

## 📊 Checklist Final

Antes de enviar a Google Play:

- [ ] **App probada completamente** (APK preview)
- [ ] **Todas las funcionalidades funcionan**
- [ ] **No hay errores o crashes**
- [ ] **Iconos y splash screen correctos**
- [ ] **app.json configurado correctamente**
- [ ] **AAB de producción generado**
- [ ] **Keystore descargado y guardado**
- [ ] **Screenshots preparados**
- [ ] **Descripciones escritas**
- [ ] **Política de privacidad creada** (si aplica)
- [ ] **Categoría seleccionada**
- [ ] **Cuestionario de contenido completado**

---

## ⚠️ Errores Comunes

### Error: "Invalid Package Name"
**Solución:** El package debe ser único y seguir el formato `com.empresa.app`

### Error: "Version Code Already Used"
**Solución:** Incrementar `versionCode` en `app.json`

### Error: "Build Failed"
**Solución:** 
- Verificar que todas las dependencias estén instaladas
- Revisar logs de EAS Build
- Asegurar que no haya errores en el código

### Error: "APK/AAB Not Signed"
**Solución:** EAS maneja automáticamente la firma, verificar configuración de credentials

---

## 🔗 Enlaces Útiles

- [Expo EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Google Play Console](https://play.google.com/console)
- [Android Package Name Guide](https://developer.android.com/studio/build/application-id)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)

---

## 📞 Soporte

- **Expo Forums:** https://forums.expo.dev/
- **Expo Discord:** https://chat.expo.dev/
- **Stack Overflow:** Tag `expo` o `eas-build`

---

**🎉 ¡Listo! Tu app ahora puede ser distribuida en Google Play Store.**

---

## 📝 Notas de esta Compilación

**Fecha:** [Se completará durante el proceso]
**Versión:** 1.0.0
**Build Number:** 1
**Package Name:** [Se definirá en configuración]

**Status del Build:**
- [ ] Configuración completada
- [ ] APK preview generado y probado
- [ ] AAB producción generado
- [ ] Subido a Google Play Console
- [ ] Enviado para revisión
- [ ] Aprobado y publicado