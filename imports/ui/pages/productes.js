import './productes.html';
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Subingredient } from "../../api/lists/subingredient/subingredient.js";
import { Images } from '../../api/lists/producte/producte.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.productes.onCreated(function(){
  this.rIdIngredient = new ReactiveVar (false);
  this.rIdImatge = new ReactiveVar (false);
  this.rNomImatge = new ReactiveVar (false);
  this.rPosicio = new ReactiveVar (0);
  this.autorun(()=>{
    if(this.rIdIngredient.get()!=null){
      Meteor.setTimeout(function(){
        $(".card_subproducte").draggable({appendTo: '#yeldui', containment: 'html', helper:"clone" });
        $("#focus").droppable({});
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
  // $("#dreta").mouseover(function(){
  //   	$(".card_subproducte").draggable({helper:"clone"});
  //   });
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
    console.log(idImatge);
    var idImatgeCentral = Subingredient.findOne({imatge:idImatge}).imatgeCentral;
    console.log(idImatgeCentral);
    var nomImatge = Images.findOne({_id:idImatgeCentral}).original.name;
    Template.instance().rIdImatge.set(idImatgeCentral);
    Template.instance().rNomImatge.set(nomImatge);
  },

  'drop #focus': function(event, template){
    var pos = Template.instance().rPosicio.get();
    console.log(pos);
    var tagImg = '<div class="cardDrop" style="top: '+pos+'px"><img src="/cfs/files/images/'+Template.instance().rIdImatge.get()+'/'+Template.instance().rNomImatge.get()+'"></div>';
    $("#focus").add(tagImg).appendTo("#focus");
    //$("#focus").scrollTop($("#focus")[0].scrollHeight);
    console.log(this);
    Template.instance().rPosicio.set(pos+323);
    console.log(Template.instance().rPosicio.get());
  },

  'click #animacio': function(event, template){
    //console.log("anim");
    var n = 0;
    var i = -10;
    var px = "px";
    $("#focus > *:nth-child(n)").each(function() {
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
  }
});
