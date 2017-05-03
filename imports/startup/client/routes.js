import { Router } from 'meteor/iron:router';// import {baseLayout} from ../imports/ui/layouts/baseLayout.js;
import { Producte } from "../../api/lists/producte/producte.js";
import '../../ui/layouts/baseLayout.js';
import '../../ui/components/inici/inici.js';
import '../../ui/pages/burger.js';
import '../../ui/pages/comandes.js';
import '../../ui/pages/insertProducte.js';
import '../../ui/pages/insertIngredient.js';
import '../../ui/pages/insertSubingredient.js';
import '../../ui/pages/productes.js';

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

Router.route('/insertIngredient',function(){
  this.render('insertIngredient');
    return Meteor.subscribe('images')
});

Router.route('/insertSubingredient',function(){
  this.render('insertSubingredient');
    return Meteor.subscribe('images')
});

Router.route('producte/:_id', {
  name: 'productes',
  data: function() {return Producte.findOne(this.params._id);}
});
