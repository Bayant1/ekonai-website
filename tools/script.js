$(document).ready(function () {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });
  
    const submitButton = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results');
    const mmatToggle = document.getElementById('mmat-toggle');
    const toggleTrack = document.getElementById('toggle-track');
    const toggleDot = document.getElementById('toggle-dot');
    const toggleLabel = document.querySelector('label[for="mmat-toggle"] span');
  
    // Function to update MMAT toggle UI and save state
    function updateMMATToggleUI(isChecked) {
      // Update the label text
      if (isChecked) {
        toggleLabel.textContent = '🟢 MMAT Scoring Enabled';
        toggleTrack.style.backgroundColor = '#4caf50'; // Green when enabled
        toggleDot.style.transform = 'translateX(1.5rem)'; // Move dot to the right
      } else {
        toggleLabel.textContent = '🔴 MMAT Scoring Disabled';
        toggleTrack.style.backgroundColor = '#d1d5db'; // Gray when disabled
        toggleDot.style.transform = 'translateX(0)'; // Reset dot to the left
      }
  
      // Save the state to localStorage
      localStorage.setItem('mmatScoringEnabled', isChecked);
    }
  
    // Initialize MMAT toggle state on page load
    const savedMMATState = localStorage.getItem('mmatScoringEnabled');
    const isMMATEnabled = savedMMATState === null ? true : savedMMATState === 'true'; // Default to enabled
    mmatToggle.checked = isMMATEnabled;
    updateMMATToggleUI(isMMATEnabled);
  
    // Add event listener for MMAT toggle
    mmatToggle.addEventListener('change', () => {
      const isChecked = mmatToggle.checked;
      updateMMATToggleUI(isChecked);
    });
  
    submitButton.addEventListener('click', async () => {
      const prompt = document.getElementById('prompt').value;
      resultsContainer.innerHTML = '';
  
      if (!prompt) {
        resultsContainer.innerHTML = `<div class="text-red-600 font-semibold">Please enter a prompt.</div>`;
        return;
      }
  
      // Show loading spinner and disable the button
      resultsContainer.innerHTML = `
        <div class="flex justify-center items-center">
          <div class="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      `;
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
  
      try {
        const response = await axios.post('https://obscure-savannah-68935-ce2ed13fd902.herokuapp.com/api/choralism', { prompt });
  
        const results = response.data;
  
        if (!Array.isArray(results)) {
          resultsContainer.innerHTML = `<div class="text-red-600 font-semibold">Unexpected response format.</div>`;
          return;
        }
  
        // Clear loading spinner and render results
        resultsContainer.innerHTML = '';
        results.forEach(result => {
          const resultCard = document.createElement('div');
          resultCard.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md';
  
          // Check MMAT toggle state
          const showMMAT = mmatToggle.checked;
  
          resultCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${result.model}</h2>
            <p class="mb-2"><strong>Response:</strong> ${result.response}</p>
            ${showMMAT ? `
              <p><strong>MMAT Principle Applied:</strong> ${result.mmat_principle}</p>
              <p><strong>MMAT Score:</strong> <span class="font-bold text-blue-500">${result.score}</span></p>
              <p><strong>MMAT Notes:</strong> ${result.notes}</p>
              <p><strong>MMAT Suggestions:</strong> ${result.suggestions}</p>
            ` : ''}
          `;
  
          resultsContainer.appendChild(resultCard);
        });
      } catch (error) {
        const message = error.response?.data?.message || error.message || 'An unknown error occurred.';
        resultsContainer.innerHTML = `
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">${message}</span>
          </div>
        `;
      } finally {
        // Re-enable the button and remove loading styles
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    });
  
    // Dark Mode Toggle Logic
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
  
    function setTheme(theme) {
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  
    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  
    // Toggle theme on button click
    toggleButton.addEventListener('click', () => {
      const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      console.log('New Theme:', newTheme);
      console.log('HTML Classes:', htmlElement.classList);
    });
  });