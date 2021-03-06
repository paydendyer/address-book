// Business Logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
//Adds Contacts 
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
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
function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
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
//Show Contact Detail
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

//Display details when <li> is clicked
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() { //call jQuery on() method
    showContact(this.id);
  });
  //Delete Contact When Clicked
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}
//Add form submission event listener and gather form input
$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();

    //Empty Form Fields After Submission
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
  //Create a new Contact object and add it to AddressBook
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});