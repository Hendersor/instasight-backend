const Boom = require('@hapi/boom');

function schemaValidator(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(Boom.badRequest(error));
        }
        next();
    }
}

module.exports = { schemaValidator };
