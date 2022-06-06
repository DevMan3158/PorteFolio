const btn = document.getElementById('lumos-btn'); /*Selectionne la classe voulue */
var result = document.getElementById('result'); /* Exercice pile ou face

/*Nom de la fonction (headsOrTails)*/



btn.addEventListener("click", HeadsOrTails);



function HeadsOrTails() {
    let resultat =  Math.floor(Math.random() * 2);         /*Affecte la variable résultat avec Math.floor(Math.random() */ 
   document.getElementById('result').innerHTML = resultat; 
    
    /*Affiche le total de la fonction*/
  

    
   if (resultat == 1 ){
    document.getElementById('result').innerHTML = "Head";
}
  else 
{
    document.getElementById('result').innerHTML ="Tails";
}

console.log (document.getElementById('result').innerHTML);
console.log (resultat);
console.log (result);

}



    function random(number) {
    return Math.floor(Math.random()*(number+1));
  }

//onpointermove btn.onclick borderColor
  /*Nom de la fonction (ColorOrColor)*/
  //Mélange les couleurs et utilise de déplacement du pointeur - Seulement dans l'élément ciblé
    btn.onpointermove  = function ColorOrColor() {
    var Couleur = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255)  + ',' + random(255) +')'; 

   /* document.body.style.backgroundColor= Couleur*/
    document.id=btn.style.backgroundColor = Couleur; /*Résultat récupérer dans btn.style*/ 
    document.id=btn.style.borderColor = Couleur;
    //document.id=btn.style.boxShadow= Couleur;
    document.getElementsByClassName.root.style.borderColor = Couleur;
    //document.id=btn.style.color= Couleur; text 
  }

/* optionnel
   Couleur = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')'; 
   document.getElementById('result').innerHTML = Couleur;*/




/*function showMsg() {
  
}

btn.addEventListener("click", showMsg);*/



/*
Consigne : n'utilisez pas le paramètre « onclick » dans le HTML, utilisez un
« addEventListener » sur « myBtn » qui remplace le contenu de « result » avec le
résultat d'une fonction « headsOrTails() ». Développez cette fonction
« headsOrTails() » à l'extérieur de l'écouteur d'évènement. Ajoutez un
« console.log » sur la fonction « headsOrTails() » dans la fonction qui écoute
l'évènement au clic afin de pouvoir contrôler le résultat dans la console.
Indice pour développer la fonction « headsOrTails() » : ut*/