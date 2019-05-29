// // CRUD
// const mongodb = require('mongodb');
// // const { MongoClient, ObjectID } = require('mongodb')
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databaseName = 'task-manager';

// const id = new ObjectID();

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     return console.log('Unable to connect to database')
//   }
//   const db = client.db(databaseName)

//   // db.collection('users').findOne({ _id: new ObjectID('5cec9bebae9d350bf454007b') }, (error, user) => {
//   //   if (error) {
//   //     return console.log('Unable to fetch')
//   //   }
//   //   console.log(user)
//   // })

//   // db.collection('users').find({ gender: 'male'}).toArray((error, users) => {
//   //   console.log(users)
//   // })

//   // db.collection('tasks').findOne({_id: new ObjectID('5cecb4a86eb2b62f4419d58d')}, (error, task) => {
//   //   console.log(task)
//   // })

//   // db.collection('tasks').find({ completed: false}).toArray((error, task) => {
//   //   console.log(task)
//   // })

//   // db.collection('users').updateOne({
//   //   _id: new ObjectID('5cecb1095eb4f429bce35fa4')
//   // }, {
//   //   $set: {
//   //     name: 'Mike'
//   //   }
//   // }).then((result) => {
//   //   console.log(result)
//   // }).catch((error) => {
//   //   console.log(error)
//   // })

//   // db.collection('tasks').updateMany({
//   //   completed: false
//   // }, {
//   //   $set: {
//   //     completed: true
//   //   }
//   // }).then((result) => {
//   //   console.log(result)
//   // }).catch((error) => {
//   //   console.log(error)
//   // })

//   // db.collection('users').deleteMany({
//   //   gender: 'male'
//   // }).then(result => {
//   //   console.log(result)
//   // }).catch(error => {
//   //   console.log(error)
//   // })

//   db.collection('tasks').deleteOne({
//     description: 'Wash dishes'
//   }).then(result => {
//     console.log(result)
//   }).catch(error => {
//     console.log(error)
//   })

// });
