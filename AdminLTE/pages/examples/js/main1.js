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
  // if ( ctrlprenom() && passverif()  && ctrltel()  && ctrladresse() && ctrlnom() && ctrlemail() ) {

  AddUser();

  // }
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
localStorage.setItem('connecteduser',JSON.stringify(objet));

  location.href = 'recipe_4col.html';
  console.log('tsd');
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
      location.href = 'C:\Users\Asus\Desktop\Nouveau dossier (3)\adminlte.io\themes\AdminLTE \index2.html';

      return;
    }

  }

  if (!test) {
    alert("mot dde passe incorrect.");

  }

}
function AffichePanier() {
  //document.getElementById("addtask").classList.toggle="show";

  document.getElementById("tabdisplay").style.display = "none";
  document.getElementById("addtask").style.display = "block";
}
function user_connected_verif() {
  var logged = JSON.parse(localStorage.getItem('connecteduser'))
  var tab = document.getElementById("connexsection");
  if (logged === null) {

    tab.innerHTML = `
    <li style="margin-right: 10px;" id="connexsection">
        <div class="form-group">
            Email address
            <input type="email" class="form-control" id="exampleInputEmail1"
                placeholder="Email"> </div>
    </li>

    <li style="margin-right: 10px;" id="connexsection"> 
        <div class="form-group"> Password
            <input type="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password">
                <a href="shop_account.html" style="color: white;">S'inscrire</a>
            </div>
    </li>

    <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><button type="submit"
            class="btn btn-default">Submit</button></li>

            

</ul>
`
  } else {
    
    tab.innerHTML = `
    <li style="margin-right: 10px;margin-top: 20px;" id="connexsection"><button type="submit"
                                    class="btn btn-default"> se déconnecter</button></li>
                                    
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