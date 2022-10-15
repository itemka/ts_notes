const button = document.querySelector("button")!;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function addHandler(num1: number, num2: number): number {
  return num1 + num2;
}

button.addEventListener("click", function() {
  console.log(addHandler(+input1.value, +input2.value));
});
