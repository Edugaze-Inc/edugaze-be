import express from 'express';
import { User, makeUser } from '../models/schema';
const router = express.Router();

router.post('/api/users/signup', async (req, res) => {
  //TODO handle 1)email, pass valid 
  const { email, password } = req.body;

  //see if a user exists  
  if( await User.findOne({email})){
    console.log('already here');
    return res.send({});
  }

  //making a new user and saving them into the database
  const newUser = makeUser({email, password});
  await newUser.save();

  res.status(201).send(newUser);
});

export { router as signupRouter };
