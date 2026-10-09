import dotenv from 'dotenv'
import app from './src/app.js'
import db from './src/config/db.js'

dotenv.config()

const PORT = process.env.PORT || 3000;

db.getConnection()
  .then((conn) => {
    console.log('Database MySQL terhubung');
    conn.release();

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal terhubung ke database:', err.message);
    process.exit(1);
  });