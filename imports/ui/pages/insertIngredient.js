import './insertIngredient.html';
import { Producte } from "../../api/lists/producte/producte.js";
import { Ingredient } from "../../api/lists/ingredient/ingredient.js";
import { crearIngredient } from '../../api/lists/methods.js';
import { editarIngredient } from '../../api/lists/methods.js';
import { Images } from '../../api/lists/producte/producte.js';

Template.insertIngredient.helpers({
  producte: function() {
    return Producte.find({});
  }
});

Template.insertIngredient.events({
  // $('input[name="producte"]').val();
  "click #insertImatge": function(event, template){
    //event.preventDefault();
    var nom         = $('input[name="nom"]').val();
    var prod        = $('#producte').val();
    idIngredient = crearIngredient.call({
      nom: nom,
      idProducte: prod,
      imatge: " "
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log('Registre afegit correctament (insertarIngredient.js)');
      }
    });
},


  'change .form': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      idImatge = Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      editarIngredient.call({
        id: idIngredient,
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
  }
});
