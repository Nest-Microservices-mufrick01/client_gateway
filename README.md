<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Client Gateway

El gateway es el punto de conexión entre nuestros clientes y nuestros microservicios. Es el encargado de recibir las peticiones http, enviarlas al servicio y devolver la respuesta al cliente

## Dev
1. Clonar el repositorio
2. Instalar dependencias
3. crear un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. levantar el proyecto `yarn run start:dev`

## Nats
```bash
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```