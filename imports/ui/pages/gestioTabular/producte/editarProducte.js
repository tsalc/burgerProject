import './editarProducte.html';
import {editarProducte, borrarProducte} from '../../../../api/lists/methods.js';

Template.editarProducte.helpers({
  producte: function() {
    //return Producte.findOne{_id:this._id};
  }
});
Template.editarProducte.events({

  "click .editar": function(event, template){
  var id = this._id;
  var nom = $('input[name="nom"]').val();
  var imatge = this.imatge;

  editarProducte.call({
  id: id,
  nom: nom,
  imatge: imatge
  }, (err,res) => {
  if (err) {
  alert(err);
  } else {
    console.log('Registre editat correctament');
    Router.go('/tabularProducte');
  }
  });

  //Meteor.call('tabularProducte', obj, id);

  },

  "click .borrar": function(event, template) {
      var id = this._id;
      borrarProducte.call({
        id: id
      }, (err,res) => {
      if (err) {
      alert(err);
      } else {
        console.log('Registre borrar correctament');
        Router.go('/tabularProducte');
      }
      });
  }
});
