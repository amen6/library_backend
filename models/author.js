import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const authorSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  }
}, {
  collection: 'authors'
});

const Author = model('Author', authorSchema);
export default Author;