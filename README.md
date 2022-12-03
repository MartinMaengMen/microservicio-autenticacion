# Servicio de autentición

Servicio de autentición de usuario, el cual incluye dos métodos que le permitirá al usuario iniciar sesión y registrarse en la plataforma. Además, se encuentra incluido la implementación de JWT para la generación y la validación del token.

# Instrucciones para desplegar el servicio

1) git clone https://github.com/MartinMaengMen/microservicio-autenticacion.git
2) Ubicarse con la consola en la ruta del repositorio descargado
3) En la consola escribir: npm i
4) Crear una aplicación de tipo Node Starter en la plataforma de serverless
5) Modificar los campos org y app en el archivo serverless.yml del proyecto con los valores que se generaron al crear la aplicación en la paltaforma de serverless
6) Ejecutar el comando el comando: serverless deploy

# Rutas del servicio

Link del servicio: https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com
Link del swagger: https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com/swagger

# Rutas del servicio en el proxy

Link del servicio: https://r5swknv9uh.execute-api.sa-east-1.amazonaws.com/v1/authentication
Link del swagger: https://r5swknv9uh.execute-api.sa-east-1.amazonaws.com/v1/authentication/swagger
