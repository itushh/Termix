import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

/* ========================= Interface Definitions ========================= */

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

/* ========================= Schema Definition ============================= */

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

/* ========================= Password Hash Middleware ========================= */

UserSchema.pre<IUserDocument>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ========================= Instance Method ================================== */

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument, IUserModel>("User", UserSchema);
