import sequelize, { DataTypes } from '../config/database';
import HttpStatus from 'http-status-codes';
import { match, securePassword } from '../middlewares/bcrypt.middleware';
import { jwtToken } from '../middlewares/jwt.middleware';
const User = require('../models/user').default(sequelize, DataTypes);

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

const nodemailer = require('nodemailer');
const sendVerificationMail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: 'gbsogpuarwucghxi'
    }
  });
  const mailConfigurations = {
    from: 'chandrakantprasad573@gmail.com',

    to: email,

    subject: 'For Email Verification',

    text: `Hi! There, You have recently visited our website and entered your email.
   
             Requested OTP : - ${token} 
         
             Thanks`
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    console.log('In Mailer*****************');
    if (error) throw Error(error);
    console.log('Email Sent Successfully to', info.envelope.to[0]);
  });
};

async function userCheck(body) {
  return await User.findOne({ where: { email: body.email } });
}

//create new user
export const newUser = async (body) => {
  console.log(body);
  const exist = await User.findOne({ where: { email: body.email } });
  var response;
  if (exist == null) {
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await securePassword(body.password)
    };
    const data = await User.create(newUser);
    response = {
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: exist.dataValues.firstName,
      message: `${exist.dataValues.email} Exist already`
    };
  }
  return response;
};

export const login = async (body) => {
  const data = await User.findOne({ where: { email: body.email } });

  var response;
  if (data != null) {
    const passwordCheck = await match(body.password, data.dataValues.password);

    if (passwordCheck) {
      const token = jwtToken(data.dataValues);
      response = {
        code: HttpStatus.OK,
        data: token,
        message: `User Login Successful. Welcome to Fundoo App ${data.dataValues.firstName}`
      };
    } else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: null,
        message: `${data.dataValues.firstName} Please enter correct password`
      };
    }
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: `${body.email}, you are not registered please sign up.`
    };
  }
  return response;
};

export const forgetPassword = async (body) => {
  var response;
  const user = await userCheck(body);
  if (user == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.email} is not registered. `,
      message: 'Pease register your email id.'
    };
  } else {
    var token = jwtToken(user.dataValues);
    sendVerificationMail(body.email, token);
    response = {
      code: HttpStatus.OK,
      data: `Link Sent`,
      message: 'link sent to your verification mail'
    };
  }
  return response;
};

export const resetPassword = async (body) => {
  var response;
  if (body.resetPassword !== null) {
    const user = await User.findByPk(body.userId);

    const data = await User.update(
      {
        password: await securePassword(body.resetPassword)
      },
      {
        where: {
          password: user.dataValues.password
        }
      }
    );
    console.log('Updated Data', data);
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Password reset successful.'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'Please enter password to reset'
    };
  }
  return response;
};

// //update single user
// export const updateUser = async (id, body) => {
//   await User.update(body, {
//     where: { id: id }
//   });
//   return body;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.destroy({ where: { id: id } });
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findByPk(id);
//   return data;
// };

// export const getUserByEmail = async (body) => {
//   console.log(body);
//   const data = await User.findOne({
//     where: {
//       email: body.email
//     }
//   });
//   console.log('Response data', data);
//   return data;
// };
