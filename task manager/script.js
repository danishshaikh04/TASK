// Get references to HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Array to store tasks
const tasks = [];

// Function to render tasks in the UI
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ID: ${task.id} <span class="editable" data-index="${index}" data-field="id">${task.id}</span><br>
      Name: <span class="editable" data-index="${index}" data-field="name">${task.name}</span><br>
      Start Date: <span class="editable" data-index="${index}" data-field="startDate">${task.startDate}</span><br>
      End Date: <span class="editable" data-index="${index}" data-field="endDate">${task.endDate}</span><br>
      Status: <span class="editable" data-index="${index}" data-field="status">${task.status}</span><br>
      <button class="deleteBtn" data-index="${index}">Delete</button>
      <hr>
    `;
    taskList.appendChild(li);
  });

  // Attach event listeners to editable fields and delete buttons
  const editableFields = document.querySelectorAll(".editable");
  const deleteButtons = document.querySelectorAll(".deleteBtn");

  editableFields.forEach((field) => {
    field.addEventListener("click", handleEditField);
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteTask);
  });
}

// Function to handle editing of fields
function handleEditField(event) {
  const index = event.target.getAttribute("data-index");
  const field = event.target.getAttribute("data-field");
  const newValue = prompt(`Edit ${field}:`, tasks[index][field]);
  if (newValue !== null) {
    tasks[index][field] = newValue;
    renderTasks();
  }
}

// Function to add a new task
function addTask() {
  const taskId = document.getElementById("taskId").value.trim();
  const taskName = document.getElementById("taskName").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const taskStatus = document.getElementById("taskStatus").value;

  if (taskId === "" || taskName === "" || startDate === "" || endDate === "") {
    alert("Please fill in all the fields.");
    return;
  }

  const newTask = {
    id: taskId,
    name: taskName,
    startDate: startDate,
    endDate: endDate,
    status: taskStatus
  };

  tasks.push(newTask);
  clearInputFields();
  renderTasks();
}

// Function to clear input fields after adding a task
function clearInputFields() {
  document.getElementById("taskId").value = "";
  document.getElementById("taskName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("taskStatus").value = "in-progress";
}

// Function to delete a task
function handleDeleteTask(event) {
  const index = event.target.getAttribute("data-index");
  tasks.splice(index, 1);
  renderTasks();
}

// Attach event listener to the "Add Task" button
addTaskBtn.addEventListener("click", addTask);
// ... (previous code)

// Function to handle updating a task
function handleUpdateTask(event) {
    const index = event.target.getAttribute("data-index");
    const taskElement = taskList.querySelectorAll("li")[index];
    const form = taskElement.querySelector(".updateForm");
  
    form.style.display = "block";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const updatedTask = {
        id: form.querySelector(".updateId").value,
        name: form.querySelector(".updateName").value,
        startDate: form.querySelector(".updateStartDate").value,
        endDate: form.querySelector(".updateEndDate").value,
        status: form.querySelector(".updateStatus").value
      };
  
      tasks[index] = updatedTask;
      form.style.display = "none";
      renderTasks();
    });
  }
  
  // ... (previous code)
  // Function to handle adding a subtask
function handleAddSubtask(event) {
    const index = event.target.getAttribute("data-index");
    const parentTask = tasks[index];
  
    const subTaskName = prompt("Enter subtask name:");
    if (subTaskName) {
      const newSubTask = {
        id: `${parentTask.id}.${parentTask.subtasks.length + 1}`,
        name: subTaskName
      };
  
      parentTask.subtasks.push(newSubTask);
      renderTasks();
    }
  }
  
  // Function to render subtasks for a parent task
  function renderSubtasks(subtasks) {
    if (subtasks.length === 0) {
      return "No subtasks";
    }
  
    return subtasks.map((subtask) => `<li>${subtask.id}: ${subtask.name}</li>`).join("");
  }
  // Function to render tasks in the UI
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <form class="updateForm" style="display: none;">
          ID: <input type="text" class="updateId" value="${task.id}" />
          Name: <input type="text" class="updateName" value="${task.name}" />
          Start Date: <input type="date" class="updateStartDate" value="${task.startDate}" />
          End Date: <input type="date" class="updateEndDate" value="${task.endDate}" />
          Status:
          <select class="updateStatus">
            <option value="in-progress" ${
              task.status === "in-progress" ? "selected" : ""
            }>In Progress</option>
            <option value="completed" ${
              task.status === "completed" ? "selected" : ""
            }>Completed</option>
            <option value="due-passed" ${
              task.status === "due-passed" ? "selected" : ""
            }>Due Passed</option>
            <option value="canceled" ${
              task.status === "canceled" ? "selected" : ""
            }>Canceled</option>
          </select><br>
          <button type="submit">Save</button>
        </form>
        <div>
          ID: ${task.id}
          Name: ${task.name}
          Start Date: ${task.startDate}
          End Date: ${task.endDate}
          Status: ${task.status}<br>
          <button class="updateBtn" data-index="${index}">Update</button>
          <button class="deleteBtn" data-index="${index}">Delete</button>
        </div>
        <hr>
      `;
      taskList.appendChild(li);
    });
  
    // Attach event listeners to update and delete buttons
    const updateButtons = document.querySelectorAll(".updateBtn");
    const deleteButtons = document.querySelectorAll(".deleteBtn");
  
    updateButtons.forEach((button) => {
      button.addEventListener("click", handleUpdateTask);
    });
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", handleDeleteTask);
    });
  }
  
  // ... (previous code)

// Initial rendering of tasks
renderTasks();
