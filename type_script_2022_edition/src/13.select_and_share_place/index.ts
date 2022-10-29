import axios from "axios";

type GoogleGeocodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS'
}

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

async function searchAddress(event: Event) {
  event.preventDefault();

  const mainURL = process.env.GOOGLE_MAP_API;
  const key = process.env.GOOGLE_MAP_PLATFORM_API_KEY;
  const address = encodeURI(addressInput.value);
  const url = `${mainURL}?address=${address}&key=${key}`;

  try {
    const { data } = await axios.get<GoogleGeocodingResponse>(url);

    if (data.status !== 'OK') {
      throw new Error('Could not fetch location!');
    }

    const { lat, lng } = data.results[0].geometry.location

    console.log({
      data,
      lat,
      lng,
      api_key: process.env.GOOGLE_MAP_PLATFORM_API_KEY,
      map_api: process.env.GOOGLE_MAP_API,
    })
  } catch (error) {
    console.error('Error in the searchAddress function', error);
  }
}

form.addEventListener('submit', searchAddress);