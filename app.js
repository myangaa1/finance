// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };
  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function(too, type) {
    var x = too + "";

    x = x
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];
      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  return {
    typeChange: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType,
        ".add__description",
        ".add__value"
      );
      //console.log(field);
      nodeListForeach(fields, function(el) {
        el.classList.toggle("red-focus");
      });

      document.querySelector(DOMstrings.addBtn).classList.toggle("red");
      // location = "http://1234.mn";
    },

    displayDate: function() {
      var unuudur = new Date();

      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() + " oны " + unuudur.getMonth() + " сарын ";
    },

    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    displayPercentages: function(allPercentages) {
      // Зарлагын NodeList-ийг олох
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );

      // Элемемт болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function(el, index) {
        el.textContent = allPercentages[index] + "%";
      });
    },
    getDOMstrings: function() {
      return DOMstrings;
    },

    deleteItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },

    addListItem: function(item, type) {
      // Орлого зарлагын элементийг агуулсан html-г бэлдэнэ.
      var html, list;

      if (type === "inc") {
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item_delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        list = DOMstrings.incomeList;
      } else {
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item_delete"><button class="item__delete--btn">   <i class="ion-ios-close-outline"></i></button></div></div></div>';
        list = DOMstrings.expenseList;
      }

      // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("%description%", item.description);
      html = html.replace("$$VALUE$$", formatMoney(item.value, type));

      // Бэлтгэсэн html-ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      // Convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });

      // курсорыг description textbox дээр аваачих функц
      fieldsArr[0].focus();
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },
    tusviigUzuuleh: function(tusuv) {
      var type = tusuv.tusuv > 0 ? "inc" : "exp";

      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      document.querySelector(DOMstrings.percentageLabel).textContent =
        tusuv.huvi + "%";
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
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };
  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },
    tusuv: 0,

    huvi: 0
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

      return item;
    },
    getData: function() {
      return data;
    },

    tusuvTootsooloh: function() {
      // Нийт орлогын нийлбэрийг тооцоолно
      calculateTotal("inc");

      //Нийт зарлагын нийлбэрийг тооцоолно
      calculateTotal("exp");

      //Төсвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;

      // Орлого зарлагын хувийг тооцоолно
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },

    tusviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });
      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
    getPercentages: function() {
      var allPercentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPercentages;
    },
    calculatePercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    }
  };
})();

// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
  function ctrlAddItem() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    if (input.description !== "" && input.value !== "") {
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн кинтролерт дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      //Төсөвийг шинээр тооцоолод дэлгэцэнд үзүүлнэ.
      updateTusuv();
    }
  }

  var updateTusuv = function() {
    // 4.Төсвийг тооцоолно.
    financeController.tusuvTootsooloh();

    // 5. Эцсийн үлдэгдэл
    var tusuv = financeController.tusviigAvah();

    // 6. тооцоог дэлгэцэнд гаргана.
    uiController.tusviigUzuuleh(tusuv);

    // 7. Элементүүдийн хувийг тооцоолно.
    financeController.calculatePercentages();

    // 8.Элементүүдийн хувийг хүлээж авна.
    var allPercentages = financeController.getPercentages();

    // 9.Эдгээр хувийг дэгэцэнд гаргана.
    uiController.displayPercentages(allPercentages);
    console.log(allPercentages);
  };

  var setupEventListener = function() {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.typeChange);
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          //console.log(type + "==>" + itemId);

          // 1. Санхүүгийн модулаас type, id ашиглаад устгана.
          financeController.deleteItem(type, itemId);

          // 2. Дэлгэц дээрээс энэ элементийг устгана
          uiController.deleteItem(id);

          // 3. Үлдэгдэл тооцоог шинэчилж харуулна
          // Төсөвийг шинээр тооцоолод дэлгэцэнд үзүүлнэ.
          updateTusuv();
        }
      });
  };
  return {
    init: function() {
      console.log("A[[lication started....");
      uiController.displayDate();
      setupEventListener();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
    }
  };
})(uiController, financeController);

appController.init();
