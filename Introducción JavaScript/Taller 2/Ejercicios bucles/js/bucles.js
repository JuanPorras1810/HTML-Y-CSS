function toggleCard(element) {
    const card = element.parentElement;
    document.querySelectorAll('.card').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    card.classList.toggle('active');
}

function lanzarEjercicio(funcionEjercicio, idSalida) {
    const outputBox = document.getElementById(idSalida);
    outputBox.innerText = ""; // Limpiamos consola anterior

    const logOriginal = console.log;
    const alertOriginal = alert;

    console.log = function(...args) {
        const mensaje = args.join(' ');
        outputBox.innerText += mensaje + "\n";
        logOriginal.apply(console, args);
    };

    alert = function(mensaje) {
        outputBox.innerText += "[Alerta del Navegador]:\n" + mensaje + "\n";
        alertOriginal(mensaje);
    };

    try {
        funcionEjercicio();
    } catch (error) {
        outputBox.innerText = "Error en la ejecución: " + error.message;
    } finally {
        console.log = logOriginal;
        alert = alertOriginal;
    }
}






// 1. Lista de 0 al valor tecleado
function listNum() {
    const numIni = 0;
    let numero = prompt("Escribe el numero: ");
    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let numFin = "";
        for (let i = numIni; i <= numero; i++){
            numFin += i;
            if(i < numero) {
                numFin += ", ";
            }
        }
        console.log(numFin);
    }
}


// 2. Cuenta atrás
function listNumDes() {
    const numFin = 0;
    let numero = prompt("Escribe el numero: ");
    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let resultado = "";
        for (let i = numero; i >= numFin; i--){
            resultado += i;
            if(i > numFin) {
                resultado += ", ";
            }
        }
        console.log(resultado);
    }
}



// 3. Números pares

function numPar() {
    const numIni = 0;
    let numero = prompt("Escribe el numero: ");

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let resultado = "";

        for (let i = numIni; i < numero; i += 2 ){
            resultado += i;
            resultado += "\n";
        }
        alert(resultado);
    }
}



// 4. Tabla de multiplicar
function tabMul() {
    let numero = prompt("Escribe el numero: ");

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);

        for (let i = 1; i <= 10; i++){
            const mulNum = (numero * i);
            
            console.log(`${numero} × ${i} = ${mulNum}`);
        }
    }
}



// 5. Divisibles con resto 2
function divRes() {
    let numero = prompt("Escribe el numero: ");
    const numIni = 0;

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let resultado = "";
        for (let i = numIni; i < numero; i++){
            if(i % 3 === 2) {
                if(resultado !== "") {
                    resultado += ", ";
                }
                resultado += i;
            }
        }
        console.log(resultado);
    }
}



// 6. Repetir una letra
function repLet() {
    let letra = prompt("Escribe una letra: ");
    let numero = prompt("Escribe un numero: ");

    if (letra == null || letra.trim() === "") {
        console.log("No ingresaste la letra.");
    }else if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let resultado = "";

        for (let i = 1; i <= numero; i++){
            resultado += letra;
        }
        console.log(resultado);
    }
}



// 7. Contador en base 
function contBase() {
    let letIzq = [0, 1];
    let letDer = [1, 2, 3, 4];
    let resultado = "";

    for (let i = 0; i < letIzq.length; i++) {
        for (let j = 0; j < letDer.length; j++) { 
            if (resultado !== "") {
                resultado += ", ";
            }

            resultado += letIzq[i] + ":" + letDer[j];

            if (letIzq[i] === 1 && letDer[j] === 4) {
                console.log(resultado);
                return; 
            }
        }
    }
}



// 8. Triángulo de asteriscos
function triAst() {
    let numero = prompt("Escribe el numero: ");

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let asteriscos = "";
        let resultado = "";

        for (let i = 1; i <= numero; i++) {
            asteriscos += "*";
            if (resultado !== "") {
                resultado += ", ";
            }
            resultado += asteriscos;
        }
        console.log(resultado);
    }
}



// 9. Suma de enteros positivos

function sumEnt() {
    const numIni = 0;
    let numero = prompt("Escribe el numero: ");

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste el numero.");
    } else {
        numero = Number(numero);
        let resultado = 0;

        for (let i = numIni; i <= numero; i++){
            resultado += i;
        }
        console.log("Los números enteros de 0 a " + numero + " suman " + resultado);
    }
}



// 10. Media aritmética de 4 números

function medAri() {
    let suma = 0;
    for (let i = 1; i <= 4; i++) {
        let numero = prompt("Escribe el numero " + i + ": ");
        if (numero === null || numero.trim() === "") {
            console.log("Error, digito un numero o dejo un campo en blanco.");
            return; 
        }
        
        suma += Number(numero);

    }
    let media = suma / 4;
    console.log("La media es " + media);
}



    












