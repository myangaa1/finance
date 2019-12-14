var uiController = (function() {
  var x = 100;
  function add(y) {
    return x + y;
  }

  return {
    publicAdd: function(a) {
      a = add(a);
      console.log("Боловцруулсан утга : " + a);
    }
  };
})();

var financeController = (function() {})();
var appController = (function(uiController, financeController) {})(
  uiController,
  financeController
);
// uiController.publicAdd(999);
// uiController.publicAdd(1100);
