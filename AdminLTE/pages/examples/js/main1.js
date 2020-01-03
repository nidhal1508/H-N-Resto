function ctrlnom() {
    let nom = document.getElementById("nom-user").value;
    console.log(nom)
    if (nom === "") {
        alert("entrer un nom");
        return (false);

    }
    return (true);
}

function ctrlprenom() {
    let prenom = document.getElementById("prenom-user").value;
    console.log(prenom)
    if (prenom === "") {
        alert("entrer votre prenom");
        return (false);

    }
    return (true);
}

function ctrladresse() {
    let adresse = document.getElementById("adresse-user").value;
    console.log(adresse)
    if (adresse === "") {
        alert("entrer l'adresse");
        return (false);

    }
    return (true);
}

function ctrltel() {
    let tel = document.getElementById("tel-user").value;
    console.log(tel)
    if (tel === "") {
        alert("entrer un numero de tel");
        return (false);

    }
    return (true);
}

function ctrlemail() {
    var mail = document.getElementById("email-user").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(String(mail).toLowerCase());
}

function passverif() {
    var pass1 = document.getElementById("pwd-user").value;
    var pass2 = document.getElementById("cpwd-user").value;
    if (pass1 != pass2) {
        alert("mot de passe invalid");
        return (false);
    }
    return true
}

function registerUser() {
    if (ctrlprenom() && passverif() && ctrltel() && ctrladresse() && ctrlnom() && ctrlemail()) {

        AddUser();

    }
}


function AddUser() {

    var userdb = JSON.parse(localStorage.getItem('users'));
    var logged = JSON.parse(localStorage.getItem('connecteduser'))

    let objet = {
        nom: document.getElementById("nom-user").value,
        prenom: document.getElementById("prenom-user").value,
        email: document.getElementById("email-user").value,
        adresse: document.getElementById("adresse-user").value,
        tel: document.getElementById("tel-user").value,
        pwd: document.getElementById("pwd-user").value,
        iduser: Math.floor(Math.random() * 10000) + 1,
        role: "user",
    }
    if (userdb === null) {
        userdb = [];
    }
    console.log(objet);
    userdb.push(objet);
    console.log(userdb);
    localStorage.setItem("users", JSON.stringify(userdb));
    localStorage.setItem('connecteduser', JSON.stringify(objet));

    location.href = 'home.html';
    // console.log('tsd');
}

function connexAdmin() {
    var email = document.getElementById("adminemail").value;
    var passcnx = document.getElementById("adminpws").value;
    var logged = JSON.parse(localStorage.getItem('connectedadmin'))

    var userdb = JSON.parse(localStorage.getItem('users'));
    if (userdb === null) {
        userdb = [];
        alert("Data base null");
    }
    let test = false;
    for (let i = 0; i < userdb.length; i++) {
        if (userdb[i].email == email && userdb[i].pwd == passcnx && userdb[i].role === "admin") {
            localStorage.setItem('connectedadmin', JSON.stringify(userdb[i]));
            location.href = '../../index2.html';

            return;
        }

    }

    if (!test) {
        alert("mot dde passe incorrect.");

    }

}

function admin_connected_verif() {
    var loggedAdmin = JSON.parse(localStorage.getItem('connectedadmin'))
    var connexsection = document.getElementById("connexsectionadmin");
    if (loggedAdmin === null) {
        location.href = 'login.html';

    } else {

        connexsection.innerHTML += `
    <li><button type="submit"
    class="btn btn-info btn-flat" onclick="deconnexAdmin()"> se déconnecter</button></li>
    <br>
                                    
                                    
  `
    }
}

function deconnexAdmin() {

    localStorage.removeItem('connectedadmin');
    location.href = 'login.html';
}

