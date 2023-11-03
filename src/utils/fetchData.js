export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c5c8f38af9msh676d85aad39a8c0p10dce1jsn60d780fe7228",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
