const path = require("path");
const { nanoid } = require("nanoid");
const { readFile, writeFile } = require("fs").promises;

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію

async function listContacts() {
	const data = await readFile(contactsPath, "utf-8");
	const result = JSON.parse(data);
	return result;
}

async function getContactById(contactId) {
	const allContacts = await listContacts();
	const result = allContacts.find((contact) => contact.id === contactId);
	return result || null;
}

async function removeContact(contactId) {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = allContacts.splice(index, 1);
	await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
}

async function addContact({ name, email, phone }) {
	const allContacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	allContacts.push(newContact);
	await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