function user_connected_verif() {
    var logged = JSON.parse(localStorage.getItem('connectedUser'))
    var tab = document.getElementById("connexsection");
    if (logged === null) {

        tab.innerHTML = `
    <li style="margin-right: 10px;" id="connexsection">
        <div class="form-group">
            Email address
            <input type="email" class="form-control" id="UserEmail"
                placeholder="Email"> </div>
    </li>

    <li style="margin-right: 10px;" id="connexsection"> 
        <div class="form-group"> Password
            <input type="password" class="form-control" id="UserPassword"
                placeholder="Password">
                <a href="shop_account.html" style="color: white;">S'inscrire</a>
            </div>
    </li>

    <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><input Value="Se connecter"
            class="btn btn-default" onclick="connexUser()"></li>

            

</ul>
`
    } else {

        tab.innerHTML = `
    <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><button type="submit"
                                    class="btn btn-default" onclick="deconnexUser()"> se déconnecter</button></li>
                                    
                                    <li class="dropdown" id="cartdisplay" >
                <a class="css-pointer dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-shopping-cart fsc pull-left"></i><span class="cart-number">3</span><span class="caret"></span></a>
                <div class="cart-content dropdown-menu">
                <div class="cart-title">
                <h4>Shopping Cart</h4>
                </div>
                <div class="cart-items">
                <div class="cart-item clearfix">
                <div class="cart-item-image">
                <a href="shop_single_full.html"><img src="img/cart-img1.jpg" alt="Breakfast with coffee"></a>
                </div>
                <div class="cart-item-desc">
                <a href="shop_single_full.html">Breakfast with coffee</a>
                <span class="cart-item-price">$19.99</span>
                <span class="cart-item-quantity">x 2</span>
                <i class="fa fa-times ci-close"></i>
                </div>
                </div>
                <div class="cart-item clearfix">
                <div class="cart-item-image">
                <a href="shop_single_full.html"><img src="img/cart-img2.jpg" alt="Chicken stew"></a>
                </div>
                <div class="cart-item-desc">
                <a href="shop_single_full.html">Chicken stew</a>
                <span class="cart-item-price">$24.99</span>
                <span class="cart-item-quantity">x 3</span>
                 <i class="fa fa-times ci-close"></i>
                </div>
                </div>
                </div>
                <div class="cart-action clearfix">
                <span class="pull-left checkout-price">$ 114.95</span>
                <a class="btn btn-default pull-right" href="shop_cart.html">View Cart</a>
                </div>
                </div>
                </li>
  `
    }
}

function user_connected_verifPannier() {
    var logged = JSON.parse(localStorage.getItem('connectedUser'))

    if (logged === null) {
        location.href = 'home.html';
    }
}

function connexUser() {
    var email = document.getElementById("UserEmail").value;
    var passcnx = document.getElementById("UserPassword").value;
    var logged = JSON.parse(localStorage.getItem('connectedUser'))

    var userdb = JSON.parse(localStorage.getItem('users'));
    if (userdb === null) {
        userdb = [];
        alert("Data base null");
    }
    let test = false;
    for (let i = 0; i < userdb.length; i++) {
        if (userdb[i].email == email && userdb[i].pwd == passcnx && userdb[i].role === "user") {
            localStorage.setItem('connectedUser', JSON.stringify(userdb[i]));
            location.href = 'home.html';

            return;
        }

    }

    if (!test) {
        alert("mot dde passe incorrect.");

    }

}

function deconnexUser() {
    localStorage.removeItem('connectedUser');
    location.href = 'inscription.html';
}


function Add() {
    let idC = Math.floor(Math.random() * 1000) + 1;
    let cat = document.getElementById("categorie").value;

    var list = JSON.parse(localStorage.getItem('Catego'))
    if (list == null) {
        list = []
    }
    let tabCat = { idC, cat };
    list.push(tabCat);
    let obj = JSON.stringify(list);
    localStorage.setItem("Catego", obj);
}

function modifierC() {
    let tab;
    tab = "";
    let liste = JSON.parse(localStorage.getItem('Catego'));
    if (liste === null) {
        tab +=
            `<tr>
    <th>Categories</th>
    <th>Actions</th>
  </tr>`
    } else {
        tab +=
            `<tr>
      <th>Categories</th>
      <th>Actions</th>
    </tr>`
        for (let i = 0; i < liste.length; i++) {
            tab +=
                ` <tr>
         <td> ${liste[i].cat} </td>
         <td> <button onclick="delet(${i})">Delete</button> 
              <button onclick="Edit(${i})">Edit</button>
         </td>
       </tr>`
        }

        document.getElementById("tabCat").innerHTML = tab;
    }

}

function delet(x) {
    let liste = JSON.parse(localStorage.getItem('Catego'));
    liste.splice(x, 1);
    localStorage.setItem("Catego", JSON.stringify(liste));
    modifierC();
}

