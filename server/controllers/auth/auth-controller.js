import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password : hashPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export{registerUser};
