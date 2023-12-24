const allImageBtn = document.querySelectorAll('.card');
allImageBtn.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      if (e.target.classList.contains('active')) {
        e.target.classList.toggle('active');
        card.querySelector('p').classList.toggle('active');
      } else {
        resetAllActive();
        e.target.classList.toggle('active');
        card.querySelector('p').classList.toggle('active');
      }
      updateActiveIMG();
    }
  });
});
function resetAllActive() {
  let allActive = document.querySelectorAll('.active');
  allActive.forEach((active) => {
    active.classList.remove('active');
  });
}
function updateActiveIMG() {
  let allActiveIMG = document.querySelectorAll('.card .row img');
  allActiveIMG.forEach((imgElement) => {
    if (imgElement.classList.contains('active')) {
      imgElement.src = './assets/images/icon-minus.svg';
    } else {
      imgElement.src = './assets/images/icon-plus.svg';
    }
  });
}