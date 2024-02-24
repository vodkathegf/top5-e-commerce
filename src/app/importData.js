const { Client } = require("pg");
const data = require("./db.json");

const client = new Client(process.env.DATABASE_URL);

(async () => {
  try {
    await client.connect();

    for (const category of data.categories) {
      await client.query(
        "INSERT INTO categories (id, category_name, seo_url) VALUES ($1, $2, $3)",
        [category.id, category.categoryName, category.seoUrl]
      );
    }

    for (const product of data.products) {
      await client.query(
        "INSERT INTO products (id, category_id, product_name, quantity_per_unit, unit_price, units_in_stock) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          product.id,
          product.categoryId,
          product.productName,
          product.quantityPerUnit,
          product.unitPrice,
          product.unitsInStock,
        ]
      );
    }

    for (const user of data.users) {
      await client.query(
        "INSERT INTO users (user_id, email, password) VALUES ($1, $2, $3)",
        [user.userId, user.email, user.password]
      );
    }

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.end();
  }
})();
