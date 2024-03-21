let tasks = [];
let completedTasksList = [];
let loggedIn = false;

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    // Simple authentication check
    if (username === 'test' && password === 'test') {
        loggedIn = true;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    } else {
        alert('Invalid username or password');
    }
}

function renderTasks() {
    if (!loggedIn) return;
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const div = document.createElement('div');
        const taskDescription = task.completed ? `<s>${task.description}</s>` : task.description;
        div.innerHTML = `
            <div style="margin:10px">
                <input type="checkbox"onchange="toggleCompleted(${index})" ${task.completed ? 'checked' : ''}>
                <span>${task.completed ? 'completed' : 'Mark checkbox to complete task'}</span>
                <div style="margin-top:2px" class="${task.completed ? 'completed' : ''}" style="word-wrap:break-word">${taskDescription}</div>
            </div>
            <div style="margin:10px">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        div.classList.add('container-box');
        taskList.appendChild(div);
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const description = input.value.trim();
    if (description !== '') {
        tasks.push({ description, completed: false });
        renderTasks();
        input.value = '';
    }
}

function completedTasks() {
if (!loggedIn) return;
    const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        completedTasksList.forEach((task, index) => {
            const div = document.createElement('div');
            const taskDescription = task.completed ? `<s>${task.description}</s>` : task.description;
            if(task.completed) {
            div.innerHTML = `
                 <div style="margin:10px">
                                <input type="checkbox"onchange="toggleCompleted(${index})" ${task.completed ? 'checked' : ''}>
                                <span>${task.completed ? 'completed' : 'Mark checkbox to complete task'}</span>
                                <div style="margin-top:2px" class="${task.completed ? 'completed' : ''}" style="word-wrap:break-word">${taskDescription}</div>
                            </div>
                <div style="margin:10px">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            div.classList.add('container-box');
            taskList.appendChild(div);
            }
        });
}
function showAllTasks() {
        renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    console.log(tasks[index].completed)
    console.log(completedTasksList)
    if(tasks[index].completed){
            completedTasksList.push(tasks[index])
    } else {
              const taskIndex = completedTasksList.findIndex(task => task.description === tasks[index].description);
                    if (taskIndex !== -1) {
                        completedTasksList.splice(taskIndex, 1);
                    }
    }
}

function editTask(index) {
    const modal = document.getElementById('editModal');
    const editInput = document.getElementById('editTaskInput');
    editInput.value = tasks[index].description;
    modal.style.display = 'block';
    editInput.focus();

    const saveChanges = () => {
        const newDescription = editInput.value.trim();
        if (newDescription !== '') {
            tasks[index].description = newDescription;
            renderTasks();
            closeModal();
        }
    };

    window.saveChanges = saveChanges;
}

function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}
