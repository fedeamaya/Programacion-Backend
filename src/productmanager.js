const fs = require("fs");

class ProductManager {
 
  fields = ["title", "description", "price", "thumbnail", "code", "stock"];

  
  constructor(file) {
    this.products = [];
    this.id = 1; 
    this.path = file; 

    managerFS(fs, "INIT", this.path, null);

    this.products = managerFS(fs, "READ", this.path, null);
  }

  addProduct(product) {
   
    let verifyCode = this.products.find((p) => p.code === product.code);

    if (verifyCode) {
      return "This code already exists";
    }

    if (!checkFiels(product, this.fields)) {
      return "Fields missing";
    }


    let newProduct = { ...product, id: this.id };
    this.products.push(newProduct);
    this.id++;


    managerFS(fs, "SAVE", this.path, this.products);

    return "Product added";
  }

  getProducts() {
    this.products = managerFS(fs, "READ", this.path, null);
    let answer =
      this.products.length === 0
        ? "Empty list of products"
        : JSON.stringify(this.products);
    return answer;
  }

  getById(id) {

    let arrayProducts = managerFS(fs, "READ", this.path, null);

    let searchProduct = (nameKey, arrayProducts) => {
      for (let i = 0; i < arrayProducts.length; i++) {
        if (arrayProducts[i].id === nameKey) {
          return arrayProducts[i];
        }
      }
      return "Not found";
    };
    return searchProduct(id, arrayProducts);
  }

  updateProduct(id, product) {

    if (!checkFiels(product, this.fields)) {
      return "Fields missing";
    }

    const indexElement = this.products.findIndex((pr) => pr.id == id);

    if (indexElement >= 0) {
      let newProduct = [...this.products];
      newProduct[indexElement] = { ...product, id: id };
      this.products = newProduct;
      managerFS(fs, "SAVE", this.path, this.products);
      return "Product update";
    } else {
      return "Not found";
    }
  }

  deleteProduct(id) {

    let indexElement = this.products.findIndex((pr) => pr.id == id);

    if (indexElement >= 0) {
   
      this.products.splice(indexElement, 1);
      managerFS(fs, "SAVE", this.path, this.products);

      return "Product delete";
    } else {
      return "Not found";
    }
  }
}

function managerFS(objFS, accion, path, info) {
  switch (accion) {
    case "INIT":

      console.log("file: productmanager.js:199 ~ managerFS ~ path:", path);
      if (!objFS.existsSync(path)) {
        objFS.writeFileSync(path, "[]", "utf8");
      }

      break;
    case "SAVE":
      objFS.writeFileSync(path, JSON.stringify(info));
    case "READ":
      let fileContent = objFS.readFileSync(path, "utf8");
      return JSON.parse(fileContent);
      break;
    default:
      break;
  }
}

function checkFiels(product, fields) {
  for (let x = 0; x < fields.length; x++) {
    if (!Object.keys(product).includes(fields[x])) {
      return false;
    }
  }
  return true;
}


const product1 = {
   title: "Prodcuto 1",
   description: "Cerveza Carlsberg",
   price: 200.51,
   thumbnail: "https://www.espaciovino.com.ar/media/default/0001/64/thumb_63664_default_medium.jpeg",
   code: "CER01ZA",
   stock: 1,
 };
 const product2 = {
   title: "Prodcuto 2",
   description: "Cerveza Brahma",
   price: 3400,
   thumbnail: "https://carrefourar.vtexassets.com/arquivos/ids/191315/7792798007493_01.jpg?v=637511788315700000",
   code: "CER02ZA",
   stock: 2,
 };
 
 const product3 = {
   title: "Prodcuto 3",
   description: "Cerveza Quilmes",
   thumbnail: "https://jumboargentina.vtexassets.com/arquivos/ids/588362/Cerveza-Rubia-Quilmes-Clasica-1-L-Botella-Retornable-1-18652.jpg?v=637280467092070000",
   code: "CER03ZA",
   stock: 2,
 };
 
 const product4 = {
   title: "Prodcuto 4",
   description: "Cerveza Corona",
   price: 3.4,
   thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/211/660/products/corona1-f88092ba1d4b561ccc16196411097221-640-0.webp",
   code: "CER04ZA",
   stock: 6,
 };

const productManager = new ProductManager("products.json");
const productManager2 = new ProductManager("products2.json");
  
