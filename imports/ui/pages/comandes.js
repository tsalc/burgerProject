import './comandes.html';
import { Producte } from "../../api/lists/producte/producte.js";
import { Images } from '../../api/lists/producte/producte.js';
Template.comandes.helpers({
  producte: function() {
    return Producte.find({});
  },

  // nomImatgeProducte: function(id){
  //   var idProducte = Producte.findOne({_id:id}).imatge;
  //   var nomImatge = Images.findOne({_id:idProducte}).original.name;
  //   return nomImatge;
  // },

  imatge: function(id) {
    var idProducte = Producte.findOne({_id:id}).imatge;
    var nomImatge = Images.find({_id:idProducte});
    return nomImatge;
  }
});
