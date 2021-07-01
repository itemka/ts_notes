const btn = document.querySelector('#btn')

// test
btn?.addEventListener('click', () => {
  console.log('click')
})

// ===

function logInfo(data: string, _?: number) {
  // const message = 'dfsf'
  console.log(data)
}

logInfo('string')