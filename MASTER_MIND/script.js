//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";




//Declaración de variables globales.
const master = new Array(4);
var min = 0;
var max = 7;
let userCombi = [];
var intento = 0;
var aciertos = [];
var juegoActivo = true;

function init() {
    //1. Genera el código random del master
    for (i = 0; i < 4; i++) {
        master[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (i = 0; i < 4; i++) {
        switch (master[i]) {
            case 0:
                master[i] = "white";
                break;
            case 1:
                master[i] = "blue";
                break;
            case 2:
                master[i] = "green";
                break;
            case 3:
                master[i] = "violet";
                break;
            case 4:
                master[i] = "yellow";
                break;
            case 5:
                master[i] = "red";
                break;
            case 6:
                master[i] = "orange";
                break;
            case 7:
                master[i] = "cyan";
                break;
        }
    }
    console.log(master);


    //2. Crea todas las filas según el número de intentos.
    var result = document.getElementById("Result");
    for (let i = 0; i < MAX_INTENTOS; i++) {
        result.innerHTML += ROW_RESULT;
    }
}



/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    if (userCombi.length < 4) {
        alert('Por favor, selecciona 4 colores antes de hacer clic en "Comprobar".');
        return;
    }

    for (i = 0; i < 4; i++) {
        if (userCombi[i] == master[i]) {
            aciertos.push("black");
        }
        else if (userCombi[i] == master[0] || userCombi[i] == master[1] || userCombi[i] == master[2] || userCombi[i] == master[3]) {
            aciertos.push("white");
        }
        else aciertos.push("grey");
    }

    var cercleResults = document.getElementsByClassName("rowResult")[intento].getElementsByClassName("cercleResult");
    for (let i = 0; i < 4; i++) {
        cercleResults[i].style.backgroundColor = aciertos[i];
    }
    
    if (arraysAreEqual(userCombi, master)) {
        alert('¡Felicidades! Has adivinado la combinación correcta.');
        juegoActivo = false;
        var masterCells = document.getElementById("master").getElementsByClassName("cel");
        for (let i = 0; i < masterCells.length; i++) {
            masterCells[i].style.backgroundColor = master[i];
        }

    }

    if (intento == MAX_INTENTOS -1) {
        var masterCells = document.getElementById("master").getElementsByClassName("cel");
        for (let i = 0; i < masterCells.length; i++) {
            masterCells[i].style.backgroundColor = master[i];
        }
        alert('No quedan más intentos.');
        juegoActivo = false;

    }

    aciertos = [];
    intento++;
    document.getElementById('info').textContent = 'Intento ' + intento + ', suerte!';

    userCombi = []; 
    return intento;
}

function añadeColor(color) {
    if (!juegoActivo) {
        alert('El juego ha terminado. Recarga la página para jugar de nuevo.');
        return;
    }
    if (userCombi.length < 4) {
        userCombi.push(color);

        var celUserCombis = document.getElementsByClassName("rowResult")[intento].getElementsByClassName("celUserCombi");
        for (let i = 0; i < 4; i++) {
            celUserCombis[i].style.backgroundColor = userCombi[i];
        }

        return userCombi;
    }
    else alert("Ya has seleccionado 4 colores");
}


function arraysAreEqual(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) return false;
    for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i] !== arrayB[i]) return false;
    }
    return true;
}

const ROW_RESULT = `
<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">    
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    </div>
</div>`;