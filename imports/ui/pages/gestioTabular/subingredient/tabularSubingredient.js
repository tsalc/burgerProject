import '../../../../api/lists/subingredient/subingredient.js';
import './tabularSubingredient.html';
import './editarSubingredient.js';

Template.tabularSubingredient.events({
    'click tbody > tr': function(event) {
      var dataTable = $(event.target).closest('table').DataTable();
      var rowData = dataTable.row(event.currentTarget).data();
      //var prova = rowData._id;
      Session.set('idSubingredient',rowData._id);
      Router.go('/tabularSubingredient/'+rowData._id);
    }
});
