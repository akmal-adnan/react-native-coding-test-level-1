export const getRequest = async (path, signal) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/${path}`, {
      signal,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was aborted');
    } else {
      console.error(error);
    }
    return null;
  }
};

export const postRequest = () => {
  console.log('test');
};
