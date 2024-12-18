export const validateRequest = (schema) => (req, res, next) => {
  console.log('Before Schema Validation:', req.body);
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map((detail) => detail.message),
    });
  }
  console.log('After Schema Validation:', req.body); // Confirm req.body is intact
  next();
};
