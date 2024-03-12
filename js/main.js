document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    document.getElementById('taskInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('taskin');
    const taskList = document.getElementById('taskList');

    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Введіть текст завдання.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="toggleTaskStatus(this)">Виконано</button>
        <button onclick="deleteTask(this)">Видалити</button> `;

    taskList.appendChild(taskItem);
    taskInput.value = '';
    saveTasks();
}

function toggleTaskStatus(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function deleteTask(button) {
    const taskItem = button.parentNode;
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').innerText;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskStatus(this)">Виконано</button>
            <button onclick="deleteTask(this)">Видалити</button>
        `;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}