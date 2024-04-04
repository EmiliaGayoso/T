var eventos=[];
var eventoCheck = [];
var hora =[];
var horaCheck =[];

function AgregarEvento(input)
{
    if(input.length > 0 && VerificarEvento(input)) {
        eventos.push(input);
        eventoCheck.push(false);
        hora.push(Date.now());
        horaCheck.push(false);
        MostrarEventos(input);
    }
   
}

function VerificarEvento(input) 
{
    var i = 0;
    while(i<eventos.length && eventos[i] != input)
    {
        i++
    }
    if(i<eventos.length)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function MostrarEventos()
{
    const array = document.getElementById('array');
    while (array.hasChildNodes()) 
    {
        array.removeChild(array.firstChild); /*si contiene algo lo remueve*/
    }

    for (var i = 0; i < eventos.length; i++)
    {
        var contenedor = document.createElement("div");

        var label = document.createElement("label");

        label.textContent = eventos[i];
        label.setAttribute("id", i);/*le da el atributo con la posicion del array*/
        
        if (eventoCheck[i]) {
            label.style.textDecoration = 'line-through';
        }

        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = eventoCheck[i];

        var eliminar = document.createElement("button");
        eliminar.setAttribute("id", i);
        eliminar.setAttribute("onclick", "BorrarTask(" + i + ")");
        eliminar.textContent = "x";
        
        checkbox.addEventListener('change', (function(j) {
            return function() {
                eventoCheck[j] = this.checked;
                horaCheck[j] = Date.now();
                if(eventoCheck[j]){
                    document.getElementById(j).style.textDecoration = 'line-through';
                }
                else{
                    document.getElementById(j).style.textDecoration = 'none';
                    horaCheck[j] = false;
                }
            }
        })(i)); 

        contenedor.appendChild(checkbox);
        contenedor.appendChild(label);
        contenedor.appendChild(eliminar);
        contenedor.setAttribute("class", "contenedor");

        array.appendChild(contenedor);/*avisa que hay algo dentro de .array*/
    }
}

function CalcularTareaMasRapida() 
{
    if(horaCheck.some(elemento => elemento !== false)){
        const resultado = document.getElementById("calcular");
        var mensaje;
        var mas = Number.MAX_VALUE;
        var masTodo = "";
        
        for(var i = 0; i<eventos.length; i++){
            if(eventoCheck[i]){
                if(horaCheck[i] != false && (horaCheck[i] - hora[i]) < mas){
                    mas = horaCheck[i] - hora[i];
                    masTodo = lista[i];
                }
            }
        }

        mensaje = `La tarea + rapida en realizarse fue ${masTodo} en`
        if(mas > 1000 && mas < 60000){
            mas = (mas / 1000).toFixed(2);
            mensaje += ` ${mas} segundos`;
        }
        else if(mas > 60000){
            mas = (mas / 60000).toFixed(2);
            mensaje += ` ${mas} minutos`;
        }
        else{
            mensaje += ` ${mas.toFixed(2)} milisegundos`;
        }
        const respuesta = document.createElement("p");
        const parrafos = resultado.querySelectorAll('p');
        parrafos.forEach(parrafo => {
            parrafo.remove();
        });
        respuesta.innerHTML = mensaje;
        resultado.appendChild(respuesta);
    }
}

function BorrarTask(i)
{
    eventos.splice(i, 1);
    eventoCheck.splice(i, 1);
    console.log(eventos,eventoCheck)
    MostrarEventos();
}