const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show a new Quote

function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQUotes array
    try {
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if author filed is blank and reaplce it with "unknown"
        if (!quote.author) {
            authorText.textContent = "Unkown";
        } else {
        authorText.textContent = quote.author;
        };

        // Check Quote length to determine styling
        if (quote.text.length > 75) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        removeLoadingSpinner();
    } catch (error) {
        
    }
};

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet a quote
function tweetQuote() {
    const tweet = twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes()