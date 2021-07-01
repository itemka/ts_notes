const cars: string[] = ['adsf', 'asf', 'sfas']
const cars2: Array<string> = ['adsf', 'asf', 'sfas']

// const promise: Promisse<string> = new Promise(resolve => {
const promise = new Promise<string>(resolve => {
  setTimeout(() => {
    resolve('Promise resolve')
  }, 500)  
})

promise.then(data => {
  console.log(data)
})