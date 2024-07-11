// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let newId = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const targetDiv = document.getElementById('todo-cards');
    const card = document.createElement('div');

    card.innerHTML = `
        <div class="card-header">
            <h5 class="card-title">${task.title}</h5>
        </div>
        <div class="card-body">
            <p class="card-text">${task.description}</p>
            <p class="card-text">Due Date: ${task.dueDate}</p>
            <button class="btn btn-dark btn-sm delete-task">Delete</button>
        </div>
    `;

    card.classList.add('card', 'task-card');

    const deleteButton = card.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        // Remove task from DOM
        card.remove();
        // Remove task from taskList
        taskList = taskList.filter(t => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    });

    targetDiv.appendChild(card);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    var appendTo = $( "#todo-cards" ).draggable( "option", "appendTo" );
    $( "#todo-cards" ).draggable( "option", "appendTo", "todo-cards" );
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskList.forEach(task => createTaskCard(task));

    $('#task-form').submit(function (event) {
        event.preventDefault();
        const title = $('#task-title').val().trim();
        const description = $('#task-description').val().trim();
        const dueDate = $('#task-due-date').val();

        if (title && description && dueDate) {
            const newTask = {
                id: generateTaskId(),
                title: title,
                description: description,
                dueDate: dueDate,
                status: 'to-do'
            };

            createTaskCard(newTask);

            // Reset the form
            $('#task-form')[0].reset();

            // Hide the modal after submission
            $('#formModal').modal('hide');
        } else {
            alert('Please fill out all fields');
        }
    });
});