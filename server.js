require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Escuchar en todas las interfaces de red (no solo localhost)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Carwash corriendo en puerto ${PORT}`);
});
