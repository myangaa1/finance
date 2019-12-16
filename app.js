// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
  return {
    addItem: function(type, desc, val) {
      var item, id;

      id =
        data.items[type].length === 0
          ? 1
          : data.items[type][data.items[type].length - 1].id + 1;

      item =
        type === "inc" ? new Income(id, desc, val) : new Expense(id, desc, val);

      data.items[type].push(item);
    },
    getData: function() {
      return data;
    }
  };
})();

// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
  function ctrlAddItem() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    // 2. Олж авсан өгөгдлүүдээ санхүүгийн кинтролерт дамжуулж тэнд хадгална.
    financeController.addItem(input.type, input.description, input.value);
    console.log(financeController.getData());
    // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
    // 4.Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  }

  var setupEventListener = function() {
    document
      .querySelector(uiController.getDOMstrings().addBtn)
      .addEventListener("click", function() {
        ctrlAddItem();
      });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function() {
      setupEventListener();
    }
  };
})(uiController, financeController);

appController.init();
