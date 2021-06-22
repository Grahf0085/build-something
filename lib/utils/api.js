import request from 'superagent';

export const getQuote = async () => {

  const res = await request.get('https://favqs.com/api/qotd');
  
  return res.body.quote.body;

};
