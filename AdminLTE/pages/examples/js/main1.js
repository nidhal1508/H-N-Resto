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
                <a href="inscription.html" style="color: white;">S'inscrire</a>
            </div>
    </li>

    <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><input Value="Se connecter"
            class="btn btn-default" onclick="connexUser()"></li>

            

</ul>
`
    } else {

        tab.innerHTML = `
    
                                    <li><a href="reservationdetail.html">Reservation</a></li>
                                    <li><a href="commandedetail.html">Commande</a></li>
                                    <li class="dropdown" id="cartdisplay" >
                <a class="css-pointer dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-shopping-cart fsc pull-left"></i><span class="cart-number" id="NombreItemPannier">0</span><span class="caret"></span></a>
                <div class="cart-content dropdown-menu">
                <div class="cart-title">
                <h4>Shopping Cart</h4>
                </div>
                <div class="cart-items" id="PannierHeader" style="max-height: 300px;
                overflow: auto;">
                

                
                </div>
                <div class="cart-action clearfix" id="PannierHeader1">	               
                
                </div>
                </li>
                <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><button type="submit"
                                    class="btn btn-default" onclick="deconnexUser()"> se déconnecter</button></li>
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
                <img src="../img/${restodb[i].logo}" alt="" />
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
                    <a href="resto.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto})">View Details</a>
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
                  <img src="../img/${restodb[i].logo}" alt="" />
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
                    <a href="resto.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto})">View Details</a>
                  </div>
                  </div>
                  `
                } else {
                    if (ville == "0" && CategU == restodb[i].categoryR) {
                        listeResto += `
                        <div class="col-md-3">
                        <img src="../img/${restodb[i].logo}" alt="" />
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
                          <a href="resto.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto})">View Details</a>
                        </div>
                        </div>
                        `
                    } else {
                        if (ville == restodb[i].villeR && CategU == restodb[i].categoryR) {
                            listeResto += `
                            <div class="col-md-3">
                            <img src="../img/${restodb[i].logo}" alt="" />
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
                              <a href="resto.html" class="btn btn-default" onclick="ViewResto(${restodb[i].idresto})">View Details</a>
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
    PubItem = ``;
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
    MenuResto = ``;
    for (let i = 0; i < Menudb.length; i++) {
        if (Menudb[i].MenuOwner === indice) {
            MenuResto += `
        <div class="${Menudb[i].type} menu-item col-sm-6 col-xs-12   ">
        <div class="clearfix menu-wrapper">
            <a class="css-pointer dropdown-toggle" onclick="ConsulterMenu(${Menudb[i].idM})"  role="button" aria-haspopup="true" aria-expanded="false">
            <h4>${Menudb[i].Nom}</h4>
            </a>
            <span class="price">${Menudb[i].Prx}DT</span>
            <div class="dotted-bg"></div>
         <input class="btn btn-default" style="width: 80px;" onclick="AddcartPubM(${Menudb[i].idM});AffichagePannier()"  value="Add">
        </div>

    </div>
        `
        }

    }
    document.getElementById("Menu").innerHTML = MenuResto;
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

function ConsulterMenu(indiceMenu) {
    var MenuREsto = JSON.parse(localStorage.getItem('MenuResteraunt'));

    for (let i = 0; i < MenuREsto.length; i++) {
        if (MenuREsto[i].idM === indiceMenu) {

            localStorage.setItem('MenuConsulter', JSON.stringify(MenuREsto[i]));
        }
    }
    location.href = 'menu-image.html';
}

function ConsulterMenuUser() {
    var MenuConsult = JSON.parse(localStorage.getItem('MenuConsulter'));
    let idU = JSON.parse(localStorage.getItem('connecteduser'));
    image = document.getElementById("imageplats");
    description = document.getElementById("descripETingidient");
    image = `
    <img class="img-responsive" src="img/${MenuConsult.Pic}" alt="">
    `;
    description = ` <h3>${MenuConsult.Nom}</h3>
    <p>${MenuConsult.ing}</p>

    <h3 class="heading-bottom-line">Descriptions</h3>
    <p>${MenuConsult.desc}</p>
    <input type="text" name="quantite" id="quantité" value="1"><br><br>
    <input class="btn btn-default" onclick="AddcartPub(${MenuConsult.idM});AffichagePannier()" role="button" value="Add to cart">

    `;
    document.getElementById("imageplats").innerHTML = image;
    document.getElementById("descripETingidient").innerHTML = description;
}

