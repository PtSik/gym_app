export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6450f87b88msh834f1f637b479cbp17d15djsn306fc9a2668b",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
