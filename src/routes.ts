import { Express,Request,Response,NextFunction } from "express";
import {getBookHandler} from "../controllers/booksControllers"
function routes(app:Express) {
    app.get("/api/books",getBookHandler)
}

export default routes