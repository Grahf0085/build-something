import fetch from 'node-fetch';

export const getQuote = async () => {
  const res = await fetch('https://favqs.com/api/qotd', {
    method: 'GET',
    body: JSON.stringify({
      'qotd_date': '2021-06-23T00:00:00+00:00',
      'quote': {
        'id': 32206,
        'dialogue': false,
        'private': false,
        'tags': [
          'home'
        ],
        'url': 'https://favqs.com/quotes/friedrich-nietzsche/32206-an-artist-has-',
        'favorites_count': 0,
        'upvotes_count': 1,
        'downvotes_count': 0,
        'author': 'Friedrich Nietzsche',
        'author_permalink': 'friedrich-nietzsche',
        'body': 'An artist has no home in Europe except in Paris.'
      }
    }),
  })
    .set('Authorization', `Token token=${process.env.QUOTE_KEY}`);

  // const json = await res.json();
  // return json.result.amount;
};
