import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Producte } from "./producte/producte.js";
import { Ingredient } from "./ingredient/ingredient.js";
import { Subingredient } from "./subingredient/subingredient.js";
import { Carrito } from "./carrito/carrito.js";
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
        nom:nom,
        imatge: imatge
      }
    });
  }
});

export const borrarProducte = new ValidatedMethod({
  name: "Producte.remove",
  validate: new SimpleSchema({
      id: { type: String}
  }).validator(),
  run({id}) {
  /*  if(!this.userId){
		throw new Meteor.Error("Ingredient.remove.unauthorized",
        "Permís denegat. Cal estar identificat");
	}*/
	return Producte.remove({_id: id});
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

// export const editarIngredient = new ValidatedMethod({
//   name: "ingredient.edit",
//   validate: new SimpleSchema({
//     id: { type: String },
//     nom: { type: String},
//     imatge: { type: String}
//   }).validator(),
//   run({id, nom, imatge}){
//     return Ingredient.update({
//       _id: id
//     },{
//       $set: {
//         imatge: imatge
//       }
//     });
//   }
// });

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
        nom: nom,
        imatge: imatge
      }
    });
  }
});

export const borrarIngredient = new ValidatedMethod({
  name: "Ingredient.remove",
  validate: new SimpleSchema({
      id: { type: String}
  }).validator(),
  run({id}) {
  /*  if(!this.userId){
		throw new Meteor.Error("Ingredient.remove.unauthorized",
        "Permís denegat. Cal estar identificat");
	}*/
	return Ingredient.remove({_id: id});
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
    idIngredient: { type: String},
    imatge: { type: String},
    imatgeCentral: { type: String},
    preu: { type: Number, decimal: true},
    pes: { type: Number},
    posicio: { type: Number}
  }).validator(),
  run({id, nom, idIngredient, imatge, imatgeCentral, preu, pes, posicio}){
    return Subingredient.update({
      _id: id
    },{
      $set: {
        nom: nom,
        idIngredient: idIngredient,
        imatge: imatge,
        imatgeCentral: imatgeCentral,
        preu: preu,
        pes: pes,
        posicio: posicio
      }
    });
  }
});

export const borrarSubingredient = new ValidatedMethod({
  name: "Subingredient.remove",
  validate: new SimpleSchema({
      id: { type: String}
  }).validator(),
  run({id}) {
  /*  if(!this.userId){
		throw new Meteor.Error("Ingredient.remove.unauthorized",
        "Permís denegat. Cal estar identificat");
	}*/
	return Subingredient.remove({_id: id});
  }
});

export const crearUsuari = new ValidatedMethod({
  name: "user.add",
  validate: new SimpleSchema({
    username: { type: String},
    password: { type: String}
  }).validator(),
  run({username,password}) {
      return Accounts.createUser({username:username, password:password});
    }
});

// export const crearCarrito = new ValidatedMethod({
//   name: "carrito.add",
//   validate: new SimpleSchema({
//
//   }).validator(),
//
// });
