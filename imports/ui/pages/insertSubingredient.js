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
});

Template.insertSubingredient.onRendered(function(){
  console.log(Template.instance().rIdProducte.get());
})

Template.insertSubingredient.helpers({
  ingredient: function() {
    return Ingredient.find({idProducte:Template.instance().rIdProducte.get()});
  },

  producte: function() {
    return Producte.find({});
  }
});

Template.insertSubingredient.events({
  "click #insertImatge": function(event, template){
    var nom         = $('input[name="nom"]').val();
    var ingr        = $('#ingredient').val();
    var preu        = parseFloat($('#preu').val());
    idSubingredient = crearSubingredient.call({
      nom: nom,
      idIngredient: ingr,
      imatge: " ",
      preu: preu
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log('Registre afegit correctament (insertarSubingredient.js)');
      }
    });
  },


  'change .form': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      idImatge = Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      editarSubingredient.call({
        id: idSubingredient,
        nom: "",
        imatge: idImatge._id
      }, (err, res) => {
        if (err) {
          alert(err);
        } else {
          console.log('Registre editat correctament (insertProducte.js)');
        }
      });
    });
  },

  'change #producte': function (event, template){
    var estatProducte = $('#producte').val();
    Template.instance().rIdProducte.set(estatProducte);
  }

// FALTA FER UN https://themeteorchef.com/tutorials/reactive-dict-reactive-vars-and-session-variables

});
