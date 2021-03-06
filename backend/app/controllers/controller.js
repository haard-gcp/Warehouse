let productData = require('../json/products.json');
let articleData = require('../json/inventory.json');
const fs = require('fs');           // library to read and write to json file

/**
 * Retrieve Article information from Json file
 */
exports.articles = (req, res) => {
    // find all Article information from Json file
    res.json(articleData);
}

/**
 * Retrieve Product information from Json file
 */
exports.getproducts = (req, res) => {
    // find all Article information from Json file
    res.json(productData);
}

/**
 * Delete Product from Json file
 */
exports.deleteProducts = async (req, res) => {
    try{
        let productname= req.params.name;   // receive name parameter
        const searchdata = {};  // will be delete data object
        productData.products.map((item)=>{
            if(item.name == productname){    // finding data for delete
                searchdata.name = item.name;
                searchdata.contain_articles = item.contain_articles;
                item.number = item.number - 1;   // calculating product number
            }
        })
        articleData.inventory.map((articleitem)=>{    // calculating stock of article and update
            searchdata.contain_articles.map((productitem)=>{
                if(articleitem.art_id == productitem.art_id)
                {
                    articleitem.stock = articleitem.stock - productitem.amount_of;
                }
            })
        })
        let writingproduct = JSON.stringify(productData.products);
        let writingarticle = JSON.stringify(articleData);
        let finaldata = '{"products": ' + writingproduct + "}";
        fs.writeFileSync('app/json/products.json', finaldata);    // writing to product.json
        fs.writeFileSync('app/json/inventory.json', writingarticle);    // writing to inventory.json
        res.json("success")                                     
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a product with id = " + req.params.id,
            error: error.message
        });
    }
}
