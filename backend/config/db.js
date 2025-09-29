import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ushasravanthi09_db_user:UshaSai12345@usha.zyz8rat.mongodb.net/ResumeBuilder')
        .then(() => console.log("DB CONNECTED"));
}