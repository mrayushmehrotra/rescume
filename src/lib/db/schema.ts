import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const BCRYPT_ROUNDS = 12;

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      maxlength: [255, "Email cannot exceed 255 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
    },
  },
  { timestamps: true },
);

UserSchema.path("password").set((password: string) =>
  bcrypt.hashSync(password, BCRYPT_ROUNDS),
);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password as string);
};

export const RescumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    AIResponses: [
      {
        coverResponse: [
          {
            response: {
              type: String,
              required: true,
            },
          },
        ],
        questions: [
          {
            question: {
              type: String,
              required: true,
            },
            answer: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);
