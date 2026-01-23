
let productNameInput = document.getElementById("name");
let productPriceInput = document.getElementById("price");
let productCategoryInput = document.getElementById("category");
let productDescriptionInput = document.getElementById("Description");
let productImageInput = document.getElementById("formFile");
let searchProductInput = document.getElementById("search");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");

let currentIndex = 0;

let productList = [];
if (localStorage.getItem("productContainer")) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayProducts();
}

function addProduct() {
  if (
    productNameInput.value === "" ||
    productPriceInput.value === "" ||
    productCategoryInput.value === "" ||
    productDescriptionInput.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: "images/${productImageInput.files[0].name}",
  };
  productList.push(product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  clearForm();
  displayProducts();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function displayProducts() {
  box = "";
  for (let i = 0; i < productList.length; i++) {
    box += `
    <tr>
        <td id="tdName" class="text-center">${i + 1}</td>
        <td id="tdName" class="text-center">${productList[i].name}</td>
        <td id="tdPrice" class="text-center">${productList[i].price}</td>
        <td id="tdCategory" class="text-center">${productList[i].category}</td>
        <td id="tdDescription" class="text-center">${
          productList[i].description
        }</td>
        <td id="tdImage" class="text-center"><img src="${
          productList[i].image
        }" alt="${productList[i].name}" width="50px"></td>
        <td class="text-center">
            <button onclick="setUpdateProduct(${i})" class="btn btn-warning m-2 text-white fw-bold" id="update">Update</button>
            <button onclick="deleteItem(${i})" class="btn btn-danger m-2 fw-bold" id="delete">Delete</button>
        </td>
    </tr>
    `;
  }
  document.getElementById("tableData").innerHTML = box;
}

function deleteItem(index) {
  productList.splice(index, 1);
  displayProducts();
  localStorage.setItem("productContainer", JSON.stringify(productList));
}

function searchProduct() {
  term = searchProductInput.value.toLowerCase();
  box = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term)) {
      box += `
      <tr>
        <td id="tdName" class="text-center">${i + 1}</td>
        <td id="tdName" class="text-center">${productList[i].name}</td>
        <td id="tdPrice" class="text-center">${productList[i].price}</td>
        <td id="tdCategory" class="text-center">${productList[i].category}</td>
        <td id="tdDescription" class="text-center">${
          productList[i].description
        }</td>
        <td id="tdImage" class="text-center"><img src="${
          productList[i].image
        }" alt="${productList[i].name}" width="50px"></td>
        <td class="text-center">
            <button class="btn btn-warning m-2 text-white fw-bold" id="update">Update</button>
            <button onclick="deleteItem(${i})" class="btn btn-danger m-2 fw-bold" id="delete">Delete</button>
        </td>
    </tr>
      `;
    }
  }
  document.getElementById("tableData").innerHTML = box;
}

function setUpdateProduct(index) {
currentIndex = index;
productNameInput.value = productList[index].name;
productPriceInput.value = productList[index].price;
productCategoryInput.value = productList[index].category;
productDescriptionInput.value = productList[index].description;
addBtn.classList.add("d-none");
updateBtn.classList.remove("d-none")
}

function updateProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]? "images/${productImageInput.files[0].name}" : "images/${productList[currentIndex].image}",
  };
  productList.splice(currentIndex, 1, product);
  displayProducts();
  localStorage.setItem("productContainer", JSON.stringify(productList));
  clearForm();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none")
}