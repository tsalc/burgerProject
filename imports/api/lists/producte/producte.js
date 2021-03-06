export const Producte = new Mongo.Collection('producte');

var imageStore = new FS.Store.FileSystem("images");
export const Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
});

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

new Tabular.Table({
   name: "Productes",
   collection: Producte,
   columns: [
   {data: "_id", title: "id"},
   {data: "nom", title: "Nom"}
   ]
});
