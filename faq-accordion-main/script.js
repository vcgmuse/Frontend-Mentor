const allButtons = document.querySelectorAll('.row button');
const allImages = document.querySelectorAll('.row img');
allButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('active');
    let newArray = Array.from(allButtons).filter(btn=>btn!==e.target);
    newArray.forEach((element) => {
      element.parentNode.parentNode.classList.remove('active');
      element.nextElementSibling.classList.remove('active');
      updateActiveIMG();
    });
  });
});
allImages.forEach((image) => {
  image.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.classList.toggle('active');
    e.target.classList.toggle('active');

    let newArray = Array.from(allImages).filter(img=>img!==e.target);
    newArray.forEach((element) => {
      element.parentNode.parentNode.classList.remove('active');
      element.classList.remove('active');
      updateActiveIMG();
    });

    updateActiveIMG();
  });
});
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
