// Data Storage
const storage = {
  ideas: JSON.parse(localStorage.getItem('ideas') || '[]'),
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  projects: JSON.parse(localStorage.getItem('projects') || '[]'),
  shipments: JSON.parse(localStorage.getItem('shipments') || '[]'),
  
  save() {
    localStorage.setItem('ideas', JSON.stringify(this.ideas));
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('projects', JSON.stringify(this.projects));
    localStorage.setItem('shipments', JSON.stringify(this.shipments));
  }
};

// Initialize with sample data if empty
if (storage.ideas.length === 0) {
  storage.ideas = [
    { id: Date.now() + 1, text: 'Build a habit tracking app', date: new Date().toISOString(), archived: false },
    { id: Date.now() + 2, text: 'Create a minimalist portfolio site', date: new Date().toISOString(), archived: false }
  ];
  storage.save();
}

if (storage.tasks.length === 0) {
  storage.tasks = [
    { id: Date.now() + 1, text: 'Design landing page mockup', status: 'todo', priority: 'high', date: new Date().toISOString() },
    { id: Date.now() + 2, text: 'Write product documentation', status: 'in-progress', priority: 'medium', date: new Date().toISOString() },
    { id: Date.now() + 3, text: 'Set up analytics tracking', status: 'done', priority: 'low', date: new Date().toISOString() }
  ];
  storage.save();
}

if (storage.projects.length === 0) {
  storage.projects = [
    { id: Date.now() + 1, name: 'Portfolio Website', progress: 75, status: 'active', startDate: new Date().toISOString() },
    { id: Date.now() + 2, name: 'Mobile App MVP', progress: 30, status: 'active', startDate: new Date().toISOString() }
  ];
  storage.save();
}

if (storage.shipments.length === 0) {
  storage.shipments = [
    { id: Date.now() + 1, title: 'v1.0.0 - Initial Launch', description: 'First public release with core features', date: new Date().toISOString(), link: '' }
  ];
  storage.save();
}

// Navigation
let currentPage = 'dashboard';

function navigateTo(page) {
  currentPage = page;
  updateActiveNav();
  renderPage();
  closeMobileMenu();
}

