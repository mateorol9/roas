// Calculadora ROAS
let containerCalculatorROAS = document.querySelector('.calculator__container');
let roas = document.querySelector('.calculator__result');
function calculatorROAS() {
    let sales = parseFloat(document.getElementById('sales').value);
    let budget = parseFloat(document.getElementById('budget').value);
    
    if(isNaN(budget) || isNaN(sales)){
      roas.innerHTML = 0;
    } else {
      let roasResult = (sales / budget);
      (Number.isInteger(roasResult)) ? roas.innerHTML = roasResult : roas.innerHTML = roasResult.toFixed(1);
    }
    console.log(sales, budget);
}

containerCalculatorROAS.addEventListener('input', calculatorROAS);

//Costos Variables (%) <-------------------------------------------------
let tablaCostosVariables = document.querySelector('.variables__container');
let elementosCostosVariables = document.querySelectorAll('.item-editable-v');
let costosVariables = [];
let totalCostosVariables = document.querySelector('.item-cvt');
let margenBruto = document.querySelector('.item-mb');

function costosVariablesTotales(e) {
    if (e.target.matches('.item-editable-v')) {
      //Limpio mi los valores de costos variables
      costosVariables.length = 0;
      //Convierto el NodeList en un array con números
      elementosCostosVariables.forEach(function(elemento) {
            let item = Number(elemento.value);
            costosVariables.push(item);
        });

     
      let suma = costosVariables.reduce((acc, num) => acc + num );
       if (suma <= 100) {
      totalCostosVariables.innerHTML = suma  + "%";
      margenBruto.innerHTML = ((1-(suma/100))*100).toFixed(1) + "%";
      } else {
         totalCostosVariables.innerHTML = "No tienes Margen Bruto"
          margenBruto.innerHTML = 'No aplica';
      }
    }
}

tablaCostosVariables.addEventListener('input', costosVariablesTotales);

//Costos Fijos ($) <-------------------------------------------------

let tablaCostosFijos = document.querySelector('.fijos__container');
let elementosCostosFijos = document.querySelectorAll('.item-editable-f');
let costosFijos = [];
let totalCostosFijos = document.querySelector('.item-cft');

function costosFijosTotales(empleados, contratistas, proveedores, herramientas, logistica, otros) {
    totalCostosFijos.innerHTML = "$" + (empleados + contratistas + proveedores + herramientas + logistica + otros);
     
}

tablaCostosFijos.addEventListener('input', function(){
  costosFijos.length = 0;
  // Itera sobre cada elemento y suma sus valores
elementosCostosFijos.forEach(function(elemento) {
    let item = parseFloat(elemento.value);
    if(isNaN(item)) {
      costosFijos.push(0);
    } else {
      costosFijos.push(item);
    }
});
  costosFijosTotales(...costosFijos);
});

//Grafica de ROAS <-------------------------------------------------

let elementosRoas = document.querySelectorAll('.item-editable-roas');
let elementosBudget = document.querySelectorAll('.item-editable-budget');
let elementosResult = document.querySelectorAll('.result__items');
let valoresRoas = [];
let valoresBudget = [];


function calcular() {
 
 valoresRoas.length = 0;
 valoresBudget.length = 0;
 // Creo el array valoresRoas
   elementosRoas.forEach(function(element) {
     let item = parseFloat(element.value);
     if(isNaN(item)) {
       valoresRoas.push(undefined);
     } else {
       valoresRoas.push(item);
     }  
   });
   // Creo el array valoresBudget
   elementosBudget.forEach(function(element) {
    let item = parseFloat(element.value);
    if(isNaN(item)) {
      valoresBudget.push(undefined);
    } else {
      valoresBudget.push(item);
    }  
  });
  roasObjetivo();
}

function roasObjetivo() {
    //Valores calculo
const numberTotalCostosFijos = Number(totalCostosFijos.innerHTML.replace("$", ""));
const numberTotalCostosVariables = Number(totalCostosVariables.innerHTML.replace("%", ""));
const numberMargenBruto = Number(margenBruto.innerHTML.replace("%", ""));


// Calculo ROAS
    let k = 0;
    for(let i = 0; i < valoresBudget.length; i++){
        for(let j = 0; j < valoresRoas.length; j++, k++) {
            elementosResult[k].innerHTML = (valoresRoas[j] * valoresBudget[i])*(numberMargenBruto/100)-valoresBudget[i]-numberTotalCostosFijos;
        }
    }
    
  };