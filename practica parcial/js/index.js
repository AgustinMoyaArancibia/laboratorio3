//import {Personas} from "./info.js";
import { Personas } from "./personas.js";
import { crearTabla } from "./personas.js";

const $divTabla = document.getElementById("divTabla");

const personas= JSON.parse(localStorage.getItem("personas")) || []; //si hay algo lo trae sino trae un array vacio

const $formulario = document.forms[0] ;  //obtengo el formulario

actualizarTabla( );





const handlerCreate = (nuevaPersona) => //se da de alta
{
    personas.push(nuevaPersona);
    actualizarStorage(personas);
    actualizarTabla(personas);
}

const handlerUpdate = (personaModificada) => //se modifica
{
    let indice = personas.findIndex((persona)=>{
        return persona.id == personaModificada.id;
    });

    personas.splice(indice, 1);
    personas.push(personaModificada);

    

    actualizarStorage(personas);
    actualizarTabla();
}

const handlerDelete = (id)=>{

    let indice = personas.findIndex((persona)=>{
        return persona.id == id;
    });

    personas.splice(indice, 1); //recortar lo que esta e el indice una posicion

    actualizarStorage(personas);
    actualizarTabla();
};

function cargarFormulario(persona)
{
    const {txtId , txtNombre , txtEdad, txtEmail, rdoGenero } =$formulario; //desestructuracion de objetos


    txtId.value = persona.id;
    txtNombre.value = persona.nombre;
    txtEdad.value = persona.edad;
    txtEmail.value = persona.email;
    rdoGenero.value = persona.genero;
}



window.addEventListener("click",(e)=>    //evento de click sobre la pestaña
{

    if(e.target.matches("td")) //si toco sobre una td entra, sino no hace nada
    {
        console.log(e.target.parentElement.dataset.id);

        let id = e.target.parentElement.dataset.id;

        cargarFormulario(personas.find((persona)=>persona.id == id));   //recibe un call back y devuelve la primera ocurrencia que e true
    }
    if(e.target.matches("#btnEliminar"))
    {
        agregarSpinner();
        setTimeout(()=>
        {
            handlerDelete(parseInt($formulario.txtId.value));
            $formulario.txtId.value = "";
            $formulario.reset();
            eliminarSpinner();
        },2000)
       
    }

    if(e.target.matches("#btnCancelar"))
    {
        agregarSpinner();
        setTimeout(()=>
        {
            e.preventDefault();
        $formulario.reset();
        
            eliminarSpinner();
        },2000)
       
    }

});


$formulario.addEventListener("submit", (e) =>{

   
    e.preventDefault(); //abortamos el comportamiento por defecto
    const {txtId , txtNombre , txtEdad, txtEmail, rdoGenero } =$formulario; //desestructuracion de objetos
    const formPersona = new Personas(txtId.value , txtNombre.value , txtEdad.value, txtEmail.value, rdoGenero.value);//creo un constructor con los datos de los imputs

    console.log(formPersona);

    if(txtId.value  === '') //si el id esta vacio quiere decir que no esta dado de alto
    {
        agregarSpinner();
        setTimeout(()=>
        {
            formPersona.id = Date.now();
            handlerCreate(formPersona);
            eliminarSpinner();
        },2000)
       
    }
    else
    {
        agregarSpinner();
        setTimeout(()=>
        {
            handlerUpdate(formPersona);
            eliminarSpinner();
        },2000)
        
    }

    $formulario.reset(); //reinicio el formulario
});

function actualizarTabla()
{
    while($divTabla.hasChildNodes()) //mientras halla un nodo hijo sigue dando true
    {
        $divTabla.removeChild($divTabla.firstElementChild);
    }

    const data = JSON.parse(localStorage.getItem("personas"));

    if(data)
    {
        $divTabla.appendChild(crearTabla(data));

    }
}



const actualizarStorage = (data) =>
{
    localStorage.setItem("personas", JSON.stringify(data));
}

function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src",".js/assets/1495.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}

// No tocar

function eliminarSpinner(){
    document.getElementById("spinner-container").innerHTML="";
}