function MakeRES(indiceResto) {
    var logged = JSON.parse(localStorage.getItem('connectedUser'))
    var ResDB = JSON.parse(localStorage.getItem('reservations'));
    if (logged === null) {
        alert('il faut connecter pour reserver');

        return
    } else {
        objet = {
            idReser: Math.floor(Math.random() * 10000) + 1,
            DateRes: document.getElementById("datepicker").value,
            NameRes: document.getElementById("name").value,
            TimeRes: document.getElementById("timepicker").value,
            EmailRes: document.getElementById("email").value,
            GuestRes: document.getElementById("guests").value,
            PhoneRes: document.getElementById("phone").value,
            idResto: indiceResto,
            idUser: logged.iduser,
            status: "En atente",
        }
        if (ResDB === null) {
            ResDB = [];
        }
        console.log(objet);
        ResDB.push(objet);

        localStorage.setItem("reservations", JSON.stringify(ResDB));
        alert('reservation envoyé avec succès');
    }
    document.getElementById("datepicker").value = "";
    document.getElementById("name").value = "";
    document.getElementById("timepicker").value = "";
    document.getElementById("email").value = "";
    document.getElementById("guests").value = "";
    document.getElementById("phone").value = "";
}

function DisplayResUser() {
    var logged = JSON.parse(localStorage.getItem('connectedUser'))
    var ResDB = JSON.parse(localStorage.getItem('reservations'));
    var RestoDB = JSON.parse(localStorage.getItem('restos'));
    let Tabres = document.getElementById("tabreseravtion");
    Tabres = ``;
    for (let i = 0; i < ResDB.length; i++) {
        if (ResDB[i].idUser === logged.iduser) {
            for (let j = 0; j < RestoDB.length; j++) {
                if (RestoDB[j].idresto === ResDB[i].idResto) {

                    Tabres += `
                        <tr>
                      <td>${ResDB[i].idReser}</td>
                     <td> ${RestoDB[j].nomresto} </td>
                     <td> ${ResDB[i].DateRes} </td>
                     <td> ${ResDB[i].status}</td>
                        </tr>
                         `
                }
            }
        }
    }
    document.getElementById("tabreseravtion").innerHTML = Tabres;
}
function DisplayMenuFilter(filter) {
    var restoid = JSON.parse(localStorage.getItem('restoIdUser'));
    var Menudb = JSON.parse(localStorage.getItem('MenuResteraunt'));
    let MenuResto = document.getElementById("Menu");
    let restoindice = restoid.restoID;
    MenuResto = ``;
    for (let i = 0; i < Menudb.length; i++) {
        if (filter === "All") {
            if (Menudb[i].MenuOwner === restoindice) {

                MenuResto += `
            <div class="${Menudb[i].type} menu-item col-sm-6 col-xs-12   ">
            <div class="clearfix menu-wrapper">
            <input class="btn btn-default" style="width: 65px;" onclick="AddcartMenu(${Menudb[i].idM})"  value="Add">
                <a class="css-pointer dropdown-toggle" onclick="ConsulterMenu(${Menudb[i].idM})"  role="button" aria-haspopup="true" aria-expanded="false">
                <h4>          
                ${Menudb[i].Nom}</h4>
                </a>
                <span class="price">${Menudb[i].Prx}DT</span>
                <div class="dotted-bg"></div>
             </div>
    
              </div>
            `
            }
        } else if (Menudb[i].MenuOwner === restoindice && Menudb[i].type === filter) {

            MenuResto += `
        <div class="${Menudb[i].type} menu-item col-sm-6 col-xs-12">

        <div class="clearfix menu-wrapper">
        <input class="btn btn-default" style="width: 65px;" onclick="AddcartMenu(${Menudb[i].idM})"  value="Add">
            <a class="css-pointer dropdown-toggle" onclick="ConsulterMenu(${Menudb[i].idM})"  role="button" aria-haspopup="true" aria-expanded="false">
            <h4>        
            ${Menudb[i].Nom}</h4>
            </a>

            <span class="price">${Menudb[i].Prx}DT</span>

            <div class="dotted-bg"></div>
        </div>

    </div>
        `
        }

    }
    document.getElementById("Menu").innerHTML = MenuResto;

}
function DisplayIndexAdmin() {
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var Restodb = JSON.parse(localStorage.getItem('restos'));
    var Userdb = JSON.parse(localStorage.getItem('users'));
    var Reservationdb = JSON.parse(localStorage.getItem('reservations'));
    let NumResto = document.getElementById("NombreREsto");
    let NumUser = document.getElementById("nombreUser");
    let NumRes = document.getElementById("nombreSales");
    let LatestResto = document.getElementById("latestResto");
    let LatestUser = document.getElementById("latestUser");
    let ResTab = document.getElementById("CommandeTable");
    NumResto = ``;
    NumUser = ``;
    NumRes = ``;
    LatestResto = ``;
    LatestUser = ``;
    ResTab = ``;
    NumResto = `<span class="info-box-text">Number Resto</span>
    <span class="info-box-number">${Restodb.length}</span>`
    console.log(NumResto)
    NumUser = `  <span class="info-box-text">New Members</span>
    <span class="info-box-number">${Userdb.length}</span>
    `
    NumRes = `<span class="info-box-text">Sales</span>
    <span class="info-box-number">${MenuPannier.length}</span>
    `;
    document.getElementById("NombreREsto").innerHTML = NumResto;
    document.getElementById("nombreUser").innerHTML = NumUser;
    NumRes = document.getElementById("nombreSales").innerHTML = NumRes;
    for (let i = (Restodb.length - 8); i < Restodb.length; i++) {
        LatestResto += `
        <li onclick="EditerRestoA(${Restodb[i].idresto})">
        <img src="../img/${Restodb[i].logo}" alt="User Image"  type="input">                          
     <a class="users-list-name" >${Restodb[i].nomresto}</a>
  
   </li>
        `

    }
    document.getElementById("latestResto").innerHTML = LatestResto;
    for (let i = (Userdb.length - 8); i < Userdb.length; i++) {
        LatestUser += `
        <li>
                                 
     <a class="users-list-name" href="./pages/examples/gestion-client.html">${Userdb[i].nom} ${Userdb[i].prenom}</a>
  
   </li>
        `

    }
    document.getElementById("latestUser").innerHTML = LatestUser;
    for (let i = (MenuPannier.length - 5); i < MenuPannier.length; i++) {
        for (let j = 0; j < Menu.length; j++) {
            if (MenuPannier[i].idMenu === Menu[j].idM) {

                ResTab += `
             <tr>
             <td><a href="pages/examples/gestion-orders.html">${MenuPannier[i].id}</a></td>
             <td>${Menu[j].Nom}</td>
             <td><span class="label label-success">${MenuPannier[i].status}</span></td>

              </tr>
      
              `
            }
        }
    }

    document.getElementById("CommandeTable").innerHTML = ResTab;
}

