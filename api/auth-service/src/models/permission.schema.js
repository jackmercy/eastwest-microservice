const permissionSchema = (joi) =>
  joi.object({
    roles: joi.array().items(joi.string().required()),
    // Validate roles match all permissions or just one of permissions
    // Default is matching all permissions
    oneOfPermissions: joi.boolean().default(false),
    permissions: joi.array().items(
      joi
        .object({
          resource: joi.string().required(),
          action: joi.string().required(),
          scope: joi.string().required(),
        })
        .required(),
    ),
  });
module.exports = permissionSchema;
