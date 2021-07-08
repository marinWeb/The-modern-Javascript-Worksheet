const { hash } = window.location;

const message = atob(hash.replace('#', ''));

if (message) {
  document.querySelector('#form-message').classList.add('hide');
  document.querySelector('#message-show').classList.remove('hide');

  document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  document.querySelector('#form-message').classList.add('hide');
  document.querySelector('#label-message').classList.remove('hide');
  const input = document.querySelector('#message-input');
  const encrypted = btoa(input.value);

  const linkInput = document.querySelector('#link-input');

  linkInput.value = `${window.location}#${encrypted}`;
  // console.dir(linkInput);
  linkInput.select();
});