function AddcartMenu(IndiceMenu) {
    let AddCartDrop = document.getElementById("CmdDropdown");
    AddCartDrop = `  <div class="form-group">
    <div class="col-md-4" style="margin-bottom: 20px;">
  <label for="exampleInputPassword1">Quantité</label>
  
  <input type="number"  value="1" min="1" max="30" class="form-control"id="QuantitéMenu">
  </div>
  <div class="col-md-6">
  <label for="exampleInputPassword1">Demande Speciale</label>
  <input type="text" class="form-control" maxlength="150" id="DemandeSpeciale">
  
  
    </div>
    <br>
  <br>
  <button id="applyPub" class="btn btn-default" style="margin-bottom: 20px;" onclick="AddCart(${IndiceMenu})"> ADD To Cart </button>
  <button id="applyPub" class="btn btn-default" style="margin-bottom: 20px;" onclick="CancelCart()"> Cancel </button>
  
    
    </div>
    `

    document.getElementById("CmdDropdown").innerHTML = AddCartDrop;
    document.getElementById("CmdDropdown").style.display = "block";
    document.getElementById("Menu").style.display = "none";
    document.getElementById("menutype").style.display = "none"


}
function CancelCart() {
    document.getElementById("CmdDropdown").style.display = "none";
    document.getElementById("Menu").style.display = "block";
    document.getElementById("menutype").style.display = "block"
}
function AddCart(IndiceMenu) {
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var LoggedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    let quantite = document.getElementById("QuantitéMenu").value;
    let DmdeSpecial = document.getElementById("DemandeSpeciale").value;
    if (LoggedUser === null) {
        console.log("0");
        alert('Il faut Connecter');
        return;
    }
    if (MenuPannier != null) {
        for (let i = 0; i < MenuPannier.length; i++) {
            if (IndiceMenu === MenuPannier[i].idMenu && MenuPannier[i].IdUser === LoggedUser.iduser && MenuPannier[i].status === "En Atente") {


                MenuPannier[i].Quantity = parseInt(MenuPannier[i].Quantity) + parseInt(quantite);
                console.log(MenuPannier[i].Quantity);
                localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
                alert('Demande Effectue')
                document.getElementById("CmdDropdown").style.display = "none";
                document.getElementById("Menu").style.display = "block";
                document.getElementById("menutype").style.display = "block"
                return
            }
        }
    }
    let objet = {
        id: Math.floor(Math.random() * 1000) + 1,
        idMenu: IndiceMenu,
        IdUser: LoggedUser.iduser,
        Quantity: quantite,
        DmdeSpecial: DmdeSpecial,
        status: "En Atente",
    }
    if (MenuPannier === null) {
        MenuPannier = [];
    }
    MenuPannier.push(objet);


    localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));

    alert('Demande Effectue')
    document.getElementById("CmdDropdown").style.display = "none";
    document.getElementById("Menu").style.display = "block";
    document.getElementById("menutype").style.display = "block"
}
function DisplayCartRefresh() {

    refresh = setInterval(DisplayCart, 1000);


}
function DisplayCart() {
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var LoggedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    let CartDrop = document.getElementById("PannierHeader");
    let CartDropNum = document.getElementById("NombreItemPannier");
    let CartDropBtn = document.getElementById("PannierHeader1");
    CartDrop = ``;
    CartDropBtn = ``;
    CartDropNum = ``;
    let compteur = 0;
    let Total1 = 0;
    if (LoggedUser === null) {
        console.log("0");

        return;
    }
    for (let i = 0; i < MenuPannier.length; i++) {
        if (MenuPannier[i].IdUser === LoggedUser.iduser && MenuPannier[i].status === "En Atente") {
            compteur = compteur + 1;

            for (let j = 0; j < Menu.length; j++) {
                if (MenuPannier[i].idMenu === Menu[j].idM) {
                    Total1 = Total1 + (parseFloat(Menu[j].Prx) * parseInt(MenuPannier[i].Quantity));
                    let Total = Total1.toFixed(1)
                    CartDrop += `
             <div class="cart-item clearfix">	
                <div class="cart-item-image">	
                <a href="shop_single_full.html"><img src="../img/${Menu[j].imgmenu}" style="width: 50px; height: 50px;" alt="Breakfast with coffee"></a>	
                </div>	
                <div class="cart-item-desc">	
                <a href="shop_single_full.html">${Menu[j].Nom}</a>	
                <span class="cart-item-price">${Menu[j].Prx}</span>	
                <span class="cart-item-quantity">x ${MenuPannier[i].Quantity}</span>	
                <i class="fa fa-times ci-close"  onclick="Delete(${MenuPannier[i].id})"></i>	
                </div>	
                </div>
             `

                    CartDropBtn = `<div class="cart-action clearfix">	               
             <span class="pull-left checkout-price">${Total} TND</span>	
             <a class="btn btn-default pull-right" href="shop_cart.html">View Cart</a>	
             </div>
             `
                }
            }
        }
    }



    CartDropNum = `${compteur}`;
    document.getElementById("NombreItemPannier").innerHTML = CartDropNum;
    document.getElementById("PannierHeader").innerHTML = CartDrop;
    document.getElementById("PannierHeader1").innerHTML = CartDropBtn;
}
function DisplayCartPage() {
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var LoggedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    let CartDropTab = document.getElementById("CartTab");
    let TotalTab = document.getElementById("TabDelivrer");
    CartDropTab = ``;
    TotalTab = ``;
    let Total1 = 0;
    let TotalCmd = 0;

    for (let i = 0; i < MenuPannier.length; i++) {
        if (MenuPannier[i].IdUser === LoggedUser.iduser && MenuPannier[i].status === "En Atente")
            for (let j = 0; j < Menu.length; j++) {
                if (MenuPannier[i].idMenu === Menu[j].idM) {
                    Total1 = (parseFloat(Menu[j].Prx) * parseInt(MenuPannier[i].Quantity));
                    let Total = Total1.toFixed(1);
                    TotalCmd = TotalCmd + (parseFloat(Menu[j].Prx) * parseInt(MenuPannier[i].Quantity));
                    TotalCmd1 = TotalCmd + 5;
                    CartDropTab += `
            <tr>
            <td>
                <a href="#" class="remove" onclick="Delete(${MenuPannier[i].id})"><i class="fa fa-times" ></i></a>
            </td>
            <td>
                <a href="shop_single_full.html"><img src="../img/${Menu[j].imgmenu}" alt="" height="90" width="90"></a>
            </td>
            <td>
                <a href="shop_single_full.html">${Menu[j].Nom}</a>
            </td>
            <td>
                <span class="amount">${Menu[j].Prx}</span>
            </td>
            <td>
                <div class="quantity">${MenuPannier[i].Quantity}</div>
            </td>
            <td>
                <span class="amount">${Total}</span>
            </td>
        </tr>
            `
                }

            }

    }
    console.log(CartDropTab);
    CartDropTab += `
    <tr>
                                        <td colspan="6" class="actions">
                                            <div class="col-md-6">
                                               <p></p>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="cart-btn">
                                                    
                                                    <button class="btn btn-success" type="submit" onclick="ConfirmerCmd()">Confirmer</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
    `
    TotalTab = `
    <tr>
    <th>Total Cart</th>
    <td><span class="amount">${TotalCmd} TND</span></td>
</tr>
<tr>
    <th>Shipping and Handling</th>
    <td>
        5 TND
    </td>
</tr>
<tr>
    <th> Total Commande </th>
    <td><strong><span class="amount">${TotalCmd1} TND</span></strong> </td>
</tr>
    `
    document.getElementById("CartTab").innerHTML = CartDropTab;
    document.getElementById("TabDelivrer").innerHTML = TotalTab;

}

