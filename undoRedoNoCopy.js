function UndoRedo(object) {
  return {
    myObject : object,
    history : [],
    future : [],
    // show object methode
    show : function() {
      console.log(this.myObject);
      console.log(this.history);
      console.log(this.future);
    },
    // set methode
    set : function(key, value) {
      // replace if object has property key
      if (this.myObject.hasOwnProperty(key)) {
        this.history.push({
          type : "set",
          key,
          oldValue : this.myObject[key],
          newValue : value,
        });
        this.myObject[key] = value;
      }
      // add if object hasnt key property key
      else {
        this.history.push({
          type : "add",
          key,
          value,
        });
        this.myObject[key] = value;
      }
      // clear redo history (future)
      this.future = [];
    },
    // get methode
    get : function(key) { return this.myObject[key]; },
    // delete methode
    del : function(key) {
      if (this.myObject.hasOwnProperty(key)) {
        this.history.push({
          type : "delete",
          key,
          value : this.myObject[key],
        });
        delete this.myObject[key];
        // clear redo history (future)
        this.future = [];
      }
    },
    // undo methode
    undo : function() {
      // throw error if length of history is 1
      if (this.history.length === 0)
        throw Error("can't to undo");
      this.future.push(this.history.pop());
      const lastIndex = this.future.length - 1;
      const current = this.future[lastIndex];
      this.sync(current, lastIndex, this.future);
    },
    // redo methode
    redo : function() {
      // throw error if length of future is 1
      if (this.future.length === 0)
        throw Error("can't to redo");
      this.history.push(this.future.pop());
      const lastIndex = this.history.length - 1;
      const current = this.history[lastIndex];
      this.sync(current, lastIndex, this.history);
    },
    // sync methode
    sync : function(current, lastIndex, list) {
      switch (current.type) {
      case "add":
        // delete key
        delete this.myObject[current.key];
        list[lastIndex] = {
          ...current,
          type : "delete",
        };

        break;
      case "set":
        // set to old value
        // ignore if key exist
        if (this.myObject.hasOwnProperty(current.key))
          return;
        this.myObject[current.key] = current.oldValue;

        list[lastIndex] = {
          ...current,
          oldValue : current.newValue,
          newValue : current.oldValue,
        };
        break;
      case "delete":
        // add key
        this.myObject[current.key] = current.value;

        list[lastIndex] = {
          ...current,
          type : "add",
        };
        break;

      default:
        break;
      }
    },
  };
}

exports = {UndoRedo};
// const obj = {};
// const unReObj = UndoRedo(obj);
// unReObj.set("x", 5);
// unReObj.set("y", 6);
// unReObj.undo();
// unReObj.set("y", 66);
// unReObj.redo();
//
// unReObj.show();
