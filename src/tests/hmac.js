const product = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

// PUT method

db.collection.updateOne({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
});

// PATCH method

db.collection.updateOne({

  c: {
    d: 3,
  },
});