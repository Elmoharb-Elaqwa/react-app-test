const mongoose = require('mongoose');

// const { DATABASE_USERNAME, DATABASE_PASWORD, DATABASE_URL, DATABASE_NAME } =
//   process.env;

mongoose.connect(
  `mongodb+srv://Abdelrhman:prFOkS0Uyt14A59H@cluster0.iuzic.mongodb.net/notes-db?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// mongoose.connect('mongodb://localhost:27017/notes-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Data base connection is successfully');
}).on('error', () => {
  console.log('error');
});
