import {Meteor} from 'meteor/meteor';
import {Producte} from '../../api/lists/producte/producte.js';

export productesPublish function () {
  Meteor.publish('producte', function () {
    return Producte.find({});
  });
};
