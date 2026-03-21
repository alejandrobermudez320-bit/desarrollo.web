const texto_contador=document.getElementById('contador');
const boton_incrementar=document.getElementById('boton_incrementar');
const boton_disminuir=document.getElementById('boton_disminuir');
// variable del contador
let contador=0;
function contar(){
    contador++;
    if(contador===10){
       contador=0;
}
    
    texto_contador.textContent=contador;
    }
function decrementrar(){
    if (contador===0){return;}
    else{
        contador--;
        texto_contador.textContent=contador;}
}


boton_incrementar.addEventListener('click',contar);
boton_disminuir.addEventListener('click',decrementrar);