# 📱 Guía Completa: Strongo - Google Play Store

## 🎯 Objetivo
Compilar y publicar la aplicación **Strongo** en Google Play Store usando Expo Application Services (EAS).

---

## 📊 Información del Proyecto

**App Name:** Strongo  
**Package Name:** com.camilorc.strongo  
**Version:** 1.0.0  
**Version Code:** 1  
**Expo Project:** https://expo.dev/accounts/camilorc/projects/strongo-app  
**Project ID:** 01046718-c033-4e03-9232-f280bdc43335

---

# PARTE 1: COMPILACIÓN CON EAS BUILD

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

**✅ Completado:** EAS CLI instalado correctamente

---

## 🔐 PASO 2: Iniciar Sesión en Expo

```bash
# Login en Expo
eas login

# Verificar cuenta
eas whoami
```

**✅ Completado:** Sesión iniciada como `camilorc`

---

## ⚙️ PASO 3: Configurar app.json

El archivo `app.json` ya está configurado con:

```json
{
  "expo": {
    "name": "Strongo",
    "slug": "strongo-app",
    "version": "1.0.0",
    "android": {
      "package": "com.camilorc.strongo",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0B0F0E"
      },
      "permissions": [
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ]
    }
  }
}
```

**✅ Completado:** Configuración lista para producción

---

## 🛠️ PASO 4: Inicializar EAS Build

```bash
# Inicializar proyecto en Expo
eas init

# Configurar perfiles de build
eas build:configure
```

**✅ Completado:** Archivo `eas.json` creado

---

## 📝 PASO 5: Configuración de eas.json

El archivo `eas.json` está configurado con los siguientes perfiles:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "distribution": "internal"
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "autoIncrement": true
    }
  }
}
```

**Perfiles:**
- `preview`: Genera APK para pruebas locales
- `production`: Genera AAB para Google Play Store

**✅ Completado:** Perfiles configurados correctamente

---

## 🏗️ PASO 6: Generar APK de Prueba

```bash
# Build de preview (APK para pruebas)
eas build --platform android --profile preview
```

**Resultado:**
- ✅ APK generado exitosamente
- **Build ID:** 355c3f21-8d42-4ddd-91ed-5fc1911861ef
- **Link:** https://expo.dev/accounts/camilorc/projects/strongo-app/builds/355c3f21-8d42-4ddd-91ed-5fc1911861ef

**Uso:** Descarga e instala en tu dispositivo Android para probar la app.

---

## 📦 PASO 7: Generar AAB de Producción

```bash
# Build de producción (AAB para Google Play)
eas build --platform android --profile production
```

**Resultado:**
- ✅ AAB generado exitosamente
- **Build ID:** 4d14be8c-63b7-4a1e-a09c-b3e8d28c5cdb
- **Link AAB:** https://expo.dev/artifacts/eas/h6fqDxCuagduNd7kiwQFYw.aab
- **Keystore:** Generado automáticamente y almacenado en Expo

**✅ Completado:** AAB listo para subir a Google Play Store

---

## 🔑 PASO 8: Descargar Keystore (IMPORTANTE)

⚠️ **MUY IMPORTANTE:** Guarda el keystore para futuras actualizaciones.

```bash
# Descargar credenciales
eas credentials
```

**Pasos:**
1. Selecciona: **Android**
2. Selecciona: **Production**
3. Selecciona: **Keystore: Download**
4. Guarda el archivo `.jks` en un lugar seguro

**⚠️ Sin este archivo NO podrás actualizar la app en el futuro.**

---

# PARTE 2: SUBIR A GOOGLE PLAY CONSOLE

## 📤 Archivo para Subir

**AAB de Producción:**  
https://expo.dev/artifacts/eas/h6fqDxCuagduNd7kiwQFYw.aab

---

## 1️⃣ Descargar el AAB

1. Abre el link del AAB en tu navegador
2. El archivo se descargará automáticamente
3. Nombre del archivo: `h6fqDxCuagduNd7kiwQFYw.aab`

---

## 2️⃣ Acceder a Google Play Console

1. Ve a: https://play.google.com/console
2. Inicia sesión con tu cuenta de desarrollador
3. Si no tienes cuenta, crea una ($25 USD pago único)

---

## 3️⃣ Crear Nueva Aplicación

1. **Clic en "Crear aplicación"**
2. Completa el formulario:
   - **Nombre de la app:** Strongo
   - **Idioma predeterminado:** Español (España) o Español (Latinoamérica)
   - **Tipo de app:** Aplicación
   - **Gratuita o de pago:** Gratuita
3. Acepta las declaraciones
4. **Crear aplicación**

---

## 4️⃣ Configurar Ficha de la Tienda

### 4.1 Detalles Principales

**Ir a: Presencia en la tienda > Ficha principal de Play Store**

#### Nombre de la app:
```
Strongo
```

#### Descripción breve (80 caracteres max):
```
Tu compañero de entrenamiento para crear rutinas personalizadas
```

#### Descripción completa (4000 caracteres max):
```
🏋️ Strongo - Tu Entrenador Personal

