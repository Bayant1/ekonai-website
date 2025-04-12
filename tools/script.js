$(document).ready(function () {

    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: true, // Whether animation should happen only once
      });

     // Prompt Submission and Mock Response Rendering
     document.getElementById('submit-btn').addEventListener('click', async () => {
        const prompt = document.getElementById('prompt').value;
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
      
        if (!prompt) {
          resultsContainer.innerHTML = `<div class="text-red-600 font-semibold">Please enter a prompt.</div>`;
          return;
        }
      
        try {
          const response = await axios.post('https://obscure-savannah-68935-ce2ed13fd902.herokuapp.com/api/choralism', { prompt });
      
          const results = response.data;
      
          if (!Array.isArray(results)) {
            resultsContainer.innerHTML = `<div class="text-red-600 font-semibold">Unexpected response format.</div>`;
            return;
          }
      
          results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md';
      
            resultCard.innerHTML = `
              <h2 class="text-xl font-bold mb-2">${result.model}</h2>
              <p class="mb-2"><strong>Response:</strong> ${result.response}</p>
              <p><strong>MMAT Principle Applied:</strong> ${result.mmat_principle}</p>
              <p><strong>MMAT Score:</strong> <span class="font-bold text-blue-500">${result.score}</span></p>
              <p><strong>MMAT Notes:</strong> ${result.notes}</p>
              <p><strong>MMAT Suggestions:</strong> ${result.suggestions}</p>
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
        }
      });
      

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