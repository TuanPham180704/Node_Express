export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  req.validData = result.data; 
  next();
};
