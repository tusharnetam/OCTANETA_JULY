function addProject() {
    const projectContainer = document.querySelector('#project-container');
    const projectTemplate = document.querySelector('#project-template');

  // Clone the project template
  const newProject = projectTemplate.content.cloneNode(true);
  const projectId = `project-${Date.now()}`;
  newProject.querySelector('.project').id = projectId;
  newProject.querySelector('.project-heading').id = `heading-${projectId}`;
  newProject.querySelector('.add-task-button').addEventListener('click', () => addTask(projectId));

  const projectHeadingInput = newProject.querySelector('.project-heading-input');
  const projectHeading = newProject.querySelector('.project-heading');

//   heading listener
  projectHeadingInput.addEventListener('blur', function () {
    if (!projectHeading.innerHTML) {
      projectHeading.innerHTML = projectHeadingInput.value;
      projectHeadingInput.disabled = true;
      projectHeadingInput.style.display = "none";
    }
  });   

// Event listener for the project deletion
  const deleteButton = newProject.querySelector('.delete-project-button');
  deleteButton.addEventListener('click', function () {
    const project = document.querySelector(`#${projectId}`);
    project.remove();
  });
  
  projectContainer.appendChild(newProject);
}

// To add a new task to a project
function addTask(projectId) {
  const project = document.querySelector(`#${projectId}`);
  const taskList = project.querySelector('.task-list');

  const description = project.querySelector('.task-description').value;
  const label = project.querySelector('.task-label').value;
  const deadline = project.querySelector('.task-deadline').value;
  const priority = project.querySelector('.task-priority').value;

  // Create task elements
  const taskElements = document.createElement('div');
  var color;
  if (priority === "High") {
    color = "rgba(255, 99, 71, .2)";
  } else if (priority === "Medium") {
    color = "rgba(255, 165, 0, .2";
  } else if (priority === "Low") {
    color = "rgba(60, 179, 113, .2)";
  } 
  taskElements.innerHTML = `
    <div class="task" style="background: ${color}">
      <p><strong style="color: black;">Description:</strong> ${description}</p>
      <p><strong style="color: black;">Label:</strong> ${label}</p>
      <p><strong style="color: black;">Deadline:</strong> ${deadline}</p>
      <p><strong style="color: black;">Priority:</strong> ${priority}</p>
      <div class="diff">
        <p><strong style="color: black;">Completed: </strong><input type="checkbox" class="task-checkbox"></p>
        <button class="delete-task-button">Delete</button>
      </div>
    </div>
  `;

  // Create a new task element
  const newTask = document.createElement('div');
  newTask.classList.add('task-item');
  newTask.appendChild(taskElements);
  taskList.appendChild(newTask);

  // Clear the input values
  project.querySelector('.task-description').value = '';
  project.querySelector('.task-label').value = '';
  project.querySelector('.task-deadline').value = '';
  project.querySelector('.task-priority').value = 'Low';

  updateProgressBar(project);

  // Event listener for task deletion
  const deleteButton = newTask.querySelector('.delete-task-button');
  deleteButton.addEventListener('click', function () {
    newTask.remove();
    updateProgressBar(project);
  });

}

// Progress bar
function updateProgressBar(project) {
    const taskItems = project.querySelectorAll('.task-checkbox');
    const completedTasks = project.querySelectorAll('.task-checkbox:checked');
  
    const progress = (completedTasks.length / taskItems.length ) * 100;
    const progressBar = project.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`;
  }
  
  document.querySelector('#add-project-button').addEventListener('click', addProject);
  
  document.addEventListener('change', function (event) {
    if (event.target.classList.contains('task-checkbox')) {
      const project = event.target.closest('.project');
      updateProgressBar(project);
    }
  });

// navbar toggle 
var navbarToggle = document.getElementById("navbarToggle");
var navbar = document.getElementById("navbar");

navbarToggle.addEventListener("click", function() {
  navbar.classList.toggle("open");
});
