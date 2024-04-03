const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const config = require("../config/config");

// Import all models from a single file
const models = require("../models");
const User = models.User;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    const token = generateToken(newUser);

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateResetToken = () => {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
};

const sendPasswordResetEmail = async (email, resetPasswordLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.CompanyemailConfig.username,
        pass: config.CompanyemailConfig.password,
      },
    });

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "storeToprofit_backendservice",
        link: "http://localhost:3000/reset-password?token=",
      },
    });

    const emailTemplate = {
      body: {
        name: email,
        intro:
          "You have requested a password reset. Click the button below to reset your password:",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#33b5e5",
            text: "Reset Password",
            link: resetPasswordLink,
          },
        },
        outro:
          "If you did not request a password reset, please ignore this email.",
      },
    };

    const emailBody = mailGenerator.generate(emailTemplate);

    const mailOptions = {
      user: config.CompanyemailConfig.username,
      to: email,
      subject: "Password Reset Request",
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();

    user.resetToken = resetToken;
    await user.save();

    const resetPasswordLink = `${config.clientURL}/reset-password?token=${resetToken}`;
    sendPasswordResetEmail(email, resetPasswordLink);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forget password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = "";
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  forgetPassword,
  resetPassword,
  generateToken,
};
