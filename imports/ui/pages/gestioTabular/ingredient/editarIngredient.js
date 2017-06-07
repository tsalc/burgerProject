import './editarIngredient.html';
import {editarIngredient, borrarIngredient} from '../../../../api/lists/methods.js';

Template.editarIngredient.helpers({
  ingredient: function() {
    //return ingredient.findOne{_id:this._id};
  }
});
Template.editarIngredient.events({

  "click .editar": function(event, template){
  var id = this._id;
  var nom = $('input[name="nom"]').val();
  var imatge = this.imatge;

  editarIngredient.call({
  id: id,
  nom: nom,
  imatge: imatge
  }, (err,res) => {
  if (err) {
  alert(err);
  } else {
    console.log('Registre editat correctament');
    Router.go('/tabularIngredient');
  }
  });

  //Meteor.call('tabularingredient', obj, id);

  },

  "click .borrar": function(event, template) {
      var id = this._id;
      borrarIngredient.call({
        id: id
      }, (err,res) => {
      if (err) {
      alert(err);
      } else {
        console.log('Registre borrar correctament');
        Router.go('/tabularIngredient');
      }
      });
  }
});
