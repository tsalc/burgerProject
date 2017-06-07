import './insertSubingredient.html';
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { Producte } from "../../api/lists/producte/producte.js";
import { Subingredient } from "../../api/lists/subingredient/subingredient.js";
import { crearSubingredient } from '../../api/lists/methods.js';
import { editarSubingredient } from '../../api/lists/methods.js';
import { Images } from '../../api/lists/producte/producte.js';
import { ReactiveVar } from 'meteor/reactive-var';


Template.insertSubingredient.onCreated(function(){
  this.rIdProducte = new ReactiveVar (false);
  this.rIdImatge = new ReactiveVar (false);
  this.rIdImatgeCentral = new ReactiveVar (false);
});

Template.insertSubingredient.helpers({
  ingredient: function() {
    return Ingredient.find({idProducte:Template.instance().rIdProducte.get()});
  },

  producte: function() {
    return Producte.find({});
  }
});

Template.insertSubingredient.events({
  "click #insertSubproducte": function(event, template){
    var nom         = $('input[name="nom"]').val();
    var ingr        = $('#ingredient').val();
    var preu        = parseFloat($('#preu').val());
    var pes        = parseInt($('#pes').val());
    var posicio        = parseInt($('#posicio').val());

    idSubingredient = crearSubingredient.call({
      nom: nom,
      idIngredient: ingr,
      imatge: " ",
      imatgeCentral: " ",
      preu: preu,
      pes: pes,
      posicio: posicio
    }, (err, res) => {
      if (err) {
        alert(err);
        console.log("crear");
        console.log(ingr);
      } else {
        console.log('Registre afegit correctament (insertarSubingredient.js)');
      }
    });
    editarSubingredient.call({
      id: idSubingredient,
      nom: Subingredient.findOne({_id:idSubingredient}).nom,
      idIngredient: ingr,
      imatge: Template.instance().rIdImatge.get()._id,
      imatgeCentral: Template.instance().rIdImatgeCentral.get()._id,
      preu: Subingredient.findOne({_id:idSubingredient}).preu,
      pes: Subingredient.findOne({_id:idSubingredient}).pes,
      posicio: Subingredient.findOne({_id:idSubingredient}).posicio
    }, (err, res) => {
      if (err) {
        alert(err);
        console.log("editar");
        console.log(ingr);
      } else {
        console.log('Registre editat correctament (insertarSubingredient.js)');
      }
    });
  },


  'change #insertImatge': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      idImatge = Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      Template.instance().rIdImatge.set(idImatge);
      console.log(Template.instance().rIdImatge.get());
    });
  },

  'change #insertImatgeCentral': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      idImatgeCentral = Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      Template.instance().rIdImatgeCentral.set(idImatgeCentral);
      console.log(Template.instance().rIdImatgeCentral.get());
    });
  },

  'change #producte': function (event, template){
    var estatProducte = $('#producte').val();
    Template.instance().rIdProducte.set(estatProducte);
  }
});