function Delete(IndiceCmd) {
    console.log(IndiceCmd);
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));

    for (i = 0; i < MenuPannier.length; i++) {

        if (MenuPannier[i].id == IndiceCmd) {

            MenuPannier.splice(i, 1);
        }
    }
    localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
    DisplayCartPage();
}

function ConfirmerCmd() {

    let DropTabConf = document.getElementById("ConfirmeCmdDropdown");
    let TabCartPage = document.getElementById("TabConfirmerCart");
    DropTabConf = `  <div class="form-group">
    <div class="col-md-6" style="margin-bottom: 20px;">
  <label for="exampleInputPassword1" >Adresse Livraison</label>
  
  <input type="text" style="width: 300px; height: 50px;" class="form-control" id="AdresseLiv">
  </div>
  <div class="col-md-6">
   
    <br>
  <br>
  <button  class="btn btn-default" style="margin-left: 20px;" onclick="ConfirmerCmdPlus()"> Confimer </button>
  <button  class="btn btn-default" style="margin-left: 20px;" onclick="CancelCmdPlus()"> Cancel </button>
  </div>
    
    </div>
    `
    document.getElementById("ConfirmeCmdDropdown").innerHTML = DropTabConf;
    document.getElementById("TabConfirmerCart").style.display = "none";
    document.getElementById("ConfirmeCmdDropdown").style.display = "block";


}
function CancelCmdPlus() {
    document.getElementById("TabConfirmerCart").style.display = "block";
    document.getElementById("ConfirmeCmdDropdown").style.display = "none";
}
function ConfirmerCmdPlus() {
    var Cmddetail = JSON.parse(localStorage.getItem('AdresseLiv'));
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var LoggedUser = JSON.parse(localStorage.getItem('connectedUser'));

    if (Cmddetail === null) {
        Cmddetail = [];
    }
    for (i = 0; i < MenuPannier.length; i++) {

        if (MenuPannier[i].IdUser == LoggedUser.iduser && MenuPannier[i].status === "En Atente") {

            MenuPannier[i].status = "Envoyé";
            let objet = {
                id: Math.floor(Math.random() * 1000) + 1,
                idCmd: MenuPannier[i].id,
                AdresseLiv: document.getElementById("AdresseLiv").value,
            }
            Cmddetail.push(objet);
            localStorage.setItem("AdresseLiv", JSON.stringify(Cmddetail));
        }
    }
    localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
    alert('Commande Envoyé ')
    location.href = 'commandedetail.html';
}
function DisplayCmdUser() {
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var LoggedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var restodb = JSON.parse(localStorage.getItem('restos'));
    let TabCmd = document.getElementById("tabCommande");
    TabCmd = ``;
    for (let i = 0; i < MenuPannier.length; i++) {
        if (MenuPannier[i].IdUser == LoggedUser.iduser && MenuPannier[i].status != "En Atente") {
            for (let j = 0; j < Menu.length; j++) {
                if (MenuPannier[i].idMenu === Menu[j].idM) {
                    for (let k = 0; k < restodb.length; k++) {
                        if (restodb[k].idresto == Menu[j].MenuOwner) {

                            TabCmd += `
                              <tr>
                             <td>${MenuPannier[i].id}</td>
                               <td> ${restodb[k].nomresto} </td>
                              <td> ${Menu[j].Nom} </td>
                              <td> ${MenuPannier[i].status}</td>
                              </tr>
             
                             `
                        }
                    }
                }

            }


        }

    }
    document.getElementById("tabCommande").innerHTML = TabCmd;
}


