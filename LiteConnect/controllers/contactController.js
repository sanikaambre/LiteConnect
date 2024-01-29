const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { default: mongoose } = require("mongoose");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const myValue = req.headers["x-my-value"];
  const contacts = await Contact.find({ user_id: myValue });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact =asyncHandler (async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandotary");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.body.id,
  });
  res.status(201).json(contact);
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler (async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});


//@desc Update contact
//@route PUT /api/contacts/:id
//@access private 
const updateContact =asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.headers["x-my-value"]) {
    res.status(403);
    throw new Error("You don't have permission to do this operation.");
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.status(200).json(updatedContact);
});


//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private 
const deleteContact =asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.headers["x-my-value"]) {
    res.status(403);
    throw new Error("You don't have permission to do this operation.");
  }
  const Deletedcontact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(Deletedcontact);
});


module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};