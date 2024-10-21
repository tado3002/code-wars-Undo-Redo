// The purpose of this kata is to implement the undoRedo function.
// This function takes an object and returns an object that has these actions to
// be performed on the object passed as a parameter: set(key, value) Assigns the
// value to the key. If the key does not exist, creates it. get(key) Returns the
// value associated to the key. del(key) removes the key from the object. undo()
// Undo the last operation (set or del) on the object. Throws an exception if
// there is no operation to undo. redo() Redo the last undo operation (redo is
// only possible after an undo). Throws an exception if there is no operation to
// redo. After set() or del() are called, there is nothing to redo. All actions
// must affect to the object passed to undoRedo(object) function. So you can not
// work with a copy of the object. Any set/del after an undo should disallow new
// redos.
//
function UndoRedo(object) {
  return {
    objHistory : [ object ],
    countNow : 0,
    // get Object
    getObject() { console.log(this.objHistory[this.countNow]); },
    // set methode
    set : function(key, value) {
      let newObject = {...this.objHistory[this.countNow]};
      newObject[key] = value;
      this.objHistory.push(newObject);
      this.countNow++;
    },
    // get methode
    get : function(key) { return this.objHistory[this.countNow][key]; },
    // delete methode
    del : function(key) {
      let newObject = {...this.objHistory[this.countNow]};
      newObject[key] = undefined;
      // delete properties if value is undefined
      for (let key in newObject) {
        if (newObject[key] === undefined)
          delete newObject[key];
      }
      this.objHistory.push(newObject);
      this.countNow++;
    },
    // undo methode
    undo : function() {
      if (this.countNow === 0)
        throw Error;
      this.countNow--;
    },
    redo : function() {
      if (this.countNow === this.objHistory.length - 1)
        throw Error;
      this.countNow++;
    },
  };
}

exports = {UndoRedo};
// const obj = {
//   x: 1,
//   y: 2,
// };
// const unReObj = UndoRedo(obj);
//// perubahan pertama
// console.log(unReObj.set("z", 7));
// console.log(unReObj);
// unReObj.undo();
// unReObj.getObject();
// unReObj.redo();
// unReObj.getObject();
// unReObj.redo();
