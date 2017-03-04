import {Meteor} from 'meteor/meteor';
import {Producte} from '../../api/lists/producte/producte.js';

export default function () {
  Meteor.publish('images', function(){ return Images.find(); });
};
