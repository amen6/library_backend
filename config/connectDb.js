import mongoose from 'mongoose';

const connectDb = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log('Database connected')
    }).catch(error => {
        console.log(`Error connecting: ${error.message}`)
    })
}

export default connectDb;