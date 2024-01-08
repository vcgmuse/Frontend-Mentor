const continueElement = document.querySelector('.continue');

const jsonData = fetch('./data.json');
jsonData
  .then((res) => {
    return res.json();
  })
  .then((data) =>{
    data.forEach(bit=>{
      continueElement.insertAdjacentElement('beforebegin',createCategory(bit))
    })
  })

function createCategory(jsonData) {
  let category = document.createElement('div');
  category.classList.add('category');
  category.classList.add(`${jsonData['category'].toLowerCase()}`);

  let title = document.createElement('div');
  title.classList.add('title');

  let image = document.createElement('img');
  image.src = jsonData['icon'];
  category.append(image);
  category.append(title);

  let pTag = document.createElement('p');
  pTag.innerText = jsonData['category'];
  title.append(pTag);

  let rank = document.createElement('div');
  rank.classList.add('rank');
  category.append(rank);

  let span = document.createElement('span');
  let score = jsonData['score'];
  span.innerText = `${score} / 100`;
  rank.append(span);

  return category;
}

