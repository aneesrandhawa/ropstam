const { mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // required: true
    },
    FirstName: {
      type: String,
      // required: true
    },
    LastName: {
      type: String,
      // required: true
    },
    Username: {
      type: String,
      // required: true
    },
    Password: {
      type: String,
      // required: true
    }
  }
);

module.exports = mongoose.model("User", UserSchema);