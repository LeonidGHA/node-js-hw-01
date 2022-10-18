// const { program } = require('commander');
const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;
    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;
    case "remove":
      const delContact = await removeContact(id);
      console.table(delContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3
