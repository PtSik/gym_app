export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c5c8f38af9msh676d85aad39a8c0p10dce1jsn60d780fe7228",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '6450f87b88msh834f1f637b479cbp17d15djsn306fc9a2668b',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const text = await response.text(); // Najpierw pobierz tekst odpowiedzi
    return text ? JSON.parse(text) : {}; // Próba parsowania tekstu jako JSON, jeśli nie jest pusty
  } catch (error) {
    console.error("Fetching data error:", error);
    throw error; // Przekazanie błędu do wyższego poziomu obsługi
  }
};
