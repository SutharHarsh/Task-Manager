// Add new task to the database
async function submitData() {

  const inputData = document.getElementById('task-input').value;

  try {
    await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: inputData })
    })
    location.reload();


  } catch (e) {
    response.send(e);
  }
}

// Display all the tasks from the database
fetch('/tasks/read')
  .then(response => response.json())
  .then(tasks => {
    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
      const div = document.createElement('div');
      const btn = document.createElement('button');
      const taskID = task._id;
      const temp = btn.setAttribute('data-id', taskID);
      btn.id = 'delBt';
      btn.textContent = 'Delete';

      btn.addEventListener('click', function () {

        const uniqueValue = this.getAttribute('data-id');
        console.log('Button clicked with unique value:', uniqueValue);

        fetch(`/tasks/${uniqueValue}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (response.ok) {
              const isConfirm = confirm('After deleting this task you will never be able to recover this task!')
              if (!isConfirm) {
                console.log('Process Canceled');
              } else {
                isConfirm;
                location.reload();

              }
            } else {
              console.error('Error deleting task:', response.statusText);
            }
          })
          .catch(error => console.error('Error deleting task:', error));
      });

      div.textContent = task.description;
      taskList.appendChild(div, div.appendChild(btn));
    });
  })
  .catch(error => console.error('Error fetching tasks:', error));


// var taskIDs = [];

// function addTask(taskID) {
//   taskIDs.push(taskID);
// }

// console.log(taskIDs);