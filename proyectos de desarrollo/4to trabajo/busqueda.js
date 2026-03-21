const usuarioInput = document.getElementById('usuarioInput');
const buscarBtn = document.getElementById('buscarButton');
const resultadosDiv = document.getElementById('resultados');
async function buscarUsuarioGitHub() {
            
    const nombreUsuario = usuarioInput.value.trim();                
    if (nombreUsuario === '') {
        mostrarError(' Escriba un nombre de usuario');
        return;
            } 
    mostrarCargando();   
    buscarBtn.disabled = true;
    try {
        const respuestaUsuario = await fetch(`https://api.github.com/users/${nombreUsuario}`);
                    
                    
        if (!respuestaUsuario.ok) {
                        
            if (respuestaUsuario.status === 404) {
                throw new Error('Usuario no encontrado. Verifica que el nombre sea correcto.');
            }   else {
                    throw new Error('Hubo un problema con la API. Intenta más tarde.');
                        }
                    }


            const datosUsuario = await respuestaUsuario.json();
            const respuestaRepos = await fetch(`https://api.github.com/users/${nombreUsuario}/repos?sort=updated&per_page=5`);
            const datosRepos = await respuestaRepos.json();
            mostrarPerfil(datosUsuario, datosRepos);
    }   catch (error) {
                
            mostrarError(error.message);
    }   finally {
                
            buscarBtn.disabled = false;
                }
            }
function mostrarCargando() {
            resultadosDiv.innerHTML = `
                <div class="cargando">
                    <p>Buscando usuario en GitHub...</p>
                    <p>Esto puede tomar unos segundos</p>
                </div>
            `;
        }
 function mostrarError(mensaje) {
            resultadosDiv.innerHTML = `
                <div class="error">
                    <strong>Error:</strong> ${mensaje}
                </div>
            `;
        }

 function mostrarPerfil(usuario, repositorios) {
            
    let html = `
        <div class="perfil">
            <div class="perfil-header">
                <img class="avatar" src="${usuario.avatar_url}" alt="${usuario.login}">
                <div class="info-usuario">
                    <h3>${usuario.name || usuario.login}</h3>
                    <p>@${usuario.login}</p>
                    ${usuario.bio ? `<p>${usuario.bio}</p>` : ''}
                    <a href="${usuario.html_url}" target="_blank">Ver perfil en GitHub →</a>
                </div>
            </div>
                    
            <div class="stats">
                <div class="stat">
                    <div class="stat-numero">${usuario.public_repos}</div>
                    <div>Repositorios</div>
                </div>
                <div class="stat">
                    <div class="stat-numero">${usuario.followers}</div>
                    <div>Seguidores</div>
                </div>
                <div class="stat">
                    <div class="stat-numero">${usuario.following}</div>
                    <div>Siguiendo</div>
                </div>
            </div>
        </div>
                
        <div class="repositorios">
            <h3>Últimos repositorios</h3>
    `;
    if (repositorios.length === 0) {
                html += '<p>Este usuario no tiene repositorios públicos</p>';
            } else {
            
                for (let i = 0; i < repositorios.length; i++) {
                    const repo = repositorios[i];
                    html += `
                        <div class="repo">
                            <a class="repo-nombre" href="${repo.html_url}" target="_blank">${repo.name}</a>
                            ${repo.description ? `<div class="repo-descripcion">${repo.description}</div>` : ''}
                            <div class="repo-info">
                                <span>${repo.stargazers_count} estrellas</span>
                                <span>${repo.forks_count} forks</span>
                                <span>${repo.language || 'Lenguaje no especificado'}</span>
                            </div>
                        </div>
                    `;
                }
            }
            
            html += `</div>`;
            
            
            resultadosDiv.innerHTML = html;
        }
buscarBtn.addEventListener('click', buscarUsuarioGitHub);
