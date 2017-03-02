import './insertProducte.html';
import { crearProducte } from '../../api/lists/methods.js';
import '../../api/lists/producte/producte.js';

//Aquí haig de fer un template events al formulari de insertProducte i fer un Meteor.call del valida
Template.insertProducte.events({
  "submit form": function(event, template){
    event.preventDefault();
    var nom         = $('input[name="nom"]').val();
    crearProducte.call({
      nom: nom
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log('Registre afegit correctament');
      }
    });

  }
});
