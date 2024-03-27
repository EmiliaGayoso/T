var eventos=[];

function AgregarEvento(input)
{
    var evento= document.getElementById(input).value;
    if(evento!=null)
    {
        eventos.push(evento);
    }
    
    for (var i=0; i<eventos.length; i++) {
        texto+= '<li class="list-group-item">';
        texto+= '<input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" onclick="MarcarEventoRealizado('+eventos[i]+')">';
        texto+= '<label class="form-check-label" for="firstCheckbox">'+ evento +'</label></li>';
        console.log(i++);
    }
    
    console.log(texto);
    document.getElementById("listaEventos").innerHTML = texto;
   
}
function MarcarEventoRealizado(input)
{
    var posicion=notas.indexOf(input);
    notas.splice(posicion+1, posicion);
    console.log(notas);
    document.getElementById(input).className = "underline"
}
