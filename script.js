function getId(id){
    return document.getElementById(id)
}

const categoriesContainer = getId('categoriesContainer');
const treesContainer = getId('treesContainer')
const loadingSpinner = getId('loadingSpinner')

function showLoading(){
    loadingSpinner.classList.remove('hidden')
    treesContainer.innerHTML = ''
}
function hideLoading(){
    loadingSpinner.classList.add('flex')
    
}

async function loadCategories() {
    
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json()
    // console.log(data.categories)
    // console.log(categoriesContainer)

    data.categories.forEach(category => {

        const btn = document.createElement('button')
         btn.className = "btn btn-primary w-full"
         btn.textContent = category.category_name;
         btn.onclick = () => selectCategory(category.id, btn);

         categoriesContainer.appendChild(btn)
    })
}

// async function selectCategory(categoryId, btn) {
//     console.log(categoryId, btn)
    
//     const allButtons = document.querySelectorAll(
//     "#categoriesContainer button, #allTreesBtn",); 
//     allButtons.forEach(btn => {
//         btn.classList.remove('btn-primary')
//         btn.classList.add('btn-outline')
//     })

//     btn.classList.add('btn-primary')
//     btn.classList.remove('btn-outline')


//     const res = await fetch(
//     `https://openapi.programming-hero.com/api/category/${categoryId}`);
//     const data = await res.json();
//     console.log(data);
//     // displayTrees(data.plants);

// }

async function loadTrees() {
    showLoading()
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json()
    hideLoading()
    displayTrees(data.plants)
}

const displayTrees = (trees) => {
console.log(trees);
trees.forEach(tree => {
    const card = document.createElement('div')
     card.className = "card bg-white shadow-sm"
     card.innerHTML = `
     <figure>
        <img
          src="${tree.image}"
          alt="${tree.name}"
          title="${tree.name}"
          class="h-48 w-full object-cover cursor-pointer"
          onclick="openTreeModal(${tree.id})"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title cursor-pointer hover:text-[#4ade80]">${tree.name}</h2>
        <p class="line-clamp-2">
          ${tree.description}
        </p>
        <div class="badge badge-success badge-outline">${tree.category}</div>

        <div class="flex justify-between items-center">
          <h2 class="font-bold text-xl ${tree.price > 500 ? "text-red-500" : "text-[#4ade80]"}">$${tree.price}</h2>
          <button class="btn btn-primary" onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})">Cart</button>
        </div>
      </div>
      `;
    treesContainer.appendChild(card)

})
}

loadCategories()
loadTrees()