function AddcartPub(IDMenu) {
    var MenuConsult = JSON.parse(localStorage.getItem('MenuConsulter'));
    let idU = JSON.parse(localStorage.getItem('connectedUser'));
    console.log(idU.iduser);
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    let quantite = document.getElementById("quantité").value;
    let Nbocurence = 0;
    for (let i = 0; i < MenuPannier.length; i++) {
        if (IDMenu === MenuPannier[i].IDMenu && MenuPannier[i].IdUse === idU.iduser) {
            Nbocurence = Nbocurence + 1;
            MenuPannier[i].quantite = parseInt(MenuPannier[i].quantite) + parseInt(quantite);
            MenuPannier[i].Prix = MenuConsult.Prx * MenuPannier[i].quantite;
            console.log(MenuPannier[i].quantite);
            localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
        }
    }
    let idMP = Math.floor(Math.random() * 1000) + 1;
    let imageArticle = MenuConsult.Pic;
    let nomArticle = MenuConsult.Nom;
    let ingArticle = MenuConsult.ing;
    let PrxArticle = MenuConsult.Prx;
    let Prix = MenuConsult.Prx * quantite;
    let idResto = MenuConsult.MenuOwner;
    let IdUse = idU.iduser;
    let MenuP = { IDMenu, idMP, imageArticle, nomArticle, ingArticle, PrxArticle, Prix, IdUse, quantite, idResto };
    if (MenuPannier === null) {
        MenuPannier = [];
    }
    MenuPannier.push(MenuP);
    console.log(Nbocurence);
    if (Nbocurence === 0) {
        localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
    }
}

