import express from "express";
import { PostModel } from "../models";

export const postRouter = express.Router();
// find all posts
postRouter.get("/", (req, res) => {
  PostModel.find().then((posts) => res.send(posts));
});

// find post by userId
postRouter.get("/:userId", (req, res) => {
  PostModel.findOne({ userId: req.params.userId }).then((post) =>
    res.send(post)
  );
});

// create new post
postRouter.post("/", (req, res) => {
  PostModel.insertMany(req.body)
    .then(function () {
      res.send(200);
    })
    .catch(function (error) {
      res.send(error);
    });
});

// update exist post
postRouter.put("/:userId", (req, res) => {
  PostModel.updateOne({ userId: req.params.userId }, { $set: req.body })
    .then(function () {
      res.send(200);
    })
    .catch(function (error) {
      res.send(error);
    });
});
