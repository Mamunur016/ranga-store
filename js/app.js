
// loadProducts function
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();


// loadProductDetail function
const loadProductDetail = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayProductDetail(data));

}

// displayProductDetail function
const displayProductDetail = (product) => {
  document.getElementById("details").textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class=" bg-light p-5">
      <h3> Product details:  </h3>
      <p>${product.description}</p>
  </div>
  `;
  document.getElementById("details").appendChild(div);
  document.getElementById("my-cart").style.width = "300px";
  document.getElementById("my-cart").style.position = "fixed";
  // document.getElementById("my-cart").style.right = "0px";
  document.getElementById("my-cart").style.top = "110px";
}


// show all product in UI 
const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product card h-100">
    <div>
     <img class="product-image" src=${image}></img>
    </div>
    <div class="card-body">
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h5>Reviews: ${product.rating.count} </h5>
      <h5>Rating:<span id="${product.id}"></span><span class="">(${product.rating.rate})</h5>
      <h4>Price: $ ${product.price}</h4>
    </div>
    <div class="card-footer border-0 bg-white d-flex">
      <div ><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success me-3">add to cart</button>
      </div>
      <div> 

   
        <button  id="details-btn" class="btn btn-danger ms-3"onclick="loadProductDetail(${product.id})">Details</button>

      </div>
     
    </div>


</div>
      `;
    document.getElementById("all-products").appendChild(div);
    dynamicRating(product.id, product.rating.rate)
  }
};

//  dynamic stars function

const dynamicRating = (ratingId, stars) => {
  let star = Math.floor(stars);
  let i = parseInt(ratingId);
  if (star === 1) {
    document.getElementById(i).innerHTML = '<i class="fas fa-star filled"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i>';
  }
  else if (star === 2) {
    document.getElementById(i).innerHTML = '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i>';
  }
  else if (star === 3) {
    document.getElementById(i).innerHTML = '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star empty"></i><i class="fas fa-star empty"></i>';
  }
  else if (star === 4) {
    document.getElementById(i).innerHTML = '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star empty"></i>';
  }
  else if (star === 5) {
    document.getElementById(i).innerHTML = '<i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i><i class="fas fa-star filled"></i>';
  }
}

// addToCart function
let count = 0;
const addToCart = (id, price) => {
  document.getElementById("details").textContent = "";

  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// getInputValue function
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  // document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
  // document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    `${getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax")}`;
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
