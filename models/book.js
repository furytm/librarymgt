import mongoose from "mongoose";



const bookSchema  = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0,
        }
        ,
  borrowedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'User',
    },
  ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Book', bookSchema);


