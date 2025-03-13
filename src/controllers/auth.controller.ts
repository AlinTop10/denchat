import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user.model';
import chat from '../routes/chats.router';
import { getUserFromReq } from '../services/user.service';
import { userTransformer } from '../transformers/user.transformer';



const JWT_SECRET = "cheia-ta-secreta"; // Înlocuiește cu o cheie secretă sigură.

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Something not entered correctly' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1w' });

    res.json({
      message: 'Logare reușită.',
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Eroare la logare:', error);
    res.status(500).json({ message: 'An error occurred.', error });
  }
};


const register = async ( req, res) => {

    const { email, password, confirm_password, name} = req.body;
    try{
        const candidat = await User.findOne({ where: { email } });

        if (candidat) {
            throw new Error('User with email already exist');
        }

        if(password !== confirm_password){
          throw new Error('The password is not entered correctly');
        }

        const user = await User.create({ 
            email,
            password,
            name,
        });
        res.status(200).json({ message: 'User creat' });
    } catch (error) {
        console.error('Eroare la logare:', error);
        res.status(422).json({ message: error.message });
      }
    
}

const account = async ( req, res) => {
  try{
    const user = await getUserFromReq(req);

    res.json({
      message: 'the data of the authenticated user',
      user: userTransformer(user)
    });
  } catch(error) {
    console.log(error);
    res.status(401).json({ message: 'a problem occurred' })
  }
};


export { login , register, account};
