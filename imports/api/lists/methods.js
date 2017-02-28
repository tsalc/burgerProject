import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Producte } from "../producte/producte.js";

export const crearProducte = new ValidatedMethod({
  name: "producte.add",
  validate: new SimpleSchema({
    id: { type: String},
    nom: { type: String},
    esgotat: { type: Boolean }
  }).validator(),
  run({id, nom, esgotat}){
    return Producte.insert({id:id, nom:nom, esgotat:esgotat});
  }
});
