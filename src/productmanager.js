
 class ProductManager {
    
    fields = ["title", "description", "price", "thumbnail", "code", "stock"];
  
    constructor() {
      this.products = []; 
      this.id = 1; 
    }
  
    
    addProduct(product) {
      
      let verifyCode = this.products.find((p) => p.code === product.code);
      let checkFiels = (data, fields) => {
          for (let x = 0; x < fields.length; x++) {
            if (!Object.keys(data).includes(fields[x])) {
              return false;
            }
          }
          return true;
        }
  
      if (verifyCode) {
        return "This code already exists";
      }

      if (!checkFiels) {
        return "Fields missing";
      }
  
      
      let newProduct = { ...product, id: this.id };
      this.products.push(newProduct);
      this.id++;
  
      return "Product added";
    }
  
     
    getProducts() {
      let answer =
        this.products.length === 0
          ? "Empty list of products"
          : JSON.stringify(this.products);
      return answer;
    }
  
     
    getById(id) {
      let searchProduct = (nameKey, myArray) => {
        for (let i = 0; i < myArray.length; i++) {
          if (myArray[i].id === nameKey) {
            return JSON.stringify(myArray[i]);
          }
        }
        return "Not found";
      };
  
      return searchProduct(id, this.products);
    }
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
  
 
  
  const productManager = new ProductManager();
  const productManager2 = new ProductManager();
  
  console.log("producto okey");
  console.log(productManager.addProduct(product1) + "\n");
  
