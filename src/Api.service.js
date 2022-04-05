const config = {
  api: process.env.REACT_APP_API_KEY,
  options: {
    headers: {
      'content-type': 'application/json',
    },
  },
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.json() | 'error');
  }
};

const httpGet = async (endpoint) => {
  const response = await fetch(`${config.api}${endpoint}`);

  const data = await handleResponse(response);

  const productsList = [];
  for (const key in data) {
    productsList.push({
      collection: data[key].collection,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price,
      standardPrice: data[key].standardPrice,
      mainImage: data[key].mainImage,
      images: data[key].images,
      id: key,
    });
  }

  return productsList;
};

const httpPost = async (endpoint, data) => {
  await fetch(`${config.api}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(data),
    ...config.options,
  });
};

export default { httpGet, httpPost };
