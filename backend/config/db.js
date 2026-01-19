import mongoose from "mongoose";

const connectDB = async () => {
	const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learnletlearn";
	try {
		await mongoose.connect(uri, {
			// modern mongoose uses stable defaults; options kept minimal
		});
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	}
};

export default connectDB;
