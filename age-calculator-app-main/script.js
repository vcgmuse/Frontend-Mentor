const processButton = document.getElementById('process');
let dates = document.querySelectorAll('.date');
const now = new Date();
const metaMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
const currentDate = {
  day: now.getDate(),
  month: now.getMonth() + 1,
  year: now.getFullYear(),
};
let inputDate = {
  day: parseInt(document.getElementById('day').value),
  month: parseInt(document.getElementById('month').value),
  year: parseInt(document.getElementById('year').value),
};
let birthday =
  currentDate['month'] === inputDate['month'] &&
  currentDate['day'] === inputDate['day'];
let personAge = {
  days: 0,
  months: 0,
  years: 0,
};
function updateData() {
  birthday =
    currentDate['month'] === inputDate['month'] &&
    currentDate['day'] === inputDate['day'];
  inputDate['day'] = document.getElementById('day').value;
  inputDate['month'] = document.getElementById('month').value;
  inputDate['year'] = document.getElementById('year').value;
  let ageOfPerson = getAge();
  personAge['days'] = ageOfPerson['days'];
  personAge['months'] = ageOfPerson['months'];
  personAge['years'] = ageOfPerson['years'];
}
function updateAgeProfile() {
  document.getElementById('days').textContent = personAge['days'];
  document.getElementById('months').textContent = personAge['months'];
  document.getElementById('years').textContent = personAge['years'];
}
processButton.addEventListener('click', (e) => {
  let valid = true;
  date = document.querySelectorAll('.date');
  dates.forEach((date) => {
    if (date.nextElementSibling.classList.contains('required')) {
      valid = false;
    }
    if (isNaN(Number(date.value))) {
      valid = false;
      e.target.classList.remove('valid');
    } else {
      date.previousElementSibling.classList.remove('required');
      date.nextElementSibling.classList.remove('required');
    }
  });
  if (valid) {
    e.target.classList.add('valid');
    updateAgeProfile();
  } else {
    e.target.classList.remove('valid');
  }
});
function handleEdgeCase() {
  dates = document.querySelectorAll('.date');
  dates.forEach((date) => {
    date.previousElementSibling.classList.add('required');
    date.nextElementSibling.classList.add('required');
    date.nextElementSibling.textContent =
      inputDate[date.name] > currentDate[date.name]
        ? `Must be in the past`
        : `Must be a valid ${date.name}`;
  });
}
function handleEmpty(e) {
  e.previousElementSibling.classList.add('required');
  e.nextElementSibling.classList.add('required');
  e.nextElementSibling.textContent = `Must not be empty`;
}
function handleNaN(e) {
  e.previousElementSibling.classList.add('required');
  e.nextElementSibling.classList.add('required');
  e.nextElementSibling.textContent = `Must be a valid ${e.name}`;
}
function getAge() {
  let ageYears = currentDate['year'] - inputDate['year'];
  let ageMonths = currentDate['month'] - inputDate['month'];
  let ageDays = currentDate['day'] - inputDate['day'];
  if (birthday === false) {
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears -= 1;
      ageMonths = 12 + ageMonths;
      let lastMonthDays = new Date(
        currentDate['year'],
        currentDate['month'] - 1,
        0
      ).getDate();
      ageDays = lastMonthDays + ageDays;
      if (inputDate['day'] > currentDate['day']) {
        ageMonths -= 1;
        let remainingDaysInLastMonth =
          lastMonthDays - inputDate['day'] + currentDate['day'];
        ageDays = remainingDaysInLastMonth;
      }
    }
  }
  if (birthday === true) {
    ageDays = 0;
    ageMonths = 0;
  }
  if (ageMonths === 12) {
    ageMonths = 0;
  }
  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}
dates.forEach((date) => {
  date.addEventListener('input', (e) => {
    updateData();
    switchDate(e);
    // validateSpecialCase();
    console.log(inputDate, personAge);
  });
});
function checkLeapYear(year) {
  year = parseInt(year);
  if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
    return true;
  } else {
    return false;
  }
}
// function validateSpecialCase() {
//   let specialYear = document.getElementById('year');
//   let specialMonth = document.getElementById('month');
//   let specialDay = document.getElementById('day');
//   let container = [specialYear, specialMonth, specialDay]
//   let greaterYear = parseInt(specialYear.value) >= currentDate['year'];
//   let greaterMonth = parseInt(specialMonth.value) > currentDate['month'];
//   let greaterDay = parseInt(specialDay.value) > currentDate['day'];
//   if (
//     greaterYear &&(
//       greaterMonth ||
//       greaterDay)
//   ) {
//     container.forEach(input=>{
//       if(input.name === 'year' && greaterYear === true){
        
