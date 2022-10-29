const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddress(event: Event) {
  event.preventDefault();

  const { value: enteredAddress } = addressInput

  console.log({ enteredAddress })
}

form.addEventListener('submit', searchAddress);