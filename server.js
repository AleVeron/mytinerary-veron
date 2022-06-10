const express = require("express");
const app = express();

const PORT = 4000;
app.set("port", PORT)

//GET obtener
//POST enviar
//DELETE Eliminar
//PUT Actualizar


app.get("/", function(req, res){
    res.send("Server created!")
})

app.listen(PORT, function(){
    console.log("Server is running on: " + PORT);
})