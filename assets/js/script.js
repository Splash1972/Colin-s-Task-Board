// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;

$('#task-form').submit(function (event) {
    event.preventDefault();
    const title = $('#task-title').val().trim();
    const description = $('#task-description').val().trim();
    const dueDate = $('#task-due-date').val();

    if (title && description && dueDate) {
        // Create a new task object with the input values
        const newTask = {
            title: title,
            description: description,
            dueDate: dueDate,
            status: 'to-do'
        };

        // Add the new task to the task list and localStorage
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));

        // Call the function to create and display the new task card
        createTaskCard(newTask);

        // Reset the form
        $('#task-form')[0].reset();

        // Hide the modal after submission
        $('#formModal').modal('hide');
    }
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card', 'task-card', 'draggable')

    card.innerHTML = `
        <div class="card-header">
            <h5 class="card-title">${task.title}</h5>
             </div>
        <div class="card-body">
            <p class="card-text">${task.description}</p>
            <p class="card-text">Due Date: ${task.dueDate}</p>
            <button class="btn btn-danger btn-sm delete-task">Delete</button>
        </div>
    `;

    //const container = document.getElementById('todo-cards');
    //container.appendChild(card);
    // renderTaskList(); // Call renderTaskList() after creating the task card

    return card
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

    // check do we have STORED Data(?)
    if (!taskList) {
        taskList = [];
    }

    // We want to CLEAR previous or existing data (FROM THE DOM)
    const toDoList = $('#todo-cards');
    toDoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Now we Repopulate the DOM with the SAVED data
    // Iterate over the taskList array and create a task card for each task
    //forEach(function(task) {

    console.log("Dataset: ", taskList)

    for (let task of taskList) {  // for of loop
        if (task.status === 'to-do') {
            toDoList.append(createTaskCard(task))
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task))
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task))
        }
    }

    // Make each task card draggable
    /*
    $('.task-card').draggable({
        revert: 'invalid', // Snap back to original position if not dropped in a droppable area
        cursor: 'move', // Change cursor to indicate draggable element
        stack: '.card', // Maintain the stack order of draggable elements
        zIndex: 1000
    });
    */
    $('.draggable').draggable({
        //  revert: 'invalid', // Snap back to original position if not dropped in a droppable area
        cursor: 'move', // Change cursor to indicate draggable element
        //  stack: '.card', // Maintain the stack order of draggable elements
        opacity: 0.7,
        zIndex: 100
    });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // Implement the function to handle adding a new task here
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    // Implement the function to handle deleting a task here
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const droppedTask = ui.draggable;
    const dropTargetId = $(this).attr('id');
    const status = dropTargetId; // Extract the status from the drop target ID

    // Update the ID of the dropped task card to match the lane it's being dropped into
    droppedTask.attr('id', status + '-' + droppedTask.attr('id'));

    // Update the status of the dropped task based on the status lane
    console.log(`Task dropped into ${status} lane`);

    // Move the dropped task card to the drop target
    droppedTask.appendTo($(this));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    // Make the "in-progress" lane droppable
    /*
     $('#in-progress').droppable({
         drop: handleDrop
     });
 
     // Make the "done" lane droppable
     $('#done').droppable({
         drop: handleDrop
     });
     */
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    })

    $(document).on('click', '.delete-task', function () {
        // Get the parent task card element
        const taskCard = $(this).closest('.task-card');

        // Remove the task card from the DOM
        taskCard.remove();

        // You may also want to remove the task from the taskList array and update localStorage here
    });


});
