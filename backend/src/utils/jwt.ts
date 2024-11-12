import jwt from 'jsonwebtoken';

type UserPayload = {
  id: number; // Cambiado a number para ser compatible con Sequelize
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '180d',
  });
  return token;
};