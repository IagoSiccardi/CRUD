const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const saveProducts = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3))

const readProducts = () => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3))
}


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		const {name,price,discount,description,category} = req.body

		let lastId = products[products.lenght-1].id + 1

		let newProduct = {
			id: +lastId,
			name: name.trim(),
			description,
			price: +price,
			discount: +discount,
			image: 'default-image.png',
			category

		}

		products.push(newProduct)

		saveProducts(products)

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;