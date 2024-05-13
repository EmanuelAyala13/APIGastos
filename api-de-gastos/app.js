const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://EmaAyala:argenteemo1@emanuelayala13.ekshssd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error('Error de conexión a la base de datos:', err));

const gastoSchema = new mongoose.Schema({
  usuario: String,
  descripcion: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now }
});

const Gasto = mongoose.model('Gasto', gastoSchema);

app.use(express.json());

app.post('/gastos', async (req, res) => {
  try {
    const nuevoGasto = new Gasto(req.body);
    await nuevoGasto.save();
    res.status(201).json(nuevoGasto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/gastos', async (req, res) => {
  try {
    const gastos = await Gasto.find();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/gastos/:id', async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id);
    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado' });
    }
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
