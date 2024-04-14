//TODO create TODO

let b = document.querySelector("body");
let container = document.createElement("div");
let wrapper = document.createElement("div");
let header = document.createElement("header");
let heading1 = document.createElement("h1");
let form = document.createElement("div");
let inpt = document.createElement("input");
let addBtn = document.createElement("button");
let deleteAllTodoBtn = document.createElement("button");
let todoContainer = document.createElement("div");
let todoList = document.createElement("ul");
let link = document.createElement("link");

let haveTodo = false;

//! just gathered them together
function styleAndEtc() {
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute(
    "href",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
  );
  document.head.appendChild(link);
  b.setAttribute(
    "style",
    "min-height: 100vh;background: linear-gradient(217deg, #833471, rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, #0984e3, rgba(0, 255, 0, 0) 70.71%), linear-gradient(336deg, #00b894, rgba(0, 0, 255, 0) 70.71%);background-repeat: no-repeat;"
  );
  container.setAttribute("style", "width: 100%; margin: 0 auto;");
  wrapper.setAttribute(
    "style",
    "width: 100%; display: flex; flex-direction: column; justify-content: center;align-items: center;padding: 20px 0;gap: 8px"
  );
  todoContainer.setAttribute(
    "style",
    "display: flex;align-items: center;justify-content: center;"
  );
  form.setAttribute(
    "style",
    "display: flex;justify-content: center;align-items: center;gap:8px"
  );
  inpt.setAttribute(
    "style",
    "border:none;border-radius:8px;outline: none;padding:4px 8px"
  );
  inpt.placeholder = "type here ...";
  addBtn.innerHTML = `<i class="far fa-plus-square"></i>`;
  addBtn.setAttribute(
    "style",
    "color:green;border:none;border-radius:8px;display: flex;justify-content: center;align-items: center;padding: 6px 12px;cursor:pointer;"
  );
  deleteAllTodoBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  deleteAllTodoBtn.setAttribute(
    "style",
    "color:red;border:none;border-radius:8px;display: flex;justify-content: center;align-items: center;padding: 6px 12px;cursor:pointer;"
  );
  heading1.textContent = "TO DO";
  heading1.style.color = "white";
  header.append(heading1);
  todoList.setAttribute(
    "style",
    "display: flex;flex-direction: column;justify-content: center;align-items: center;gap:8px;padding:0;"
  );
  form.append(inpt, addBtn, deleteAllTodoBtn);
  todoContainer.append(todoList);
  todoContainer.setAttribute(
    "style",
    "display: flex;flex-direction: column;justify-content: center;align-items: center;gap:8px"
  );
  wrapper.append(header, form, todoContainer);
  container.append(wrapper);
  b.append(container);
}
styleAndEtc();

//! random id
function getRandomID() {
  return Math.floor(Math.random() * Math.pow(10, 2));
}

//! fake api
let baseURL = "http://localhost:3000";

