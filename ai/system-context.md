# Contexto Base del Sistema

## Descripción General

Strongo es una aplicación para la generación y gestión de rutinas de entrenamiento, diseñada para construir planes estructurados y reutilizables en distintos horizontes de tiempo. El sistema permite crear rutinas personalizadas, editar su contenido de forma incremental y mantener consistencia entre la lógica de negocio, la persistencia de datos y la experiencia de usuario.

La plataforma está orientada a modelar la planificación del entrenamiento con un enfoque modular: cada nivel de planificación encapsula reglas propias, pero mantiene trazabilidad con el resto de la estructura. Esto habilita evolución funcional sin romper compatibilidad con rutinas existentes.

## Estructura Jerárquica de Planificación

La generación de rutinas sigue una jerarquía explícita:

- Mes
- Semana
- Día
- Ejercicios

Cada nivel representa una capa de organización:

- **Mes:** marco macro de objetivos (volumen, intensidad, enfoque muscular, progresión general).
- **Semana:** distribución táctica de la carga y frecuencia dentro del mes.
- **Día:** sesión concreta con intención específica (fuerza, hipertrofia, técnica, etc.).
- **Ejercicios:** unidades operativas que incluyen parámetros de ejecución (series, repeticiones, RIR, descansos, notas y metadatos).

Este modelo facilita una planificación escalable y auditable, permitiendo ajustar granularmente sin perder el contexto global del ciclo de entrenamiento.

## Soporte para Ejercicios Alternativos

El sistema contempla ejercicios alternativos como variantes equivalentes dentro de una misma intención de entrenamiento. Un ejercicio alternativo debe conservar las mismas propiedades clave del ejercicio principal para que el reemplazo sea funcionalmente consistente:

- mismo objetivo muscular principal,
- parámetros configurables equivalentes (series, repeticiones, RIR, descanso),
- compatibilidad con equipamiento y contexto del usuario.

Este enfoque permite adaptar rutinas a disponibilidad de material, preferencias o restricciones físicas, sin degradar la calidad del plan.

## Enfoque Técnico: TypeScript First

El proyecto está orientado a TypeScript como base para robustez y mantenibilidad. La tipificación fuerte se usa para:

- modelar entidades de dominio (rutina, ejercicio, series, metadatos),
- reducir errores en tiempo de ejecución,
- mejorar refactorización segura,
- facilitar contratos claros entre UI, servicios y capa de datos.

La evolución de código debe priorizar la migración progresiva a TypeScript en módulos críticos y de alto acoplamiento.

## Principios de Diseño (SOLID)

La arquitectura adopta principios SOLID para mantener calidad a medida que crece el producto:

- **Single Responsibility:** cada módulo/componente debe tener una responsabilidad clara.
- **Open/Closed:** nuevas capacidades deben agregarse por extensión, no por modificación invasiva.
- **Liskov Substitution:** variantes de entidades/servicios deben mantener contratos esperados.
- **Interface Segregation:** interfaces pequeñas y enfocadas según caso de uso.
- **Dependency Inversion:** reglas de negocio desacopladas de implementaciones concretas de infraestructura.

Esto favorece pruebas más simples, menor deuda técnica y evolución controlada.

## Orientación a Escalabilidad

El sistema se diseña con escalabilidad funcional y técnica como objetivo explícito:

- crecimiento del catálogo de ejercicios y metadatos sin rediseños radicales,
- incorporación de nuevas reglas de generación por nivel jerárquico,
- soporte para personalización por usuario y futuras estrategias de recomendación,
- separación clara entre dominio, servicios y presentación para facilitar extensión.

La decisión arquitectónica central es mantener un núcleo de dominio estable y tipado, sobre el cual puedan añadirse nuevas capacidades de planificación y automatización sin comprometer estabilidad operativa.

## Decisión de Estado y Persistencia de Rutinas

Para asegurar consistencia funcional en toda la aplicación, el sistema adopta `RoutinesContext` como mecanismo de estado global para las rutinas (crear, editar, eliminar y listar), evitando depender de `navigation params` como canal principal de datos entre pantallas.

Esta decisión responde a un problema de disponibilidad de estado al montar pantallas desde el navegador por tabs y se alinea con el dominio al establecer una **single source of truth** para el ciclo de vida de una rutina.

Implicancias de dominio y arquitectura:

- las operaciones de rutina (`add`, `update`, `delete`) se centralizan,
- la lectura de rutinas es consistente entre vistas,
- se simplifica la evolución hacia persistencia duradera (AsyncStorage y Supabase),
- se reduce el acoplamiento entre navegación y reglas del negocio.

En términos de diseño, esta base mejora trazabilidad, mantenibilidad y escalabilidad del sistema de generación/gestión de rutinas.

