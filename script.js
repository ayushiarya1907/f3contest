const getMenuButton = document.getElementById("get-menu-button");
const placeOrderButton = document.getElementById("place-order-button");
const loadingAnimation = document.getElementById("loading-anim");
const menuItemContainer = document.getElementById("menu-container");
const menuItems = [];

const showMenuSection = () => {
  const menuSection = document.getElementById("menu");
  menuSection.style.display = "flex";
  menuSection.scrollIntoView();
};

const menuItemUI = (food) => `
      <div class="menu-item">
        <div class="item-image">
          <img
            src="${food.img}"
            alt="burger"
          />
        </div>
        <div class="item-details">
          <div class="name-n-price">
            <div>${food.name}</div>
            <div>Rating- ${food.rate}</div>
          </div>
          <div>Price- ₹${food.price}</div>
          <div class="desc">
            ${food.dsc}
          </div>
          <div class="country-origin">
           Country Origin- ${food.country}
          </div>
        </div>
      </div>`;

const renderMenuItems = (data) => {
  data.forEach((burger) => {
    menuItemContainer.innerHTML += menuItemUI(burger);
  });
};

const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const takeOrder = async () => {
  const order = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    order.push(menuItems[randomIndex]);
  }
  await wait(2500);
  console.log("Order placed", order);
  return order;
};

placeOrderButton.onclick = () => {
  takeOrder();
};

getMenuButton.onclick = () => {
  showMenuSection();
  loadingAnimation.style.display = "flex";
  fetch("https://free-food-menus-api-production.up.railway.app/burgers")
    .then((response) => response.json())
    .then((data) => {
      menuItems.push(...data);
      renderMenuItems(data);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      loadingAnimation.style.display = "none";
    });
};
