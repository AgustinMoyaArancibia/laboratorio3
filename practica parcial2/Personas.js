export class Persona
{
    constructor(id,apellido,nombre) 
    {
        this.id = id;
        this.apellido = apellido;
        this.nombre = nombre;
    }
}

export class Cliente extends Persona
{

    constructor(id,apellido,nombre,edad,sexo)
    {
        super(id,apellido,nombre);
        this.edad = edad;
        this.sexo = sexo;
    }


}

export class Empleado extends Persona
{

    constructor(id,apellido,nombre,cuil, sueldo)
    {
        super(id,apellido,nombre);
        this.cuil = cuil;
        this.sueldo = sueldo;
    }

}

export const crearTabla = (data) =>
{
    const tabla = document.createElement("table");  /* creo tabla*/ 
    const thead = document.createElement("thead"); //creo columna de arriba
    const tbody = document.createElement("tbody"); //creo fila 
    const cabecera = document.createElement("tr"); //creo cuadro que va en el thead
    

    //cargo la cabecera , thead
    for (const key in data[0])  //recorro el primer elemento del array
    {
        for (const key2 in data[1])  //recorro el primer elemento del array
        {
          if(key !== "id" && key2 !== "id" ) //no pongo el id en la cabecera
            {
                const th = document.createElement("th"); //creo cuadro de separacion de la columna thead
                const contenido = document.createTextNode(key); //guardo el texto de key     
                th.appendChild(contenido); // guardo el titulo obtenido en el cuadro th
    
                cabecera.appendChild(th); // guardo el cuatro en la cabecera
            }
        }
       
    }

  


   

    thead.appendChild(cabecera);
    tabla.appendChild(thead);
    
    
    
    

    //cargo la fila , tbody
    
    data.forEach(element =>  //reccorro todo el aray
    {
        const tr = document.createElement("tr");
        
        for (const key in element) 
        {
            if(key === "id")
            {
                tr.setAttribute("data-id",element[key]);
            }
            else
            {
                const td = document.createElement("td"); //creo celda para guardar la info
                td.textContent = element[key];
                tr.appendChild(td);

            }          
        }
        tbody.appendChild(tr);
    });

tabla.appendChild(tbody);


return tabla;
}