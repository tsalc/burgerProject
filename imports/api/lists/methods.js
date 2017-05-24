import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Producte } from "./producte/producte.js";
import { Ingredient } from "./ingredient/ingredient.js";
import { Subingredient } from "./subingredient/subingredient.js";
import { Accounts } from 'meteor/accounts-base';

export const crearProducte = new ValidatedMethod({
  name: "producte.add",
  validate: new SimpleSchema({
    nom: { type: String},
    imatge: { type: String}
  }).validator(),
  run({id, nom}){
    return Producte.insert({nom:nom, imatge:" "});
  }
});

export const editarProducte = new ValidatedMethod({
  name: "producte.edit",
  validate: new SimpleSchema({
    id: { type: String },
    nom: { type: String},
    imatge: { type: String}
  }).validator(),
  run({id, nom, imatge}){
    return Producte.update({
      _id: id
    },{
      $set: {
        imatge: imatge
      }
    });
  }
});

export const crearIngredient = new ValidatedMethod({
  name: "ingredient.add",
  validate: new SimpleSchema({
    nom: { type: String},
    idProducte: { type: String},
    imatge: { type: String}
  }).validator(),
  run({id, nom, idProducte, imatge}){
    return Ingredient.insert({nom:nom, idProducte:idProducte, imatge:" "});
  }
});

export const editarIngredient = new ValidatedMethod({
  name: "ingredient.edit",
  validate: new SimpleSchema({
    id: { type: String },
    nom: { type: String},
    imatge: { type: String}
  }).validator(),
  run({id, nom, imatge}){
    return Ingredient.update({
      _id: id
    },{
      $set: {
        imatge: imatge
      }
    });
  }
});

export const crearSubingredient = new ValidatedMethod({
  name: "subingredient.add",
  validate: new SimpleSchema({
    nom: { type: String},
    idIngredient: { type: String},
    imatge: { type: String},
    imatgeCentral: { type: String},
    preu: { type: Number, decimal: true},
    pes: { type: Number},
    posicio: { type: Number}
  }).validator(),
  run({id, nom, idIngredient, imatge, imatgeCentral, preu, pes, posicio}){
    return Subingredient.insert({nom:nom, idIngredient:idIngredient, imatge:" ", imatgeCentral:" ", preu:preu, pes:pes, posicio:posicio});
  }
});

export const editarSubingredient = new ValidatedMethod({
  name: "subingredient.edit",
  validate: new SimpleSchema({
    id: { type: String },
    nom: { type: String},
    imatge: { type: String},
    imatgeCentral: { type: String}
  }).validator(),
  run({id, nom, imatge, imatgeCentral}){
    return Subingredient.update({
      _id: id
    },{
      $set: {
        imatge: imatge,
        imatgeCentral: imatgeCentral
      }
    });
  }
});

export const crearUsuari = new ValidatedMethod({
  name: "user.add",
  validate: new SimpleSchema({
    email: { type: String},
    name: { type: String}
  }).validator(),
  run({email,name}) {
    if(!this.userId){
      throw new Meteor.Error( "Meteor.users.edit.unauthorized",
                              "Permís denegat. Cal estar identificat");
      }

      let profile = {'name': name};
      let mail = [{"address": email, "verified": false}];

      return Meteor.users.insert({email:email,profile:profile});
    }
});
