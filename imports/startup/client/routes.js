import { Router } from 'meteor/iron:router';// import {baseLayout} from ../imports/ui/layouts/baseLayout.js;
import '../../ui/layouts/baseLayout.js';
import '../../ui/components/cos/cos.js';

Router.configure({
  layoutTemplate: 'baseLayout'
});

Router.route('/',function(){
  this.render('cos');
});
