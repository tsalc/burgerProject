import { Meteor } from 'meteor/meteor'
import './baseLayout.html';
import '../../startup/accounts-config.js';


Template.baseLayout.helpers({
  currentUserHelper: function() {
    return Meteor.user().username;
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
      }
    });
  },

  'click #regist': function(event, template){
    event.preventDefault();
    var usernameVar = template.find('#nom').value;
    var passwordVar = template.find('#contrasenya').value;
    Accounts.createUser({
      username: usernameVar,
      password: passwordVar
    },function(err){
      if (err){
        alert(err.message);
      }
    });

  },

  'click #logout': function(event, template){
    event.preventDefault();
    Meteor.logout();
    $('#myModal').modal('toggle');
  }
});
