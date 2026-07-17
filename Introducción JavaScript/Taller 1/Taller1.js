// 1. Precio total con IVA
let precio = 200;
const IVA = 21;

console.log("Precio: " + precio + "€");
console.log("IVA: " + IVA + "%");
console.log("El total son " + (precio + (precio * IVA / 100)) + "€");


// 2. Área y perímetro de un cuadrado
let lado = 40;

console.log("Lado: " + lado);
console.log("El área es " + lado * lado);
console.log("El perímetro es " + lado * 4);


// 3. Saludar al usuario
function pedirNombre() {
    const nombre = prompt("Escribe tu nombre:");

    if (nombre === null || nombre.trim() === "") {
        console.log("No ingresaste ningún nombre.");
    } else {
        console.log("Hola " + nombre);
    }
}
pedirNombre();


// 4. Media de tres números
function media() {
    const num1 = prompt("Escribe el numero 1:");
    const num2 = prompt("Escribe el numero 2:");
    const num3 = prompt("Escribe el numero 3:");

    if (num1 == null || num1.trim() === "") {
        console.log("No ingresaste el numero 1.");
    } else if (num2 == null || num2.trim() === "") {
        console.log("No ingresaste el numero 2.");
    } else if (num3 == null || num3.trim() === "") {
        console.log("No ingresaste el numero 3.");
    } else {
        console.log("Si el usuario teclea: " + num1 + ", " + num2 + ", " + num3)
        console.log("La media de los números es " + (parseFloat(num1) + parseFloat(num2) + parseFloat(num3)) / 3);
    }
}
media();


// 5. Consumo de combustible
function consumoCombustible() {
    const numLitros = prompt("Escribe los litros:");
    const numKilometros = prompt("Escribe los kilometros:");

    if (numLitros == null || numLitros.trim() === "") {
        console.log("No ingresaste los litros.");
    } else if (numKilometros == null || numKilometros.trim() === "") {
        console.log("No ingresaste los kilometros.");
    } else {
        console.log("Num de litros: " + numLitros)
        console.log("Num de kilómetros: " + numKilometros)
        console.log("Has consumido " + parseFloat(numLitros) / parseFloat(numKilometros), "l/km");
    }
}
consumoCombustible();


// 6. Convertir horas y minutos a segundos
let horas = 2
let minutos = 30

const resultado = ((horas * 60 * 60) + (minutos) * 60)

console.log("Horas:", horas)
console.log("Minutos:", minutos)
console.log("Resultado: " + horas + "*60*60 + " + minutos + "*60 = " + resultado + " segundos");


// 7. Convertir horas y minutos a segundos
function cambioUnidades() {
    const numero = prompt("Escribe un numero de dos digitos:");

    if (numero == null || numero.trim() === "") {
        console.log("No ingresaste ningun numero.");
        return;
    }
    const num = parseInt(numero);

    if (num < 10 || num > 99) {
        console.log("No ingresaste un numero de dos digitos.");
    } else {
        console.log("Numero tecleado: " + num);
        console.log("Unidades: " + num % 10);
        console.log("Decenas: " + Math.floor(num / 10));
    }
}
cambioUnidades();


// 8. Tortilla de patatas
let comensales = 5;

const papas = (comensales * 200 / 1000);
const huevos = (papas * 5);
const cebolla = (papas * 300);

console.log(comensales + " comensales");
console.log("Se necesitará:");
console.log(papas + " kg de papas");
console.log(huevos + " huevos");
console.log(cebolla + " gr de cebolla");


// 9. Intercambiar dos variables
let varUno = 10;
let varDos = 30;

console.log("Antes: " + "varUno vale " + varUno + " " + "varDos vale " + varDos);

let auxiliar = varUno;
varUno = varDos
varDos = auxiliar

console.log("Al final: " + "varUno vale " + varUno + " " + "varDos vale " + varDos);


// 10. ¿Es par o impar?
let numero = 50;
const calculo = (numero % 2 === 0);

console.log("Numero: " + numero);
console.log("¿Es par?: " + calculo);





