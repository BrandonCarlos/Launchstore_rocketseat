const db = require('../../config/db');

module.exports = {
  create(data) {//data = req.body
    const query = `
      INSERT INTO products (
        category_id,
        user_id,
        name,
        description,
        old_price,
        price,
        quantity,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    data.price = data.price.replace(/\D/g, "");//BD só aceita INTEGER, então devemos formatar
    //antes que enviar pro BD

    const values = [
      data.category_id,
      data.user_id || 100,//segundo o MAIKI user_id é um ARRAY
      data.name,
      data.description,
      data.old_price || data.price,//senão tiver de inicio o old_price coloca o mesmo valor de data_price
      data.price,//o price precisa ir no BD formatado sem R$,. etc...
      data.quantity,
      data.status || 1,//sempre começa como liberado, disponivel, no BD também tem essa validação
    ]

    // Esse retorno já é uma PROMISE, e PROMISES tratamos com ASYNC E AWAIT
    return db.query(query, values);
  },
  find(id) {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id]);
  },
  update(data) {
    const query = `
      UPDATE products SET 
        category_id=($1),
        user_id=($2),
        name=($3),
        description=($4),
        old_price=($5),
        price=($6),
        quantity=($7),
        status=($8)
      WHERE id = $9
    `

    const values = [
      data.category_id,
      data.user_id,
      data.name,
      data.description,
      data.old_price,
      data.price,
      data.quantity,
      data.status,
      data.id
    ]

    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE FROM products WHERE id = $1`, [id]);
  }
}