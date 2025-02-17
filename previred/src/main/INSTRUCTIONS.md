# Instrucciones para ejecutar la API

## Requisitos
- Java 17
- Maven

## Pasos de Ejecución
1. Clonar el repositorio:
   ```sh
   git clone <URL_DEL_REPO>
   cd springboot-crud-users
   ```
2. Construir el proyecto:
   ```sh
   mvn clean install
   ```
3. Ejecutar la aplicación:
   ```sh
   mvn spring-boot:run
   ```
4. Acceder a la API en `http://localhost:8080/api/users`
5. Acceder a la consola de H2 en `http://localhost:8080/h2-console`

## Endpoints Principales
- `GET /api/users` → Obtener todos los usuarios
- `POST /api/users` → Crear un usuario
- `GET /api/users/{id}` → Obtener un usuario por ID
- `PUT /api/users/{id}` → Actualizar un usuario
- `DELETE /api/users/{id}` → Eliminar un usuario