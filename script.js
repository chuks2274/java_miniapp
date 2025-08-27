// Fetches and displays a random dog image from the Dog CEO API
async function fetchDog() {
    // Select element and show loading message
    const output = document.getElementById('dog-output');
    output.innerHTML = 'Loading...';
    try {
        // Fetch a random dog image from the API, check for errors, and parse the JSON
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        // Display the fetched dog image in the output element
        output.innerHTML = `<img src="${data.message}" alt="Dog" />`;
    } catch (err) {
        output.innerHTML = 'Failed to fetch dog image.';
        console.error(err);
    }
}

// Fetches and displays a random cat image from The Cat API
async function fetchCat() {
    // Get the output element and show a loading message
    const output = document.getElementById('cat-output');
    output.innerHTML = 'Loading...';
    try {
        // Fetch a random cat image from the API, check for errors, and parse the JSON
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        // Display the fetched cat image in the output element
        output.innerHTML = `<img src="${data[0].url}" alt="Cat" />`;
    } catch (err) {
        output.innerHTML = 'Failed to fetch cat image.';
        console.error(err);
    }
}

// Fetches and displays current weather for a given city using OpenStreetMap and Open-Meteo APIs
async function fetchWeather() {
    // Get the city input value, select the output element, and show a loading message
    const city = document.getElementById("city-input").value.trim();
    const output = document.getElementById("weather-output");
    output.innerHTML = "Loading...";

    try {
        // Fetch geographic data for the entered city from OpenStreetMap and parse the JSON
        const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
        );
        const geoData = await geoResponse.json();

        // If no location data is returned, show an error message and stop execution
        if (!geoData.length) {
            output.innerHTML = "City not found!";
            return;
        }

        // Get the latitude and longitude of the first matching city
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        // Fetch current weather data for the given latitude and longitude and parse the JSON
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        // Get the current weather information from the fetched data
        const current = weatherData.current_weather;

        // Display the current weather information in the output element
        output.innerHTML = `
            <strong>City:</strong> ${city}<br>
            <strong>Temperature:</strong> ${current.temperature}°C<br>
            <strong>Wind Speed:</strong> ${current.windspeed} km/h<br>
            <strong>Wind Direction:</strong> ${current.winddirection}°<br>
            <strong>Time:</strong> ${current.time}
        `;
    } catch (error) {
        output.innerHTML = "Error fetching weather.";
        console.error(error);
    }
}
// Converts an amount from one currency to another using the Exchange Rate API
async function fetchCurrency() {
  // Get output element and input values for source currency, target currency, and amount
  const output = document.getElementById('currency-output');
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  const amountInput = document.getElementById('amount').value.trim();

  // If either currency is not selected, show an error message and stop execution
  if (!from || !to) {
    output.innerHTML = 'Please select both currencies.';
    return;
  }

  // If the source and target currencies are the same, show an error message and stop execution
  if (from === to) {
    output.innerHTML = 'Please select two different currencies.';
    return;
  }

  // If the amount is empty, not a number, or ≤ 0, show an error message and stop execution
  if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
    output.innerHTML = 'Please enter a valid amount greater than 0.';
    return;
  }

  // Convert the input to a number and show a loading message
  const amount = Number(amountInput);

  output.innerHTML = 'Loading...';

  try {
    // Fetch exchange rates for the selected source currency, check for errors, and parse JSON
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();

    // If the API returns an error or the target currency is unsupported, show an error and stop execution
    if (data.result === "error" || !data.rates[to]) {
      output.innerHTML = 'Invalid currency codes or unsupported currency.';
      return;
    }

    // Calculate the conversion, format it, and display the result with the exchange rate
    const rate = data.rates[to];
    const converted = (rate * amount).toFixed(4);
    output.innerHTML = `${amount} ${from} = ${converted} ${to} (Rate: 1 ${from} = ${rate} ${to})`;
  } catch (err) {
    output.innerHTML = 'Error fetching rate.';
    console.error(err);
  }
}


