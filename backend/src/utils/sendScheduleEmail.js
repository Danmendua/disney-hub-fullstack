const mg = require("../connections/configMailgun");
const fs = require("fs");
const logger = require("./logger");
const path = require("path");

async function compileTemplate(templatePath, values) {
  const resolvedPath = path.join(__dirname, templatePath);
  let htmlContent = await fs.promises.readFile(resolvedPath, "utf-8");

  htmlContent = htmlContent.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return key in values ? values[key] : match;
  });

  return htmlContent;
}

const sendWarningEmail = async (nome, data, email) => {
  try {
    const templatePath = process.env.MAIL_WARNING_PATH;
    const values = {
      nome,
      data,
    };

    const htmlContent = await compileTemplate(templatePath, values);

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: "Aviso de inatividade da conta",
      text: `Olá, ${nome}! \n Passando para ver como você está! \n Já tomou aquela água? Tem se alimentado direitinho? \n Ah, quase ia esquecendo! Estava aqui conferindo e notei que você não acessa o nosso site há um tempinho. Hoje, completou 1 mês sem nenhum login por aqui, então, me pediram para te avisar: sua conta será desativada em 10 dias caso você não entre no site nesse período. \n A última vez que você fez login foi no dia ${data}. \n Não se preocupe! A boa notícia é que você pode facilmente reverter isso: \n Basta fazer login novamente na sua conta, e sua última interação será atualizada aqui pra gente! \n\n\n Caso não tenha mais interesse em continuar com a gente, tudo bem! Prometo não chorar (tanto). Espero que tenha aproveitado o tempo enquanto esteve por aqui. Se for o caso, pode desconsiderar este e-mail, ok? \n\n Atenciosamente: Daniel.`,
      html: htmlContent,
    });
  } catch (error) {
    logger.error(
      `Erro ao enviar o email para: ${email} de "Aviso": ${error.message}`
    );
    throw error;
  }
};

const sendWelcomeBackEmail = async (nome, email) => {
  try {
    const templatePath = process.env.MAIL_WELCOME_BACK_PATH;
    const values = {
      nome,
      email,
    };
    const htmlContent = await compileTemplate(templatePath, values);

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: `${nome}! Que bom te ver por aqui de novo!`,
      text: `Sentimos sua falta e ficamos super animados em ver que você fez login novamente! \n Agora, sua conta está de volta ao normal e você está mais do que bem-vindo para continuar explorando nosso site de onde parou. \n Qualquer coisa que precisar, é só chamar! \n Ah, e fica o lembrete: a qualquer momento que precisar de ajuda, pode nos procurar. Adoramos ajudar nossos usuários a aproveitarem ao máximo! \n Se precisar de alguma coisa, estamos por aqui! \n\n Atenciosamente: Daniel.`,
      html: htmlContent,
    });
  } catch (error) {
    logger.error(
      `Erro ao enviar o email para: ${email} de "Welcome Back"": ${error.message}`
    );
    throw error;
  }
};

const sendInactiveAccountDel = async (nome, email) => {
  try {
    const templatePath = process.env.MAIL_DEL_PATH;

    const values = {
      nome,
      email,
    };
    const htmlContent = await compileTemplate(templatePath, values);

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: "Sua conta foi desativada",
      text: `Olá, ${nome}! \n Sentimos muito em informar que sua conta foi desativada. \n Se precisar de ajuda ou tiver alguma dúvida, por favor, entre em contato conosco. \n\n Atenciosamente: Daniel.`,
      html: htmlContent,
    });
  } catch (error) {
    logger.error(
      `Erro ao enviar o email para: ${email} de "Deletar Conta": ${error.message}`
    );
    throw error;
  }
};

module.exports = {
  sendWarningEmail,
  sendWelcomeBackEmail,
  sendInactiveAccountDel,
};