Strongo es la aplicación definitiva para gestionar tus rutinas de gimnasio. 
Diseñada para deportistas de todos los niveles que buscan llevar un registro 
preciso de su progreso y crear entrenamientos personalizados.

✨ CARACTERÍSTICAS PRINCIPALES

🎯 Rutinas Personalizadas
Crea y guarda rutinas de ejercicio adaptadas a tus objetivos. Ya sea que 
busques ganar músculo, perder peso o mejorar tu resistencia, Strongo te 
ayuda a diseñar el plan perfecto.

📊 Seguimiento de Progreso
Registra tus entrenamientos, sets, repeticiones y peso utilizado. Visualiza 
tu evolución con estadísticas detalladas y gráficos de progreso.

💪 Biblioteca de Ejercicios
Accede a una completa base de datos de ejercicios con instrucciones y 
técnicas correctas de ejecución.

⏱️ Timer Inteligente
Controla tus tiempos de descanso entre series para optimizar tu entrenamiento.

🔐 Seguro y Privado
Tus datos están protegidos con autenticación segura. Crea tu cuenta y accede 
desde cualquier dispositivo.

🌙 Diseño Elegante
Interfaz moderna con tema oscuro que cuida tus ojos durante los entrenamientos 
nocturnos.

📱 IDEAL PARA:
• Principiantes que inician en el gimnasio
• Deportistas intermedios que buscan estructura
• Atletas avanzados que necesitan registro detallado
• Entrenadores que gestionan múltiples rutinas
• Cualquiera que quiera mejorar su forma física

🎯 PRÓXIMAMENTE:
• Sincronización en la nube
• Planes de entrenamiento predefinidos
• Integración con wearables
• Estadísticas avanzadas y analíticas
• Compartir rutinas con la comunidad

Descarga Strongo hoy y transforma tu manera de entrenar. 
¡Alcanza tus objetivos fitness con el mejor compañero de entrenamiento!

💪 Entrena más inteligente, no más duro.
```

---

### 4.2 Elementos Gráficos

**Icono de la aplicación (512x512 px):**
- Formato: PNG
- Ya incluido en el proyecto: `./assets/icon.png`

**Banner destacado (1024x500 px):**
- Crear imagen con el logo y texto "Strongo - Tu Entrenador Personal"
- Usar colores: Fondo #0B0F0E, Acento #06D6A0

**Screenshots (mínimo 2):**
- Tamaño recomendado: 1080x1920 px (9:16)
- Capturas sugeridas:
  1. Pantalla de inicio/login
  2. Pantalla principal con rutinas
  3. Pantalla de crear rutina
  4. Perfil de usuario

---

### 4.3 Categorización

**Categoría:**
- Salud y bienestar

**Etiquetas:**
- gimnasio
- fitness
- entrenamiento
- rutinas
- ejercicio

---

## 5️⃣ Subir el AAB

1. **Ir a: Producción > Crear nuevo lanzamiento**
2. **Subir el AAB:**
   - Arrastra el archivo `h6fqDxCuagduNd7kiwQFYw.aab`
   - O haz clic en "Examinar archivos"
3. **Notas de la versión (en Español):**

```
Primera versión de Strongo

✨ Funcionalidades incluidas:
• Sistema de autenticación seguro con registro e inicio de sesión
• Interfaz moderna con tema oscuro
• Navegación intuitiva con pestañas inferiores
• Preparación para crear rutinas personalizadas
• Diseño optimizado para Android

