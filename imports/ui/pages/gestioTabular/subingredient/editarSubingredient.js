import './editarSubingredient.html';
import {editarSubingredient, borrarSubingredient} from '../../../../api/lists/methods.js';

Template.editarSubingredient.helpers({
  subingredient: function() {
    //return ingredient.findOne{_id:this._id};
  }
});
Template.editarSubingredient.events({

  "click .editar": function(event, template){
  var id = this._id;
  var nom = $('input[name="nom"]').val();
  var idIngredient = this.idIngredient;
  var preu = parseFloat($('input[name="preu"]').val());
  var pes = parseInt($('input[name="pes"]').val());
  var posicio = parseInt($('input[name="posicio"]').val());
//  var preu = this.preu;
//  var pes = this.pes;
//  var posicio = this.posicio;
  var imatge = this.imatge;
  var imatgeCentral = this.imatgeCentral;

  editarSubingredient.call({
    id: id,
    nom: nom,
    idIngredient: idIngredient,
    imatge: imatge,
    imatgeCentral: imatgeCentral,
    preu: preu,
    pes: pes,
    posicio: posicio
  }, (err,res) => {
  if (err) {
  alert(err);
  console.log(err);
  } else {
    console.log('Registre editat correctament');
    Router.go('/tabularSubingredient');
  }
  });

  //Meteor.call('tabularingredient', obj, id);

  },

  "click .borrar": function(event, template) {
      var id = this._id;
      borrarSubingredient.call({
        id: id
      }, (err,res) => {
      if (err) {
      alert(err);
      } else {
        console.log('Registre borrar correctament');
        Router.go('/tabularSubingredient');
      }
      });
  }
});
