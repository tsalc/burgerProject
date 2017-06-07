import '../../../../api/lists/ingredient/ingredient.js';
import './tabularIngredient.html';
import './editarIngredient.js';
import { Producte } from "../../../../api/lists/producte/producte.js";
import { Ingredient } from "../../../../api/lists/ingredient/ingredient.js";

Template.tabularIngredient.events({
    'click tbody > tr': function(event) {
      var dataTable = $(event.target).closest('table').DataTable();
      var rowData = dataTable.row(event.currentTarget).data();
      //var prova = rowData._id;
      Session.set('idIngredient',rowData._id);
      Router.go('/tabularIngredient/'+rowData._id);
    }
});

Template.tabularIngredient.helpers({
  'producte': function() {
    return Producte.find();
  }
});
