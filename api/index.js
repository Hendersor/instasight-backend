const Express = require("express");
const cors = require("cors")
const { json } = require("express");
const { routerApi } = require("./routes/index");
const { errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");
const { sequelize } = require('./libs/sequelize');

const app = Express();
const port = 5133;

const allowedOrigins = ['http://localhost:5173', 'https://instasight.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El CORS policy no permite acceso desde el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
}));


app.use(json());

app.get('/api', (req, res) => {
    res.send("Server on");
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

require("./utils/auth/");


routerApi(app);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
