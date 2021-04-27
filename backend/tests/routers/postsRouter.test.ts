import express from "express";
import request from "supertest";
import { PostModel } from "../../src/models/post";
import { postRouter } from "../../src/routers/posts";

describe("Car router test suite", () => {
  const app = express();
  app.use("/api/posts", postRouter);

  // test get all posts
  test("test 1 GET /posts -get response", (done) => {
    request(app).get("/api/posts").expect(200, { postList: [] }, done);
  });

  // test get a post by buyer id
  test("test 2 GET /posts/buyer/:buyerId - get response", async () => {
    const post = await new PostModel({
      userId: "1",
      title: "1",
      carMake: "1",
      carModel: "1",
      price: 4000,
    }).save();
    await request(app)
      .get("/api/posts/buyer/1")
      .expect((res) => {
        expect(res.status).toBe(200),
          expect(res.body[0].title).toBe(post.title);
        expect(res.body[0].carMake).toBe(post.carMake);
        expect(res.body[0].userId).toBe(post.userId);
        expect(res.body[0].price).toBe(post.price);
        expect(res.body[0].carModel).toBe(post.carModel);
      });
  });

  // test make a new post
  test("test 3 POST /posts - get response", () => {
    const post = new PostModel({
      userId: "2",
      title: "2",
      carMake: "2",
      carModel: "2",
      price: 4000,
    });
    request(app)
      .post("/api/posts")
      .send(post)
      .expect((response) => {
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(post.title);
        expect(response.body.carMake).toBe(post.carMake);
        expect(response.body.userId).toBe(post.userId);
        expect(response.body.price).toBe(post.price);
        expect(response.body.carModel).toBe(post.carModel);
      });
  });

  // test get a post by buyer id
  test("test 4 GET /posts/buyer/:buyerId - get error", async () => {
    request(app).get("/api/posts/buyer/2").expect(400);
  });

  // test make a new post
  test("test 3 POST /posts - get error", async () => {
    const post1 = await new PostModel({
      userId: "2",
      title: "2",
      carMake: "2",
      carModel: "2",
      price: 4000,
    }).save();
    const post2 = new PostModel({
      userId: "2",
      title: "2",
      carMake: "2",
      carModel: "2",
      price: 4000,
    });

    request(app)
      .post("/api/posts")
      .send(post2)
      .expect((response) => {
        expect(response.status).toBe(500);
      });
  });
});
