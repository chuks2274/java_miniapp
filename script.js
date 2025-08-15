// Fetches and displays a random dog image from the Dog CEO API
async function fetchDog() {
    const output = document.getElementById('dog-output');
    output.innerHTML = 'Loading...';
    try {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        output.innerHTML = `<img src="${data.message}" alt="Dog" />`;
    } catch (err) {
        output.innerHTML = 'Failed to fetch dog image.';
        console.error(err);
    }
}

// Fetches and displays a random cat image from The Cat API
async function fetchCat() {
    const output = document.getElementById('cat-output');
    output.innerHTML = 'Loading...';
    try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        output.innerHTML = `<img src="${data[0].url}" alt="Cat" />`;
    } catch (err) {
        output.innerHTML = 'Failed to fetch cat image.';
        console.error(err);
    }
}

// Fetches and displays current weather for a given city using OpenStreetMap and Open-Meteo APIs
async function fetchWeather() {
    const city = document.getElementById("city-input").value.trim();
    const output = document.getElementById("weather-output");
    output.innerHTML = "Loading...";

    try {
        const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
        );
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            output.innerHTML = "City not found!";
            return;
        }

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const current = weatherData.current_weather;

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
  const output = document.getElementById('currency-output');
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  const amountInput = document.getElementById('amount').value.trim();

  if (!from || !to) {
    output.innerHTML = 'Please select both currencies.';
    return;
  }

  if (from === to) {
    output.innerHTML = 'Please select two different currencies.';
    return;
  }

  if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
    output.innerHTML = 'Please enter a valid amount greater than 0.';
    return;
  }

  const amount = Number(amountInput);

  output.innerHTML = 'Loading...';

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();

    if (data.result === "error" || !data.rates[to]) {
      output.innerHTML = 'Invalid currency codes or unsupported currency.';
      return;
    }

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
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fetches and displays 3 random trending movies from TMDb API
async function fetchMovies() {
    const output = document.getElementById('movie-output');
    output.innerHTML = 'Loading...';

    const TMDB_API_KEY = '48e84984fbb4b42bec2d6a46ac1689ca'; 

    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error('Network error: ' + res.status);

    const data = await res.json();

    // Shuffle results, then pick first 3
    const shuffled = shuffleArray(data.results);
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
    const username = document.getElementById('github-input').value.trim();
    const output = document.getElementById('github-output');
    if (!username) return output.innerHTML = 'Please enter a username.';
    output.innerHTML = 'Loading...';
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
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
    const output = document.getElementById('joke-output');
    output.innerHTML = 'Loading...';
    try {
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
    const output = document.getElementById("randomuser-output");
    output.innerHTML = "Loading...";

    try {
        const res = await fetch("https://randomuser.me/api/");
        
        // Check if response is OK
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        const user = data.results[0];

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
    const output = document.getElementById("advice-output");
    output.innerHTML = "Loading...";
    
    try {
        const res = await fetch("https://api.adviceslip.com/advice");
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        output.innerText = data.slip.advice;
        
    } catch (err) {
        output.innerText = "Failed to fetch advice.";
        console.error("Error fetching advice:", err);
    }
}
// Fetches and displays a random number trivia from Numbers API
async function fetchNumberTrivia() {
  const output = document.getElementById('number-output');
  output.innerHTML = 'Loading...';

  try {
    const res = await fetch('http://numbersapi.com/random/trivia?json');
    if (!res.ok) throw new Error('Network error');

    const data = await res.json();
    output.innerText = data.text;
  } catch (err) {
    output.innerText = 'Failed to fetch number trivia.';
    console.error(err);
  }
}

// Fetches and stores all quotes from ZenQuotes API for later random display
let quotes = [];
let quotesLoaded = false;

async function fetchAllQuotes() {
  const output = document.getElementById('quote-output');
  output.innerHTML = 'Loading quotes...';

  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = encodeURIComponent('https://zenquotes.io/api/quotes');

    const res = await fetch(proxyUrl + targetUrl);
    if (!res.ok) throw new Error('Network error');

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
  const output = document.getElementById('quote-output');
  if (quotes.length === 0) {
    output.innerHTML = 'No quotes loaded yet.';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  output.innerHTML = `"${q.q}" — <em>${q.a}</em>`;
}

function handleQuoteButton() {
  if (!quotesLoaded) {
    fetchAllQuotes();
  } else {
    showRandomQuote();
  }
}
// Fetches and displays a random recent SpaceX launch
async function fetchRandomLaunch() {
  const output = document.getElementById('spacex-output');
  output.innerHTML = 'Loading...';

  try {
    const res = await fetch('https://api.spacexdata.com/v4/launches');
    if (!res.ok) throw new Error('Network error');

    const data = await res.json();

    // Pick random launch
    const randomLaunch = data[Math.floor(Math.random() * data.length)];

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

