



function comprobar(){
    let texto=document.getElementById("input").value;
    const textoOriginal=texto;
    texto=texto.toLowerCase().replace(/ /g,"");    
    let textoInvertido=texto.split("").reverse().join("");
    if(texto==textoInvertido){
        let mensaje="El texto: "+textoOriginal+" es palindromo";
        mostrarResultado(mensaje);
    
    }else{
        let mensaje="El texto: "+textoOriginal+" no es palindromo";
        mostrarResultado(mensaje);
    }
}
function mostrarResultado(mensaje){
    let resultado=document.getElementById("resultado");
    if(mensaje){
        resultado.innerHTML=mensaje;
    }
    
}