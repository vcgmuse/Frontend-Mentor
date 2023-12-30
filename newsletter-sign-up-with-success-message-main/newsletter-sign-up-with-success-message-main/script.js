const email = document.getElementById('email');
const invalidMessage = document.querySelector('p.invalid');
const submitBtn = document.querySelector('.submit');
const dismiss = document.querySelector('.dismiss');
email.addEventListener('input', () => {
  if (email.checkValidity() === false) {
    invalidMessage.style.display = 'flex';
  } else {
    invalidMessage.style.display = 'none';
  }
});
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let emailInput = email.value.trim();
  if (emailInput === '') {
    document.querySelector('.invalid').style.display = 'flex';
  } else {
    document.querySelector('main').style.display = 'none';
    // document.querySelector('.header').style.display = 'none';
    // document.querySelector('.content').style.display = 'none';
    document.querySelector('.success').style.display = 'flex';
    document.querySelector('.email-target').textContent = emailInput.toLowerCase();
  }
});

dismiss.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('main').style.display = 'flex';
  // document.querySelector('.header').style.display = 'flex';
  // document.querySelector('.content').style.display = 'flex';
  document.querySelector('.success').style.display = 'none';
});
