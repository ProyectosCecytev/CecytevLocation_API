
const PORT = process.env.PORT ||  3000;
const express = require("express");
const app =  require("./app/app");



//configuracion de puerto para el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto  ->  ${PORT}`);
});


