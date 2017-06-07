import { Meteor } from 'meteor/meteor';
import './baseLayout.html';
import '../../startup/accounts-config.js';
import { crearUsuari } from '../../api/lists/methods.js';
import { afegirRolUsuari } from '../../api/lists/methods.js';

Template.baseLayout.onCreated(function(){
  this.idUserVarReact = new ReactiveVar (false);
});

Template.baseLayout.helpers({
  currentUserHelper: function() {
    return Meteor.user().username;
  },

  idUserMethod: function() {
    return Template.instance().idUserVarReact.get();
  }

});

Template.baseLayout.events({
  'submit #form': function(event, template){
    event.preventDefault();
    var usernameVar = template.find('#nom').value;
    var passwordVar = template.find('#contrasenya').value;
    Meteor.loginWithPassword(usernameVar, passwordVar, function(err){
      if (err){
        alert(err.message);
      }
      else{
         $('#myModal').modal('toggle');
         Session.set('sCarrito',false);
         Router.go('/');
      }
    });
  },

  'click #regist': function(event, template){
    event.preventDefault();
    var usernameVar = template.find('#nom').value;
    var passwordVar = template.find('#contrasenya').value;
    var idUser = Accounts.createUser({
     username: usernameVar,
     password: passwordVar
    },function(err){
     if (err){
       alert(err.message);
     }
     else {
       Template.instance().idUserVarReact.set(idUser);
       $('#myModal').modal('toggle');
       Session.set('sCarrito',false);
       Router.go('/');
     }
    });
    $('#myModal').modal('toggle');
  },

  'click #logout': function(event, template){
    event.preventDefault();
    Meteor.logout();
    $('#myModal').modal('toggle');
    Session.set('sCarrito',false);
    Router.go('/');
  },

  'click #cancel': function(event, template){
    event.preventDefault();
    $('#myModal').modal('toggle');
  }
});
