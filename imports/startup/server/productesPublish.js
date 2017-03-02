import {Meteor} from 'meteor/meteor';
import {Producte} from '../../api/lists/producte/producte.js';

export default function () {
  Meteor.publish('producte', function () {
    return Producte.find();
  });
};

Producte._ensureIndex('nom', {unique:1});
