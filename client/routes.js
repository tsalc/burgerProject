// import {baseLayout} from ../imports/ui/layouts/baseLayout.js;
import '../imports/ui/layouts/baseLayout.js';
import '../imports/ui/components/cos.js';

Router.configure({
  layoutTemplate: 'baseLayout'
});

Router.route('/',function(){
  this.render('cos');
});
