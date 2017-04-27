import './comandes.html';
import { Producte } from "../../api/lists/producte/producte.js";

Template.comandes.helpers({
  producte: function() {
    return Producte.find({});
  }
});
