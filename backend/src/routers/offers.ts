import express from "express";
import { OfferModel } from "../models/offer";
import mongoose from "mongoose";

export const offerRouter = express.Router();
// find all offers
offerRouter.get("/", (req, res) => {
  OfferModel.find().then((offers) => res.send(offers));
});

// find offer by dealerId
offerRouter.get("/dealer/:dealerId", (req, res) => {
  OfferModel.find({ dealerId: req.params.dealerId }).then((offer) =>
    res.send(offer)
  );
});

// add new offer
offerRouter.post("/", (req, res, next) => {
  new OfferModel({
    postId: req.body.postId,
    carId: req.body.carId,
    dealerId: req.body.dealerId,
    additionalMessage: req.body.additionalMessage,
    status: req.body.status,
  })
    .save()
    .then((offer) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      next(error);
    });
});

// update existing offer
offerRouter.put("/:id", (req, res, next) => {
  OfferModel.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (error) {
      next(error);
    });
});
