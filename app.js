const express = require("express"); // Require module express vào project
const app = express(); // Tạo một app mới
const port = 8080; // Định nghĩa cổng để chạy ứng dụng NodeJS của bạn trên server

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("views", "./views"); // Thư mục views nằm cùng cấp với file app.js
app.set("view engine", "pug"); // Sử dụng pug làm view engine

var users = [
  { id: 1, name: "User1", email: "user1@gmail.com", age: 31 },
  { id: 2, name: "User2", email: "user2@gmail.com", age: 20 },
  { id: 3, name: "User1", email: "user1.2@gmail.com", age: 25 },
];

app.get("/", function (req, res) {
  res.send("<h2>This is my first app</h2>");
});

app.get("/users", function (req, res) {
  res.render("users/index", {
    users: users,
  });
});

app.get("/users/search", (req, res) => {
  var name_search = req.query.name; // lấy giá trị của key name trong query parameters gửi lên
  var age_search = req.query.age; // lấy giá trị của key age trong query parameters gửi lên
  var result = users.filter((user) => {
    // tìm kiếm chuỗi name_search trong user name.
    // Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
    return (
      user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 &&
      user.age === parseInt(age_search)
    );
  });

  res.render("users/index", {
    users: result, // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
  });
});

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.post("/users/create", (req, res) => {
  users.push(req.body);
  res.redirect("/users");
});

app.get("/users/:id", (req, res) => {
  // Tìm user phù hợp với params id
  var user = users.find((user) => {
    return user.id == parseInt(req.params.id);
  });

  // Render trang show, với một biến user được định nghĩa là user vừa tìm được
  res.render("users/show", {
    user: user,
  });
});

app.listen(port, function () {
  console.log("Your app running on port " + port);
});
