const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../middleware/handleMongooseError");

const validationErrorMEsage = "Error from Joi or another validation library";

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const usersRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().label(validationErrorMEsage),
  password: Joi.string().min(8).required().label(validationErrorMEsage),
});

const usersLogin = Joi.object({
  email: Joi.string().email().required().label(validationErrorMEsage),
  password: Joi.string().required().label(validationErrorMEsage),
});

const verifyEmail = Joi.object({
  email: Joi.string().email().required().label(validationErrorMEsage),
});

const updateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  usersRegister,
  usersLogin,
  updateSubscription,
  verifyEmail,
};

userSchema.post("save", handleMongooseError);

const Users = model("user", userSchema);

module.exports = {
  Users,
  schemas,
};
