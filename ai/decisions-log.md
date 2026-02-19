# Registro de decisiones técnicas

## 2026-02-19 — Versionado del contexto de IA dentro del repositorio

**Decisión**

Se versiona el contexto operativo de IA dentro del repositorio (carpeta `ai/`), incluyendo contexto del sistema, reglas, arquitectura y prompts reutilizables.

**Motivación**

- Alinear a todo el equipo (humano + IA) sobre las mismas reglas y supuestos.
- Evitar pérdida de conocimiento entre sesiones y cambios de contexto.
- Garantizar trazabilidad de por qué se toman ciertas decisiones de diseño/código.
- Reducir respuestas inconsistentes de distintas IAs o en distintos momentos.

**Impacto esperado**

- Mayor consistencia técnica en propuestas y cambios.
- Menor fricción al incorporar nuevos colaboradores o agentes.
- Mejor mantenimiento a largo plazo por documentación viva y versionada.

**Alcance inicial**

- `ai/system-context.md`
- `ai/architecture.md`
- `ai/rules.md`
- `ai/prompts/*.md`
- `ai/decisions-log.md`

**Criterio de evolución**

Toda decisión arquitectónica relevante o cambio de lineamientos para IA debe registrarse en este archivo con fecha, motivación e impacto.
