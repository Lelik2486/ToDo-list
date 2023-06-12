function todo_app() {
  const form = document.querySelector(".form");
  const input = document.querySelector(".input");

  const createListItemElement = (item, title, list) => {
    list.innerHTML = "";
    for (const key in item) {
      const itemElement = document.createElement("li");
      const itemName = document.createElement("div");
      const doneButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      itemElement.classList.add("list__item");
      itemName.classList.add("list__name");
      doneButton.classList.add("done__button", "btn");
      deleteButton.classList.add("delete__button", "btn");
      
     

      itemName.textContent = key;
      itemElement.append(itemName);
      itemElement.append(doneButton);
      itemElement.append(deleteButton);
      list.append(itemElement);
      itemName.classList.toggle("list__name__done", item[key]);
      doneButton.classList.toggle("done__button__done", item[key]);

      doneButton.addEventListener("click", () => {
        item[key] = !item[key];

        localStorage.setItem(title, JSON.stringify(item));
        createListItemElement(item, title, list);
      });

      deleteButton.addEventListener("click", () => {
        if (confirm("Вы уверены?")) {
          delete item[key];

          localStorage.setItem(title, JSON.stringify(item));
          createListItemElement(item, title, list);
        }
      });
    }
  };

  function createTodoApp(list, title) {
    const item = JSON.parse(localStorage.getItem(title)) || {};
    const clearBtn = document.querySelector(".nav__btn");
    if (item) {
      createListItemElement(item, title, list);
    }

    form.addEventListener("submit", function (e) {
      // эта строчка необходима что бы страница не уходила в перезагрузку при отправке формы
      e.preventDefault();
      if (input.value) {
        list.innerHTML = "";
        item[input.value] = false;
        localStorage.setItem(title, JSON.stringify(item));
        createListItemElement(item, title, list);
        input.value = "";
      }
    });

    clearBtn.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        if (confirm("Вы уверены?")) {
          for (const key in item) {
            if (item[key]) {
              delete item[key];
            }
          }
          localStorage.setItem(title, JSON.stringify(item));
          createListItemElement(item, title, list);
        }
      }

      if (e.target.classList.contains("clear")) {
        if (confirm("Вы уверены?")) {
          localStorage.removeItem(title);
          const item = JSON.parse(localStorage.getItem(title)) || {};
          createListItemElement(item, title, list);
        }
      }
    });
  }

  window.createTodoApp = createTodoApp;
}
todo_app();
