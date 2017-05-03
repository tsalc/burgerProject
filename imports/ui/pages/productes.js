import './productes.html';
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Images } from '../../api/lists/producte/producte.js';

Template.productes.helpers({
  ingredients: function() {
    return Ingredient.find({idProducte: this._id});
  },

  imatge: function(id) {
    var idIngredient = Ingredient.findOne({_id:id}).imatge;
    var nomImatge = Images.find({_id:idIngredient});
    return nomImatge;
  }
});
