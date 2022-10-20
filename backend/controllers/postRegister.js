const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body

    // Check if user is already exists
    const userExists = await User.exists({ mail: mail.toLowerCase() })

    if (userExists) {
      return res
        .status(409)
        .send('E-mail is already in use. Please use another E-mail account.')
    }

    // Encript the password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // Create the user document in the database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    })
    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    )

    // Sending the server the response with the user details
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    })
  } catch (err) {
    return res.status(500).send('Error occured. Please try again')
  }
}
module.exports = postRegister
