define(function() {

  var MyClass = function(options) {
    //constructor
  };

  var p = MyClass.prototype; /* = new InheritedClass() ?? */
    
  p.protoMethod = function() {
      //prototype method
  };

  return MyClass;
});