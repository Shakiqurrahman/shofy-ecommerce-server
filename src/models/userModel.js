import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        v
                    );
                },
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: true,
        },
        role : {
            type: String,
            enum: ['USER', 'ADMIN'],
            default : 'USER'
        }
    },
    { timestamps: true }
);

// pre-save hook to hash the password before saving 
userSchema.pre('save', async function(next) {
    if(this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    }
})

// method to compare the password - for Login 
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);
