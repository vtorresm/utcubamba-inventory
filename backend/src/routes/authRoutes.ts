import { Router } from 'express';
import { body, param } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { handleInputErrors } from '../middleware/validation';

const routerAuth = Router();

// Rutas para crear una cuenta de usuario
routerAuth.post('/create-account', [
  body('name').notEmpty().withMessage('El Nombre del Usuario es Obligatorio'),
  body('email').isEmail().withMessage('Email no válido'),
  body('password').isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Los Password no son iguales');
    }
    return true;
  }),
  handleInputErrors,
  AuthController.createAccount
]);

// Ruta para confirmar una cuenta de usuario
routerAuth.post('/confirm-account', [
  body('token').notEmpty().withMessage('El token no puede ir vacío'),
  handleInputErrors,
  AuthController.confirmAccount
]);

// Ruta para crear un profile
routerAuth.post('/create-profile', [
  body('profileName').notEmpty().withMessage('El perfil no puede ir vacío'),
  handleInputErrors,
  AuthController.createProfile
]);

routerAuth.post('/login', [
  body('email')
    .isEmail().withMessage('Email no válido'),
  body('password').notEmpty().withMessage('El password no puede ir vacío'),
  handleInputErrors,
  AuthController.login
]);

routerAuth.post('/request-code',
  body('email')
      .isEmail().withMessage('E-mail no válido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)

routerAuth.post('/forgot-password',
  body('email')
      .isEmail().withMessage('E-mail no válido'),
  handleInputErrors,
  AuthController.forgotPassword
)

routerAuth.post(
  '/validate-token',
  body('token').notEmpty().withMessage('El Token no puede ir vacio'),
  handleInputErrors,
  AuthController.validateToken
);

routerAuth.post('/update-password/:token',
  param('token')
      .isNumeric().withMessage('Token no válido'),
  body('password')
      .isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
  body('password_confirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
          throw new Error('Los Password no son iguales')
      }
      return true
  }),
  handleInputErrors,
  AuthController.updatePasswordWithToken
)

// Ruta para obtener todos los usuarios
routerAuth.get('/', AuthController.getAllUsers);

// Ruta para obtener un usuario por su ID
routerAuth.get('/:id', [
  param('id').isMongoId().withMessage('El ID de usuario no es válido'),
  handleInputErrors,
  AuthController.getUserById
]);

// Ruta para actualizar un usuario
routerAuth.put('/:id', [
  param('id').isMongoId().withMessage('El ID de usuario no es válido'),
  body('name').notEmpty().withMessage('El Nombre del Usuario es Obligatorio'),
  body('email').notEmpty().withMessage('El Email es Obligatorio'),
  body('password').isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
  handleInputErrors,
  AuthController.updateUser
]);

// Ruta para eliminar un usuario
routerAuth.delete('/:id', [
  param('id').isMongoId().withMessage('El ID del Usuario no es válido'),
  handleInputErrors,
  AuthController.deleteUser
]);

export default routerAuth;
