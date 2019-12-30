function AjouterMenu() {
    let type = document.getElementById("selectMenu").value;
    let Nom = document.getElementById("Article").value;
    let Prx = document.getElementById("PrixArticle").value;
    var idM = Math.floor(Math.random() * 1000) + 1;
    if (type === "selectionner") {
        alert("choisir type de menu");
        return false;
    }
    if (Nom === "") {
        alert("donner un nom pour votre article");
        return false;

    }
    if (Prx === "") {
        alert("donner le prix de votre article");
        return false;
    }
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    if (list == null) {
        list = []
    }
    let listM = { idM, type, Nom, Prx };
    list.push(listM);
    console.log(list);
    localStorage.setItem("MenuResteraunt", JSON.stringify(list));
}

function AfficherMenu() {
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    let tableau = "";
    if (list === null) {
        tableau = `
    <tr>
    <th>Type</th>
    <th>Produit</th>
    <th>Prix</th>
    <th>Action</th>
    </tr>
    `
    } else {
        tableau += `
    <tr>
    <th>Type</th>
    <th>Produit</th>
    <th>Prix</th>
    <th>Action</th>
    </tr>
    `
        for (let i = 0; i < list.length; i++) {;
            tableau += `
            <tr>
            <td> ${list[i].type} </td>
            <td> ${list[i].Nom} </td>
            <td> ${list[i].Prx}</td>
            <td> <button onclick="del(${i})">Delete</button> 
              <button onclick="Edit(${i})">Edit</button>
         </td>
            </tr>
            `
        }
    }
    document.getElementById("TableauMenu").innerHTML = tableau;
}

function del(x) {
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    list.splice(x, 1);
    localStorage.setItem("MenuResteraunt", JSON.stringify(list));
    AfficherMenu();
}

function Edit(x) {
    document.getElementById("modifier").style.display = "block";
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    let form = "";
    form = `
    <select class="form-control" id="selectMenuedit">
    <option value="selectionner">selectionner votre Menu</option>
    <option value="Plats">Plats</option>
    <option value="SANDWITCHS">SANDWITCHS</option>
    <option value="BURGERS">BURGERS</option>
    <option value="Makloub">Makloub</option>
    <option value="libanais">Libanais</option>
    <option value="Pizzas">Pizzas</option>
    <option value="Salade">Salade</option>
    <option value="Boisson">Boisson</option>
</select><br><br>
<input class="Test" type="text" id="editnom" value=" ${list[x].Nom}"}></br><br>
      <input class="Test" type="text" id="editPrx" value="${list[x].Prx}"}></br><br>
      <button onclick="Apply(${x})">Apply</button> 
      <button onclick="Cancel()">Cancel</button>`
    document.getElementById("modifier").innerHTML = form;
}

function Apply(x) {
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    list[x].type = document.getElementById("selectMenuedit").value;
    list[x].Nom = document.getElementById("editnom").value;
    list[x].Prx = document.getElementById("editPrx").value;
    localStorage.setItem("MenuResteraunt", JSON.stringify(list));
    AfficherMenu();
}

function Cancel() {
    document.getElementById("modifier").style.display = "none";
}