//! addToDO
async function addToDo() {
  let todo = inpt.value.trim();
  if (todo !== "") {
    try {
      await fetch(baseURL + "/todos", {
        method: "POST",
        body: JSON.stringify({
          id: `${getRandomID()}`,
          description: `${todo}`,
          done: false,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("you can't add empty todo");
  }
}

//! createTodo
async function createTodo() {
  await fetch(baseURL + "/todos")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) haveTodo = true;
      else haveTodo = false;

      data.forEach((el) => {
        let description = el.description;
        const li = document.createElement("li");
        li.innerText = description;
        todoList.appendChild(li);

        li.setAttribute(
          "style",
          `display: flex;justify-content: center;align-items: center;gap:8px;list-style-type:none;color:black;background:white;border-radius:8px;padding:12px;`
        );
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
        deleteBtn.setAttribute(
          "style",
          "border:none;border-radius:8px;padding: 4px 8px;color:gray;cursor:pointer;"
        );
        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = `<i class="far fa-check-square"></i>`;
        doneBtn.setAttribute(
          "style",
          `border:none;border-radius:8px;padding: 4px 8px;color:${
            el.done ? "green" : "red"
          };cursor:pointer;`
        );
        doneBtn.type = "button";
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
        editBtn.setAttribute(
          "style",
          "border:none;border-radius:8px;padding: 4px 8px;color:skyblue;cursor:pointer;"
        );

        //! delete btn
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          let result = confirm("do you wanna delete this todo permanently?");
          if (result) {
            fetch(baseURL + "/todos" + `/${el.id}`, {
              method: "DELETE",
            }).then((res) => res.json());
            li.remove();
          }
        });
        changeSizeOnMouseEvent(
          deleteBtn,
          "border:none;border-radius:8px;padding: 4px 8px;color:gray;cursor:pointer;transform: scale(0.8);transition: linear 0.5s;",
          "border:none;border-radius:8px;padding: 4px 8px;color:gray;cursor:pointer;transform: scale(1);transition: linear 0.5s;"
        );

        //! done btn
        doneBtn.addEventListener("click", (e) => {
          e.preventDefault();
          if (el.done === false) {
            fetch(baseURL + "/todos" + `/${el.id}`, {
              method: "PUT",
              body: JSON.stringify({
                id: `${el.id}`,
                description: `${el.description}`,
                done: true,
              }),
            });
            doneBtn.setAttribute(
              "style",
              "border:none;border-radius:8px;padding: 4px 8px;color:green !important;cursor:pointer;"
            );
          } else {
            fetch(baseURL + "/todos" + `/${el.id}`, {
              method: "PUT",
              body: JSON.stringify({
                id: `${el.id}`,
                description: `${el.description}`,
                done: false,
              }),
            });
            doneBtn.setAttribute(
              "style",
              "border:none;border-radius:8px;padding: 4px 8px;color:red;cursor:pointer;"
            );
          }
        });
        changeSizeOnMouseEvent(
          doneBtn,
          `border:none;border-radius:8px;padding: 4px 8px;color:${
            el.done ? "red" : "green"
          };cursor:pointer;transform: scale(0.8);transition: linear 0.5s;`,
          `border:none;border-radius:8px;padding: 4px 8px;color:${
            el.done ? "green" : "red"
          };cursor:pointer;transform: scale(1);transition: linear 0.5s;`
        );

        //! edit btn
        editBtn.addEventListener("click", async () => {
          let editInpt = prompt("type to replace todo");
          if (editInpt !== "" && editInpt) {
            await fetch(baseURL + "/todos" + `/${el.id}`, {
              method: "PUT",
              body: JSON.stringify({
                id: `${el.id}`,
                description: `${editInpt}`,
                done: el.done,
              }),
            });
            li.innerText = el.description;
            li.append(editBtn, doneBtn, deleteBtn);
          } else {
            alert("you can't add empty todo");
          }
        });
        changeSizeOnMouseEvent(
          editBtn,
          "border:none;border-radius:8px;padding: 4px 8px;color:skyblue;cursor:pointer;transform: scale(0.8);transition: linear 0.5s;",
          "border:none;border-radius:8px;padding: 4px 8px;color:skyblue;cursor:pointer;transform: scale(1);transition: linear 0.5s;"
        );

        li.append(editBtn, doneBtn, deleteBtn);
        todoList.append(li);
        todoContainer.appendChild(todoList);
        inpt.value = "";
      });
    });
}
createTodo();

//! addBtn eventlistener
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addToDo();
});

//! inpt eventlistener
inpt.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addToDo();
  }
});

//! deleteAllTodoBtn eventlistener
deleteAllTodoBtn.addEventListener("click", async (e) => {
  e.stopPropagation();

  if (!haveTodo) return alert("There's nothing to delete");

  let result = confirm("do you wanna delete all todos permanently?");

  if (result === true) {
    await fetch(baseURL + "/todos")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((el) => {
          fetch(baseURL + "/todos" + `/${el.id}`, {
            method: "DELETE",
          }).then((res) => res.json());
        });
      });
    todoContainer.remove();
  }
});

//! change size of buttons on mouse event
function changeSizeOnMouseEvent(a, b, c) {
  a.addEventListener("mouseover", () => {
    a.setAttribute("style", b);
  });
  a.addEventListener("mouseout", () => {
    a.setAttribute("style", c);
  });
}
