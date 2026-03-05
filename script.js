function getId(id){
    return document.getElementById(id)
}

const categoriesContainer = getId('categoriesContainer');
const treesContainer = getId('treesContainer')
const loadingSpinner = getId('loadingSpinner')
const allTreesBtn = getId('allTreesBtn')
const treeDetailsModal = getId('tree-details-modal')

const modalImage = getId("modalImage");
const modalCategory = getId("modalCategory");
const modalDescription = getId("modalDescription");
const modalPrice = getId("modalPrice");
const modalTitle = getId("modalTitle");
const cartContainer = getId("cartContainer");
const totalPrice = getId("totalPrice");

function showLoading(){
    loadingSpinner.classList.remove('hidden')
    treesContainer.innerHTML = ''
}
function hideLoading(){
    loadingSpinner.classList.add('hidden')
    
}
//load categories sl.1
async function loadCategories() {
    
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json()
    console.log(data.categories)
    // console.log(categoriesContainer)

    data.categories.forEach(category => {
        
        const btn = document.createElement('button')
         btn.className = "btn w-full"
         btn.textContent = category.category_name;
         btn.onclick = () => selectCategory(category.id, btn);
         categoriesContainer.appendChild(btn)
    })
}

// for other btn click sl.4
async function selectCategory(categoryId, btn) {
    // console.log(categoryId, btn)
    showLoading()
    
    const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",); 
    allButtons.forEach(btn => {
        btn.classList.remove('btn-primary')
        btn.classList.add('btn-outline')
    })

    btn.classList.add('btn-primary')
    btn.classList.remove('btn-outline')


    const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();
    // console.log(data);

    displayTrees(data.plants);
    
    hideLoading()
}

// for all btn click sl.5
allTreesBtn.addEventListener('click', () =>{
    showLoading()
    
    const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",); 
    allButtons.forEach(btn => {
        btn.classList.remove('btn-primary')
        btn.classList.add('btn-outline')
    })

    allTreesBtn.classList.add('btn-primary')
    allTreesBtn.classList.remove('btn-outline')

    loadTrees()
})

// load trees sl.2
async function loadTrees() {
    showLoading()
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json()
    hideLoading()
    displayTrees(data.plants)
}
// load trees to display trees sl.3
const displayTrees = (trees) => {
// console.log(trees);
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
        <h2 class="card-title cursor-pointer hover:text-[#4ade80]" onclick="showTreeModal(${tree.id})">${tree.name}</h2>

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

// display trees to single modal
async function showTreeModal(treeId){
    // console.log(treeId)

    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`)
    const data = await res.json()
    const plantDetails = data.plants
    // console.log(plantDetails)

    modalTitle.textContent = plantDetails.name;
    modalImage.src = plantDetails.image;
    modalCategory.textContent = plantDetails.category;
    modalDescription.textContent = plantDetails.description;
    modalPrice.textContent = plantDetails.price;
    treeDetailsModal.showModal()

}

loadCategories()
loadTrees()