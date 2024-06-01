import { app } from "./app.js";
import { port } from "./constants.js";
import { connectDB } from "./db/db.js";


connectDB().then(() => {
        app.listen(port, () => {
            console.log(`*** Server is running at port : ${port}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB connection failed!!! ", error);
    });

