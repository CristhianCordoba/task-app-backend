# TASKS API - Backend Professional

## Descripción
**TASKS API** es una solución de backend robusta para la gestión de tareas, diseñada bajo los estándares más exigentes de la ingeniería de software moderna. No es solo un "To-Do"; es un sistema escalable que separa estrictamente las reglas de negocio de la tecnología de infraestructura, garantizando que el código sea mantenible a largo plazo.

## Tecnologías
* **Lenguaje:** [TypeScript v5.9+](https://www.typescriptlang.org/) - Tipado estricto para un desarrollo seguro.
* **Framework:** [Express v5.2+](https://expressjs.com/) - Servidor web rápido y minimalista.
* **Base de Datos:** [Firebase Firestore](https://firebase.google.com/docs/firestore) - Persistencia NoSQL escalable.
* **Autenticación:** [JWT](https://jwt.io/) - Estándar de la industria para seguridad de APIs.
* **Herramientas:** `uuid` para IDs únicos, `jest` para testing y `ts-node-dev` para productividad.

---

## Estructura del Proyecto (Clean Architecture)
El proyecto implementa **Arquitectura Limpia**, organizada en 4 capas concéntricas:

src/
├── domain/           # CAPA 1: Reglas de negocio puras (Entidades e Interfaces)
│   └── repositories/ # Contratos que definen cómo se accede a los datos
├── application/      # CAPA 2: Casos de Uso (Orquestación de la lógica)
│   └── use-cases/    # Ej: CreateTask.ts, LoginUser.ts
├── infrastructure/   # CAPA 3: Herramientas externas e implementaciones
│   └── persistence/  # Implementación real de Firestore (Repositores)
├── presentation/     # CAPA 4: Punto de entrada (Controladores y Rutas)
│   ├── controllers/  # Manejo de req y res
│   └── routes/       # Definición de endpoints Express
└── types/            # Tipados globales y extensiones de Express

## Autorización y Seguridad
La seguridad se basa en JSON Web Tokens (JWT):
    Registro/Login: El servidor valida las credenciales y devuelve un token.
    Protección: Todas las rutas de /tasks requieren el header: Authorization: Bearer <token>.

## CI/CD y Despliegue Continuo
El proyecto sigue un flujo de Integración y Despliegue Continuo automatizado para asegurar la estabilidad del sistema:
1. Integración (Push): Al subir cambios a GitHub, se dispara el proceso.
2. Validación Técnica (Tests): Antes de cualquier despliegue, se ejecutan las pruebas unitarias con Jest. Si un test falla, el despliegue se cancela automáticamente para proteger el entorno de producción.
3. Compilación (Build): Una vez superados los tests, TypeScript se compila a JavaScript optimizado.
4. Despliegue (Deploy): Render actualiza el servicio con la nueva versión estable.

## Variables de Entorno
Crea un archivo .env en la raíz con lo siguiente:
    PORT: Puerto del servidor (ej: 3000).
    JWT_SECRET: Tu clave secreta para los tokens.
    FIREBASE_CONFIG: El JSON de tu Service Account de Firebase.

## Comandos del Proyecto
1. Instalación Inicial
    Descarga todas las dependencias necesarias:
    npm install

2. Ejecución en Desarrollo
    Inicia el servidor con recarga automática cada vez que guardes un cambio:
    npm run dev

3. Ejecución en Producción
    Compila el código de TypeScript a JavaScript y levanta el servidor optimizado:
    # Paso 1: Compilar
    npm run build

    # Paso 2: Ejecutar
    npm start

4. Pruebas Unitarias (Testing)
    Ejecuta la suite de pruebas con Jest:
    # Ejecutar pruebas una sola vez
    npm test

    # Ejecutar pruebas en modo "watch" (recarga al cambiar archivos)
    npm run test:watch

## Tabla de servicios
Método          Endpoint            Acción              Acceso
POST            /auth/register      Registro de usuario Público
POST            /auth/login         Inicio de sesión    Público
GET             /tasks              Listar mis tareas   Privado
POST            /tasks              Crear tarea         Privado
PUT             /tasks/:id          Editar tarea        Privado
DELETE          /tasks/:id          Eliminar tarea      Privado
