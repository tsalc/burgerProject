import './insertProducte.html';
import { crearProducte } from '../../api/lists/methods.js';
import '../../api/lists/producte/producte.js';

//Aquí haig de fer un template events al formulari de insertProducte i fer un Meteor.call del valida
Template.insertProducte.events({
  "click .insertProducte": function(event, template){

    var nom         = $('input[name="nom"]').val();
    var esgotat     = $('input[name="esgotat"]').val();
    var color       = $('input[name="color"]').val();

    crearProducte.call({
      nom: nom,
      esgotat: esgotat,
      color: color
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        console.log('Registre afegit correctament');
      }
      Modal.hide();
    });

  }
});
