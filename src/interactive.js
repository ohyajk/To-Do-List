const cbs = document.querySelectorAll('#cb');
let tlGet = JSON.parse(localStorage.getItem('taskList'));

cbs.forEach((cb, index) => {
  cb.addEventListener('change', (e) => {
    if (e.target.checked) {
      tlGet[index].completed = true;
      localStorage.setItem('taskList', JSON.stringify(tlGet));
    } else {
      tlGet[index].completed = false;
      localStorage.setItem('taskList', JSON.stringify(tlGet));
    }
  });
});

const clearAll = document.querySelector('#clearAll');

tlGet.forEach(() => {
  clearAll.addEventListener('click', () => {
    tlGet = tlGet.filter((t) => t.completed === false);
    localStorage.setItem('taskList', JSON.stringify(tlGet));
    window.location.reload();
  });
});
