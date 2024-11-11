const cron = require("node-cron");
const knex = require("../connections/databaseConnect");
const {
  sendWarningEmail,
  sendInactiveAccountDel,
} = require("./sendScheduleEmail");
const logger = require("./logger");

cron.schedule("0 0 * * *", async () => {
  try {
    const users = await knex("users")
      .select("email", "nome", "last_login")
      .where("last_login", "<", knex.raw("now() - interval '30 days'"))
      .andWhere("warning", false);
    if (users.length > 0) {
      const emailPromises = users.map(async (user) => {
        const { nome, email, last_login } = user;
        const data = last_login.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        logger.info(
          `Usuário inativo: ${nome}, ${email}, Último login: ${data}`
        );
        await knex("users").where("email", email).update({
          warning: true,
        });
        await sendWarningEmail(nome, data, email);
      });
      await Promise.all(emailPromises);
    }
  } catch (error) {
    logger.error(`Erro ao executar o cron: ${error.message}`);
    throw error;
  }
});

cron.schedule("5 0 * * *", async () => {
  try {
    const usersToDelete = await knex("users")
      .where("last_login", "<", knex.raw("now() - interval '40 days'"))
      .andWhere("warning", true);

    if (usersToDelete.length > 0) {
      const deletePromises = usersToDelete.map(async (user) => {
        const { nome, email } = user;
        logger.info(`Usuário inativo: ${nome}, ${email}`);
        await knex("users").where("id", user.id).del();
        await sendInactiveAccountDel(nome, email);
      });
      await Promise.all(deletePromises);
    }
  } catch (error) {
    logger.error("Erro ao excluir usuários inativos:", error.message);
  }
});