function Edit(x) {
    document.getElementById("editCat").style.display = "block";
    let liste = JSON.parse(localStorage.getItem('Catego'));
    let form = "";
    form = `
      <label>Nouvelle Categorie:</label>
      <input class="Test" type="text" id="editcate" value="${liste[x].cat}"}></br><br>
      <button onclick="Apply(${x})">Apply</button> 
      <button onclick="Cancel()">Cancel</button>`
    document.getElementById("editCat").innerHTML = form;
}

function Cancel() {
    document.getElementById("editCat").style.display = "none";


}

function Apply(i) {
    let liste = JSON.parse(localStorage.getItem('Catego'));
    liste[i].cat = document.getElementById("editcate").value;
    localStorage.setItem("Catego", JSON.stringify(liste));

    modifierC();

}

function AfficherCatInscri() {
    let liste = JSON.parse(localStorage.getItem('Catego'));
    let cat1 = document.getElementById("selectcategory");
    for (i = 0; i < liste.length; i++)
        cat1.innerHTML += `
<option value="${liste[i].cat}">${liste[i].cat}</option>
`
}

function ctrlnomadminResto() {
    let nom = document.getElementById("nomAdminResto").value;
    console.log(nom)
    if (nom === "") {
        alert("entrer un nom");
        return (false);

    }
    return (true);
}

function ctrlemailrest() {
    var mail = document.getElementById("emailResto").value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(String(mail).toLowerCase());
}

function ctrlprenomResto() {
    let prenom = document.getElementById("prenomAdminResto").value;
    console.log(prenom)
    if (prenom === "") {
        alert("entrer un nom");
        return (false);

    }
    return (true);
}

function ctrlnomResto() {
    let nomresto = document.getElementById("Nomresto").value;
    console.log(nomresto)
    if (nomresto === "") {
        alert("entrer un nom");
        return (false);

    }
    return (true);
}

function registerResto() {
    if (ctrlnomadminResto() && ctrlemailrest() && ctrlprenomResto() && ctrlnomResto()) {

        AddResto();

    }
}

function AddResto() {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    //var loggedresto = JSON.parse(localStorage.getItem('connectedresto'))

    let objet = {
        idresto: Math.floor(Math.random() * 10000) + 1,
        nomresto: document.getElementById("Nomresto").value,
        nomR: document.getElementById("nomAdminResto").value,
        prenomR: document.getElementById("prenomAdminResto").value,
        emailR: document.getElementById("emailResto").value,
        adresseR: document.getElementById("addresseresto").value,
        telR: document.getElementById("Telresto").value,
        villeR: document.getElementById("villeresto").value,
        registreN: document.getElementById("C-registreresto").value,
        Nfiscale: document.getElementById("idfiscale").value,
        logo: document.getElementById("logoresto").files[0].name,
        slogan: document.getElementById("sloganresto").value,
        categoryR: document.getElementById("selectcategory").value,
        pwdR: document.getElementById("pwdresto").value,
        role: "Resto",
        status: "inactive",
        resN: "0",
        cmdN: "0",

    }
    if (restodb === null) {
        restodb = [];
    }
    console.log(objet);
    restodb.push(objet);
    console.log(restodb);
    localStorage.setItem("restos", JSON.stringify(restodb));
    //localStorage.setItem('connectedresto',JSON.stringify(objet));

    alert('vous etes bien enregitrer')
}

function AfficherListeResto() {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    let listeResto = document.getElementById("listerestoadmin");
    listeResto.innerHTML = '';
    if (restodb === null) {
        listeResto.innerHTML = `
    <tr>
    <th>aucune Resto est ajouter</th>
   

  </tr> 
  `
    } else {

        for (let i = 0; i < restodb.length; i++) {
            listeResto += `
        <tr>
          <td >${restodb[i].idresto}</td>
          <td >${restodb[i].nomresto}</td>
          <td >${restodb[i].emailR}</td>
          <td >${restodb[i].pwdR}</td>
          <td >${restodb[i].resN}</td>
          <td >${restodb[i].cmdN}</td>
          <td >${restodb[i].status}</td>
         
          <td >
          <button class="btn btn-info btn-flat" onclick="ActiveRestoA(${restodb[i].idresto})">Activer</button>
          <button class="btn btn-info btn-flat" onclick="EditerRestoA(${restodb[i].idresto})">Editer</button>
          </td>

        </tr>
        `

        }
        document.getElementById("listerestoadmin").innerHTML = listeResto;

    }
}