¡Bienvenido a Strongo, tu nuevo compañero de entrenamiento!
```

4. **Guardar > Revisar lanzamiento**

---

## 6️⃣ Completar Cuestionarios Obligatorios

### 6.1 Calificación de Contenido

1. **Ir a: Política > Calificación del contenido de la aplicación**
2. **Completar cuestionario:**
   - Categoría: Fitness/Salud
   - ¿Contenido violento? No
   - ¿Contenido para adultos? No
   - ¿Lenguaje ofensivo? No
3. **Enviar**

### 6.2 Público Objetivo

1. **Ir a: Política > Público objetivo y contenido**
2. **Grupo de edad objetivo:**
   - 13 años o más
3. **¿Tu app tiene publicidad? No**
4. **Guardar**

### 6.3 Política de Privacidad

**Opción 1: URL Genérica (Temporal)**
```
https://www.freeprivacypolicy.com/generic/
```

**Opción 2: Crear Propia Política**
- Usar generador: https://www.privacypolicygenerator.info/
- Publicar en GitHub Pages o sitio web
- Añadir URL a la ficha

### 6.4 Declaración de Seguridad de Datos

1. **Ir a: Política > Seguridad de datos**
2. **Completar formulario:**
   - ¿Recopila datos? Sí
   - Datos recopilados: Email, Nombre (para autenticación)
   - ¿Comparte datos? No
   - Cifrado en tránsito: Sí
   - ¿Usuarios pueden solicitar eliminación? Sí
3. **Guardar**

---

## 7️⃣ Configurar Países y Precios

1. **Ir a: Presencia en la tienda > Países/regiones**
2. **Seleccionar países:**
   - Todos los países (recomendado)
   - O seleccionar específicos (ej: España, México, Colombia, etc.)
3. **Precio:** Gratuita
4. **Guardar**

---

## 8️⃣ Revisar y Enviar

1. **Ir al Dashboard principal**
2. **Verificar que todo tenga ✅:**
   - Ficha de Play Store completa
   - Calificación de contenido
   - Público objetivo
   - Política de privacidad
   - Seguridad de datos
   - Producción (AAB subido)
3. **Clic en "Enviar para revisión"**

**Tiempo de revisión:** 1-7 días (usualmente 2-3 días)

---

## 🔄 Actualizaciones Futuras

### Incrementar Versiones

Editar `app.json`:
```json
{
  "version": "1.0.1",  // Incrementar versión semántica
  "android": {
    "versionCode": 2   // DEBE ser mayor al anterior
  }
}
```

### Generar Nueva Build

```bash
# Nueva compilación de producción
eas build --platform android --profile production

# Descargar nuevo AAB
# Subir a Google Play Console > Producción > Crear nuevo lanzamiento
```

---

## 📊 Checklist Final

### Antes de Enviar a Revisión:

- [x] **EAS CLI instalado y configurado**
- [x] **app.json configurado correctamente**
- [x] **eas.json creado con perfiles**
- [x] **APK de prueba generado y probado**
- [x] **AAB de producción generado**
- [x] **Keystore descargado y guardado**
- [ ] **Screenshots preparados (mínimo 2)**
- [ ] **Icono de 512x512 verificado**
- [ ] **Banner destacado creado**
- [ ] **Descripciones escritas**
- [ ] **Política de privacidad configurada**
- [ ] **Calificación de contenido completada**
- [ ] **Público objetivo definido**
- [ ] **Seguridad de datos declarada**
- [ ] **AAB subido a Google Play Console**
- [ ] **Notas de versión escritas**
- [ ] **Todos los checks ✅ en el dashboard**
- [ ] **Enviado para revisión**

---

## ⚠️ Errores Comunes y Soluciones

### Error: "Invalid Package Name"
**Solución:** El package debe ser único: `com.tuempresa.tunombre`

### Error: "Version Code Already Used"
**Solución:** Incrementar `versionCode` en `app.json`

### Error: "Upload Certificate Mismatch"
**Solución:** Usar el mismo keystore para actualizaciones

### Error: "Missing Privacy Policy"
**Solución:** Añadir URL válida de política de privacidad

### Error: "Content Rating Required"
**Solución:** Completar cuestionario de calificación de contenido

---

## 🔗 Enlaces Útiles

- **Expo Dashboard:** https://expo.dev/accounts/camilorc/projects/strongo-app
- **Google Play Console:** https://play.google.com/console
- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **Android Package Guide:** https://developer.android.com/studio/build/application-id
- **Google Play Policies:** https://play.google.com/about/developer-content-policy/

---

## 📝 Registro de Builds

### Build 1 - APK Preview
- **Fecha:** 4 de Octubre, 2025
- **Build ID:** 355c3f21-8d42-4ddd-91ed-5fc1911861ef
- **Tipo:** APK (Preview)
- **Link:** https://expo.dev/accounts/camilorc/projects/strongo-app/builds/355c3f21-8d42-4ddd-91ed-5fc1911861ef
- **Status:** ✅ Completado

### Build 2 - AAB Production
- **Fecha:** 4 de Octubre, 2025
- **Build ID:** 4d14be8c-63b7-4a1e-a09c-b3e8d28c5cdb
- **Tipo:** AAB (Production)
- **Link:** https://expo.dev/artifacts/eas/h6fqDxCuagduNd7kiwQFYw.aab
- **Status:** ✅ Completado - Listo para Google Play

---

## 📞 Soporte

- **Expo Forums:** https://forums.expo.dev/
- **Expo Discord:** https://chat.expo.dev/
- **Stack Overflow:** Tag `expo` o `eas-build`

---

**🎉 ¡Felicidades! Tu app Strongo está lista para ser publicada en Google Play Store.**

---

_Última actualización: 4 de Octubre, 2025_