export const postProductos = async (req, res) => {
  try {
    const { name, description, price_cost, price_sale, quantity, image } = req.body;

    // 1. Obtener el último ID
    const [result] = await pool.query("SELECT MAX(id) AS last_id FROM productos");

    // 2. Calcular nuevo ID
    const lastId = result[0].last_id || 0;
    const newId = lastId + 1;

    // 3. Insertar producto con el nuevo ID
    const [insertResult] = await pool.query(
      "INSERT INTO productos (id, nombre, descripcion, precio_costo, precio_venta, cantidad, fotografia) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [newId, name, description, price_cost, price_sale, quantity, image]
    );

    // 4. Validar inserción
    if (insertResult.affectedRows > 0) {
      res.json({ message: "Producto Agregado", id: newId });
    } else {
      res.status(404).json({ message: "No se ingresó el producto" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};
