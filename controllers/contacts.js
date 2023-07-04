// const Joi = require("joi");

// const contacts = require("../models/contacts.js");

const {Contact,schemas} = require("../models");
// const Contact = require("../models")

const { RequestError } = require("../helpers");

// const postCheckingSchema = Joi.object({
//     name: Joi.string()
//       .min(3)
//       .alphanum()
//       .required()
//       .error(new Error("missing required name field")),
//     email: Joi.string()
//       .email()
//       .required()
//       .error(new Error("missing required email field")),
//     phone: Joi.string()
//       .required()
//       .error(new Error("missing required phone field")),
//   });
  
//   const putCheckingSchema = Joi.object({
//     name: Joi.string().min(3).alphanum(),
//     email: Joi.string().email(),
//     phone: Joi.string(),
//   }).min(1);

  const getAll = async (req, res, next) => {
    try {

     
      const result = await Contact.find();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
        throw RequestError(404, "Not found");
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  const add = async (req, res, next) => {
    try {
      // console.log(schemas.postCheckingSchema);
      const { error } =  schemas.postCheckingSchema.validate(req.body);
      if (error) {
        console.log(error.context);
        throw RequestError(400, error.message);
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  const removeById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      console.log(result);
      if (!result) {
        throw RequestError(400, "Not found");
      }
      res.status(200).json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      
      const { error } = schemas.putCheckingSchema.validate(req.body);
      if (error) {
        throw RequestError(400, "missing fields");
      }
  
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  const updateFavorite = async (req, res, next) => {
    try {
     
      const { error } = schemas.putCheckingSchema.validate(req.body);
      if (error) {
        throw RequestError(400, "missing fields");
      }
  
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  module.exports = {
    getAll,
    getById,
    add,
    removeById,
    update,
    updateFavorite,
  }