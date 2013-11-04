var Indexes = require('./Indexes');

module.exports = CArrayEntry;

function CArrayEntry(cArray, indexes) {
  this.cArray = cArray;
  this.indexes = Indexes.getIndexes(indexes, cArray);
}

CArrayEntry.prototype.get = function (property) {
  return this.cArray.getProperty(property).saveGet(this.indexes);
};

CArrayEntry.prototype.forEachProperty = function (callback) {
  var self = this;
  this.cArray.forEachProperty(function (property) {
    callback(property.name, self.get(property));
  });
};

CArrayEntry.prototype.forEachIndex = function (callback) {
  return this.indexes.forEach(callback);
};

CArrayEntry.prototype.forEachKey = function (callback) {
  for (var i = 0; i<this.indexes.length; i++) {
    callback(this.cArray.indexes.getName(i), this.indexes[i]);
  }
};

CArrayEntry.prototype.key = function (name) {
  var position = this.cArray.indexes.getPositionOf(name);
  if (position === -1)
    return null;

  var type = this.cArray.indexes.getType(position);
  var value =  this.indexes[position];
  if (type === 'int') {
    value = parseInt(value, 10);
  }
  if (type !== 'int' && type !== 'string') {
    value = this.cArray.state.get(type).get(value);
  }
  return value;
};

CArrayEntry.prototype.deleted = function () {
  return (this.cArray.state.deleted(this.indexes, this.cArray));
};

CArrayEntry.prototype.index = function () {
  return Indexes.createIndex(this.indexes);
};