function AffichagePannier() {
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    var idU = JSON.parse(localStorage.getItem('connectedUser'));
    var Menurest = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var MenuConsult = JSON.parse(localStorage.getItem('MenuConsulter'));
    let IdUse = idU.iduser;
    let cmpt = 0
    let prixTotal = 0;
    let liste = '';
    let liste2 = '';
    for (let i = 0; i < MenuPannier.length; i++) {
        if (IdUse === MenuPannier[i].IdUse) {
            prixTotal = prixTotal + MenuPannier[i].Prix;
            cmpt = cmpt + 1;
            liste += `
            
                <div class="cart-items">
                                    <div class="cart-item clearfix">
                                    <div class="cart-item-image">
                                    <a href="menu-image.html"><img src="img/${MenuPannier[i].imageArticle}"" alt="${MenuPannier[i].ingArticle}"></a>
                                    </div>
                                    <div class="cart-item-desc">
                                    <a href="menu-image.html">${MenuPannier[i].nomArticle}</a>
                                    <span class="cart-item-price">${MenuPannier[i].PrxArticle}</span>
                                    <span class="cart-item-quantity">x ${MenuPannier[i].quantite}</span>
                                    <i class="fa fa-times ci-close"></i>
                                    </div>
                                    </div>
                                    </div>
                `
        }

    }
    liste2 = `             <div class="cart-action clearfix">
        <span class="pull-left checkout-price">${prixTotal} TND</span>
        <a class="btn btn-default pull-right" href="shop_cart.html" onclick="addshopCart(${MenuPannier.IdUse})">View Cart</a>
        </div>`

    document.getElementById("Pannier").innerHTML = liste;
    document.getElementById("pannier2").innerHTML = liste2;
    document.getElementById("nombreProduits").innerHTML = cmpt;
}

function AddcartPubM(IDMenu) {
    var MenuConsult = JSON.parse(localStorage.getItem('MenuConsulter'));
    let idU = JSON.parse(localStorage.getItem('connectedUser'));
    console.log(idU.iduser);
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    let quantite = 1
    let Nbocurence = 0;
    if (MenuConsult != null) {
        for (let i = 0; i < MenuPannier.length; i++) {
            if (IDMenu === MenuPannier[i].IDMenu && MenuPannier[i].IdUse === idU.iduser) {
                Nbocurence = Nbocurence + 1;
                MenuPannier[i].quantite = parseInt(MenuPannier[i].quantite) + parseInt(quantite);
                MenuPannier[i].Prix = MenuConsult.Prx * MenuPannier[i].quantite;
                console.log(MenuPannier[i].quantite);
                localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
            }
        }
    }

    let idMP = Math.floor(Math.random() * 1000) + 1;
    let imageArticle = MenuConsult.Pic;
    let nomArticle = MenuConsult.Nom;
    let ingArticle = MenuConsult.ing;
    let PrxArticle = MenuConsult.Prx;
    let Prix = MenuConsult.Prx * quantite;
    let idResto = MenuConsult.MenuOwner;
    let IdUse = idU.iduser;
    let MenuP = { IDMenu, idMP, imageArticle, nomArticle, ingArticle, PrxArticle, Prix, IdUse, quantite, idResto };
    if (MenuPannier === null) {
        MenuPannier = [];
    }
    MenuPannier.push(MenuP);
    console.log(Nbocurence);
    if (Nbocurence === 0) {
        localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
    }
}


