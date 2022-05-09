const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		let productVisited = products.filter(product => product.category === "visited")

		let productInSale = products.filter(product => product.category === "in-sale")

		res.render('index',{
			productInSale,
			productVisited,
			toThousand
		})
	},
	search: (req, res) => {
		const {keywords} = req.query


		let results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()) || product.description.toLowerCase().includes(keywords.toLowerCase()))

		res.render('results',{
			results,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;
