import './productes.html';
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";

Template.productes.helpers({
  ingredients: function() {
    return Ingredient.find({idProducte: this._id});
  }
});
