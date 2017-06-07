import './productes.html';
import { Producte } from "../../api/lists/producte/producte.js";
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Subingredient } from "../../api/lists/subingredient/subingredient.js";
import { Carrito } from "../../api/lists/carrito/carrito.js";
import { Images } from '../../api/lists/producte/producte.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

Template.productes.onCreated(function(){
  this.rIdIngredient = new ReactiveVar (false);
  this.rIdImatge = new ReactiveVar (false);
  this.rIdSubingredient = new ReactiveVar (false);
  this.rNomImatge = new ReactiveVar (false);
  this.rPosicio = new ReactiveVar (0);
  this.rCarrito = new ReactiveVar (false);
  this.rNomProducte = new ReactiveVar (false);
  this.rPreuSubingredient = new ReactiveVar (false);
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
  },

  total: function(){
    var carrito = Session.get('sCarrito');
    var total = 0;
    for (i=0; i<carrito.length; i++){
      total += carrito[i].preu;
    }
    return total;
  },

  carrito: function(){
    return Session.get('sCarrito');
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
    var preuSubingredient = Subingredient.findOne({imatge:idImatge}).preu;
    var idSubingredient = Subingredient.findOne({imatge:idImatge})._id;
    var idIngredient = Subingredient.findOne({imatge:idImatge}).idIngredient;
    var idImatgeCentral = Subingredient.findOne({imatge:idImatge}).imatgeCentral;
    var nomImatge = Images.findOne({_id:idImatgeCentral}).original.name;
    Template.instance().rIdImatge.set(idImatgeCentral);
    Template.instance().rNomImatge.set(nomImatge);
    Template.instance().rNomProducte.set(nomSubingredient);
    Template.instance().rPreuSubingredient.set(preuSubingredient);
    Template.instance().rIdSubingredient.set(idSubingredient);
  },

  'drop #focusImg': function(event, template){
    var idImatge = this._id;
    var pos = Template.instance().rPosicio.get();
    var nomSubingredient = Template.instance().rNomProducte.get();
    var preu = Template.instance().rPreuSubingredient.get();
    var objecte = Session.get('sCarrito');
    var idIngredient = Subingredient.findOne({_id:Template.instance().rIdSubingredient.get()}).idIngredient;
    if (!Template.instance().rCarrito.get()){
      // AFEGIR Objecte
      if (!Session.get('sCarrito')){
        var objecte = [];
      }
      else{
        var objecte = Session.get('sCarrito');
      }

      var idProducte = Ingredient.findOne({_id:idIngredient}).idProducte;
      var nomProducte = Producte.findOne({_id:idProducte}).nom;
    }
    var objecteAux = {producte:nomProducte,subingredient:nomSubingredient,preu:preu};
    objecte.push(objecteAux);
    Template.instance().rCarrito.set(objecte);
    Session.set('sCarrito',objecte);
    console.log(Session.get('sCarrito'));

    var tagImg = '<div class="cardDrop" style="top: '+pos+'px"><img src="/cfs/files/images/'+Template.instance().rIdImatge.get()+'/'+Template.instance().rNomImatge.get()+'"></div>';
    $("#focusImg").add(tagImg).appendTo("#focusImg");
    Template.instance().rPosicio.set(pos+323);
  },

  'click .cardDrop': function(event, template){
    $(event.target).parent().remove();
    $(event.target).attr('src');
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
