import express from 'express'
const router = express.Router();
import User from '../models/user.js'

router.post('/signin', (req, res) => {

});


router.post('/signup', (req, res) => {

  User.findOne({ email: req.body.email })
  .exec((error, user) => {
    if(user) return res.status(400).json({
      message: 'User already exists.'
    });

    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    const _user = new User({ 
      firstName, 
      lastName,
      email,
      password,
      username: Math.random().toString()
    });

    _user.save((error, data) => {
      if(error){
        return res.status(400).json({
          message: 'something is wrong'
        });
      }

      if(data){
        return res.status(201).json({
          user: data
        })
      }
    });
  });
});


export { router };