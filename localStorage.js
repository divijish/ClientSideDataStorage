const name = document.querySelector('name').value;

localStorage.setItem('name', 'Divij');
const h1 = document.querySelector('#title');

name ? h1.textContent = `Hii ${name}`: h1.textContent = `So sad`;