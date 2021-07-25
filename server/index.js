import server from "./server.js";

const port = process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`NODE server is running on port ${port}`)
})