function addshopCart() {
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    let idU = JSON.parse(localStorage.getItem('connectedUser'));
    let prixTotal = 0;
    let tableShop = "";
    tableShop = `<thead>
        <tr>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
    </thead>`
    for (let i = 0; i < MenuPannier.length; i++) {
        if (idU.iduser === MenuPannier[i].IdUse) {
            prixTotal = prixTotal + MenuPannier[i].Prix;
            tableShop += `
    <tbody>
        <tr>
            <td>
                <a href="#" class="remove" onclick="supprimer(${MenuPannier[i].idMP})"><i class="fa fa-times"></i></a>
            </td>
            <td>
                <a href="shop_single_full.html"><img  src="img/${MenuPannier[i].imageArticle}" alt="" height="90" width="90"></a>
            </td>
            <td>
                <a href="shop_single_full.html">${MenuPannier[i].nomArticle}</a>
            </td>
            <td>
                <span class="amount">${MenuPannier[i].PrxArticle}</span>
            </td>
            <td>
                <div class="quantity">${MenuPannier[i].quantite}</div>
            </td>
            <td>
                <span class="amount">${MenuPannier[i].Prix}</span>
            </td>
        </tr>
        </tbody>`
        }
    }
    tableShop += ` <tr>
    <td colspan="6" class="actions">
        <div class="col-md-6">

        </div>
        <div class="col-md-6">
            <div class="cart-btn">
                <button class="btn btn-success" type="submit" onclick="window.open('shop_checkout.html', '_self')">Checkout</button>
            </div>
        </div>
    </td>
</tr>
    `



    document.getElementById("tableShopcart").innerHTML = tableShop;
    let tableFin = "";
    tableFin = `
    <tbody>
    <tr>
        <th>Cart Subtotal</th>
        <td><span class="amount">${prixTotal}</span></td>
    </tr>
    <tr>
        <th>Shipping and Handling</th>
        <td>
            Free Shipping
        </td>
    </tr>
    <tr>
        <th>Order Total</th>
        <td><strong><span class="amount">${prixTotal}</span></strong> </td>
    </tr>
</tbody>
    `
    document.getElementById("tableFinal").innerHTML = tableFin;

}

function supprimer(idmp) {
    console.log(idmp);
    var MenuPannier = JSON.parse(localStorage.getItem('MenuCPannier'));
    for (let i = 0; i < MenuPannier.length; i++) {
        if (idmp === MenuPannier[i].idMP) {
            MenuPannier.splice(i, 1);
        }

    }

    console.log(MenuPannier)
    localStorage.setItem("MenuCPannier", JSON.stringify(MenuPannier));
    addshopCart();
    AffichagePannier();

}

function AfficheReservationResto() {
    var loggedResteraunt = JSON.parse(localStorage.getItem('connectedResto'));
    var ResDB = JSON.parse(localStorage.getItem('reservations'));
    let tablerAffReservRest = "";
    if (loggedResteraunt === null) {
        alert("connecter vous");
    } else {
        tablerAffReservRest = `<thead>
        <tr>
            <th>Nom</th>
            <th>Numéro</th>
            <th>E-mail</th>
            <th>Nombre personnes</th>
            <th>Date</th>
            <th>Temps</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>`
        if (ResDB != null) {
            for (let i = 0; i < ResDB.length; i++) {
                if (ResDB[i].idResto === loggedResteraunt.idresto) {

                    tablerAffReservRest += `<tbody>
                <tr>
                    <td>
                        ${ResDB[i].NameRes}
                    </td>
                    <td>
                    ${ResDB[i].PhoneRes}
                    </td>
                    <td>
                    ${ResDB[i].EmailRes}
                    </td>
                    <td>
                    ${ResDB[i].GuestRes}
                    </td>
                    <td>
                    ${ResDB[i].DateRes}
                    </td>
                    <td>
                    ${ResDB[i].TimeRes}
                    </td>
                    <td>
                    ${ResDB[i].status}
                    </td>
                    <td>
                        <div class="cart-btn">
                            <div class="col-md-6">
                                <button class="btn btn-success" type="submit" onclick="AcceptReservation(${ResDB[i].idReser})">Accepter</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-success" type="submit" onclick="RefuseReservation(${ResDB[i].idReser})">Refuser</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>`
                    document.getElementById("tableReservationResto").innerHTML = tablerAffReservRest;
                }
            }
        }
    }
}

function AcceptReservation(IDR) {
    var loggedResteraunt = JSON.parse(localStorage.getItem('connectedResto'));
    var ResDB = JSON.parse(localStorage.getItem('reservations'));
    for (let i = 0; i < ResDB.length; i++) {
        console.log(i)
        if (ResDB[i].idReser === IDR) {
            ResDB[i].status = "Accepter";
            console.log(ResDB[i].status)
        }
    }
    localStorage.setItem("reservations", JSON.stringify(ResDB));
    AfficheReservationResto();
}

