const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/", (req, res) => {
  res.send("Hello everyone my name is ali");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/firstuser", (req, res) => {
  res.send(users[0]);
});

app.get("/users/lastuser", (req, res) => {
  res.send(users[users.length - 1]);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});

app.get("/users/company/:usercompany", (req, res) => {
  let company = req.params.usercompany;
  let user = users.find((el) => el.company.name === company);
  res.send(user);
});

app.get("/users/city/:usercity", (req, res) => {
  let city = req.params.usercity;
  let user = users.find((el) => el.address.city === city);
  res.send(user);
});

app.get("/users/street/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user.address.street);
});

app.post("/user", (req, res) => {
  let name = req.body.name;
  let age = req.body.age;

  let newUser = { name, age };
  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;

  let user = users.find((el) => el.id === parseInt(id));
  user.name = name;

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.delete("/users/:id", (req, res) => {
  let id = req.params.id;

  let user = users.find((el) => el.id === parseInt(id));
  let index = users.indexOf(user);
  users.splice(index, 1);

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});