
window.addEventListener('load', (event) => {
    debugger
    getOrders();
});

function getOrders() {
    id=JSON.parse(sessionStorage.getItem("user"))._id;
    fetch('../user/'+ id)
        .then(response => {
            if (response.ok && response.status == 200)
                return response.json();
            else
                throw new Error(response.status)
        })
        .then(data => {
            if (data) {
                console.log(data);
                document.writeln(JSON.stringify(data));
            }
            else {
                alert("you dont have orders!")
            }
        })  
}
