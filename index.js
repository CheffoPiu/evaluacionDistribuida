/*const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener el clima por lat/lon
app.get('/clima', async (req, res) => {
  const lat = req.query.lat || '-0.2299'; // Quito
  const lon = req.query.lon || '-78.5249';

  try {
    const response = await axios.get(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'mi-ejemplo-clima-app' // Obligatorio para esta API
        }
      }
    );

    const ahora = response.data.properties.timeseries[0];
    const temperatura = ahora.data.instant.details.air_temperature;

    res.json({
      ciudad: 'Quito',
      temperatura,
      fuente: 'api.met.no'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima' });
  }
});

// Ruta base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/


const express = require('express');
const path    = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Sirve archivos estáticos del directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// 2) Ruta raíz: entrega el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clima', async (req, res) => {
  try {
    const lat = req.query.lat || '-0.2299';
    const lon = req.query.lon || '-78.5249';
    const response = await axios.get(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'test'
        }
      }
    );
    console.log("response", response.data);
    const ahora = response.data.properties.timeseries[0];
    const temperatura = ahora.data.instant.details.air_temperature;

    res.json({
      ciudad: 'Quito',
      temperatura,
      fuente: 'api.met.no'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima' });
  }
});

// 3) (Opcional) Puedes mantener la ruta de la “Hola Mundo” en /hello
app.get('/hello', (req, res) => {
  res.send('¡Hola Mundo A desde Heroku Docker A!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



