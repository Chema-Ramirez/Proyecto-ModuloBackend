# Proyecto Módulo Backend - API REST

API REST estructurada, escalable y robusta construida con Node.js. 
Operaciones CRUD completas, validación estricta de datos, persistencia en base de datos NoSQL y tipado estático para garantizar la mantenibilidad del código.

## Tecnologías Utilizadas
*   **Entorno de Ejecución:** [Node.js](https://nodejs.org/)
*   **Framework Web:** [Express.js](https://expressjs.com/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) 
*   **Base de Datos:** [MongoDB](https://www.mongodb.com/) 
*   **ORM/ODM:** [Mongoose](https://mongoosejs.com/)
*   **Validación de Datos:** [Zod](https://zod.dev/) 

## Características Principales
*   **Arquitectura Limpia:** Organización de código basada en capas (Rutas, Controladores, Modelos/Servicios) para separar responsabilidades de manera eficiente.
*   **API RESTful:** Endpoints bien definidos y estructurados siguiendo las convenciones HTTP estándar (GET, POST, PUT, DELETE).
*   **Tipado con TypeScript:** Interfaces y tipos definidos para prevenir errores comunes en tiempo de desarrollo.
*   **Validación con Zod:** Sanitización y validación estricta de las peticiones (`req.body`, `req.params`) antes de interactuar con la base de datos.
*   **Gestión de Errores Dinámica:** Middleware global implementado para capturar y formatear de manera uniforme las respuestas de error.
