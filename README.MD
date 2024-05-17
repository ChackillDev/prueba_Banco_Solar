### USO

`npm install` para instalación de dependencias,
`npm run dev` para ejecutar la aplicación.

### instalacion BBDD

Para iniciar con la persistencia de datos se deben ocupar las siguientes instrucciones SQL:

`CREATE DATABASE bancosolar;`
`\c bancosolar;`

`CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),`
`balance FLOAT CHECK (balance >= 0));`

`CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor`
`INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES`
`usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));`



### USO pg,
'En los archivos busqueda_tranf.js y busqueda Us.js'
`const config = {.. password: XXXXXX` usar clave postgres personal
