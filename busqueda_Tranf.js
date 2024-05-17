const { Pool } = require('pg');

const config = {
    host: "127.0.0.1",
    port: 5432,
    database: "bancosolar",
    user: "postgres",
    password: "XXXXXX"
};

const pool = new Pool(config);

const nueva_Transf = async (emisor, receptor, monto) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const resta_e = {
            text: "update usuarios set balance = balance - $2 where id = $1 RETURNING *;",
            values: [ emisor, monto ],
        }


        const suma_r = {
            text: "update usuarios set balance = balance + $2 where id = $1 RETURNING *;",
            values: [ receptor, monto ],
        }

        const tranf_reg = {
            text: "insert into transferencias (emisor, receptor, monto) values ($1, $2, $3);",
            values: [ emisor, receptor, monto ],
        }

        const res_resta_e = await client.query(resta_e);
        const res_suma_r = await client.query(suma_r);
        await client.query(tranf_reg);

        await client.query("COMMIT");

        return { emisor: res_resta_e.rows[0], receptor: res_suma_r.rows[0] };
    } catch (error) {
        await client.query("ROLLBACK");
        const { code } = error;
        console.log(`error: ${code}`);
    } finally {
        client.release();
    }
};

const leer_Transf = async () => {
    const result = await pool.query("select * from transferencias;");
    return result.rows;
};

module.exports = { nueva_Transf, leer_Transf }
