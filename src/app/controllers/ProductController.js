const { formatPrice } = require('../../lib/utils');
const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
  create(req, res) {
    // Pegar categorias
    Category.all()
      .then(function (results) {
        const categories = results.rows;//array de categorias do banco de dados esse = results.rows;
        // console.log(categories);
        return res.render('products/create.njk', { categories });//agora dentro do create.njk tenho acesso a todos os dados do banco de dados
      })
      .catch(error => {
        throw new Error(error);
      })
  },
  async post(req, res) {
    //Lógica de salvar 
    const keys = Object.keys(req.body);

    for (key of keys) {//of para pegar o VALOR de cada formulário
      if(req.body[key] == "") {
        return res.send('Please, fill all fields!');
      }
    }

    let results = await Product.create(req.body)
    const productId = results.rows[0].id;

    return res.redirect(`/products/${productId}/edit`)  
    
  },

  async edit(req, res) {
    // Peguei os dados do BODY e enviei pro banco de dados
    let results = await Product.find(req.params.id);//vou pegar do PARAMS o ID e ir no BANCO DE DADOS e pegar o produto com esse ID do PARAMS
    const product = results.rows[0];//um único produto, vamos pegar atráves do ID
    
    // Senão encontrar o produto no banco de dados, fala produto não encontrado
    if(!product) {
      return res.send('Product not found!');
    }

    // Hora de formatar o PRICE para renderizar no FRONT-END
    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    // se tiver achado o produto no BD, pega todas as categorias no BD
    results = await Category.all();
    const categories = results.rows;//e RENDERIZA  no FRONT-END todas as categorias
    
    return res.render('products/edit.njk', { product, categories });

  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {//of para pegar o VALOR de cada formulário
      if(req.body[key] == "") {
        return res.send('Please, fill all fields!');
      }
    }

    // Pra atualizar novamente o dado para ir no BD precisamos formatalo em INTEGER
    req.body.price = req.body.price.replace(/\D/g, "");

    if(req.body.old_price !== req.body.price) {
      const oldProduct = await Product.find(req.body.id);//vamos pegar o antigo old_price
      req.body.old_price = oldProduct.rows[0].price;//old_price ta pegando o valor do price do BD, pois o price apartir da linha abaixo vamos MUDAR
    }

    await Product.update(req.body);//esperando a ATUALIZAÇÃO passando o corpo da requisição

    return res.redirect(`/products/${req.body.id}/edit`);
  },
  async delete(req, res) {
    await Product.delete(req.body.id);
    return res.redirect('/products/create');
  }
}