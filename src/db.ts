import {Model,Schema} from "mongoose";

// User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = new Model("User", userSchema);

// Tag schema 
const tagSchema = new Schema({
  title: { type: String, required: true, unique: true }
});

const Tag = new Model("Tag", tagSchema);

// Content schema with enum for content type
const contentSchema = new Schema({
  title: String,
  link: String,
  type: { 
    type: String, 
    enum: ['image', 'video', 'article', 'audio'], 
    required: true 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: async function (value:any) {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("User does not exist");
      }
    },
  },
});

const Content =new Model("Content", contentSchema);

// Link schema
const linkSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Link = new Model("Link", linkSchema);

// Example query
async function getContents() {
  const content = await Content.find().populate({
    path: "userId",
    select: "username password",
  });
  console.log(content);
}

// Export models
export { UserModel, Tag, Content, Link, getContents };
