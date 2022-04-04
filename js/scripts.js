// Business Logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
//Adds Contacts 
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.firstName] = contact;
};
// Ensure each new Contact has a unique ID
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

//Finding Contacts
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}
//Deleting Contacts
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}
//Business Logic for Contacts
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//User Interface Logic
//Create a new AddressBook object
let addressBook = new AddressBook();

//Display details of Contacts
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) { //gets all keys
    const contact = addressBookToDisplay.findContact(key); //grabs each contact
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}
//Add form submission event listener and gather form input
$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
  //Create a new Contact object and add it to AddressBook
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});