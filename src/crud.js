import './style.css';

const tasks = [];
const tlGet = JSON.parse(localStorage.getItem('taskList'));

const input1 = document.querySelector('#input1');
const enter = document.querySelector('#enter');

// Add task in LocalStorage

enter.addEventListener('click', () => {
  const model = {
    description: input1.value,
    completed: false,
    index: 0,
  };

  if (!input1.value) {
    document.getElementById('error').innerHTML = 'Please give input...';
  } else {
    document.getElementById('error').innerHTML = '';
    if (tlGet == undefined) { // eslint-disable-line
      tasks.push(model);
      localStorage.setItem('taskList', JSON.stringify(tasks));
    } else {
      tlGet.push(model);
      localStorage.setItem('taskList', JSON.stringify(tlGet));
    }
  }
});

// Show task list

const data = document.getElementById('data');

if (!tlGet || !tlGet[0]) {
  const template = `<div>
  </div>`;
  data.innerHTML += template;
} else {
  tlGet.forEach((task, index) => {
    tlGet[index].index = index + 1;
    localStorage.setItem('taskList', JSON.stringify(tlGet));
    const i = tlGet.indexOf(task);
    const template = `<div class="template-div">
        <input id="cb" class="check" type="checkbox" />
        <input class="input-text" id="input2" type="text" value="${task.description}" readonly />
        <i id="${i}"  class="ico fa-solid fa-ellipsis-vertical  del"></i>      
      </div>`;
    data.innerHTML += template;
  });
}

// Update task

const icon = document.querySelectorAll('.ico');

icon.forEach((ico) => {
  ico.addEventListener('mouseover', () => {
    ico.classList.remove('fa-ellipsis-vertical');
    ico.classList.add('fa-trash-can');
  });
  ico.addEventListener('mouseleave', () => {
    ico.classList.remove('fa-trash-can');
    ico.classList.add('fa-ellipsis-vertical');
  });
});

const input2 = document.querySelectorAll('#input2');

input2.forEach((input, index) => {
  input.addEventListener('click', () => {
    input.removeAttribute('readonly');
  });
  input.addEventListener('keyup', () => {
    tlGet[index].description = input.value;
    localStorage.setItem('taskList', JSON.stringify(tlGet));
  });
});

// Delete task

const dels = document.querySelectorAll('.del');

dels.forEach((del) => {
  del.addEventListener('click', (e) => {
    const temp = e.currentTarget.id;
    tlGet.splice(temp, 1);
    localStorage.setItem('taskList', JSON.stringify(tlGet));
    window.location.reload();
  });
});
