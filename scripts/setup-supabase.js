#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuración de Supabase para Routine App Gym\n');
console.log('Para obtener tus credenciales:');
console.log('1. Ve a https://supabase.com/ y crea una cuenta');
console.log('2. Crea un nuevo proyecto');
console.log('3. Ve a Settings > API');
console.log('4. Copia la URL del proyecto y la clave anónima\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupSupabase() {
  try {
    const supabaseUrl = await askQuestion('🌐 Ingresa la URL de tu proyecto Supabase: ');
    const supabaseAnonKey = await askQuestion('🔑 Ingresa tu clave anónima (Anon key): ');

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('❌ Debes proporcionar ambas credenciales.');
      rl.close();
      return;
    }

    if (!supabaseUrl.includes('supabase.co')) {
      console.log('⚠️  La URL no parece ser válida. Asegúrate de que sea de Supabase.');
    }

    // Leer el archivo template
    const clientPath = path.join(__dirname, '..', 'lib', 'supabaseClient.js');
    let content = fs.readFileSync(clientPath, 'utf8');

    // Verificar si ya tiene las credenciales configuradas
    if (content.includes('YOUR_SUPABASE_URL_HERE') || content.includes('TU_SUPABASE_URL_AQUI')) {
      // Reemplazar los placeholders
      content = content.replace(/YOUR_SUPABASE_URL_HERE|TU_SUPABASE_URL_AQUI/g, supabaseUrl);
      content = content.replace(/YOUR_SUPABASE_ANON_KEY_HERE|TU_SUPABASE_ANON_KEY_AQUI/g, supabaseAnonKey);
    } else {
      console.log('⚠️  Parece que las credenciales ya están configuradas.');
      const overwrite = await askQuestion('¿Quieres sobrescribir la configuración existente? (s/N): ');
      
      if (overwrite.toLowerCase() === 's' || overwrite.toLowerCase() === 'si') {
        // Crear nueva configuración
        content = `import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = '${supabaseUrl}';
const supabaseAnonKey = '${supabaseAnonKey}';

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
`;
      } else {
        console.log('✅ Configuración cancelada.');
        rl.close();
        return;
      }
    }

    // Escribir el archivo actualizado
    fs.writeFileSync(clientPath, content);

    console.log('\n✅ ¡Configuración de Supabase completada exitosamente!');
    console.log('📱 Ahora puedes ejecutar: npm start');
    console.log('🔐 Las credenciales están en lib/supabaseClient.js');
    console.log('⚠️  Este archivo no se subirá a git por seguridad');
    
  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
  } finally {
    rl.close();
  }
}

setupSupabase();