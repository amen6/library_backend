import mongoose from 'mongoose';
const  {Schema, model} =  mongoose;
 
const categorySchema = Schema ({
    name: {
        type: String,
        required: true
    }
}, 
{
    collection: 'categories'
}
)


const Category = model("Category", categorySchema)

export default Category