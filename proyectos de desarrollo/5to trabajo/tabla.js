 let datos = [];
        
        
        let campoOrden = 'nombre';
        let ordenDireccion = 'asc';
        
        
        let elementoEditandoId = null;
        
        
        const tbody = document.getElementById('tabla-body');
        const filtroInput = document.getElementById('filtro');
        const nombreInput = document.getElementById('nombre');
        const categoriaInput = document.getElementById('categoria');
        const anioInput = document.getElementById('anio');
        const guardarBtn = document.getElementById('guardar-btn');
        const cancelarBtn = document.getElementById('cancelar-btn');
        const formularioTitulo = document.getElementById('formulario-titulo');
        const mensajeBienvenida = document.getElementById('mensajeBienvenida');
        
        
        function generarNuevoId() {
            if (datos.length === 0) {
                return 1;
            }
            let maxId = 0;
            for (let i = 0; i < datos.length; i++) {
                if (datos[i].id > maxId) {
                    maxId = datos[i].id;
                }
            }
            return maxId + 1;
        }
        
        
        function ordenarDatos() {
            let datosOrdenados = [...datos];
            
            datosOrdenados.sort((a, b) => {
                let valorA = a[campoOrden];
                let valorB = b[campoOrden];
                
                if (campoOrden === 'anio') {
                    if (ordenDireccion === 'asc') {
                        return valorA - valorB;
                    } else {
                        return valorB - valorA;
                    }
                } else {
                    valorA = valorA.toString().toUpperCase();
                    valorB = valorB.toString().toUpperCase();
                    
                    if (ordenDireccion === 'asc') {
                        if (valorA < valorB) return -1;
                        if (valorA > valorB) return 1;
                        return 0;
                    } else {
                        if (valorA > valorB) return -1;
                        if (valorA < valorB) return 1;
                        return 0;
                    }
                }
            });
            
            datos = datosOrdenados;
        }
        
        
        function filtrarDatos() {
            const textoBusqueda = filtroInput.value.toLowerCase();
            
            if (textoBusqueda === '') {
                return datos;
            }
            
            const datosFiltrados = [];
            for (let i = 0; i < datos.length; i++) {
                const elemento = datos[i];
                const nombreCoincide = elemento.nombre.toLowerCase().includes(textoBusqueda);
                const categoriaCoincide = elemento.categoria.toLowerCase().includes(textoBusqueda);
                const anioCoincide = elemento.anio.toString().includes(textoBusqueda);
                
                if (nombreCoincide || categoriaCoincide || anioCoincide) {
                    datosFiltrados.push(elemento);
                }
            }
            
            return datosFiltrados;
        }
        
        
        function actualizarMensajeBienvenida() {
            if (datos.length === 0) {
                mensajeBienvenida.style.display = 'block';
            } else {
                mensajeBienvenida.style.display = 'none';
            }
        }
        
        
        function editarElemento(id) {
            console.log('Editando elemento con ID:', id); 
            
            
            let elementoAEditar = null;
            for (let i = 0; i < datos.length; i++) {
                if (datos[i].id === id) {
                    elementoAEditar = datos[i];
                    break;
                }
            }
            
            if (elementoAEditar) {
                
                nombreInput.value = elementoAEditar.nombre;
                categoriaInput.value = elementoAEditar.categoria;
                anioInput.value = elementoAEditar.anio;
                
                
                elementoEditandoId = id;
                
                formularioTitulo.textContent = 'Editando elemento';
                guardarBtn.textContent = 'Actualizar';
                cancelarBtn.style.display = 'block';
                
               
                document.querySelector('.formulario').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
       
        function eliminarElemento(id) {
            console.log('Eliminando elemento con ID:', id); 
            
            const confirmar = confirm('¿Estás seguro de que quieres eliminar este elemento?');
            
            if (confirmar) {
                
                const nuevosDatos = [];
                for (let i = 0; i < datos.length; i++) {
                    if (datos[i].id !== id) {
                        nuevosDatos.push(datos[i]);
                    }
                }
                datos = nuevosDatos;
                
                if (datos.length === 0) {
                    filtroInput.value = '';
                }
                
                
                mostrarTabla();
            }
        }
        
                
        function mostrarTabla() {
            
            ordenarDatos();
            
            
            const datosAMostrar = filtrarDatos();
            
            
            tbody.innerHTML = '';
            
            
            actualizarMensajeBienvenida();
            
            
            if (datosAMostrar.length === 0) {
                if (datos.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4" class="sin-datos"> La tabla está vacía. Usa el formulario para agregar tu primer elemento</td></tr>';
                } else {
                    tbody.innerHTML = '<tr><td colspan="4" class="sin-datos"> No se encontraron resultados para tu búsqueda</td></tr>';
                }
                return;
            }
            
            
            for (let i = 0; i < datosAMostrar.length; i++) {
                const elemento = datosAMostrar[i];
                
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${elemento.nombre}</td>
                    <td>${elemento.categoria}</td>
                    <td>${elemento.anio}</td>
                    <td>
                        <button class="btn-editar" data-id="${elemento.id}">Editar</button>
                        <button class="btn-eliminar" data-id="${elemento.id}"> Eliminar</button>
                    </td>
                `;
                
                tbody.appendChild(fila);
            }
            
           
            const botonesEditar = document.querySelectorAll('.btn-editar');
            for (let i = 0; i < botonesEditar.length; i++) {
                botonesEditar[i].addEventListener('click', function(event) {
                    const id = parseInt(this.getAttribute('data-id'));
                    editarElemento(id);
                });
            }
            
            
            const botonesEliminar = document.querySelectorAll('.btn-eliminar');
            for (let i = 0; i < botonesEliminar.length; i++) {
                botonesEliminar[i].addEventListener('click', function(event) {
                    const id = parseInt(this.getAttribute('data-id'));
                    eliminarElemento(id);
                });
            }
        }
        
       
        function guardarElemento() {
            const nombre = nombreInput.value.trim();
            const categoria = categoriaInput.value.trim();
            const anio = parseInt(anioInput.value);
            
            
            if (nombre === '') {
                alert('Por favor, escribe un nombre');
                nombreInput.focus();
                return;
            }
            
            if (categoria === '') {
                alert('Por favor, escribe una categoría');
                categoriaInput.focus();
                return;
            }
            
            if (isNaN(anio) || anio < 1500 || anio > 2026) {
                alert('Por favor, escribe un año válido entre 1500 y 2026');
                anioInput.focus();
                return;
            }
            
            
            if (elementoEditandoId !== null) {
                
                for (let i = 0; i < datos.length; i++) {
                    if (datos[i].id === elementoEditandoId) {
                        datos[i].nombre = nombre;
                        datos[i].categoria = categoria;
                        datos[i].anio = anio;
                        break;
                    }
                }
                alert(' Elemento actualizado correctamente');
                limpiarFormulario();
            } 
            
            else {
                const nuevoElemento = {
                    id: generarNuevoId(),
                    nombre: nombre,
                    categoria: categoria,
                    anio: anio
                };
                datos.push(nuevoElemento);
                alert('Elemento agregado correctamente');
                nombreInput.value = '';
                categoriaInput.value = '';
                anioInput.value = '';
            }
            
            
            filtroInput.value = '';
            mostrarTabla();
        }
        
        
        function limpiarFormulario() {
            nombreInput.value = '';
            categoriaInput.value = '';
            anioInput.value = '';
            elementoEditandoId = null;
            formularioTitulo.textContent = 'Agregar nuevo elemento';
            guardarBtn.textContent = 'Guardar';
            cancelarBtn.style.display = 'none';
        }
        
        
        function manejarOrdenamiento(event) {
            const columna = event.target.closest('th');
            if (!columna) return;
            
            const campo = columna.getAttribute('data-campo');
            if (!campo) return;
            
            if (campo === campoOrden) {
                ordenDireccion = ordenDireccion === 'asc' ? 'desc' : 'asc';
            } else {
                campoOrden = campo;
                ordenDireccion = 'asc';
            }
            
            
            const encabezados = document.querySelectorAll('th');
            for (let i = 0; i < encabezados.length; i++) {
                const th = encabezados[i];
                const campoTh = th.getAttribute('data-campo');
                if (campoTh === campoOrden) {
                    th.textContent = th.textContent.replace(/[⬍⬎]/g, '').trim();
                    th.textContent += ordenDireccion === 'asc' ? ' ⬍' : ' ⬎';
                } else if (campoTh) {
                    th.textContent = th.textContent.replace(/[⬍⬎]/g, '').trim() + ' ⬍';
                }
            }
            
            mostrarTabla();
        }
        
        
        
        
        const encabezadosTabla = document.querySelectorAll('th');
        for (let i = 0; i < encabezadosTabla.length; i++) {
            encabezadosTabla[i].addEventListener('click', manejarOrdenamiento);
        }
        
        
        filtroInput.addEventListener('input', function() {
            mostrarTabla();
        });
        
        
        guardarBtn.addEventListener('click', guardarElemento);
        
        
        cancelarBtn.addEventListener('click', limpiarFormulario);
        
        
        nombreInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') guardarElemento();
        });
        categoriaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') guardarElemento();
        });
        anioInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') guardarElemento();
        });
        
        
        mostrarTabla();
        