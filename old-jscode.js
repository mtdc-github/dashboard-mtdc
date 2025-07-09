// Sidebar toggle
// const sideMenu = document.querySelector('aside');
// const menuBtn = document.getElementById('menu-btn');
// const closeBtn = document.getElementById('close-btn');

// menuBtn.addEventListener('click', () => {
//   sideMenu.classList.remove('hide');
// });

// closeBtn.addEventListener('click', () => {
//   sideMenu.classList.add('hide');
// });

// Fetch dashboard data (example)
// fetch('http://localhost:3000/api/dashboard?region=Mumbai')
//   .then(response => response.json())
//   .then(data => {
//     document.getElementById('occupancyRate').textContent = data.occupancyRate + '%';
//     document.getElementById('occupancyDetails').textContent = data.occupancyDetails;
//     document.getElementById('totalIncomeToday').textContent = '₹' + data.totalIncomeToday.toLocaleString();
//     document.getElementById('totalIncomeDetails').textContent = data.totalIncomeDetails;
//     document.getElementById('previousYearIncome').textContent = '₹' + data.previousYearIncome.toLocaleString();
//     document.getElementById('previousYearIncomeDetails').textContent = data.previousYearIncomeDetails;
//     document.getElementById('guestArrivals').textContent = data.guestArrivals;
//     document.getElementById('guestArrivalsDetails').textContent = data.guestArrivalsDetails;
//     document.getElementById('totalCollection').textContent = '₹' + data.totalCollection.toLocaleString();
//     document.getElementById('totalCollectionDetails').textContent = data.totalCollectionDetails;
//   })
//   .catch(error => {
//     console.error('Error fetching dashboard data:', error);
//   });

// Helper function to set progress on a circle
// function setProgress(circle, percent) {
//   const radius = 36;
//   const circumference = 2 * Math.PI * radius;
//   circle.style.strokeDasharray = circumference;
//   const offset = circumference - (percent / 100) * circumference;
//   circle.style.strokeDashoffset = offset;
// }

// Card configs: [inputId, progressBarId, percentageTextId, targetValue]
// const cards = [
//   ["totalSalesInput", "salesProgressBar", "salesPercentageText", 50000],
//   ["totalExpensesInput", "expensesProgressBar", "expensesPercentageText", 10000],
//   ["totalIncomeInput", "incomeProgressBar", "incomePercentageText", 70000]
// ];

// cards.forEach(([inputId, barId, textId, target]) => {
//   const input = document.getElementById(inputId);
//   const bar = document.getElementById(barId);
//   const text = document.getElementById(textId);

//   if (!input || !bar || !text) {
//     console.warn(`Missing element(s) for IDs: ${inputId}, ${barId}, ${textId}`);
//     return;
//   }

//   function update() {
//     const value = parseFloat(input.value) || 0;
//     let percent = (value / target) * 100;
//     if (percent > 100) percent = 100;
//     if (percent < 0) percent = 0;
//     text.textContent = `${percent.toFixed(0)}%`;
//     setProgress(bar, percent);
//   }

//   update();
//   input.addEventListener("input", update);
// });

// !NEW JS CODE
// Sidebar toggle
const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.remove('hide');
});

closeBtn.addEventListener('click', () => {
  sideMenu.classList.add('hide');
});

// Fetch dashboard data (example)
fetch('http://localhost:3000/api/dashboard?region=Mumbai')
  .then(response => response.json())
  .then(data => {
    document.getElementById('occupancyRate').textContent = data.occupancyRate + '%';
    document.getElementById('occupancyDetails').textContent = data.occupancyDetails;
    document.getElementById('totalIncomeToday').textContent = '₹' + data.totalIncomeToday.toLocaleString();
    document.getElementById('totalIncomeDetails').textContent = data.totalIncomeDetails;
    document.getElementById('previousYearIncome').textContent = '₹' + data.previousYearIncome.toLocaleString();
    document.getElementById('previousYearIncomeDetails').textContent = data.previousYearIncomeDetails;
    document.getElementById('guestArrivals').textContent = data.guestArrivals;
    document.getElementById('guestArrivalsDetails').textContent = data.guestArrivalsDetails;
    document.getElementById('totalCollection').textContent = '₹' + data.totalCollection.toLocaleString();
    document.getElementById('totalCollectionDetails').textContent = data.totalCollectionDetails;
  })
  .catch(error => {
    console.error('Error fetching dashboard data:', error);
  });

// Helper function to set progress on a circle
function setProgress(circle, percent) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// Card configs: [inputId, progressBarId, percentageTextId, targetValue]
const cards = [
  ["totalSalesInput", "salesProgressBar", "salesPercentageText", 50000],
  ["totalExpensesInput", "expensesProgressBar", "expensesPercentageText", 10000],
  ["totalIncomeInput", "incomeProgressBar", "incomePercentageText", 70000]
];

cards.forEach(([inputId, barId, textId, target]) => {
  const input = document.getElementById(inputId);
  const bar = document.getElementById(barId);
  const text = document.getElementById(textId);

  if (!input || !bar || !text) {
    console.warn(`Missing element(s) for IDs: ${inputId}, ${barId}, ${textId}`);
    return;
  }

  function update() {
    const value = parseFloat(input.value) || 0;
    let percent = (value / target) * 100;
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    text.textContent = `${percent.toFixed(0)}%`;
    setProgress(bar, percent);
  }

  update();
  input.addEventListener("input", update);
});
 