function ActiveRestoA(indice) {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    console.log(restodb);


    for (i = 0; i < restodb.length; i++) {

        if (restodb[i].idresto == indice) {

            restodb[i].status = "active"
        }
    }
    localStorage.setItem("restos", JSON.stringify(restodb));
    AfficherListeResto();
}

function connexResto() {
    var email = document.getElementById("EmailConnexResto").value;
    var passcnx = document.getElementById("PwdConnexResto").value;
    var loggedResto = JSON.parse(localStorage.getItem('connectedResto'))

    var restodb = JSON.parse(localStorage.getItem('restos'));
    if (restodb === null) {
        restodb = [];
        alert("Data base null");
    }
    let test = false;
    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].emailR == email && restodb[i].pwdR == passcnx && restodb[i].status === "inactive") {
            alert("restaurant deactivé contacter Admin")
            return;
        }
        if (restodb[i].emailR == email && restodb[i].pwdR == passcnx && restodb[i].status === "active") {
            localStorage.setItem('connectedResto', JSON.stringify(restodb[i]));
            location.href = 'home.html';

            return;
        }

    }

    if (!test) {
        alert("mot dde passe incorrect.");

    }

}

function RestoConnectedVerif() {
    var logged = JSON.parse(localStorage.getItem('connectedResto'))
    var BotDeconnecter = document.getElementById("connexResto");
    if (logged === null) {

        location.href = 'shop_account.html';

        return;
    } else {
        BotDeconnecter = `
  <button type="submit" class="btn btn-default" onclick="deconnexResto()">déconnecter</button>`
    }
    document.getElementById("connexResto").innerHTML = BotDeconnecter;
}

function deconnexResto() {
    localStorage.removeItem('connectedResto');
    location.href = 'shop_account.html';
}



function addpublication() {
    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    var restologged = JSON.parse(localStorage.getItem('connectedResto'))
    let objet = {
        idPub: Math.floor(Math.random() * 10000) + 1,
        nomPub: document.getElementById("pubname").value,
        prix: document.getElementById("pubprice").value,
        date: document.getElementById("pubdate").value,
        deadline: document.getElementById("pubdeadline").value,
        description: document.getElementById("pubdescription").value,
        img: document.getElementById("pubimg").files[0].name,
        pubowner: restologged.idresto,
    }
    if (pubdb === null) {
        pubdb = [];
    }
    console.log(objet);
    pubdb.push(objet);
    console.log(pubdb);
    localStorage.setItem("pubs", JSON.stringify(pubdb));


    var tab = document.getElementById("tableauPub");
    tab.innerHTML = '';
    if (pubdb === null) {
        tab.innerHTML = `
    <tr>
    <th>aucune Pub est ajouter</th>
   

  </tr> 
  `
    } else {
        tab = `
    <tr>
    <th>Publication Name</th>
    <th>Date</th>
    <th>Deadline</th>
    <th>Prix</th>

</tr>
      `
        for (let i = 0; i < pubdb.length; i++) {
            if (restologged.idresto === pubdb[i].pubowner) {
                tab += `
        <tr>
          <td >${pubdb[i].nomPub}</td>
          <td >${pubdb[i].date}</td>
          <td >${pubdb[i].deadline}</td>
          <td >${pubdb[i].prix}</td>

        </tr>
       `
            }
        }
        document.getElementById("tableauPub").innerHTML = tab;
    }
    document.getElementById("pubname").value = "";
    document.getElementById("pubprice").value = "";
    document.getElementById("pubdate").value = "";
    document.getElementById("pubdeadline").value = "";
    document.getElementById("pubdescription").value = "";
    document.getElementById("pubimg").value = "";

}

