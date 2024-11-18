var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var database = require("./config/db");
var productRouter = require("./routes/productRoutes");
var brandProduct = require("./routes/brandPrRoutes");
var type = require("./routes/typeRouter");
var oder = require("./routes/oderRoutes");
var sellerMPr = require("./routes/sellerPrRoutes");
var cart = require("./routes/cartRoutes");
var uploadRouter = require("./routes/uploadRouter");
var mailer = require("./routes/emailRoutes");
var invoices = require("./routes/invoicesRoutes");
var checkLogin = require("./routes/loginRouter");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/brand", brandProduct);
app.use("/type", type);
app.use("/oder", oder);
app.use("/cart", cart);
app.use("/manageProductSe", sellerMPr);
app.use("/hoadon", invoices);
app.use("/upload", uploadRouter);
app.use("/sendmail", mailer);
app.use("/login", checkLogin);
// Middleware
app.use(cors()); // Cho phép truy cập từ các ứng dụng khác (frontend)
app.use(express.json()); // Để xử lý dữ liệu gửi từ client dưới dạng JSON

database.connect();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
