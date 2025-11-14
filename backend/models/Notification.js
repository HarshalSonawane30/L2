import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['course_launch', 'achievement', 'tip', 'mention', 'follow'],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    relatedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    relatedCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
}, {
    timestamps: true,
});

export default mongoose.model('Notification', notificationSchema);