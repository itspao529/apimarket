import { Router } from "express";
import {
  getProductos,
  getProducto,
  postProductos,
  putProductos,
  deleteProductos
} from "../controllers/market.controllers.js";

const router = Router();

router.get("/productos", getProductos);
router.get("/productos/:id", getProducto);
router.post("/productos", postProductos);
router.put("/productos/:id", putProductos);
router.delete("/productos/:id", deleteProductos);

export default router;
