export const Ingredient = new Mongo.Collection('ingredient');

new Tabular.Table({
   name: "Ingredients",
   collection: Ingredient,
   columns: [
   {data: "_id", title: "id"},
   {data: "nom", title: "Nom"}
]
//  selector() {
//    return { idProducte: prova };
//  }
});
