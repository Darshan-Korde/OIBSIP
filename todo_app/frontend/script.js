const API = 'http://localhost:5000/api/tasks';

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const pending = tasks.filter(t => t.status === 'pending');
  const completed = tasks.filter(t => t.status === 'completed');

  document.getElementById('pendingList').innerHTML = '';
  document.getElementById('completedList').innerHTML = '';

  pending.forEach(task => {
    document.getElementById('pendingList').innerHTML += `
      <li>
       <span> ${task.title} </span>
       <div class="btn-group">
        <button onclick="markComplete('${task._id}')">✔️</button>
        <button onclick="deleteTask('${task._id}')">❌</button>
        </div>
      </li>`;
  });

  completed.forEach(task => {
    document.getElementById('completedList').innerHTML += `
      <li>${task.title} (Done)</li>`;
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  if (!input.value) return;
  await fetch(API + '/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value })
  });
  input.value = '';
  loadTasks();
}

async function markComplete(id) {
  await fetch(`${API}/complete/${id}`, { method: 'PUT' });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();
