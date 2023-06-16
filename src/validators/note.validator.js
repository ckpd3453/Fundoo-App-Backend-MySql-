import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newNoteValidator = (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    colour: Joi.string().optional(),
    archive: Joi.boolean().optional(),
    trash: Joi.boolean().optional(),
    userId: Joi.number().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error.details[0].type);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: error.details[0].type,
      message: error.message
    });
    console.log(error.message);
  } else {
    next();
  }
};
