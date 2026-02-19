# Arquitectura del Sistema

## Enfoque General

La arquitectura del proyecto se orienta a **Arquitectura Limpia (Clean Architecture)**, priorizando un núcleo de dominio estable y desacoplado de frameworks, base de datos y detalles de implementación. El objetivo es que las reglas de negocio de generación de rutinas puedan evolucionar de forma segura, testeable y extensible.

Principio rector: **las dependencias apuntan hacia el dominio**.

## Estructura de Dominio para Rutinas

El dominio modela la planificación del entrenamiento en una jerarquía explícita y progresiva:

- **Mes** (nivel macro)
- **Semana** (nivel meso)
- **Día** (nivel micro)
- **Ejercicio** (unidad operativa)

Esta estructura permite:

- definir objetivos globales por ciclo,
- distribuir carga y frecuencia de forma controlada,
- ajustar sesiones puntuales sin perder coherencia del plan general.

## Entidades Principales

### 1. RoutinePlan (Plan de Rutina)

Entidad raíz que representa el plan completo. Contiene metadatos generales y la colección de meses.

Responsabilidades:

- mantener consistencia global del plan,
- validar reglas transversales (p. ej., estructura mínima),
- exponer operaciones de alto nivel (agregar/actualizar segmentos del plan).

### 2. MonthPlan (Mes)

Agrupa semanas bajo una intención de entrenamiento mensual.

Responsabilidades:

- definir foco del mes (objetivo principal),
- mantener la secuencia y pertenencia de semanas.

### 3. WeekPlan (Semana)

Unidad táctica de distribución de carga dentro del mes.

Responsabilidades:

- organizar días de entrenamiento,
- garantizar coherencia con el objetivo mensual.

### 4. DayPlan (Día)

Representa una sesión concreta de entrenamiento.

Responsabilidades:

- contener lista ordenada de ejercicios,
- definir intención de sesión (p. ej., fuerza/hipertrofia/técnica),
- validar reglas de composición de la sesión.

### 5. ExerciseAssignment (Ejercicio en Rutina)

Instancia de ejercicio dentro de un día con su configuración de ejecución.

Propiedades típicas:

- referencia al ejercicio base,
- series, repeticiones, RIR,
- descanso (minutos/segundos),
- notas operativas,
- variantes/alternativas compatibles.

### 6. ExerciseCatalogItem (Ejercicio de Catálogo)

Entidad del catálogo de ejercicios (globales o personalizados), con metadatos musculares y de equipamiento.

## Relación entre Mes, Semana, Día y Ejercicio

Relaciones jerárquicas esperadas:

- `RoutinePlan 1..n MonthPlan`
- `MonthPlan 1..n WeekPlan`
- `WeekPlan 1..n DayPlan`
- `DayPlan 1..n ExerciseAssignment`

Cada nivel hereda contexto del nivel superior, pero mantiene autonomía para sus reglas locales. Esta composición habilita modificaciones parciales (por ejemplo, reemplazar un ejercicio en un día) sin reconstruir todo el plan.

## Manejo de Ejercicios Alternativos

El dominio contempla alternativas como reemplazos equivalentes de un ejercicio principal dentro de una misma intención de sesión.

Regla de negocio base:

- una alternativa debe conservar propiedades funcionales del ejercicio original (objetivo muscular, parámetros de ejecución y compatibilidad de contexto).

Modelo sugerido:

- `ExerciseAssignment` mantiene `primaryExercise` y `alternativeExercises[]`.
- cada alternativa es validada por una política de equivalencia del dominio.

Beneficios:

- adaptación a disponibilidad de equipamiento,
- continuidad del estímulo planificado,
- personalización sin romper la estructura del plan.

## Separación por Capas (Propuesta)

### 1. Domain

Contiene el corazón del negocio:

- entidades,
- value objects,
- reglas invariantes,
- servicios de dominio,
- interfaces (puertos) para persistencia y servicios externos.

No depende de UI, SDKs, Supabase ni detalles de transporte.

### 2. Application

Coordina casos de uso del sistema:

- crear/editar plan,
- agregar o reemplazar ejercicios,
- validar estructura de mes/semana/día,
- guardar y recuperar agregados del dominio vía repositorios.

Depende del dominio y orquesta flujos, pero no implementa infraestructura concreta.

### 3. Infrastructure

Implementa detalles técnicos:

- repositorios concretos (Supabase, storage local),
- mappers entre modelos de persistencia y dominio,
- adaptadores de servicios externos.

Depende de interfaces definidas en dominio/aplicación, no al revés.

## Flujo de Dependencias

Dirección recomendada de dependencias:

- `UI/Frameworks` → `Application` → `Domain`
- `Infrastructure` → implementa puertos de `Domain/Application`

Esto permite reemplazar infraestructura (base de datos, servicios, transporte) con impacto mínimo en las reglas centrales.

## Consideraciones de Escalabilidad

Para sostener crecimiento funcional:

- mantener agregados de dominio pequeños y coherentes,
- encapsular validaciones críticas en entidades/servicios de dominio,
- evitar lógica de negocio en componentes de UI,
- usar contratos tipados estrictos en TypeScript entre capas,
- introducir nuevas variantes mediante extensión de casos de uso y políticas, no por condicionales dispersos.

Esta base permite evolucionar hacia generación más avanzada de rutinas (periodización, recomendaciones, adaptación dinámica) preservando mantenibilidad y calidad técnica.
