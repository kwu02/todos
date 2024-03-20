document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Fetch todos from MongoDB Atlas
    fetch("/todos")
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => {
                const listItem = document.createElement("li");
                listItem.textContent = todo.todo;
                todoList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching todos:", error));

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            // Add new todo to MongoDB Atlas
            fetch("/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ todo: todoText })
            })
                .then(response => response.json())
                .then(data => {
                    const listItem = document.createElement("li");
                    listItem.textContent = data.todo;
                    todoList.appendChild(listItem);
                    todoInput.value = "";
                })
                .catch(error => console.error("Error adding todo:", error));
        }
    });
});