// Shuffles an array randomly using the Fisher-Yates algorithm
function shuffleArray(array) {
    // Loop backwards through the array 
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i  
        const j = Math.floor(Math.random() * (i + 1));
        // Switch the elements at i and j  
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetches and displays 3 random trending movies from TMDb API
async function fetchMovies() {
    // Get the output element and show a loading message
    const output = document.getElementById('movie-output');
    output.innerHTML = 'Loading...';

    // API key for The Movie Database (TMDB) API
    const TMDB_API_KEY = '48e84984fbb4b42bec2d6a46ac1689ca'; 

    try {
        // Fetch trending movies from TMDB API, check for errors, and parse the JSON response
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error('Network error: ' + res.status);

    const data = await res.json();

    // Shuffle the movie results randomly, select the first 3, create HTML, and display them
    const shuffled = shuffleArray(data.results);
    
    // Take first 3 shuffled movies, wrap in <p>, and join into one string
    const movies = shuffled.slice(0, 3)
        .map(movie => `<p>${movie.title}</p>`)
        .join('');
    output.innerHTML = movies;
} catch (err) {
    output.innerHTML = 'Failed to fetch movies.';
    console.error(err);
}
}

// Fetches GitHub user info (avatar, name, followers) by username
async function fetchGithubUser() {
    // Get GitHub username input, select output element, show error if empty, otherwise show loading
    const username = document.getElementById('github-input').value.trim();
    const output = document.getElementById('github-output');
    if (!username) return output.innerHTML = 'Please enter a username.';
    output.innerHTML = 'Loading...';
    try {
        // Fetch GitHub user data for the given username, check for errors, and parse the JSON
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        // Display the GitHub user's avatar, name (or login), and follower count in the output element
        output.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" width="100"/>
            <p>${data.name || data.login}</p>
            <p>Followers: ${data.followers}</p>
        `;
    } catch (err) {
        output.innerHTML = 'User not found.';
        console.error(err);
    }
}

// Fetches and displays a random joke from JokeAPI
async function fetchJoke() {
    // Get the output element and show a loading message
    const output = document.getElementById('joke-output');
    output.innerHTML = 'Loading...';
    try {
        // Fetch a random joke from the JokeAPI, check for errors, parse the JSON, and display it
        const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        output.innerHTML = `${data.joke}`;
    } catch (err) {
        output.innerHTML = 'Failed to fetch joke.';
        console.error(err);
    }
}

// Fetches and displays a random user profile from Random User API
async function fetchRandomUser() {
    // Get the output element and show a loading message while fetching data
    const output = document.getElementById("randomuser-output");
    output.innerHTML = "Loading...";

    try {
        // Fetch a random user from the Random User API
        const res = await fetch("https://randomuser.me/api/");
        
        // If the response is not OK, throw an error with the status code
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Parse the JSON response and get the first random user
        const data = await res.json();
        const user = data.results[0];

        // Display the random user's photo, full name, and nationality in the output element
        output.innerHTML = `
            <img src="${user.picture.medium}" alt="User photo"><br>
            ${user.name.first} ${user.name.last} (${user.nat})
        `;
    } catch (err) {
        output.innerHTML = "Failed to fetch user.";
        console.error("Error fetching random user:", err);
    }
}

// Fetches and displays a random piece of advice from Advice Slip API
async function fetchAdvice() {
    // Get the output element and show a loading message while fetching advice
    const output = document.getElementById("advice-output");
    output.innerHTML = "Loading...";
    
    try {
        // Fetch a random piece of advice from the Advice Slip API
        const res = await fetch("https://api.adviceslip.com/advice");
        // If the response is not OK, throw an error with the HTTP status code
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // Parse the JSON response and display the advice text in the output element
        const data = await res.json();
        output.innerText = data.slip.advice;
        
    } catch (err) {
        output.innerText = "Failed to fetch advice.";
        console.error("Error fetching advice:", err);
    }
}
// Fetches and displays a random number trivia from Numbers API
async function fetchNumberTrivia() {
  // Get the output element and show a loading message
  const output = document.getElementById('number-output');
  output.innerHTML = 'Loading...';

  try {
    // Fetch a random number trivia from the Numbers API and check for network errors
    const res = await fetch('http://numbersapi.com/random/trivia?json');
    if (!res.ok) throw new Error('Network error');

    // Parse the JSON response and display the trivia text in the output element
    const data = await res.json();
    output.innerText = data.text;
  } catch (err) {
    output.innerText = 'Failed to fetch number trivia.';
    console.error(err);
  }
}

// Initialize empty quotes array and a flag to track if quotes are loaded
let quotes = [];
let quotesLoaded = false;

// Fetches all quotes from ZenQuotes API and stores them locally
async function fetchAllQuotes() {
  // Get the output element and show a loading message while fetching quotes
  const output = document.getElementById('quote-output');
  output.innerHTML = 'Loading quotes...';

  try {
    // Set up a proxy URL to avoid CORS issues and encode the target quotes API URL
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = encodeURIComponent('https://zenquotes.io/api/quotes');

    // Fetch quotes from the target API via the proxy and check for network errors
    const res = await fetch(proxyUrl + targetUrl);
    if (!res.ok) throw new Error('Network error');

    // Parse the JSON response, mark quotes as loaded, and show a message to the user
    quotes = await res.json();
    quotesLoaded = true;
    output.innerHTML = 'Quotes loaded. Click "Get Quote" again to see a random quote.';
  } catch (err) {
    output.innerHTML = 'Failed to fetch quotes.';
    console.error(err);
  }
}
// Displays a random quote from loaded quotes or fetches quotes if not loaded
function showRandomQuote() {
  // Get the output element and check if any quotes are loaded; show a message and stop if none
  const output = document.getElementById('quote-output');
  if (quotes.length === 0) {
    output.innerHTML = 'No quotes loaded yet.';
    return;
  }
  // Pick a random quote from the loaded quotes and display it in the output element
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  output.innerHTML = `"${q.q}" — <em>${q.a}</em>`;
}
// Handle the quote button click: fetch all quotes if not loaded, otherwise show a random quote
function handleQuoteButton() {
  if (!quotesLoaded) {
    fetchAllQuotes();
  } else {
    showRandomQuote();
  }
}
// Fetches and displays a random recent SpaceX launch
async function fetchRandomLaunch() {
  // Get the output element and show a loading message while fetching SpaceX data
  const output = document.getElementById('spacex-output');
  output.innerHTML = 'Loading...';

  try {
    // Fetch SpaceX launch data, check for network errors, and parse the JSON response
    const res = await fetch('https://api.spacexdata.com/v4/launches');
    if (!res.ok) throw new Error('Network error');

    const data = await res.json();

    // Pick a random launch from the fetched SpaceX launches data
    const randomLaunch = data[Math.floor(Math.random() * data.length)];

    // Display the selected SpaceX launch's mission name, date, and details in the output element
    output.innerHTML = `
      <strong>Mission:</strong> ${randomLaunch.name} <br />
      <strong>Date:</strong> ${new Date(randomLaunch.date_utc).toLocaleString()} <br />
      <strong>Details:</strong> ${randomLaunch.details || 'No details available.'}
    `;
  } catch (err) {
    output.innerHTML = 'Failed to fetch SpaceX launch.';
    console.error(err);
  }
}

