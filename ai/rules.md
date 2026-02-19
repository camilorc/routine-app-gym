# Reglas para IAs del Proyecto

## Objetivo

Este documento define reglas obligatorias para cualquier IA que proponga, modifique o genere código dentro del proyecto. Su propósito es preservar coherencia arquitectónica, mantenibilidad y escalabilidad a largo plazo.

## Principios de Arquitectura

### 1. Mantener bajo acoplamiento

- Diseñar módulos con dependencias mínimas y explícitas.
- Evitar referencias cruzadas innecesarias entre capas.
- Favorecer contratos claros (interfaces/tipos) en vez de dependencias concretas.

### 2. Priorizar composición sobre herencia

- Reutilizar comportamiento mediante composición de funciones, servicios y componentes.
- Usar herencia solo cuando exista una relación de sustitución real y estable.
- Evitar jerarquías profundas que dificulten pruebas y evolución.

### 3. Aplicar principios SOLID

- **S (Single Responsibility):** una responsabilidad principal por módulo/clase/componente.
- **O (Open/Closed):** extender capacidades sin modificar núcleos estables de forma invasiva.
- **L (Liskov Substitution):** respetar contratos en variantes e implementaciones.
- **I (Interface Segregation):** interfaces pequeñas y enfocadas por caso de uso.
- **D (Dependency Inversion):** depender de abstracciones, no de detalles de infraestructura.

## Separación de Responsabilidades

### 4. No mezclar lógica de dominio con infraestructura

- La lógica de negocio debe permanecer aislada de SDKs, clientes externos, base de datos y framework UI.
- La infraestructura (persistencia, red, almacenamiento, adaptadores) debe implementar contratos del dominio, no definir reglas de negocio.
- Los casos de uso deben poder probarse sin depender de implementaciones externas reales.

## Calidad de Código

### 5. Mantener tipado fuerte

- Priorizar TypeScript en nuevas implementaciones y refactors.
- Evitar `any` salvo casos excepcionales justificados y acotados.
- Modelar entidades y contratos con tipos explícitos para prevenir inconsistencias.

### 6. Evitar lógica duplicada

- Detectar patrones repetidos y extraerlos a utilidades, servicios o componentes reutilizables.
- Mantener una única fuente de verdad para reglas de negocio.
- Antes de crear nueva lógica, verificar si existe una abstracción equivalente reutilizable.

## Evolución del Sistema

### 7. Pensar en extensibilidad futura

- Diseñar cambios para soportar crecimiento funcional sin romper comportamiento existente.
- Preferir estructuras modulares que permitan agregar nuevas variantes (planes, ejercicios, reglas) sin reescrituras masivas.
- Evitar decisiones rígidas que limiten escalamiento por volumen de datos, complejidad de negocio o nuevos flujos.

## Criterios de Implementación para IA

- Proponer cambios mínimos pero estructuralmente correctos.
- No introducir complejidad innecesaria ni features fuera de alcance.
- Mantener consistencia con convenciones existentes del proyecto.
- Priorizar claridad, legibilidad y trazabilidad de decisiones técnicas.

## Lista de Verificación Antes de Entregar

Toda IA debe validar que su propuesta:

1. Reduce o mantiene el acoplamiento.
2. Respeta composición sobre herencia.
3. Cumple SOLID de forma razonable.
4. Separa dominio de infraestructura.
5. Conserva tipado fuerte en contratos críticos.
6. No introduce duplicación evitable.
7. Deja el sistema más preparado para crecer.
