document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  
  let currentFilter = 'all';  // Default filter is 'all'

  // Load tasks from local storage
  loadTasks();

  // Add task functionality
  addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTaskToList(taskText, 'In Progress');
      taskInput.value = '';
      saveTasks();
      filterTasks(); // Filter tasks after adding one
    }
  });

  // Add task to the task list
  function addTaskToList(taskText, status) {
    const li = document.createElement('li');
    li.classList.add(status.toLowerCase().replace(' ', '-'));
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <span class="status">${status}</span>
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">❌</button>
    `;
    taskList.appendChild(li);

    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    const statusSpan = li.querySelector('.status');

    // Edit task functionality
    editBtn.addEventListener('click', function () {
      const newTaskText = prompt("Edit your task:", taskText);
      if (newTaskText) {
        li.querySelector('.task-text').textContent = newTaskText;
        saveTasks();
        filterTasks(); // Reapply the filter after editing
      }
    });

    // Delete task functionality
    deleteBtn.addEventListener('click', function () {
      li.remove();
      saveTasks();
      filterTasks(); // Reapply the filter after deleting
    });

    // Toggle task status functionality
    li.addEventListener('click', function () {
      let status = statusSpan.textContent === 'In Progress' ? 'Completed' : 'In Progress';
      statusSpan.textContent = status;
      li.classList.toggle('completed');
      li.classList.toggle('in-progress');
      saveTasks();
      filterTasks(); // Reapply the filter after toggling status
    });
  }

  // Save tasks to local storage
  function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(function (item) {
      const taskText = item.querySelector('.task-text').textContent;
      const status = item.querySelector('.status').textContent;
      tasks.push({ taskText, status });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
      addTaskToList(task.taskText, task.status);
    });
    filterTasks(); // Apply filter when tasks are loaded
  }

  // Filter tasks based on their status (All, Completed, In Progress)
  function filterTasks() {
    const allTasks = document.querySelectorAll('#task-list li');

    allTasks.forEach(function (task) {
      if (currentFilter === 'all') {
        task.style.display = '';
      } else if (currentFilter === 'completed' && task.classList.contains('completed')) {
        task.style.display = '';
      } else if (currentFilter === 'inprogress' && task.classList.contains('in-progress')) {
        task.style.display = '';
      } else {
        task.style.display = 'none';
      }
    });
  }

  // Set up filter button event listeners
  document.getElementById('filter-all').addEventListener('click', function () {
    currentFilter = 'all';
    filterTasks(); // Reapply the filter when filter button is clicked
  });

  document.getElementById('filter-completed').addEventListener('click', function () {
    currentFilter = 'completed';
    filterTasks(); // Reapply the filter when filter button is clicked
  });

  document.getElementById('filter-inprogress').addEventListener('click', function () {
    currentFilter = 'inprogress';
    filterTasks(); // Reapply the filter when filter button is clicked
  });
});
