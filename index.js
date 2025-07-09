document.addEventListener('DOMContentLoaded', () => {
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

  // Initialize mini charts for each region
  regions.forEach(region => {
    const canvas = document.getElementById(`${region}-mini-chart`);
    if (!canvas) return;

    miniCharts[region] = new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Income', 'Sales', 'Expenses'],
        datasets: [{
          label: '',
          backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
          data: [0, 0, 0]
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { display: false },
            ticks: { display: false }
          }
        }
      }
    });
  });

  // Function to get metric values for a region
  function getRegionMetrics(region) {
    const income = parseFloat(document.getElementById(`${region}-income`)?.value) || 0;
    const sales = parseFloat(document.getElementById(`${region}-sales`)?.value) || 0;
    const expenses = parseFloat(document.getElementById(`${region}-expenses`)?.value) || 0;
    return [income, sales, expenses];
  }

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
      percent = Math.min(Math.max(percent, 0), 100);
      text.textContent = `${percent.toFixed(0)}%`;
      setProgress(bar, percent);
    }

    update();
    input.addEventListener("input", update);
  });

  // Region select dropdown with Choices.js initialization
  const regionSelect = document.getElementById('regionSelect');
  if (regionSelect) {
    const choices = new Choices(regionSelect, {
      searchEnabled: true,
      itemSelectText: '',
      shouldSort: false,
      placeholderValue: 'Select a region',
    });

    // Fetch dashboard data for selected region
    function fetchDashboardData(region) {
      if (!region) return;
      fetch(`http://localhost:3000/api/dashboard?region=${encodeURIComponent(region)}`)
        .then(response => response.json())
        .then(data => {
          // Update dashboard elements with fetched data
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
    }

    // Load data for default selected region on page load
    fetchDashboardData(regionSelect.value);

    // On region change, fetch new data or navigate
    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
      if (!selectedRegion) return;

      // If you want SPA behavior (update dashboard only), uncomment next line and comment out redirect
      // fetchDashboardData(selectedRegion);

      // If you want to navigate to region-specific page, uncomment next line and comment out fetchDashboardData
      window.location.href = selectedRegion + '.html';
    });
  }

  // Sidebar links SPA tab navigation
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        // Hide all main content sections
        document.querySelectorAll('.main-content > div').forEach(div => {
          div.style.display = 'none';
        });
        // Show the target section
        const targetId = href.substring(1);
        const targetDiv = document.getElementById(targetId);
        if (targetDiv) {
          targetDiv.style.display = 'block';
        }
      }
      // else default link behavior (navigate)
    });
  });

  // Show dashboard section by default
  const dashboardSection = document.getElementById('dashboard');
  if (dashboardSection) {
    dashboardSection.style.display = 'block';
  }
});
