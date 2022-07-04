const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = process.env.SECRET_KEY
const salt = bcrypt.genSalt(10)