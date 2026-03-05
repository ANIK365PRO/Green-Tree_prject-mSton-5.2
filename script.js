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

         categoriesContainer.appendChild(btn)
    })


}

loadCategories()