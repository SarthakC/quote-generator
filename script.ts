interface Quote {
  quoteText: string;
  quoteAuthor: string;
  senderName: string;
  senderLink: string;
  quoteLink: string;
}

const quoteContainer = document.getElementById(
  'quote-container',
) as HTMLDivElement;

const quoteTextSpan = document.getElementById('quote') as HTMLSpanElement;
const authorTextSpan = document.getElementById('author') as HTMLSpanElement;
const twitterBtn = document.getElementById('twitter') as HTMLButtonElement;
const quoteBtn = document.getElementById('new-quote') as HTMLButtonElement;
const loader = document.getElementById('loader') as HTMLDivElement;

const startLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const completeLoading = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

const getQuote = async (): Promise<Quote> => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    startLoading();
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    completeLoading();
    return data;
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  }
};

const populateData = (data: Quote) => {
  const { quoteAuthor, quoteText } = data;

  quoteText.length > 120
    ? quoteTextSpan.classList.add('long-quote')
    : quoteTextSpan.classList.remove('long-quote');

  authorTextSpan.innerText = quoteAuthor || 'Unknown';
  quoteTextSpan.innerText = quoteText;
};

const tweetQuote = () => {
  const quote = quoteTextSpan.innerText;
  const author = authorTextSpan.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

const onLoad = async () => {
  const data = await getQuote();
  populateData(data);
};

quoteBtn.addEventListener('click', onLoad);
twitterBtn.addEventListener('click', tweetQuote);

onLoad();
