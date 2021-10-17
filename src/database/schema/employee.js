const mongoose = require("./../config/config");
const Schema = mongoose.Schema;
const user_schema = new Schema(
  {  
    name: {
        desc: "The user's name.",
        trim: true,
        type: String,
        required: true,
    },
    national_ID: {
        desc: "The user's national ID.",
        trim: true,
        type: Number,
        required: true,
        unique: true,

      },
    code: {
      desc: "The user's generated code.",
      trim: true,
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      desc: "The user's phone.",
      trim: true,
      type: String,
      required: true,
    },
    email: {
      desc: "The user's email address.",
      trim: true,
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    date_of_birth: {
        desc: "The user's date of birth.",
        trim: true,
        type: Date,
        required: true,
      },
    status: {
        desc: "The user's status.",
        trim: true,
        type: String,
        required: true,
        enum:['ACTIVE','INACTIVE'],
        default:"INACTIVE"
    },
    position: {
        desc: "The user's position.",
        trim: true,
        type: String,
        required: true,
        enum:['MANAGER', 'DEVELOPER', 'DESIGNER', 'TESTER','DEVOPS']
    },
    createDate:{
      type:Date,
      default:Date.now,
      required: 'default value is the created date'
    },
    password: {
      desc: "user password",
      trim: true,
      type: String,
      select: false,
    },
    
    isLoggedIn: {
      desc: "is Active.",
      type: Boolean,
      default: false,
      required: true,
    },
    isConfirmed: {
      desc: "is Active.",
      type: Boolean,
      default: false,
      required: true,
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createAt", updatedAt: "updatedAt" },
  }
);

export const User = mongoose.model("Users", user_schema);