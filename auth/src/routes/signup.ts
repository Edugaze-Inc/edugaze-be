import express from 'express';
import { User, makeUser } from '../models/user';
import jwt from'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', async (req, res) => {
  //TODO validation with Joi
  const { email, password } = req.body;

  //see if a user exists  
  if( await User.findOne({email})){
    console.log('already here');
    return res.send('Account Already exists!');
  }

  //making a new user and saving them into the database
  const newUser = await makeUser({email, password});
  await newUser.save();

  //consider user signed in
  const userJWT = jwt.sign({
    email: email
  }, 's,dghb');

  res.header('auth-token',userJWT);
  res.status(201).send(newUser);
});

export { router as signupRouter };
