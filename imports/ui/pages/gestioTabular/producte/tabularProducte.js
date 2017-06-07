import '../../../../api/lists/producte/producte.js';
import './tabularProducte.html';
import './editarProducte.js';

Template.tabularProducte.events({
    'click tbody > tr': function(event) {
      var dataTable = $(event.target).closest('table').DataTable();
      var rowData = dataTable.row(event.currentTarget).data();
      //var prova = rowData._id;
      Session.set('idProducte',rowData._id);
      Router.go('/tabularProducte/'+rowData._id);
    }
});
