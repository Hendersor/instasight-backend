const Express = require("express");
const { json } = require("express");
const { routerApi } = require("./routes/index");
const { errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");
const { sequelize } = require('./libs/sequelize');

const app = Express();
const port = 5133;

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

routerApi(app);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
