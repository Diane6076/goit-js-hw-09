document.addEventListener('DOMContentLoaded', function () {
    loadContacts();
});

function addContact() {
    const contactForm = document.getElementById('contactForm');
    const firstName = contactForm.firstName.value.trim();
    const lastName = contactForm.lastName.value.trim();
    const phoneNum = contactForm.phoneNum .value.trim();
    const email = contactForm.email.value.trim();

if (!firstName || !lastName || !phoneNum  || !email) {
        alert('Заповніть всі поля контакту.');
        return;
}

    const contactList = document.getElementById('contactList');
    const contactItem = document.createElement('li');
    contactItem.innerHTML = `
        <span>${firstName} ${lastName}</span>
        <span>${phoneNum }</span>
        <span>${email}</span>
        <button onclick="deleteContact(this)">Видалити</button> `;
    contactList.appendChild(contactItem);
    saveContacts();
    contactForm.reset();
}

function deleteContact(button) {
    const contactItem = button.parentNode;
    contactItem.remove();
    saveContacts();
}

function saveContacts() {
    const contactList = document.getElementById('contactList');
    const contacts = [];
    contactList.querySelectorAll('li').forEach(contactItem => {
        const [fullName, phoneNum , email] = contactItem.innerText.split('\n');
        const [firstName, lastName] = fullName.split(' ');
        contacts.push({ firstName, lastName, phoneNum , email });
    });
 localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts() {
    const contactList = document.getElementById('contactList');
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contacts.forEach(contact => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <span>${contact.firstName} ${contact.lastName}</span>
            <span>${contact.phoneNum }</span>
            <span>${contact.email}</span>
            <button onclick="deleteContact(this)">Видалити</button>
        `;
        contactList.appendChild(contactItem);
    });
}