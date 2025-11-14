import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['course_launch', 'achievement', 'tip', 'general'],
        required: true,
    },
    image: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    relatedCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
}, {
    timestamps: true,
});

export default mongoose.model('Post', postSchema);