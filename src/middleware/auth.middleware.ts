import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET = "cheia-ta-secreta"; // Folosește aceeași cheie folosită la generare

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrage token-ul din "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: authHeader });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifică token-ul
    (req as any).user = decoded; // Atașează datele din token la obiectul cererii
    next(); // Trecem la următorul handler dacă token-ul este valid
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid sau expirat.' });
  }
};



export {verifyToken};
