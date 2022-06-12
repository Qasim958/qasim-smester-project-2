export async function getApiData(url) {
    try {
      let response = await fetch(url);
      return response.status === 200 ? await response.json() : false;
    } catch (error) {
      console.log(error);
    }
  }
  