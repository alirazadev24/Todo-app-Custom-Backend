const apiUrl = "http://localhost:5000/api/todos";  // Backend API URL

// Function to fetch and display all todos
async function fetchTodos() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data); // 👈 Check in browser console
  
    const todos = Array.isArray(data) ? data : data.todos || data.data || [];
  
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
  
    todos.forEach(todo => {
      const todoElement = document.createElement("div");
      todoElement.classList.add("todo-item");
      todoElement.innerHTML = `
        <span>${todo.text}</span>
        <button onclick="deleteTodo('${todo._id}')">Delete</button>
      `;
      todoList.appendChild(todoElement);
    });
  }
  

// Function to add a new todo
async function addTodo() {
  const todoText = document.getElementById("todoText").value;
  if (!todoText) return alert("Please enter a task!");

  const newTodo = { text: todoText };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  const createdTodo = await response.json();
  fetchTodos();  // Refresh the todo list
  document.getElementById("todoText").value = "";  // Clear input field
}

// Function to delete a todo
async function deleteTodo(todoId) {
  const response = await fetch(`${apiUrl}/${todoId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    fetchTodos();  // Refresh the todo list
  } else {
    alert("Error deleting todo");
  }
}

// Call fetchTodos to display todos when the page loads
window.onload = fetchTodos;
