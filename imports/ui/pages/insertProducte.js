import './insertProducte.html';
import { crearProducte } from '../../api/lists/methods.js';
import { editarProducte } from '../../api/lists/methods.js';
import '../../api/lists/producte/producte.js';
import { Images } from '../../api/lists/producte/producte.js';

//Aquí haig de fer un template events al formulari de insertProducte i fer un Meteor.call del valida


Template.insertProducte.events({
  //"submit form"
  "click #insertImatge": function(event, template){
    //event.preventDefault();
    var nom         = $('input[name="nom"]').val();
    idProducte = crearProducte.call({
      nom: nom,
      imatge: " "
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log('Registre afegit correctament (insertProducte.js)');
      }
    });
},


  'change .form': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      idImatge = Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
      console.log("nom val aixo");
      console.log(nom);
      editarProducte.call({
        id: idProducte,
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
