
import { listaPersonas } from "./infoPersonas.js";
import { crearTabla } from "./Personas.js";

const $divTabla = document.getElementById("divTabla");

console.log(listaPersonas);
actualizarTabla(listaPersonas);

function actualizarTabla(lista)
{
    $divTabla.appendChild(crearTabla(lista));
}