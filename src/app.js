import express from "express";
import morgan from "morgan";
import { createRoles } from "./libs/inicialSetup";
import cors from 'cors';
import productsRoutes from "./routes/products.routes"
import authRoutes from "./routes/auth.routes";
import emprendedorasRoutes from "./routes/emprendedoras.routes";
import carritoRoutes from "./routes/carrito.routes"
import metaRoutes from "./routes/meta.routes"
import pedidoRoutes from "./routes/pedidido.routes";
import ticketRoutes from "./routes/ticket.routes"
import estiloRoutes from "./routes/estilos.routes"

const app = express()
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type, Authorization, token', 
    credentials: true 
  }));
createRoles();

app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.json("welcome")
})

app.use("/api/products", productsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/emprendedoras", emprendedorasRoutes)
app.use("/api/carrito", carritoRoutes)
app.use("/api/metas", metaRoutes)
app.use("/api/pedidos",pedidoRoutes)
app.use("/api/tickets",ticketRoutes)
app.use("/api/estilos",estiloRoutes)





export default app;

