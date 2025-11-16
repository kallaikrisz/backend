const Orszag = require('../models/Orszag');

//http://localhost:8080/orszagok
exports.getAllOrszagok = async (req, res) => {
  try {
    const orszagok = await Orszag.getAll();
    res.json(orszagok); // JSON formátumban visszaadja az adatokat
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hiba történt az országok lekérdezésekor' });
  }
};
//http://localhost:8080/orszagok/regio/Europa
exports.getByRegion = async (req, res) => {
  try {
    const { regio } = req.params;
    const orszagok = await Orszag.getByRegion(regio);
    res.json(orszagok);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Hiba történt a regionális lekérdezés során' });
  }
};  
//http://localhost:8080/orszagok/7
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const orszagok = await Orszag.getById(id);

    if (!orszagok) {
      return res.status(404).json({ message: 'Nincs ilyen ország' });
    }

    res.json(orszagok);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Hiba történt az ország lekérdezése során' });
  }
};
 
//http://localhost:8080/orszagok/szures?regio=Europa&kodReszlet=E
exports.filterOrszagok = async (req, res) => {
  try {
    const { regio, kodReszlet } = req.query;
    const orszagok = await Orszag.filterOrszagok({ regio, kodReszlet });
    res.json(orszagok);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Hiba történt a szűrés során' });
  }
};
// http://localhost:8080/orszagok/paged?page=2&limit=10&sortBy=nev&order=asc
exports.getPagedOrszagok = async (req, res) => {
  try {
    const { page, limit, sortBy, order } = req.query;
    const result = await Orszag.getPagedOrszagok({ page, limit, sortBy, order });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Hiba történt a lapozott lekérés során' });
  }
};

