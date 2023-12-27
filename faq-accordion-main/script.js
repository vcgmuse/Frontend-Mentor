const allImageBtn = document.querySelectorAll('.card');
const allRows = document.querySelectorAll('.row');
let rowIndex = 0;
addEventListeners();

function addEventListeners() {
  allImageBtn.forEach((card) => {
    card.addEventListener('click', (e) => {
      handleImgActive(card, e.target);
      updateActiveIMG();
    });
  });

  allRows.forEach((row) => {
    row.addEventListener('mouseover', () => {
      row.classList.add('selected');
    });
    row.addEventListener('mouseout', () => {
      row.classList.remove('selected');
    });
  });

  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    switchKeys(e.key);
  });
}

function handleImgActive(card, target) {
  if (target.tagName === 'IMG') {
    if (target.classList.contains('active')) {
      target.classList.toggle('active');
      card.querySelector('p').classList.toggle('active');
    } else {
      resetAllActive();
      target.classList.toggle('active');
      card.querySelector('p').classList.toggle('active');
    }
  }
}
function resetAllActive() {
  let allActive = document.querySelectorAll('.active');
  allActive.forEach((active) => {
    active.classList.toggle('active');
  });
}
function resetAllSelected(){
  let allSelected = document.querySelectorAll('.selected');
  allSelected.forEach((selected)=>{
    selected.classList.remove('selected');
  })
}

function switchKeys(key) {
  switch (key) {
    case 'ArrowUp':
      resetAllSelected();
      rowIndex = rowIndex > 1 ? rowIndex - 1 : 0;
      allRows[rowIndex].classList.add('selected');
      break;
    case 'ArrowDown':
      resetAllSelected();
      rowIndex = rowIndex < allRows.length - 1 ? rowIndex + 1 : allRows.length - 1;
      allRows[rowIndex].classList.add('selected');
      break;
    case ' ':
      // resetAllActive();
      allRows[rowIndex].classList.add('selected');
      if(allRows[rowIndex].querySelector('img').classList.contains('active')){
        allRows[rowIndex].querySelector('img').classList.remove('active');
        allRows[rowIndex].parentNode
        .querySelector('p')
        .classList.remove('active');
      } else {
        allRows[rowIndex].querySelector('img').classList.add('active');
        allRows[rowIndex].parentNode
        .querySelector('p')
        .classList.add('active');
      }
      allRows.forEach(row=>{
        if(row===allRows[rowIndex]){
          
        }
      })
      updateActiveIMG();      
      break;
  }
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
