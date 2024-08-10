import Express, { json } from "express";
import {routerApi} from "./routes/index.js";
import { errorHandler, boomErrorHandler } from "./middlewares/errorHandler.js";

const app = Express();
const port = 5133;
app.use(json())

app.get('/api', (req, res) => {
    res.send("Server on");
})

routerApi(app)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})