Categories = new Mongo.Collection("categories");

// db.categories.insert({ name: "Type 1" });

// See: https://github.com/peerlibrary/meteor-peerdb/issues/17
// see also: https://github.com/aldeed/meteor-collection2/issues/31

Schemas.Categories = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 100,
    optional: false,
    autoform: {
      style: "width: 90%"
    }
  }
});

Categories.attachSchema(Schemas.Categories);
