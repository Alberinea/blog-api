const fetchData = async (endpoint, method, body = null, signal = null) => {
  try {
    const url = 'http://localhost:5000/api/';

    const data = await fetch(url + endpoint, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      signal,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