function AfficherPublication() {
    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    var restologged = JSON.parse(localStorage.getItem('connectedResto'))
    var tab = document.getElementById("ConsulterPub");
    tab.innerHTML = '';
    if (pubdb === null) {
        tab.innerHTML = `
    <tr>
    <th>aucune Pub est ajouter</th>
   

  </tr> 
  `
    } else {
        tab = `
    <tr>
    <th>Publication Name</th>
    <th>Date</th>
    <th>Deadline</th>
    <th>Description</th>
    <th>Prix</th>
    <th>Action</th>

</tr>
      `
        for (let i = 0; i < pubdb.length; i++) {
            if (restologged.idresto === pubdb[i].pubowner) {
                tab += `
        <tr>
          <td >${pubdb[i].nomPub}</td>
          <td >${pubdb[i].date}</td>
          <td >${pubdb[i].deadline}</td>
          <td >${pubdb[i].description}</td>
          <td >${pubdb[i].prix}</td>
          <td> <button class="btn btn-default"   onclick="EditerPub(${pubdb[i].idPub})">Editer</button>
          <button class="btn btn-danger"  style="  margin-right: 15px; " onclick="DeletePub(${pubdb[i].idPub})">Delete</button></td>
          


        </tr>
       `
            }
        }
        document.getElementById("ConsulterPub").innerHTML = tab;
    }

}

function DeletePub(indicePub) {

    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    console.log(pubdb);


    for (i = 0; i < pubdb.length; i++) {

        if (pubdb[i].idPub == indicePub) {

            pubdb.splice(i, 1);
        }
    }
    localStorage.setItem("pubs", JSON.stringify(pubdb));
    AfficherPublication();
}

function EditerPub(indicePub) {

    console.log(indicePub);
    var tab = document.getElementById("editpub");
    var pubdb = JSON.parse(localStorage.getItem('pubs'));

    tab = `
  <div class="form-group">
  <div class="col-md-4" style="margin-bottom: 20px;">
<label for="exampleInputPassword1">Name Publication </label>
<input type="text" class="form-control" maxlength="50" id="pubnameEditer">
</div>
<div class="col-md-4">
<label for="exampleInputPassword1">Date</label>
<input type="date" class="form-control" id="pubdateEditer">


  </div>
<div class="col-md-4">
<label for="exampleInputPassword1">Deadline</label>
<input type="date" class="form-control" id="pubdeadlineEditer">
</div>
<br>
<button id="applyPub" class="btn btn-default" style="margin-bottom: 20px;" onclick="applyPub(${indicePub})"> Apply </button>

<button id="cancelPub" class="btn btn-default" style="margin-bottom: 20px;" onclick="cancelPub()"> Cancel </button>
  
  </div>
  `
    document.getElementById("editpub").innerHTML = tab;
    document.getElementById("editpub").style.display = "block";
    document.getElementById("ConsulterPub").style.display = "none";
    for (i = 0; i < pubdb.length; i++) {

        if (pubdb[i].idPub == indicePub) {
            let NameAediter = pubdb[i].nomPub;
            console.log(NameAediter);
            let DateAediter = pubdb[i].date;
            console.log(DateAediter);
            let DeadAediter = pubdb[i].deadline;
            document.getElementById("pubnameEditer").value = NameAediter;
            document.getElementById("pubdateEditer").value = DateAediter;
            document.getElementById("pubdeadlineEditer").value = DeadAediter;
        }
    }
}

function cancelPub() {
    document.getElementById("editpub").style.display = "none";
    document.getElementById("ConsulterPub").style.display = "table";
    AfficherPublication();
}

function EditerRestoA(idrestaurant) {
    let objet = {
        restoEditID: idrestaurant,
    }
    localStorage.setItem('Restoeditid', JSON.stringify(objet));
    console.log(objet);
    location.href = 'gestion-cpt1.html'
}

function EditerRestoAdmin() {

    var restodb = JSON.parse(localStorage.getItem('restos'));
    let idrestaurant = JSON.parse(localStorage.getItem('Restoeditid'));
    let idrestaurant1 = idrestaurant.restoEditID;
    var RestoEditAdmin = document.getElementById("editerRestoAdmin");
    RestoEditAdmin.innerHTML = '';
    if (restodb === null) {
        RestoEditAdmin.innerHTML =
            `<p>aucune Resto est ajouter</p>
    `
    } else {
        RestoEditAdmin.innerHTML =
            `
    <div class="box-body">
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="EmailResto" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="PasswordResto" placeholder="Password">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Tel</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="TelResto" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Nom Restaurant</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="NomResto" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Adresse</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="AdresseResto" placeholder="Email">
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Slogan</label>

                <div class="col-sm-10">
                  <input type="text" class="form-control" id="SloganResto" placeholder="Email">
                </div>
              </div>
             

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <input  class="btn btn-info pull-right" style="margin-right: 10px;" onclick="BloquerRestoA(${idrestaurant1})" value="Bloquer">
              <input  class="btn btn-info pull-right" style="margin-right: 10px;" onclick="DeleteRestoA(${idrestaurant1})" value="Delete">
              <input  class="btn btn-info pull-right" style="margin-right: 10px;" onclick="EditRestoA(${idrestaurant1})" value="Edit">
            </div>
           
         
    `
    }
    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].idresto === idrestaurant1) {

            document.getElementById("EmailResto").value = restodb[i].emailR;
            document.getElementById("PasswordResto").value = restodb[i].pwdR;
            document.getElementById("TelResto").value = restodb[i].telR;
            document.getElementById("NomResto").value = restodb[i].nomresto;
            document.getElementById("AdresseResto").value = restodb[i].adresseR;
            document.getElementById("SloganResto").value = restodb[i].slogan;

        }
    }
}

