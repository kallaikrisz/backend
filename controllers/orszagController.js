const Orszag = require('../models/Orszag');

exports.getAllOrszagok = async (req, res) => {
  try {
    const orszagok = await Orszag.getAll();
    res.json(orszagok); // JSON formátumban visszaadja az adatokat
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt az országok lekérdezésekor' });
  }
};
