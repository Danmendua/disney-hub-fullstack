const joi = require("joi");

const userBodySchema = joi.object({
  nome: joi.string().trim().required().min(2).max(80).messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.min": "Quantidade de caracteres inválido",
    "string.max": "O campo nome tem o limite máximo de {#limit} caracteres",
  }),

  email: joi
    .string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } })
    .required()
    .min(5)
    .max(80)
    .messages({
      "any.required": "O campo email é obrigatório",
      "string.empty": "O campo email é obrigatório",
      "string.email": "O campo email precisa ter um formato válido",
      "string.min": "Quantidade de caracteres inválido",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),

  senha: joi
    .string()
    .trim()
    .required()
    .min(6)
    .max(50)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=[\\]{};\":'\\|,.<>\\/?])"))
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.pattern.base": "A senha não atinge os requisitos necessários",
      "string.empty": "O campo senha é obrigatório",
      "string.min": "O campo senha precisa de no mínimo {#limit} caracteres",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),

  genero: joi
    .string()
    .valid("Outro", "Masculino", "Feminino")
    .required()
    .messages({
      "any.required": "O campo gênero é obrigatório",
      "any.only":
        "O campo gênero precisa ser 'Outro', 'Masculino' ou 'Feminino'",
      "any.empty": "O campo gênero é obrigatório",
    }),
  termos: joi.boolean().valid(true).required().messages({
    "any.required": "O campo termos é obrigatório",
    "any.only": "Você deve aceitar os termos",
  }),
});

const userLoginSchema = joi.object({
  email: joi.string().trim().email().required().min(1).max(80).messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "O campo email precisa ter um formato válido",
    "string.min": "Quantidade de caracteres inválido",
    "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
  }),
  senha: joi
    .string()
    .trim()
    .required()
    .min(6)
    .max(50)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=[\\]{};\":'\\|,.<>\\/?])"))
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.pattern.base":
        "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
      "string.empty": "O campo senha é obrigatório",
      "string.min": "O campo senha precisa de no mínimo {#limit} caracteres",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),

  lembrar: joi.boolean().optional().default(false),
});

const verifyTokenSchema = joi.object({
  code: joi.string().alphanum().length(6).required().messages({
    "any.required": "O campo token é obrigatório",
    "string.length": "O token deve ter exatamente 6 caracteres",
    "string.alphanum": "O token deve conter apenas letras e números",
  }),
  lembrar: joi.boolean().optional().default(false),
});

const forgotTokenSchema = joi.object({
  email: joi.string().trim().email().required().min(1).max(80).messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "O campo email precisa ter um formato válido",
    "string.min": "Quantidade de caracteres inválido",
    "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
  }),
});

const newPasswordSchema = joi.object({
  senha: joi
    .string()
    .trim()
    .required()
    .min(6)
    .max(50)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=[\\]{};\":'\\|,.<>\\/?])"))
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.pattern.base":
        "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
      "string.empty": "O campo senha é obrigatório",
      "string.min": "O campo senha precisa de no mínimo {#limit} caracteres",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),
  confirmarSenha: joi.string().required().valid(joi.ref("senha")).messages({
    "any.only": "As senhas não coincidem.",
    "any.required": "O campo confirmar senha é obrigatório",
    "string.empty": "O campo confirmar senha é obrigatório",
  }),
});

const updateUserSchema = joi.object({
  nome: joi.string().trim().min(2).max(80).messages({
    "string.min": "Quantidade de caracteres inválido",
    "string.max": "O campo nome tem o limite máximo de {#limit} caracteres",
  }),
  senha: joi
    .string()
    .trim()
    .min(6)
    .max(50)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=[\\]{};\":'\\|,.<>\\/?])"))
    .messages({
      "string.pattern.base":
        "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
      "string.min": "O campo senha precisa de no mínimo {#limit} caracteres",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),
  novaSenha: joi
    .string()
    .trim()
    .min(6)
    .max(50)
    .pattern(new RegExp("(?=.*[a-z])"))
    .pattern(new RegExp("(?=.*[A-Z])"))
    .pattern(new RegExp("(?=.*[0-9])"))
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=[\\]{};\":'\\|,.<>\\/?])"))
    .messages({
      "string.pattern.base":
        "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
      "string.min": "O campo senha precisa de no mínimo {#limit} caracteres",
      "string.max": "O campo email tem o limite máximo de {#limit} caracteres",
    }),
  genero: joi
    .string()
    .uppercase()
    .valid("OUTRO", "MASCULINO", "FEMININO")
    .messages({
      "any.only":
        "O campo gênero precisa ser 'Outro', 'Masculino' ou 'Feminino'",
    }),
});

module.exports = {
  userBodySchema,
  userLoginSchema,
  verifyTokenSchema,
  forgotTokenSchema,
  newPasswordSchema,
  updateUserSchema,
};
