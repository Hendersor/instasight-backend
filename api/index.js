import Express, { json } from "express";
import {routerApi} from "./routes/index.js";
import { errorHandler, boomErrorHandler } from "./middlewares/errorHandler.js";
import {sequelize} from './libs/sequelize.js'

const app = Express();
const port = 5133;
app.use(json())

app.get('/api', (req, res) => {
    res.send("Server on");
})

try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

routerApi(app)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})