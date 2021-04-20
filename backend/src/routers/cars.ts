import express from "express";
import { CarModel } from "../models/car";

export const carRouter = express.Router();
// find all cars
carRouter.get("/", (req, res) => {
  CarModel.find().then((cars) => res.send(cars));
});
// find car by dealerId
carRouter.get("/:dealerId", (req, res) => {
  CarModel.findOne({ dealerId: req.params.dealerId }).then((car) =>
    res.send(car)
  );
});
// add new car
carRouter.post("/", (req, res) => {
  var newCar = new CarModel({
    dealerId: req.body.dealerId,
    vin: req.body.vin,
    carMake: req.body.carMake,
    carModel: req.body.carModel,
    mileage: req.body.mileage,
    color: req.body.color,
    price: req.body.price,
    year: req.body.year,
    trim: req.body.trim,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    createdAt: req.body.createAt,
    updatedAt: req.body.updateAt,
  });
  CarModel.insertMany(newCar)
    .then(function () {
      res.send(200);
    })
    .catch(function (error) {
      res.send(error);
    });
});
// update exist car
carRouter.put("/:dealerId", (req, res) => {
  CarModel.updateOne({ dealerId: req.params.dealerId }, { $set: req.body })
    .then(function () {
      res.send(200);
    })
    .catch(function (error) {
      res.send(error);
    });
});
