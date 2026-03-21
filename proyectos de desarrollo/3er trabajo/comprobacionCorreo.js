function validarCorreo() {
    let correo= document.getElementById("email").value;
    let resultadoDiv = document.getElementById("resultado");
            
    
    if (correo.trim() === "") {
        alert("Por favor, introduce un correo electrónico");
        resultadoDiv.innerHTML = "Error: No ingresaste ningún correo";
        resultadoDiv.className = "error";
        return;
            }
            
            
    if (!correo.includes("@")) {
        resultadoDiv.innerHTML = "Error: El correo debe contener el símbolo '@'";
        resultadoDiv.className = "error";
        return;
            }
            
            
    let partes = correo.split("@");
    if (partes.length !== 2) {
        resultadoDiv.innerHTML = "Error: Solo debe haber un '@'";
        resultadoDiv.className = "error";
        return;
            }
            
    let dominio = partes[1];
    if (!dominio.includes(".")) {
        resultadoDiv.innerHTML = "Error: El dominio debe contener un punto '.' (ejemplo: gmail.com)";
        resultadoDiv.className = "error";
        return;
            }
            
            
    if (correo.includes(" ")) {
        resultadoDiv.innerHTML = "Error: El correo no debe contener espacios";
        resultadoDiv.className = "error";
        return;
            }
            
           
    let extension = dominio.split(".").pop();
    if (extension.length < 2) {
        resultadoDiv.innerHTML = "Error: La extensión debe tener al menos 2 caracteres (.com, .es, etc.)";
        resultadoDiv.className = "error";
        return;
            }
            
            
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo)) {
        resultadoDiv.innerHTML = "Error: Formato de correo inválido. Ejemplo: usuario@dominio.com";
        resultadoDiv.className = "error";
        return;
            }
            
            
    resultadoDiv.innerHTML = `El correo "${correo}" es válido`;
            
        }