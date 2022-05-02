window.addEventListener('load', (event) => {
    debugger
    myCart();
});

function myCart() {
    var cart = JSON.parse(sessionStorage.getItem('cart'));
    if (cart)
        for (let i = 0; i < cart.length; i++) {
             drowProductFromCart(cart[i][0], cart[i][1]);
         }
}

function drowProductFromCart(product,quantity) {
    var elmnt = document.getElementById("temp-row");
    var cln = elmnt.content.cloneNode(true);
    var url = "../Images/" + product.imageUrl.toString();
    cln.querySelector(".image").style.backgroundImage = "url(" + url + ")";
    cln.querySelector(".quatityProda").innerText = quantity;
    cln.querySelector(".itemName").innerText = product.name;
    cln.querySelector(".price").innerText = product.price + '$';
    cln.querySelector(".descriptionColumn").innerText = product.desc;
    cln.getElementById("deleteProduct").addEventListener("click", () => deleteProdFromCart(product._id));
    document.querySelector("tbody").appendChild(cln);
    document.getElementById("itemCount").innerHTML = JSON.parse(sessionStorage.getItem('countOfCart'));
    document.getElementById("totalAmount").innerHTML = parseInt(document.getElementById("totalAmount").innerText) + (product.price*quantity);
}

function deleteProdFromCart(productId) {
    var cart = JSON.parse(sessionStorage.getItem('cart'));
    var newList = [];
    for (let i = 0; i < cart.length; i++) {
        
            if (cart[i][0]._id != productId)
            {
                var p = [];
                p.push(cart[i][0]);
                p.push(cart[i][1]);
                newList.push(p);
            }
            else
            {
                var countOfCart = JSON.parse(sessionStorage.getItem("countOfCart"))
                countOfCart--;
                sessionStorage.setItem("countOfCart", JSON.stringify(countOfCart));
                if (cart[i][1] > 1) {
                    var p = [];
                    p.push(cart[i][0]);
                    p.push(--cart[i][1]);
                    newList.push(p);
                }    
                document.querySelector(".items").removeChild(document.querySelector("tbody"));
                var t = document.createElement('tbody');
                document.querySelector(".items").appendChild(t);
            }
    }

    if (newList.length == 0)
        document.getElementById("totalAmount").innerText = 0;

    for (let i = 0; i < newList.length; i++) {
        if(i==0)
            document.getElementById("totalAmount").innerText = 0;
        drowProductFromCart(newList[i][0], newList[i][1]);
    }  
    sessionStorage.setItem('cart', JSON.stringify(newList));
    }



function placeOrder() {
    var orderItems = [];
    cart = JSON.parse(sessionStorage.getItem('cart'));
    if (!cart)
        alert("you dont have product in your cart!")
    else {
      for (let i = 0; i < cart.length;i++) {
        var item = {
            "_id": cart[i][0]._id,
            "quantity": cart[i][1]
        };
        orderItems.push(item);
    }

    var order = {
        "OrderId": 0,
        "userId": "6266ca75ff39855ed8a8729c",
        //"UserId": JSON.parse(sessionStorage.getItem('user'))._id,
        "date": new Date(),
        "amount": document.getElementById("totalAmount").innerText,
        "products": orderItems
    };

    fetch('../orders', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(order)
    })
        .then((response) => {
            if (response.ok && response.status == 200)
                return response.json();
            else {
                alert("something is worng!!");
                throw new Error(response.status);
            }        })
        .then(data => {
            if (data)       
            alert("the order :" + data._id +"is successfully!!!")
        }).catch((er) => { console.log(er); });
        sessionStorage.setItem("cart", []);
    }
}