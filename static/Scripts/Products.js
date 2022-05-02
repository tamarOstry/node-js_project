var c = 0;
if (sessionStorage.getItem('countOfCart')==null)
    sessionStorage.setItem('countOfCart', 0);

window.addEventListener('load', (event) => {
    getProduct();
    getCategory();
});


function getProduct() {
    fetch('../products/')
        .then(response => {
            if (response.ok && response.status == 200)
                return response.json();
            else
                throw new Error(response.status)
        })
        .then(data => {
            if (data) {
                data.forEach(p => drowProduct(p));
                document.getElementById("ItemsCountText").innerText = JSON.parse(sessionStorage.getItem("countOfCart"));
            }
            else {
                alert("we dont have a products")
            }
        })  
}

function drowProduct(product) {
    var url = "../images/";
    var elmnt = document.getElementById("temp-card");
    var cln = elmnt.content.cloneNode(true);
    cln.querySelector("img").src = url + product.imageUrl;
    cln.querySelector(".price").innerText = product.price+'$';
    cln.querySelector(".description").innerText = product.desc;
    cln.querySelector(".nameProduct").innerText = product.name;
    cln.querySelector("button").addEventListener("click",()=>addToCart(product));
    document.getElementById("PoductList").appendChild(cln);
    c = parseInt(document.getElementById("counter").innerText);
    if (c > 0) {
        c++;
        document.getElementById("counter").innerHTML =c;}
    else
        document.getElementById("counter").innerHTML = 1;
}


function getCategory() {
    fetch('../category/')
        .then(response => {
            if (response.ok && response.status == 200)
                return response.json();
            else
                throw new Error(response.status)
        })
        .then(data => {
            if (data) {
                data.forEach(c => drowCategory(c));
            }
            else {
                alert("we dont have a categories");
            }
        })

}

function drowCategory(category) {
    var elmnt = document.getElementById("temp-category");
    var cln = elmnt.content.cloneNode(true);
    cln.querySelector(".OptionName").innerText = category.name;
    cln.querySelector(".opt").id = category._id;
    cln.querySelector(".lbl").for = category._id;
    cln.querySelector('.opt').addEventListener("change", () => {checkChecked(category._id)}); 
    document.getElementById('filters').appendChild(cln);
   }


function checkChecked(categoryId) {
    c = 0;
    document.getElementById("PoductList").innerHTML = "";
    var tmpCategories = sessionStorage.getItem('categories');
    if (document.getElementById(categoryId).checked == true) {
        if (tmpCategories) {
            categories = JSON.parse(tmpCategories)
            categories.push(categoryId);
            sessionStorage.setItem('categories', JSON.stringify(categories));
            categories.forEach(c => getProductByCategory(c));
        }
        else {
            var categories = [];
            categories.push(categoryId);
            sessionStorage.setItem('categories', JSON.stringify(categories));
            getProductByCategory(categoryId);
        }
    }
    else {
            categories = JSON.parse(tmpCategories)
            categories = categories.filter(c => c != categoryId);
            sessionStorage.setItem('categories', JSON.stringify(categories));
            if (categories.length > 0) {
                categories.forEach(categoryId => getProductByCategory(categoryId));
            }
            else
            {
                document.getElementById("counter").innerHTML=0;
                getProduct(); 
            }    
    }
}


function getProductByCategory(id) {
    fetch('../products/' + id)
        .then(response => {
            if (response.ok && response.status == 200)
                return response.json();
            else
                throw new Error(response.status)
        })
        .then(data => {
            if (data) {
                document.getElementById("counter").innerHTML = c;
                data.forEach(p => drowProduct(p));
            }
            else {alert("there is no product of this category") }
        })
}


function addToCart(product) {
    var bool = false;
    var cart = [];
    var ss = sessionStorage.getItem('cart');
    var countOfCart=sessionStorage.getItem('countOfCart');
    countOfCart++;
    sessionStorage.setItem("countOfCart", JSON.stringify(countOfCart));
    if (ss) {
        cart = JSON.parse(ss);
        for (let i = 0; i < cart.length; i++)
        {
            if (cart[i][0]._id == product._id)
            {
                bool = true;
                cart[i][1]++;
            }
        }
        if (bool == false)
        {
            let py = [];
            py.push(product);
            py.push(1);
            cart.push(py);
        }
    }
    else
    {
        let p = [];
        p.push(product);
        p.push(1);
        cart.push(p);
    }
    document.getElementById("ItemsCountText").innerHTML = countOfCart;
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

