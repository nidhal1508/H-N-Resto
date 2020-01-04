function AjouterMenu() {
    var loggedResto = JSON.parse(localStorage.getItem('connectedResto'));
    let type = document.getElementById("selectMenu").value;
    let Nom = document.getElementById("Article").value;
    let Prx = document.getElementById("PrixArticle").value;
    let Pic = document.getElementById("imageMenu").value;
    let ing = document.getElementById("Ingridiant").value;
    let desc = document.getElementById("Description").value;
    var idM = Math.floor(Math.random() * 1000) + 1;
    let MenuOwner = loggedResto.idresto;
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
    let listM = { idM, type, Nom, Prx, Pic, ing, desc, MenuOwner };
    list.push(listM);
    console.log(list);
    localStorage.setItem("MenuResteraunt", JSON.stringify(list));
    document.getElementById("selectMenu").value = "";
    document.getElementById("Article").value = "";
    document.getElementById("PrixArticle").value = "";
    document.getElementById("imageMenu").value = "";
    document.getElementById("Ingridiant").value = "";
    document.getElementById("Description").value = "";
}

function AfficherMenu() {
    var list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    var loggedResto = JSON.parse(localStorage.getItem('connectedResto'));
    let index = loggedResto.idresto;
    console.log(index);
    let tableau = "";
    if (list === null) {
        tableau = `
    <p>
    aucune menu
    </p>
    `
    } else {
        tableau = `
    <tr>
    <th>Type</th>
    <th>Produit</th>
    <th>Prix</th>
    <th>Image</th>
    <th>Ingridiant</th>
    <th>Description</th>
    <th>Action</th>
    </tr>
    `
        for (let i = 0; i < list.length; i++) {
            console.log(i);
            if (list[i].MenuOwner === index) {
                tableau += `
            <tr>
            <td> ${list[i].type} </td>
            <td> ${list[i].Nom} </td>
            <td> ${list[i].Prx}</td>
            <td> ${list[i].Pic}</td>
            <td> ${list[i].ing}</td>
            <td> ${list[i].desc}</td>
            <td> <button onclick="del(${list[i].idM})" class="btn btn-default">Delete</button> 
              <button onclick="Edit(${list[i].idM})" class="btn btn-default">Edit</button>
         </td>
            </tr>
            `
            }
        }
    }
    document.getElementById("TableauMenu").innerHTML = tableau;
}

function del(indice) {
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    for (let i = 0; i < list.length; i++) {
        if (list[i].idM === indice) {
            list.splice(i, 1);
            localStorage.setItem("MenuResteraunt", JSON.stringify(list));
            AfficherMenu();
        }
    }
}

function Edit(idMenu) {
    document.getElementById("modifier").style.display = "block";
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    for (let i = 0; i < list.length; i++) {
        if (list[i].idM === idMenu) {
            x = i;
        }
    }
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
<input class="Test" type="text" id="editnom" value=" ${list[x].Nom}" }></br><br>
      <input class="Test" type="text" id="editPrx" value=" ${list[x].Prx}" }></br><br> 
      <div class="form-group">
      <label for="exampleInputFile">Image</label>
      <input type="file" id="editimageMenu">

  </div>
        <input class="Test" type="text" id="editIngrimant" value=" ${list[x].ing}" }></br><br> 
        <label>Description</label><br>
        <textarea name="description" id="editDescription" cols="45" rows="5"></textarea><br><br>

      <button onclick="Apply(${idMenu})" class="btn btn-default">Apply</button> 
      <button onclick="Cancel()" class="btn btn-default">Cancel</button>`
    document.getElementById("modifier").innerHTML = form;
}

function Apply(idmenu) {
    let list = JSON.parse(localStorage.getItem('MenuResteraunt'))
    for (let i = 0; i < list.length; i++) {
        if (list[i].idM === idmenu) {
            list[i].type = document.getElementById("selectMenuedit").value;
            list[i].Nom = document.getElementById("editnom").value;
            list[i].Prx = document.getElementById("editPrx").value;
            list[i].Pic = document.getElementById("editimageMenu").value;
            list[i].ing = document.getElementById("editIngrimant").value;
            list[i].desc = document.getElementById("editDescription").value;
            localStorage.setItem("MenuResteraunt", JSON.stringify(list));
            AfficherMenu();
        }
    }
    document.getElementById("modifier").style.display = "none";
}

function Cancel() {
    document.getElementById("modifier").style.display = "none";
}