function getId(id){
    return document.getElementById(id)
}

const categoriesContainer = getId('categoriesContainer')



async function loadCategories() {
    
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json()
    // console.log(data.categories)
    // console.log(categoriesContainer)

    data.categories.forEach(category => {

        const btn = document.createElement('button')
         btn.className = "btn btn-primary bg-[#15803D] w-full"
         btn.textContent = category.category_name;
         btn.onclick = () => selectCategory(category.id, btn);

         categoriesContainer.appendChild(btn)
    })
}

async function selectCategory(categoryId, btn) {
    console.log(categoryId, btn)
    
    const allButtons = document.querySelectorAll(
    "#categoriesContainer button, #allTreesBtn",); 
    allButtons.forEach(btn => {
        btn.classList.remove(' bg-[#15803D]')
        btn.classList.add('btn-outline')
    })

    btn.classList.add('bg-[#15803D]')
    btn.classList.remove('btn-outline')


    const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();
    console.log(data);
    // displayTrees(data.plants);

}

loadCategories()