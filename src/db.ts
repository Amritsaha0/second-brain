import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Tag schema
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

const Tag = mongoose.model("Tag", tagSchema);

// Content schema with enum for content type
const contentSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: { 
    type: String, 
    enum: ['image', 'video', 'article', 'audio'], 
    required: true 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: async function (value:any) {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User does not exist");
      }
    },
  },
});

const Content = mongoose.model("Content", contentSchema);

// Link schema
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Link = mongoose.model("Link", linkSchema);

// Example query
async function getContents() {
  const content = await Content.find().populate({
    path: "userId",
    select: "username password",
  });
  console.log(content);
}

// Export models
export { User, Tag, Content, Link, getContents };
