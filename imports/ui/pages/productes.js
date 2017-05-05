import './productes.html';
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Subingredient } from "../../api/lists/subingredient/subingredient.js";
import { Images } from '../../api/lists/producte/producte.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.productes.onCreated(function(){
  this.rIdIngredient = new ReactiveVar (false);
});


Template.productes.onRendered(function(){
  var alcada = $(window).height();
  alcada = alcada - 52;
  $(".row.content").height(alcada);
  $(window).resize(function() {
    var alcada = $(window).height();
    alcada = alcada - 52;
    $(".row.content").height(alcada);
  })
});

Template.productes.helpers({
  ingredients: function() {
    return Ingredient.find({idProducte: this._id});
  },

  imatge: function(id) {
    var idIngredient = Ingredient.findOne({_id:id}).imatge;
    var nomImatge = Images.find({_id:idIngredient});
    return nomImatge;
  },

  subimatge: function(id) {
    var idSubingredient = Subingredient.findOne({_id:id}).imatge;
    var nomImatge = Images.find({_id:idSubingredient});
    return nomImatge;
  },

  subingredients: function(){
    // AQUI HAIG DE FER UNA COMANDA DE SUBINGREDIENT AMB LA ID DE LA VARIABLE REACTIVA.
    var idIngredient = Template.instance().rIdIngredient.get();
    return Subingredient.find({idIngredient:idIngredient});
  }
});

Template.productes.events({
  'click .ingredient': function(event, template){
    var idImatge = this._id;
    var idIngredient = Ingredient.findOne({imatge:idImatge})._id;
    console.log(idIngredient);
    Template.instance().rIdIngredient.set(idIngredient);
  }
});
