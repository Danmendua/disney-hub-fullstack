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

const sendConfirmResetPass = async (
  nome,
  email,
  time,
  ip,
  city,
  region,
  country,
  os,
  browser
) => {
  try {
    const templatePath = process.env.MAIL_CONFIRM_RESET_PATH;
    const values = {
      nome,
      email,
      time,
      ip,
      city,
      region,
      country,
      os,
      browser,
    };
    const htmlContent = await compileTemplate(templatePath, values);

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: "Código de verificação da plataforma",
      text: `Sua conta foi redefinida com sucesso, ${nome}! \n Sua senha foi redefinida no email: ${email}. \n Aqui algumas inforamções sobre essa alteração: \n Dia: ${time} \n IP: ${ip} \n Localização: ${city}, ${region} - ${country} \n Dispostivio: ${os}, ${browser} \n Por motivos de segurança, recomendamos: \n Utilize uma senha única e segura! \n Evite utilizar a mesma senha em diversos sites! \n \n Você não alterou a senha? \n Entre em contato conosco imediatamente para recuperar sua conta. \n \n Atenciosamente: Daniel.`,
      html: htmlContent,
    });
  } catch (erro) {
    logger.error("Erro ao enviar o e-mail de reset:", erro);
  }
};

const sendVerificationEmail = async (nome, email, generateToken) => {
  try {
    let htmlContent = await fs.promises.readFile(
      process.env.MAIL_VERIFICATION_PATH,
      "utf-8"
    );
    logger.info("htmlContent", htmlContent);

    htmlContent = htmlContent
      .replace("{{nome}}", nome)
      .replace("{{code}}", generateToken);

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: "Código de verificação da plataforma",
      text: `Olá ${nome}! \n Obrigado por se inscrever! \n Para que sua conta seja ativada, basta preencher o código de ativação com o número abaixo: \n ${generateToken} \n Esse código é valido por 7 dias, caso não seja utilizado, será necessário fazer o envio novamente!`,
      html: htmlContent,
    });
    return { success: true };
  } catch (erro) {
    logger.error("Erro ao enviar o e-mail de verificação:");
    logger.error(`Mensagem do erro: ${erro.message}`);
    if (erro.response) {
      logger.error(`Código de status HTTP: ${erro.response.status}`);
      logger.error(
        `Dados da resposta do servidor: ${JSON.stringify(erro.response.data)}`
      );
    }
    logger.error(`Stack trace: ${erro.stack}`);
    return { success: false, error: "Não foi possível, tente novamente." };
  }
};

const sendResetPassword = async (nome, email, generateToken) => {
  try {
    let htmlContent = await fs.promises.readFile(
      process.env.MAIL_RESET_PATH,
      "utf-8"
    );

    htmlContent = htmlContent
      .replace("{{nome}}", nome)
      .replace(
        "{{resetURL}}",
        `${process.env.FRONTEND_URL}/auth/new-password/${generateToken}`
      );

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "Disney " + process.env.MAILGUN_FROM,
      to: email,
      subject: "Código de verificação da plataforma",
      text: `Olá ${nome}! \n Precisando de uma nova senha? \n Recebemos um pedido para cadastrar uma nova senha. Para prosseguir, clique no link abaixo: \n ${process.env.FRONTEND_URL}/auth/new-password/${generateToken} \n Esse código é valido por 7 dias. Caso não tenha solicitado uma nova senha, ignore este e-mail.`,
      html: htmlContent,
    });
  } catch (erro) {
    logger.error("Erro ao enviar o e-mail de reset:", erro);
    return { success: false, error: "Não foi possível, tente novamente." };
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetPassword,
  sendConfirmResetPass,
};
