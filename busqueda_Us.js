const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "bancosolar",
    user: "postgres",
    password: "XXXXXX"
};

const pool = new Pool(config);

const insertar = async (nombre, balance) => {
    const consult = {
        text: "insert into usuarios (nombre, balance) values ($1, $2);",
        values: [ nombre, balance ]
    };

    const result = await pool.query(consult);
    return result.rows[0];
};

const leer = async () => {
    const result = await pool.query("select * from usuarios;");
    return result.rows;
};

const editar = async (id, nombre, balance) => {
   const editar = {
        text: `update usuarios set nombre = $1, balance = $2 where id = ${id} RETURNING *;`,
        values: [ nombre, balance ]
   }

   const result = await pool.query(editar);
   return result.rows;
};

const eliminar = async (id) => {
    const borrar = {
        text: `delete from usuarios where id = '${id}'`
    }

    const result = pool.query(borrar);
    return result
};

module.exports = { insertar, leer, editar ,eliminar }