function BloquerRestoA(indiceresto) {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    console.log(indiceresto);
    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].idresto === indiceresto) {
            restodb[i].status = "inactive";
            localStorage.setItem("restos", JSON.stringify(restodb));
            location.href = 'gestion-cpt.html'


        }
    }
}

function DeleteRestoA(indiceresto) {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    console.log(indiceresto);
    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].idresto === indiceresto) {
            restodb.splice(i, 1);
            localStorage.setItem("restos", JSON.stringify(restodb));
            location.href = 'gestion-cpt.html'
        }
    }
}

function EditRestoA(indiceresto) {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    console.log(indiceresto);
    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].idresto === indiceresto) {
            console.log(i);
            restodb[i].emailR = document.getElementById("EmailResto").value;
            restodb[i].pwdR = document.getElementById("PasswordResto").value;
            restodb[i].telR = document.getElementById("TelResto").value;
            restodb[i].nomresto = document.getElementById("NomResto").value;
            restodb[i].adresseR = document.getElementById("AdresseResto").value;
            console.log(restodb[i].adresseR);
            restodb[i].slogan = document.getElementById("SloganResto").value;
            localStorage.setItem("restos", JSON.stringify(restodb));
            location.href = 'gestion-cpt1.html'
        }
    }
}

function applyPub(indicePub) {
    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    let datenow = new Date();
    let secondnow = parseInt(datenow.valueOf(), 10);

    for (i = 0; i < pubdb.length; i++) {
        if (pubdb[i].idPub == indicePub) {
            let stringdate = document.getElementById("pubdeadlineEditer").value;
            var day1 = new Date(stringdate);
            seconddead = parseInt(day1.valueOf(), 10);
            if (secondnow < seconddead) {
                pubdb[i].nomPub = document.getElementById("pubnameEditer").value;
                pubdb[i].date = document.getElementById("pubdateEditer").value;
                pubdb[i].deadline = document.getElementById("pubdeadlineEditer").value;
                localStorage.setItem("pubs", JSON.stringify(pubdb));
                document.getElementById("editpub").style.display = "none";
                document.getElementById("ConsulterPub").style.display = "table";
                AfficherPublication();
            } else {
                alert("deadline invalid");
            }
        }
    }
}

function DisplayPubAdmin() {
    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    var restodb = JSON.parse(localStorage.getItem('restos'));
    let listePubli = document.getElementById("listepubAdmin");
    listePubli.innerHTML = '';
    if (pubdb === null) {
        listePubli.innerHTML = `
    <tr>
    <td>aucune Pub est ajouter</td>
   

  </tr> 
  `
    } else {

        for (let i = 0; i < pubdb.length; i++) {
            for (let j = 0; j < restodb.length; j++) {
                if (restodb[j].idresto === pubdb[i].pubowner) {
                    listePubli += `
          <tr>
          <td >${pubdb[i].idPub}</td>
          <td >${pubdb[i].nomPub}</td>
          <td >${restodb[j].nomresto}</td>
          <td >${pubdb[i].description}</td>
          <td >${pubdb[i].deadline}</td>
          <td >${pubdb[i].prix}</td>
          
         
          <td >
          <button class="btn btn-info btn-flat" onclick="DeletePubliAdmin(${pubdb[i].idPub})">Delete</button>
          
          </td>

         </tr>
         `
                }
            }
        }
        document.getElementById("listepubAdmin").innerHTML = listePubli;

    }
}

