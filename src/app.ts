import express,{NextFunction,Request,Response} from "express"
import routes from "./routes";
import helmet from "helmet";
const app= express();

app.use(express.json())
//app.use(express.urlencoded({extended:true})) 
app.use(helmet())

const midleware=({name}:{name:string})=>(req:Request,res:Response,next:NextFunction)=>{
console.log("next function")
res.locals.name=name;
}

app.get("/api/middleware",midleware({name:"ayhan"}),async(req:Request,res:Response)=>{
    return res.json({
        message:"middleware and next response",
        locals:res.locals.name
    })
})
//Request<{ req params interface},{},{req body interface},{}}>
app.get("/",async(req:Request<{name:string,Id:number},{},{name:string},{}>,res:Response)=>{
    //return res.send("hello world")
    //res.redirect("http://example.com")
    req.params.Id
    req.body.name
    res.json({
        status:"Ok",
        message:"response"
    })
})



async function throwsError(){
    throw new Error("Boom!")
}
app.get("/error",async(req:Request,res:Response)=>{
try {
    await throwsError()
    res.sendStatus(200)
} catch (error) {
    res.status(400).send("something bad happened")
}
})

app.post("/api/data",async(req:Request,res:Response)=>{
    console.log(req.body)

    return res.sendStatus(200)
})

// app.use("/api/books/:name/:Id",async(req:Request,res:Response)=>{
//     console.log(req.params)
// res.json({
//     name:"req.params.name",
//     Id:"req.params.Id"
// })
// })
//app.route("/").get(async()=>{}).post(async()=>{})

routes(app)

app.listen(3000,()=>{
    console.log("Port 3000")
})