const allImageBtn = document.querySelectorAll('.card');
const allRows = document.querySelectorAll('.row');
let rowIndex = 0;
const keys = document.addEventListener('keydown', (e) => {
  e.preventDefault();
  allRows.forEach((row) => {
    row.classList.remove('selected');
  });
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp':
      rowIndex = rowIndex > 1 ? rowIndex - 1 : 0;
      allRows[rowIndex].classList.add('selected');
      console.log(rowIndex);
      break;
    case 'ArrowDown':
      console.log(allRows.length);
      rowIndex =
        rowIndex < allRows.length - 1 ? rowIndex + 1 : allRows.length - 1;
      allRows[rowIndex].classList.add('selected');
      break;
    case ' ':
      allRows[rowIndex].classList.add('selected');
      resetAllActive();
      allRows[rowIndex].querySelector('img').classList.toggle('active');
      updateActiveIMG();
      allRows[rowIndex].parentNode.querySelector('p').classList.toggle('active');
      break;
  }
});
allRows.forEach((row) => {
  row.addEventListener('mouseover', () => {
    allRows.forEach((row) => {
      row.classList.remove('selected');
    });
    row.classList.add('selected');
  });
  row.addEventListener('mouseout', () => {
    row.classList.remove('selected');
  });
});
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
