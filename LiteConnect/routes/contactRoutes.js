const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
// const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
// router.use(validateToken);
router
  .route("/")
  .get(getContacts)
  .post(createContact);
router
  .route("/:id")
  .put(updateContact)
  .delete(deleteContact)
  .get(getContact);

module.exports = router;
