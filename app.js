// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {})();

// Санхүүтэй ажиллах контроллер
var financeController = (function() {})();

// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
  function ctrlAddItem() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн кинтролерт дамжуулж тэнд хадгална.
    // 3. Олж авсан өгөгдлүүдээ вебийн тохирох хэсэгт гаргана.
    // 4.Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    console.log("Enter daragdsan");
  }

  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
