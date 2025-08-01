import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_iWr27wBqxYNc@ep-tiny-frost-adc9crfy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function main() {
  try {
    await client.connect();
    console.log("✅ Conexión exitosa a la base de datos");
    const res = await client.query("SELECT NOW()");
    console.log("Hora actual en DB:", res.rows[0]);
  } catch (err) {
    console.error("❌ Error conectando a la DB:", err.message);
  } finally {
    await client.end();
  }
}

main();