//       }
//     })
//   }
// }
function validateEdgeCase(e) {
  let target = e.target.nextElementSibling;
  value = parseInt(e.target.value);
  let leapYear = checkLeapYear(inputDate['year']);
  let month = parseInt(inputDate['month']);
  if (leapYear === true && month === 2) {
    metaMonth[2] = 29;
  } else if (leapYear === false && month === 2) {
    metaMonth[2] = 28;
  }
  let testDate = metaMonth[inputDate['month']];
  if (value > testDate) {
    addRequiredClass(e);
    target.textContent = `Max ${testDate} Value`;
  } else if (testDate === undefined) {
    addRequiredClass(e);
    target.textContent = `Max ${metaMonth[currentDate['month']]}`;
  } else {
    removeRequiredClass(e);
  }
}
function validateDay(e) {
  let target = e.target.nextElementSibling;
  value = parseInt(e.target.value);
  if (value > 28) {
    validateEdgeCase(e);
  } else if (value < 1) {
    addRequiredClass(e);
    target.textContent = `Minimal 1 Value`;
  } else if (e.target.value.length === 0) {
    addRequiredClass(e);
    target.textContent = `Must not be empty`;
  } else if (isNaN(Number(e.target.value))) {
    addRequiredClass(e);
    target.textContent = `Must be a valid ${e.target.name}`;
  } else {
    removeRequiredClass(e);
  }
}
function validateMonth(e) {
  let target = e.target.nextElementSibling;
  value = parseInt(e.target.value);
  if (value > 12) {
    addRequiredClass(e);
    target.textContent = `Max 12 Value`;
  } else if (
    value > currentDate['month'] &&
    inputDate['year'] === currentDate['year']
  ) {
    inputDate['month'] = currentDate['month'];
    inputDate['day'] = currentDate['day'];
  } else if (value < 1) {
    addRequiredClass(e);
    target.textContent = `Minimal 1 Value`;
  } else if (e.target.value.length === 0) {
    addRequiredClass(e);
    target.textContent = `Must not be empty`;
  } else if (isNaN(Number(e.target.value))) {
    addRequiredClass(e);
    target.textContent = `Must be a valid ${e.target.name}`;
  } else {
    removeRequiredClass(e);
  }
}
function validateYear(e) {
  let target = e.target.nextElementSibling;
  let value = parseInt(e.target.value);
  if (value > currentDate['year']) {
    addRequiredClass(e);
    target.textContent = `Max ${currentDate['year']} Value`;
  } else if (value < 100) {
    addRequiredClass(e);
    target.textContent = `Minimal 100 Value`;
  } else if (e.target.value.length === 0) {
    addRequiredClass(e);
    target.textContent = `Must not be empty`;
  } else if (isNaN(Number(e.target.value))) {
    addRequiredClass(e);
    target.textContent = `Must be a valid ${e.target.name}`;
  } else {
    removeRequiredClass(e);
  }
}
function addRequiredClass(e) {
  e.target.previousElementSibling.classList.add('required');
  e.target.nextElementSibling.classList.add('required');
}
function removeRequiredClass(e) {
  e.target.previousElementSibling.classList.remove('required');
  e.target.nextElementSibling.classList.remove('required');
}
function switchDate(e) {
  switch (e.target.name) {
    case 'day':
      validateDay(e);
      break;
    case 'month':
      validateMonth(e);
      break;
    case 'year':
      validateYear(e);
      break;
  }
}
let userAgent = navigator.userAgent;
document.onload = function () {
  if (userAgent.indexOf('Firefox') !== -1) {
    // Inject a style block with a media query for Firefox
    let cssRules =
      '@media screen and (min-width: 1440px) { main { margin: 10rem 30rem; } }';
    let style = document.createElement('style');
    style.textContent = cssRules;
    document.head.appendChild(style);
  }
};