function updateActiveNav() {
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
    if (btn.dataset.page === currentPage) {
      btn.classList.add('bg-gray-100', 'text-gray-900');
    } else {
      btn.classList.remove('bg-gray-100', 'text-gray-900');
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.add('hidden');
}

// Page Rendering
function renderPage() {
  const content = document.getElementById('mainContent');
  
  switch(currentPage) {
    case 'dashboard':
      content.innerHTML = renderDashboard();
      break;
    case 'inbox':
      content.innerHTML = renderInbox();
      break;
    case 'tasks':
      content.innerHTML = renderTasks();
      break;
    case 'build':
      content.innerHTML = renderBuild();
      break;
    case 'ship':
      content.innerHTML = renderShip();
      break;
  }
}

function renderDashboard() {
  const activeIdeas = storage.ideas.filter(i => !i.archived).length;
  const activeTasks = storage.tasks.filter(t => t.status !== 'done').length;
  const activeProjects = storage.projects.filter(p => p.status === 'active').length;
  const recentShipments = storage.shipments.slice(0, 3);
  
  return `
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p class="text-gray-600 mt-1">Your productivity overview</p>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Active Ideas</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">${activeIdeas}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Active Tasks</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">${activeTasks}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Active Projects</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">${activeProjects}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Shipped</p>
              <p class="text-3xl font-bold text-gray-900 mt-2">${storage.shipments.length}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
          <div class="space-y-3">
            ${storage.tasks.slice(0, 5).map(task => `
              <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div class="flex-1">
                  <p class="text-sm text-gray-900">${task.text}</p>
                  <p class="text-xs text-gray-500 mt-1">${task.status === 'done' ? '✓ Completed' : task.status === 'in-progress' ? '⏳ In Progress' : '○ To Do'}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">${task.priority}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h3>
          <div class="space-y-3">
            ${recentShipments.length > 0 ? recentShipments.map(ship => `
              <div class="py-2 border-b border-gray-100 last:border-0">
                <p class="text-sm font-medium text-gray-900">${ship.title}</p>
                <p class="text-xs text-gray-600 mt-1">${ship.description}</p>
                <p class="text-xs text-gray-500 mt-1">${new Date(ship.date).toLocaleDateString()}</p>
              </div>
            `).join('') : '<p class="text-sm text-gray-500">No shipments yet</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderInbox() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Idea Inbox</h2>
          <p class="text-gray-600 mt-1">Capture and organize your ideas</p>
        </div>
        <button onclick="showAddIdeaForm()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm">
          + Add Idea
        </button>
      </div>
      
      <div id="ideaFormContainer"></div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${storage.ideas.filter(i => !i.archived).map(idea => `
          <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p class="text-gray-900 mb-3">${idea.text}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">${new Date(idea.date).toLocaleDateString()}</span>
              <button onclick="archiveIdea(${idea.id})" class="text-xs text-gray-600 hover:text-gray-900">Archive</button>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${storage.ideas.filter(i => !i.archived).length === 0 ? '<p class="text-center text-gray-500 py-12">No ideas yet. Add your first idea!</p>' : ''}
    </div>
  `;
}

function renderTasks() {
  const todoTasks = storage.tasks.filter(t => t.status === 'todo');
  const inProgressTasks = storage.tasks.filter(t => t.status === 'in-progress');
  const doneTasks = storage.tasks.filter(t => t.status === 'done');
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Task Board</h2>
          <p class="text-gray-600 mt-1">Manage your tasks with ease</p>
        </div>
        <button onclick="showAddTaskForm()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm">
          + Add Task
        </button>
      </div>
      
      <div id="taskFormContainer"></div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- To Do -->
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4">To Do (${todoTasks.length})</h3>
          <div class="space-y-3">
            ${todoTasks.map(task => `
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p class="text-sm text-gray-900 mb-3">${task.text}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">${task.priority}</span>
                  <select onchange="updateTaskStatus(${task.id}, this.value)" class="text-xs border-gray-300 rounded">
                    <option value="todo" selected>To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            `).join('')}
            ${todoTasks.length === 0 ? '<p class="text-sm text-gray-500 text-center py-4">No tasks</p>' : ''}
          </div>
        </div>
        
        <!-- In Progress -->
        <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 class="font-semibold text-gray-900 mb-4">In Progress (${inProgressTasks.length})</h3>
          <div class="space-y-3">
            ${inProgressTasks.map(task => `
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <p class="text-sm text-gray-900 mb-3">${task.text}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">${task.priority}</span>
                  <select onchange="updateTaskStatus(${task.id}, this.value)" class="text-xs border-gray-300 rounded">
                    <option value="todo">To Do</option>
                    <option value="in-progress" selected>In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            `).join('')}
            ${inProgressTasks.length === 0 ? '<p class="text-sm text-gray-500 text-center py-4">No tasks</p>' : ''}
          </div>
        </div>
        
        <!-- Done -->
        <div class="bg-green-50 rounded-xl p-4 border border-green-200">
          <h3 class="font-semibold text-gray-900 mb-4">Done (${doneTasks.length})</h3>
          <div class="space-y-3">
            ${doneTasks.map(task => `
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm opacity-75">
                <p class="text-sm text-gray-900 mb-3 line-through">${task.text}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">${task.priority}</span>
                  <button onclick="deleteTask(${task.id})" class="text-xs text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            `).join('')}
            ${doneTasks.length === 0 ? '<p class="text-sm text-gray-500 text-center py-4">No tasks</p>' : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBuild() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Build Tracker</h2>
          <p class="text-gray-600 mt-1">Track your ongoing projects</p>
        </div>
        <button onclick="showAddProjectForm()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm">
          + Add Project
        </button>
      </div>
      
      <div id="projectFormContainer"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        ${storage.projects.map(project => `
          <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">${project.name}</h3>
                <p class="text-xs text-gray-500 mt-1">Started ${new Date(project.startDate).toLocaleDateString()}</p>
              </div>
              <span class="text-xs px-3 py-1 rounded-full ${project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">${project.status}</span>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-600">Progress</span>
                <span class="text-sm font-semibold text-gray-900">${project.progress}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${project.progress}%"></div>
              </div>
            </div>
            
            <div class="flex gap-2">
              <input type="number" id="progress-${project.id}" min="0" max="100" value="${project.progress}" class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0-100">
              <button onclick="updateProgress(${project.id})" class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">Update</button>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${storage.projects.length === 0 ? '<p class="text-center text-gray-500 py-12">No projects yet. Start tracking your first project!</p>' : ''}
    </div>
  `;
}

function renderShip() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Ship Log</h2>
          <p class="text-gray-600 mt-1">Celebrate your launches and releases</p>
        </div>
        <button onclick="showAddShipForm()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm">
          + Add Shipment
        </button>
      </div>
      
      <div id="shipFormContainer"></div>
      
      <div class="space-y-4">
        ${storage.shipments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(ship => `
          <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">${ship.title}</h3>
                <p class="text-sm text-gray-600 mt-2">${ship.description}</p>
                <div class="flex items-center gap-4 mt-4">
                  <span class="text-xs text-gray-500">${new Date(ship.date).toLocaleDateString()}</span>
                  ${ship.link ? `<a href="${ship.link}" target="_blank" class="text-xs text-blue-600 hover:text-blue-800">View →</a>` : ''}
                </div>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${storage.shipments.length === 0 ? '<p class="text-center text-gray-500 py-12">No shipments yet. Log your first launch!</p>' : ''}
    </div>
  `;
}

// Form Functions
function showAddIdeaForm() {
  const container = document.getElementById('ideaFormContainer');
  container.innerHTML = `
    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Idea</h3>
      <div class="space-y-4">
        <textarea id="ideaText" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Describe your idea..."></textarea>
        <div class="flex gap-2">
          <button onclick="addIdea()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Add Idea</button>
          <button onclick="hideIdeaForm()" class="px-4 py-2 text-gray-600 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function hideIdeaForm() {
  document.getElementById('ideaFormContainer').innerHTML = '';
}

function addIdea() {
  const text = document.getElementById('ideaText').value.trim();
  if (!text) return;
  
  storage.ideas.push({
    id: Date.now(),
    text,
    date: new Date().toISOString(),
    archived: false
  });
  storage.save();
  renderPage();
}

function archiveIdea(id) {
  const idea = storage.ideas.find(i => i.id === id);
  if (idea) {
    idea.archived = true;
    storage.save();
    renderPage();
  }
}

function showAddTaskForm() {
  const container = document.getElementById('taskFormContainer');
  container.innerHTML = `
    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
      <div class="space-y-4">
        <input type="text" id="taskText" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Task description...">
        <select id="taskPriority" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="low">Low Priority</option>
          <option value="medium" selected>Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div class="flex gap-2">
          <button onclick="addTask()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Add Task</button>
          <button onclick="hideTaskForm()" class="px-4 py-2 text-gray-600 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function hideTaskForm() {
  document.getElementById('taskFormContainer').innerHTML = '';
}

function addTask() {
  const text = document.getElementById('taskText').value.trim();
  const priority = document.getElementById('taskPriority').value;
  if (!text) return;
  
  storage.tasks.push({
    id: Date.now(),
    text,
    status: 'todo',
    priority,
    date: new Date().toISOString()
  });
  storage.save();
  renderPage();
}

function updateTaskStatus(id, status) {
  const task = storage.tasks.find(t => t.id === id);
  if (task) {
    task.status = status;
    storage.save();
    renderPage();
  }
}

function deleteTask(id) {
  storage.tasks = storage.tasks.filter(t => t.id !== id);
  storage.save();
  renderPage();
}

function showAddProjectForm() {
  const container = document.getElementById('projectFormContainer');
  container.innerHTML = `
    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Project</h3>
      <div class="space-y-4">
        <input type="text" id="projectName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Project name...">
        <input type="number" id="projectProgress" min="0" max="100" value="0" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Initial progress (0-100)">
        <div class="flex gap-2">
          <button onclick="addProject()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Add Project</button>
          <button onclick="hideProjectForm()" class="px-4 py-2 text-gray-600 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function hideProjectForm() {
  document.getElementById('projectFormContainer').innerHTML = '';
}

function addProject() {
  const name = document.getElementById('projectName').value.trim();
  const progress = parseInt(document.getElementById('projectProgress').value) || 0;
  if (!name) return;
  
  storage.projects.push({
    id: Date.now(),
    name,
    progress: Math.min(100, Math.max(0, progress)),
    status: 'active',
    startDate: new Date().toISOString()
  });
  storage.save();
  renderPage();
}

function updateProgress(id) {
  const input = document.getElementById(`progress-${id}`);
  const progress = parseInt(input.value) || 0;
  const project = storage.projects.find(p => p.id === id);
  
  if (project) {
    project.progress = Math.min(100, Math.max(0, progress));
    storage.save();
    renderPage();
  }
}

function showAddShipForm() {
  const container = document.getElementById('shipFormContainer');
  container.innerHTML = `
    <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Shipment</h3>
      <div class="space-y-4">
        <input type="text" id="shipTitle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Shipment title...">
        <textarea id="shipDescription" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Description..."></textarea>
        <input type="url" id="shipLink" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Link (optional)">
        <div class="flex gap-2">
          <button onclick="addShipment()" class="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Add Shipment</button>
          <button onclick="hideShipForm()" class="px-4 py-2 text-gray-600 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

function hideShipForm() {
  document.getElementById('shipFormContainer').innerHTML = '';
}

function addShipment() {
  const title = document.getElementById('shipTitle').value.trim();
  const description = document.getElementById('shipDescription').value.trim();
  const link = document.getElementById('shipLink').value.trim();
  if (!title) return;
  
  storage.shipments.push({
    id: Date.now(),
    title,
    description,
    link,
    date: new Date().toISOString()
  });
  storage.save();
  renderPage();
}

// Initialize
updateActiveNav();
renderPage();