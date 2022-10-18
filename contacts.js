const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
const changeContactsList = async (newCotactsList) =>
  await fs.writeFile(contactsPath, JSON.stringify(newCotactsList));

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err.message);
  }
}
async function getContactById(ContactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((el) => el.id === ContactId);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(2),
      name,
      email,
      phone,
    };

    const newCotactsList = [...contacts, newContact];
    await changeContactsList(newCotactsList);
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}
async function removeContact(ContactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === ContactId);
    if (index === -1) {
      return null;
    }
    const [delContact] = contacts.splice(index, 1);
    await changeContactsList(contacts);
    return delContact;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
