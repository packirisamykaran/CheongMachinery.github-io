import products from "./productsDetails.js";

// Cache DOM elements
const submitBtn = document.getElementById("submit-btn");
const validationElement = document.getElementById("validation");
const productSelect = document.getElementById("product-category");
const productsContainer = document.getElementById("product-list");
const displayDetailElement = document.getElementById("displayItemDetails");
const infoContainer = document.getElementById("info-container");
const displayImgElement = document.getElementById("display-img");
const itemDisplayCloseBtn = document.getElementById("close-item-detail");

// Initial states
submitBtn.disabled = true;
displayDetailElement.style.visibility = "hidden";
displayDetailElement.style.zIndex = "-1";

// Validate input
validationElement.addEventListener("keyup", () => {
  submitBtn.disabled = validationElement.value === "8" ? false : true;
});

// Close item detail and update URL
itemDisplayCloseBtn.addEventListener("click", () => {
  displayDetailElement.style.visibility = "hidden";
  displayDetailElement.style.zIndex = "-1";
  // Remove the hash from the URL
  window.history.pushState("", document.title, window.location.pathname + window.location.search);
});

// Populate the category dropdown
function populateCategories() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "All";
  defaultOption.textContent = "All";
  productSelect.add(defaultOption);

  for (const category in products) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    productSelect.add(option);
  }
}

// Clear existing child elements
function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Display products based on selected category
function displayProducts() {
  clearChildren(productsContainer);

  if (productSelect.value === "All") {
    for (const category in products) {
      addProductsByCategory(category);
    }
  } else {
    addProductsByCategory(productSelect.value);
  }
}

// Create and append product items to the DOM
function addProductsByCategory(category) {
  const categoryProducts = products[category];

  for (const itemName in categoryProducts) {
    const productWrapper = document.createElement("div");
    productWrapper.className = "item";
    productWrapper.id = itemName;
    productWrapper.addEventListener("click", () => {
      displayItemDetails(itemName, category);
    });

    const productImg = document.createElement("img");
    productImg.id = itemName;
    productImg.src = `./products/${category}/${itemName}.png`;

    const nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = itemName;

    productWrapper.appendChild(productImg);
    productWrapper.appendChild(nameElement);
    productsContainer.appendChild(productWrapper);
  }
}

// Display detailed info of a clicked product and update URL hash for SEO
function displayItemDetails(itemName, category) {
  clearChildren(infoContainer);

  try {
    displayImgElement.src = `./products/${category}/${itemName}.png`;
  } catch (error) {
    console.log("Error loading .png file:", error);
  }

  const itemDetails = products[category][itemName];
  for (const detail in itemDetails) {
    const row = document.createElement("div");
    row.className = "info-row";

    const keyElement = document.createElement("div");
    keyElement.className = "key";
    keyElement.textContent = detail;

    const valueElement = document.createElement("div");
    valueElement.className = "value";
    valueElement.textContent = itemDetails[detail];

    row.appendChild(keyElement);
    row.appendChild(valueElement);
    infoContainer.appendChild(row);
  }

  displayDetailElement.style.visibility = "visible";
  displayDetailElement.style.zIndex = "1";

  // Update URL hash to include the product id for direct linking/SEO
  window.history.pushState(null, "", `#${itemName}`);
}

// Initialize dropdown and display
populateCategories();
productSelect.addEventListener("change", displayProducts);
displayProducts();

// Optional: On page load, check for a hash in the URL and display that product's details
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    // Iterate through categories to find the matching item
    for (const category in products) {
      if (products[category][hash]) {
        displayItemDetails(hash, category);
        break;
      }
    }
  }
});
