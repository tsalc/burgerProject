import { Router } from 'meteor/iron:router';
import { Producte } from "../../api/lists/producte/producte.js";
import { Ingredient } from '../../api/lists/ingredient/ingredient.js';
import { Subingredient } from '../../api/lists/subingredient/subingredient.js';
import '../../ui/layouts/baseLayout.js';
import '../../ui/components/inici/inici.js';
import '../../ui/pages/burger.js';
import '../../ui/pages/comandes.js';
import '../../ui/pages/insertProducte.js';
import '../../ui/components/provaFotos/provaFotos.js';
import '../../ui/pages/insertIngredient.js';
import '../../ui/pages/insertSubingredient.js';
import '../../ui/pages/productes.js';
import '../../ui/pages/insertIngredientBase.js';
import '../../ui/pages/gestioTabular/producte/tabularProducte.js';
import '../../ui/pages/gestioTabular/producte/editarProducte.js';
import '../../ui/pages/gestioTabular/ingredient/tabularIngredient.js';
import '../../ui/pages/gestioTabular/ingredient/editarIngredient.js';
import '../../ui/pages/gestioTabular/subingredient/tabularSubingredient.js';
import '../../ui/pages/gestioTabular/subingredient/editarSubingredient.js';


Router.configure({
  layoutTemplate: 'baseLayout'
});

Router.route('/', {name: 'inici'},function(){
  this.render('inici');
});

Router.route('/burger',function(){
  this.render('burger');
});

Router.route('/comandes',function(){
  this.render('comandes');
});

Router.route('/insertProducte',function(){
  this.render('insertProducte');
    return Meteor.subscribe('images')
});

Router.route('/prova',function(){
  this.render('provaFotos');
});

Router.route('/insertIngredient',function(){
  this.render('insertIngredient');
    return Meteor.subscribe('images');
});

Router.route('/insertSubingredient',function(){
  this.render('insertSubingredient');
    return Meteor.subscribe('images');
});

Router.route('/insertIngredientBase',function(){
  this.render('insertIngredientBase');
    return Meteor.subscribe('images');
});

Router.route('producte/:_id', {
  name: 'productes',
  data: function() {return Producte.findOne(this.params._id);}
});

Router.route('/tabularProducte',function(){
  this.render('tabularProducte');
});

Router.route('tabularProducte/:_id', {
  name: 'editarProducte',
  data: function() {return Producte.findOne(this.params._id);}
});

Router.route('/tabularIngredient',function(){
  this.render('tabularIngredient');
});

Router.route('tabularIngredient/:_id', {
  name: 'editarIngredient',
  data: function() {return Ingredient.findOne(this.params._id);}
});

Router.route('/tabularSubingredient',function(){
  this.render('tabularSubingredient');
});

Router.route('tabularSubingredient/:_id', {
  name: 'editarSubingredient',
  data: function() {return Subingredient.findOne(this.params._id);}
});