function DeletePubliAdmin(indicepublication) {
    var pubdb = JSON.parse(localStorage.getItem('pubs'));
    for (let i = 0; i < pubdb.length; i++) {
        if (pubdb[i].idPub === indicepublication) {
            pubdb.splice(i, 1);
            localStorage.setItem("pubs", JSON.stringify(pubdb));
            DisplayPubAdmin();
        }

    }
}

function AfficherListeRestoHomeClient() {
    var restodb = JSON.parse(localStorage.getItem('restos'));
    let listeResto = document.getElementById("listerestoadmin");
    let ville = document.getElementById("villeUser").value;
    let CategU = document.getElementById("selectcategory").value;
    listeResto = '';
    if (ville == "0" && CategU == "0") {
        if (restodb === null) {
            listeResto = `
      <h1>Aucun resto Activé</h1>
      `
        } else {

            for (let i = 0; i < restodb.length; i++) {
                listeResto += `
                <div class="col-md-3">
                <img src="img/${restodb[i].logo}" alt="" />
                <div class="rc-info">
                    <h4>${restodb[i].nomresto}</h4>
                    <div class="rc-ratings">
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                    </div>
                    <p>${restodb[i].slogan}</p>
                    <a href="recipe_detail-image.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto}")>View Details</a>
                </div>
                </div>
            `

            }
            document.getElementById("AfiicheListeResto").innerHTML = listeResto;

        }
    } else {
        if (restodb === null) {
            listeResto = `
      <h1>Aucun resto Activé</h1>
      `
        } else {

            for (let i = 0; i < restodb.length; i++) {
                if (ville == restodb[i].villeR && CategU == "0") {
                    listeResto += `
                  <div class="col-md-3">
                  <img src="img/${restodb[i].logo}" alt="" />
                  <div class="rc-info">
                    <h4>${restodb[i].nomresto}</h4>
                    <div class="rc-ratings">
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                        <span class="fa fa-star active"></span>
                    </div>
                    <p>${restodb[i].slogan}</p>
                    <a href="recipe_detail-image.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto}")>View Details</a>
                  </div>
                  </div>
                  `
                } else {
                    if (ville == "0" && CategU == restodb[i].categoryR) {
                        listeResto += `
                        <div class="col-md-3">
                        <img src="img/${restodb[i].logo}" alt="" />
                        <div class="rc-info">
                          <h4>${restodb[i].nomresto}</h4>
                          <div class="rc-ratings">
                              <span class="fa fa-star"></span>
                              <span class="fa fa-star active"></span>
                              <span class="fa fa-star active"></span>
                              <span class="fa fa-star active"></span>
                              <span class="fa fa-star active"></span>
                          </div>
                          <p>${restodb[i].slogan}</p>
                          <a href="recipe_detail-image.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto}")>View Details</a>
                        </div>
                        </div>
                        `
                    } else {
                        if (ville == restodb[i].villeR && CategU == restodb[i].categoryR) {
                            listeResto += `
                            <div class="col-md-3">
                            <img src="img/${restodb[i].logo}" alt="" />
                            <div class="rc-info">
                              <h4>${restodb[i].nomresto}</h4>
                              <div class="rc-ratings">
                                  <span class="fa fa-star"></span>
                                  <span class="fa fa-star active"></span>
                                  <span class="fa fa-star active"></span>
                                  <span class="fa fa-star active"></span>
                                  <span class="fa fa-star active"></span>
                              </div>
                              <p>${restodb[i].slogan}</p>
                              <a href="recipe_detail-image.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto}")>View Details</a>
                            </div>
                            </div>
                            `
                        }
                    }
                }
            }
            document.getElementById("AfiicheListeResto").innerHTML = listeResto;

        }

    }
}
function ViewResto(indiceRestaurant) {
    let objet = {
        restoID: indiceRestaurant,
    }
    localStorage.setItem('restoIdUser', JSON.stringify(objet));
    console.log(objet);
    location.href = 'resto.html';
}
function ViewRestoUser() {
    var restoid = JSON.parse(localStorage.getItem('restoIdUser'));
    var restodb = JSON.parse(localStorage.getItem('restos'));
    var restodetaildb = JSON.parse(localStorage.getItem('detailresto'));
    var Publicationdb = JSON.parse(localStorage.getItem('pubs'));
    var Menudb = JSON.parse(localStorage.getItem('MenuResteraunt'));
    let Name = document.getElementById("restaurantname");
    let image = document.getElementById("imageRestaurant");
    let desp = document.getElementById("descriptionRestaurant");
    let PubcationDiv = document.getElementById("publication");
    let PubItem = document.getElementById("publicationItem");
    let ResPhone = document.getElementById("reservationNumber");
    let ResBtn = document.getElementById("ReservationBtn");
    let MenuResto = document.getElementById("Menu");
    let indice = restoid.restoID;
    let cpt1 = 0;
    for (let i = 0; i < restodetaildb.length; i++) {
        if (restodetaildb[i].idResto === indice) {
            cpt1 = cpt1 + 1;
            desp.innerHTML = `
    <p>
    ${restodetaildb[i].description}
  </p>
  <br>
    `
        }
    }
    console.log(cpt1);
    if (cpt1 === 0) {
       
        alert('Restaurant inactive');
        Location.href = 'home.html';
        return;
    }

    for (let i = 0; i < restodb.length; i++) {
        if (restodb[i].idresto === indice) {
            Name.innerHTML = `
        <h1>${restodb[i].nomresto}<small>${restodb[i].slogan}.</small></h1>
        `
            image.innerHTML = `
        <img src="../img/${restodb[i].logo}" data-mfp-src="img/fullImages/pic1.jpg" class="img-responsive" alt="logo">
        `
            ResBtn.innerHTML = `
        <button type="submit" onclick="MakeRES(${restodb[i].idresto})" class="btn btn-default btn-lg" id="js-reservation-btn">Make Reservation</button>
                                        <div id="js-reservation-result" data-success-msg="Form submitted successfully." data-error-msg="Oops. Something went wrong."></div>
        `
            ResPhone.innerHTML = `
        <p>You can also call: <strong>${restodb[i].telR}</strong> to make a reservation.</p>
        <span></span>
                           
        `
        }

    }
    let compteur = 0;
   PubItem= ``;
    for (let i = 0; i < Publicationdb.length; i++) {
        if (Publicationdb[i].pubowner === indice) {
          compteur = compteur + 1;
        PubItem += ` 
            <li>
           <div class="slider-img">
                <img src="../img/${Publicationdb[i].img}" alt="" />
            </div>
            <div class="slider-content">
            <div class="page-header">
            <h1> ${Publicationdb[i].nomPub}<small>${Publicationdb[i].nomPub}</small></h1>
            </div>
            <p>${Publicationdb[i].description}</p>
            <input class="btn btn-secondary" onclick="AddcartPub(${Publicationdb[i].idPub})" role="button" value="Add to cart">
           </div>
            </li>
          
            `
          
        }
    }
    document.getElementById("publicationItem").innerHTML = PubItem;

   if (compteur === 0) {
     document.getElementById("publication").style.display = "block";
  }
  MenuResto=``;
  for (let i = 0; i < Menudb.length; i++) {
      if (Menudb[i].MenuOwner===indice) {
        MenuResto +=`
        <div class="${Menudb[i].type} menu-item col-sm-6 col-xs-12   ">
        <div class="clearfix menu-wrapper">
            <a class="css-pointer dropdown-toggle" onclick="ConsulterMenu(${Menudb[i].idM})"  role="button" aria-haspopup="true" aria-expanded="false">
            <h4>${Menudb[i].Nom}</h4>
            </a>
            <span class="price">${Menudb[i].Prx}DT</span>
            <div class="dotted-bg"></div>
         <input class="btn btn-default" style="width: 80px;" onclick="AddcartMenu(${Menudb[i].idM})"  value="Add">
        </div>

    </div>
        ` 
      }
      
  }
  document.getElementById("Menu").innerHTML =  MenuResto;
}

function AjouterDetailResto() {
    var restodetail = JSON.parse(localStorage.getItem('detailresto'));
    var loggedResto = JSON.parse(localStorage.getItem('connectedResto'));
    let imageResto = document.getElementById("imageResto").files[0].name;
    let desResto = document.getElementById("DescripResto").value;
    let objet = {
        idResto: loggedResto.idresto,
        image: imageResto,
        description: desResto,
    }

    console.log(objet);
    if (restodetail === null) {
        restodetail = [];
    }
    console.log(objet);
    restodetail.push(objet);

    localStorage.setItem("detailresto", JSON.stringify(restodetail));
    alert('modification ajouter avec succès')
}
