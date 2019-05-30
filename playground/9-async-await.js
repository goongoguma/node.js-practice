const doWork = async () => {
  throw new Error('Something went wrong')
  return 'Jay'
}

doWork().then((result) => {
  console.log('result', result)
}).catch(e =>{
  console.log('errror', e)
})