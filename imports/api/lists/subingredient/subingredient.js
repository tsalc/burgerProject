export const Subingredient = new Mongo.Collection('subingredient');

new Tabular.Table({
   name: "Subingredients",
   collection: Subingredient,
   columns: [
   {data: "_id", title: "id"},
   {data: "nom", title: "Nom"},
   {data: "preu", title: "Preu"},
   {data: "pes", title: "Pes"},
   {data: "posicio", title: "Posicio"}
   ]
});
