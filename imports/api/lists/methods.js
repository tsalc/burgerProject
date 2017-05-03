import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Producte } from "./producte/producte.js";
import { Ingredient } from "./ingredient/ingredient.js";
import { Subingredient } from "./subingredient/subingredient.js";

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
    imatge: { type: String}
  }).validator(),
  run({id, nom, idIngredient, imatge}){
    return Subingredient.insert({nom:nom, idIngredient:idIngredient, imatge:" "});
  }
});

export const editarSubingredient = new ValidatedMethod({
  name: "subingredient.edit",
  validate: new SimpleSchema({
    id: { type: String },
    nom: { type: String},
    imatge: { type: String}
  }).validator(),
  run({id, nom, imatge}){
    return Subingredient.update({
      _id: id
    },{
      $set: {
        imatge: imatge
      }
    });
  }
});
