const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts.js");

// const {Contact} = require("../../models")

// const { RequestError } = require("../../helpers");

const router = express.Router();

const ctrl = require("../../controllers/contacts")



router.get("/",ctrl.getAll );

router.get("/:contactId",ctrl.getById );

router.post("/",ctrl.add );

router.delete("/:contactId",ctrl.removeById );

router.put("/:contactId",ctrl.update );

module.exports = router;
