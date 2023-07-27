(function () {
  "use strict";

  angular
    .module("todoListApp", [])
    .controller("addTodoController", addTodoController)
    .controller("displayTodoController", displayTodoController)
    .service("todoListService", todoListService);

  addTodoController.$inject = ["todoListService"];
  function addTodoController(todoListService) {
    var tt = this;
    this.name = "45353";

    tt.addTodo = function () {
      todoListService.addTodo(tt.name);
    };

    tt.filterOption = todoListService.option;
    tt.updateFilterOption = function (option) {
      tt.filterOption = option;
      console.log(tt.filterOption);
      console.log(todoListService.getTodos());
    };
  }

  displayTodoController.$inject = ["todoListService"];
  function displayTodoController(todoListService) {
    var tt = this;

    tt.toDoItems = todoListService.getTodos();

    tt.deleteItem = function (index) {
      todoListService.removeTodo(index);
    };

    tt.deleteTodo = function (index) {
      var todo = tt.toDoItems[index];
      todoListService.removeTodo(index);

      var todoElement = document.getElementById("todo-" + index);
      if (todoElement) {
        todoElement.classList.add("fall");

        todoElement.addEventListener("transitionend", function () {
          todoElement.remove();
        });
      }
    };

    tt.toggleStatus = function (index) {
      todoListService.toggle(index);
    };
  }

  // Services:
  function todoListService() {
    var tt = this;
    var toDo = [];
    tt.option = "all";

    // add , remove

    tt.addTodo = function (val) {
      toDo.push({
        value: val,
        isCompleted: false,
      });
    };

    tt.removeTodo = function (index) {
      toDo.splice(index, 1);
    };

    tt.getTodos = function () {
      if (tt.option == "all") return toDo;
      else if (tt.option == "completed") {
        return toDo.filter((item) => item.isCompleted);
      } else {
        return toDo.filter((item) => !item.isCompleted);
      }

      // return toDo;
    };

    tt.toggle = function (index) {
      toDo[index].isCompleted = toDo[index].isCompleted ? false : true;
    };
  }
})();
