import './productes.html';
import { Producte } from "../../api/lists/producte/producte.js";
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Subingredient } from "../../api/lists/subingredient/subingredient.js";
import { Images } from '../../api/lists/producte/producte.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.productes.onCreated(function(){
  this.rIdIngredient = new ReactiveVar (false);
  this.rIdImatge = new ReactiveVar (false);
  this.rNomImatge = new ReactiveVar (false);
  this.rPosicio = new ReactiveVar (0);
  this.rCarrito = new ReactiveVar (false);
  this.autorun(()=>{
    if(this.rIdIngredient.get()!=null){
      Meteor.setTimeout(function(){
        $(".card_subproducte").draggable({appendTo: '#yeldui', containment: 'html', helper:"clone" });
        $("#focusImg").droppable({});
      },100);
    };
  })
});


Template.productes.onRendered(function(){
  var alcada = $(window).height();
  alcada = alcada - 52;
  $(".row.content").height(alcada);
  $(window).resize(function() {
    var alcada = $(window).height();
    alcada = alcada - 52;
    $(".row.content").height(alcada);
  });
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
    Template.instance().rIdIngredient.set(idIngredient);
  },

  'dragstart .card_subproducte': function(event, template){
    var idImatge = this._id;
    var nomSubingredient = Subingredient.findOne({imatge:idImatge}).nom;
    var idSubingredient = Subingredient.findOne({imatge:idImatge})._id;
    var idIngredient = Subingredient.findOne({imatge:idImatge}).idIngredient;
    var objecte = Template.instance().rCarrito.get();
    var idImatgeCentral = Subingredient.findOne({imatge:idImatge}).imatgeCentral;
    var nomImatge = Images.findOne({_id:idImatgeCentral}).original.name;
    if (!Template.instance().rCarrito.get()){
      // AFEGIR Objecte
      var objecte = {};
      var idProducte = Ingredient.findOne({_id:idIngredient}).idProducte;
      var nomProducte = Producte.findOne({_id:idProducte}).nom;
      objecte.producte = nomProducte;
      objecte.list = [];
    }
    var objecteAux = {subingredient:nomSubingredient}
    objecte.list.push(objecteAux);
    Template.instance().rCarrito.set(objecte);
    console.log(Template.instance().rCarrito.get());
    Template.instance().rIdImatge.set(idImatgeCentral);
    Template.instance().rNomImatge.set(nomImatge);
  },

  'drop #focus': function(event, template){
    var pos = Template.instance().rPosicio.get();
    var tagImg = '<div class="cardDrop" style="top: '+pos+'px"><img src="/cfs/files/images/'+Template.instance().rIdImatge.get()+'/'+Template.instance().rNomImatge.get()+'"></div>';
    $("#focusImg").add(tagImg).appendTo("#focusImg");
    Template.instance().rPosicio.set(pos+323);
  },

  'click #carroSi': function(event, template){
    //console.log("anim");
    var n = 0;
    var i = -10;
    var px = "px";
    $("#focusImg > *:nth-child(n)").each(function() {
      //console.log(this);
      px = n+px;
      //$(this).css("top", px);
      $(this).animate({ "top": px }, "slow" );
      $(this).css("top", px);
      $(this).css("position", "absolute");
      $(this).css("z-index", i);
      px = "px";
      n = n + 30;
      i = i -10;
    });
    $('#finallyModal').modal('toggle');
    $("#focusImg").droppable('disable');
    $( "#animacio" ).prop( "disabled", true );
  },

  'click #carrito': function(event, Template) {
    if($('#divCarrito').css('display') == 'none'){
      $('#divCarrito').show(400);
      $('#carrito').animate({"right": "33.2222%"}, "400");
    }else{
      $('#divCarrito').hide(400);
      $('#carrito').animate({"right": "16.6666%"}, "400");
    }
  }
});
