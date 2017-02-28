import './inici.html';

Template.inici.events({
  'click #creaBurger': function () {
    Router.go('/burger');
  }
});
