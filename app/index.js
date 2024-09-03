import  express  from "express";
import  cookieParser  from "cookie-parser";
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js"

//Server
const app = express();
app.set("port",3001);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());


//Rutas
/*Agregar rutas para el kisco y las materias*/

app.get("/",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
/*Usar este para cambiar contra*/app.get("/register",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/grilla",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/grilla.xml"));
app.get("/grilla.css",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/grilla.css"));

app.get("/kiosco", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/kiosco.html"));
app.get("/kiosco.css",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/kiosco.css"));

app.get("/kiosco.js", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/kiosco.js"));

app.get("/api/kiosco", authorization.soloAdmin, (req, res) => {
    res.json({
      productos: [
        { id: 1, nombre: "Chocolatina", precio: 50 },
        { id: 2, nombre: "Coca-cola", precio: 80 },
        { id: 3, nombre: "Fanta", precio: 150 },
        { id: 4, nombre: "7UP", precio: 20 },
        { id: 5, nombre: "Café", precio: 100 },
        { id: 6, nombre: "Chicle Beldent", precio: 60 },
        { id: 7, nombre: "Juego de naranja", precio: 90 },
        { id: 8, nombre: "Kranchitos", precio: 70 },
        { id: 9, nombre: "Sándwich de miga", precio: 120 },
        { id: 10, nombre: "Agua Mineral", precio: 40 },
      ],
    });
  });


app.post("/api/change-password", authentication.changePassword);

app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authentication.login);
