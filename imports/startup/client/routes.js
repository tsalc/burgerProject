import { Router } from 'meteor/iron:router';// import {baseLayout} from ../imports/ui/layouts/baseLayout.js;
import '../../ui/layouts/baseLayout.js';
import '../../ui/components/inici/inici.js';
import '../../ui/pages/burger.js';
import '../../ui/pages/comandes.js';
import '../../ui/pages/insertProducte.js';

Router.configure({
  layoutTemplate: 'baseLayout'
});

Router.route('/', {name: 'inici'},function(){
  this.render('inici');
});

Router.route('/burger',function(){
  this.render('burger');
});

Router.route('/comandes',function(){
  this.render('comandes');
});

Router.route('/insertProducte',function(){
  this.render('insertProducte');
});
