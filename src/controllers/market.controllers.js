import { pool } from "../db.js";

// 🔍 OBTENER TODOS LOS PRODUCTOS
export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener productos" });
  }
};

// 🔍 OBTENER UN PRODUCTO POR ID
export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM productos WHERE id = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener producto" });
  }
};

// ➕ INSERTAR PRODUCTO
export const postProductos = async (req, res) => {
  try {
    const { name, description, price_cost, price_sale, quantity, image } = req.body;

    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price_cost, price_sale, quantity, image]
    );

    res.json({
      id: result.insertId,
      message: "Producto agregado correctamente"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al insertar producto" });
  }
};

// ✏️ ACTUALIZAR PRODUCTO
export const putProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price_cost, price_sale, quantity, image } = req.body;

    const [result] = await pool.query(
      `UPDATE productos 
       SET nombre = ?, descripcion = ?, precio_costo = ?, precio_venta = ?, cantidad = ?, fotografia = ?
       WHERE id = ?`,
      [name, description, price_cost, price_sale, quantity, image, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// ❌ ELIMINAR PRODUCTO
export const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json({ message: "Producto eliminado correctamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al eliminar producto"
    });
  }
};
