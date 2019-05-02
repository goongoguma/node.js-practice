// Object property shorthand

const name = 'Jae Hyun'
const userGender = 'male'

const user = {
  name,
  userGender,
  location: 'Seoul'
}

console.log(user)

// Object destructuring

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const {label, stock, rating = 5} = product
// console.log(label)
// console.log(stock)
// console.log(rating)

const transaction = (type, {label, stock}) => {
  console.log(type, label, stock)
}

transaction('order', product)