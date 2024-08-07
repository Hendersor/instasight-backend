import Express, { json } from "express";
import {routerApi} from "../routes/index.js";

const app = Express();
const port = 5133;
app.use(json())

app.get('/api', (req, res) => {
    res.send("Server on");
})

routerApi(app)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})