function RefuseReservation(IDR) {
    var loggedResteraunt = JSON.parse(localStorage.getItem('connectedResto'));
    var ResDB = JSON.parse(localStorage.getItem('reservations'));
    for (let i = 0; i < ResDB.length; i++) {
        console.log(i)
        if (ResDB[i].idReser === IDR) {
            ResDB[i].status = "Refuser";
            console.log(ResDB[i].status)
        }
    }
    localStorage.setItem("reservations", JSON.stringify(ResDB));
    AfficheReservationResto();
}
function AfficheCommandeResto() {
    var loggedResteraunt = JSON.parse(localStorage.getItem('connectedResto'));
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var Commande = JSON.parse(localStorage.getItem('MenuCPannier'));
    var AdresseCmd = JSON.parse(localStorage.getItem('AdresseLiv'));
    var UserDB = JSON.parse(localStorage.getItem('users'));
    let TabCmdResto = document.getElementById("tabCommandeResto");
    TabCmdResto = ``;

    for (let i = 0; i < Commande.length; i++) {
        console.log("00");
        for (let l = 0; l < UserDB.length; l++) {
            console.log("0");
            if (Commande[i].IdUser === UserDB[l].iduser) {
                console.log("1");
                for (let j = 0; j < Menu.length; j++) {
                    if (Commande[i].idMenu === Menu[j].idM && Menu[j].MenuOwner === loggedResteraunt.idresto) {
                        console.log("2");
                        for (let k = 0; k < AdresseCmd.length; k++) {
                            if (AdresseCmd[k].idCmd === Commande[i].id) {
                                TabCmdResto += `
                                  
                    <tr>
                    <td>${Commande[i].id}</td>
                      <td> ${UserDB[l].tel} </td>
                     <td> ${AdresseCmd[k].AdresseLiv} </td>
                     <td> ${Menu[j].Nom}</td>
                     <td> ${Commande[i].Quantity}</td>
                     <td> ${Commande[i].DmdeSpecial}</td>
                     <td id="ConCmdStatus"> ${Commande[i].status}</td>
                     <td id="ConCmdBtn1">  <button class="btn btn-info btn-flat" style="margin-bottom: 5px;" id="ConCmdBtn" onclick="ConfirmerCmdResto(${Commande[i].id})">Confirmer</button>
                     <button class="btn btn-info btn-flat" id="AnnulCmdBtn" style="margin-bottom: 5px;" onclick="AnnulerCmdResto(${Commande[i].id})">Annuler</button>
                     <button class="btn btn-info btn-flat" id="AnnulCmdBtn"  onclick="Delivred(${Commande[i].id})">Delivred</button>
                     </td>
                     </tr>
                    `



                            }

                        }

                    }

                }

            }

        }


    }
    console.log(TabCmdResto);
    document.getElementById("tabCommandeResto").innerHTML = TabCmdResto;

}

function ConfirmerCmdResto(idCmd) {
    var Commande = JSON.parse(localStorage.getItem('MenuCPannier'));


    for (let i = 0; i < Commande.length; i++) {
        if (Commande[i].id === idCmd && Commande[i].status === "Envoyé") {

            Commande[i].status = "Confimé";

        }

    }
    localStorage.setItem("MenuCPannier", JSON.stringify(Commande));
    AfficheCommandeResto();

}
function AnnulerCmdResto(idCmd) {
    var Commande = JSON.parse(localStorage.getItem('MenuCPannier'));

    for (let i = 0; i < Commande.length; i++) {
        if (Commande[i].id === idCmd && Commande[i].status === "Envoyé") {
            Commande[i].status = "Annulé";

        }

    }
    localStorage.setItem("MenuCPannier", JSON.stringify(Commande));
    AfficheCommandeResto();

}
function Delivred(indice) {
    var Commande = JSON.parse(localStorage.getItem('MenuCPannier'));

    for (let i = 0; i < Commande.length; i++) {
        if (Commande[i].id === indice) {
            Commande[i].status = "Delivred";

        }

    }
    localStorage.setItem("MenuCPannier", JSON.stringify(Commande));
    AfficheCommandeResto();

}
function AfficheOrdersAdmin() {
    var Commande = JSON.parse(localStorage.getItem('MenuCPannier'));
    var Menu = JSON.parse(localStorage.getItem('MenuResteraunt'));
    var RestoDB = JSON.parse(localStorage.getItem('restos'));
    let TableauOrders = document.getElementById("TabOrdersAdmin");
    TableauOrders = ``;
    let total = 0;
    console.log("0");
    for (let i = 0; i < Commande.length; i++) {
        if (Commande[i].status === "Confimé" || Commande[i].status === "Delivred") {
            console.log("1");

            for (let j = 0; j < Menu.length; j++) {
                if (Commande[i].idMenu === Menu[j].idM) {
                    console.log("2");
                    total = Commande[i].Quantity * Menu[j].Prx;
                    for (let k = 0; k < RestoDB.length; k++) {
                        if (Menu[j].MenuOwner === RestoDB[k].idresto) {
                            console.log("30");

                            TableauOrders += `<tr>
                   <td onclick="inVoice(${Commande[i].id})">${Commande[i].id}</td>
                                            <td>${RestoDB[k].nomresto}
                                            </td>
                                            <td>${Commande[i].IdUser}</td>
                                            <td>${Menu[j].Nom}</td>

                                            
                                            <td>${Commande[i].Quantity}</td>
                                            <td>${total}</td>
                                            <td>${Commande[i].status}</td>
                                            </tr>
                    
                    `


                        }

                    }

                }

            }
        }
    }
    console.log(TableauOrders);
    document.getElementById("TabOrdersAdmin").innerHTML = TableauOrders;
}