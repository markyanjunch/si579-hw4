const task_list = document.querySelector('ul#task_list');
const task_description_input = document.querySelector('input#task_description_input');
const duedate_input = document.querySelector('input#duedate_input');
const duetime_input = document.querySelector('input#duetime_input');
const add_task = document.querySelector('button#add_task');

function addTask(description, dueTime=false) {
    let due_text = "";
    if (dueTime) {
        due_text = `<span class="due">due ${new Date(dueTime).toLocaleString()}</span>`;
    }
    const task = document.createElement("li");
    task_list.appendChild(task);
    task.innerHTML = `${description}${due_text}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;

    // Remove handler after the task is done
    task.querySelector('button').addEventListener('click', () => {
        task.remove();
    });
}

// Default tasks shown when opening the page
addTask("Learn to wrap gifts", 1639944400000);
addTask("Buy milk");

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

// helper function for adding a task after clicking on "Add Task" button or pressing the <ENTER> key in description input box
function add_task_trigger() {
    addTask(task_description_input.value, dateAndTimeToTimestamp(duedate_input.value, duetime_input.value));
    task_description_input.value = '';
    duedate_input.value = '';
    duetime_input.value = '';
}

add_task.addEventListener('click', add_task_trigger);

task_description_input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        add_task_trigger();
    }
});
