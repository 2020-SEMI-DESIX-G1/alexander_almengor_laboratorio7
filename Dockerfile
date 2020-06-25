#Documentación
#Comando para construir imagen docker build -t namespacehub/imagename . {context}
#Comando para ver listas de imágenes en el OS docker images
#Comando para ejecutar con portforwarded docker run -p 3000:3000 imagename
#Comando para ver contenedores docker container ls
#Comando para detener contenedor docker stop containerid

#Leer dependencias de Docker
FROM node:latest

#Crea carpeta de Trabajo
WORKDIR /src

#Capa No.1: Dependencias
COPY package.json ./
#Instalacón de dependencias
RUN npm install

#Capa No.2: Copia resto de los archivos a la imagen recién creada (Carpeta Root(lab7))
COPY . .
#Exponer el puerto 3000
EXPOSE 3000
#Comandos por defecto de la imagen(sino recibe atributos a través de terminal)
CMD ["node", "app.js"]
