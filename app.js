

const idCategorias = document.querySelector("#categorias")


function html1() {

    class UI {


        agregarOptions(selectCat) {
            fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
                .then(response => response.json())
                .then(response => dibujar(response))
                .catch(err => console.log(err))

            function dibujar(response) {

                /* console.log(response.meals[0].strCategory); */


                for (let i of response.meals) {
                    /* console.log(i.strCategory) */
                    /* let option = document.createElement("option") */

                    idCategorias.innerHTML += `
               
               <option value="">${i.strCategory}</option>
                
                `
                    /* idCategorias.appendChild(option) */



                }

                selectCat.selectCategory(idCategorias)




            }



        }

        selectCategory(idCat) {

            const arraynew = Array.from(idCat)

            const receta = window.localStorage.getItem("receta")
            const findOption = arraynew.filter(function (i) {

                return i.text === receta;

            })


            if (receta !== null) {
                inicial(findOption[0])

            }


            idCategorias.addEventListener("click", inicial);





            /* window.localStorage.setItem() */





            function inicial(e) {

                console.log(e.target, e.text)

                let epa;
                if (e.target === undefined) {
                    epa = e.text

                }
                else {
                    epa = e.target.text

                }

                e.outerHTML = `'<option value="sexo" selected>${epa}</option>'`


                if (epa !== undefined) {


                    const resultado = document.querySelector("#resultado")


                    /* console.log(epa, "AbogadO") */
                    window.localStorage.setItem("receta", epa)


                    pintarUI(epa)


                    function pintarUI(idM) {


                        resultado.innerHTML = ""

                        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${idM}`)
                            .then(response => response.json())
                            .then(response => crearCuadros(response))
                            .catch(err => console.log("data not fund"))




                        function crearCuadros(response) {
                            /* console.log(response, "response") */
                            const resultado = document.querySelector("#resultado")


                            /* console.log(response.meals, "simpson") */

                            for (let i of response.meals) {
                                const cuadro = document.createElement("div")
                                cuadro.classList.add("cuadroReceta")
                                cuadro.innerHTML = `
                            <h2>${i.strMeal}</h2>
                            <img src="${i.strMealThumb}" alt="" class="imgReceta">
                            <div class="linkMenus">
                            <a href="#" data="${i.idMeal}">Ver receta</a>
                            <a href="#" id="savePlat">Guardar platillo</a>
                            </div>
                            `


                                resultado.appendChild(cuadro)
                            }
                            /*  console.log("MAMAMAMAMALALALALALALLAXXXXX") */
                            agregarFavoritos(response);
                            comprobarBotones(response);
                            abrirReceta(response);




                        }


                        function abrirReceta(response) {
                            const linksMenus = document.querySelectorAll(".linkMenus");
                            const array = [];


                            /*  console.log(linksMenus)
                             console.log(response, "DIRECTNIKN") */



                            linksMenus.forEach(function (link) {
                                array.push(link)
                            })

                            array.map(function (e) {
                                e.addEventListener("click", function (p) {
                                    p.preventDefault()

                                    /* console.log(p.originalTarget.innerHTML, "emanu") */

                                    if (p.originalTarget.innerHTML === "Ver receta") {



                                        /* console.log(p.target.parentElement.parentElement)
                                        console.log(p.target.attributes[1].value, "lalalla") */
                                        const id = Number(p.target.attributes[1].value)
                                        console.log(id, "ESTE ID")

                                        const resultado = document.querySelector("#xx")
                                        resultado.classList.add("cuadroFlotante")

                                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                                            .then(result => result.json())
                                            .then(result => pintarCuadro(result))

                                        function pintarCuadro(result) {

                                            console.log(result, "resultado papi")

                                            resultado.innerHTML = `
                                 <div id="popit">

                                       <div id="iconX">
                                         
                                       </div>
                                       <div id="iconX2">
                                       <button>X</button>
                                     </div>
                                  

                                    <div id="tituloPopIt1">

                                       <div id="tituloPopIt2">
                                       <p> ${result.meals[0].strMeal}</p>
                                      </div> 

                                    </div>

                                
                                    <div id="imgPopIt">
                                     <img src="${result.meals[0].strMealThumb}" alt="">
                                    </div>

                                    <div id="instPopIt">
                                     <p>${result.meals[0].strInstructions}</p>
                                    </div>

                                 </div>
                                    
    
                                    
                                    `
                                            const btX = document.querySelector("#iconX2");
                                            btX.addEventListener("click", function (e) {

                                                if (e.target.localName === "button") {
 /*                                                 console.log(e.target.parentElement.parentElement.parentElement, "BTN")
 */                                                const eliminar = e.target.parentElement.parentElement.parentElement;
                                                    eliminar.innerHTML = ""
                                                    eliminar.classList.remove("cuadroFlotante");
                                                }

                                            })

                                        }



                                    }



                                })
                            })


                        }





                        function agregarFavoritos(response) {
                            const savePlats = document.querySelectorAll("#savePlat")

                            const arraySave = Array.from(savePlats)
                            /* console.log(arraySave, "HAS GUARDADOOOOO") */

                            arraySave.map(function (e) {
                                e.addEventListener("click", function (e) {
                                    /*  console.log(e.target.outerText, "WHAt is") */
                                    /*                                 console.log(response, e.target.parentElement.children[0].attributes[1].value) */
                                    const id = e.target.parentElement.children[0].attributes[1].value


                                    if (e.target.outerText === "Guardar platillo") {
                                        for (let i of response.meals) {
                                            if (i.idMeal === id) {
                                                /* console.log(i) */
                                                window.localStorage.setItem(id, JSON.stringify(i))
                                                e.target.innerHTML = "Eliminar de guardados"
                                                return false;
                                            }
                                        }
                                    }
                                    if (e.target.outerText === "Eliminar de guardados") {
                                        /* const a = JSON.parse(window.localStorage.removeItem("1")) */
                                        window.localStorage.removeItem(id)
                                        e.target.innerHTML = "Guardar platillo"
                                        return false;
                                    }


                                })
                            })

                        }

                        function comprobarBotones(response) {

                            const idLs = Object.getOwnPropertyNames(window.localStorage)
                            const resultado = document.querySelector("#resultado")

                            /*                         console.log(idLs, "IDS")
                             */
                            resultado.childNodes.forEach(function (e) {
                                /* console.log(e.children[2].children[0].attributes[1].nodeValue, "XXXX") */
                                const idHecho = e.children[2].children[0].attributes[1].nodeValue;
                                /*                             console.log(e.children[2].children[1])
                                 */
                                for (let i of idLs) {
                                    if (i === idHecho) {
                                        e.children[2].children[1].innerHTML = `Eliminar de guardados`
                                    }
                                }

                            })



                        }



                    }

                } //AQUI TERMINA EL IF DE LISTENER CLICK




            }


            /* }) */




        }






    }




    const ui = new UI;

    ui.agregarOptions(ui)
}




function html2() {

    var arrayDatos = [];

    for (let i of Object.entries(window.localStorage)) {


        if (i[0] !== "receta") {
            i[1] = JSON.parse(i[1])

            arrayDatos.push(i)
        }

    }

    console.log(arrayDatos)



    class UI {


        crearCuadros(dts) {
            const resultado = document.querySelector("#resultado")



            for (let i of dts) {
                const cuadro = document.createElement("div")
                cuadro.classList.add("cuadroReceta")
                cuadro.innerHTML = `
        <h2>${i[1].strMeal}</h2>
        <img src="${i[1].strMealThumb}" alt="" class="imgReceta">
        <div class="linkMenus">
        <a href="#" data="${i[0]}" id="deleteFav">Eliminar de favoritos</a>
        
        </div>
        `


                resultado.appendChild(cuadro)
            }
            /*  console.log("MAMAMAMAMALALALALALALLAXXXXX") */
            /*  agregarFavoritos(response);
             comprobarBotones(response);
             abrirReceta(response); */




        }

        eliminarFavoritos() {
            const eliminar = document.querySelectorAll("#deleteFav");
            const eliminar1 = Array.from(eliminar)

            eliminar1.map(function (e) {
                e.addEventListener("click", function (r) {
                    r.preventDefault()
                    
                    const data = r.target.attributes[1].value;
                    window.localStorage.removeItem(data)
                    r.target.parentElement.parentElement.remove()

                    return false;
                })
            })

        }
    }

    const ui = new UI();
    ui.crearCuadros(arrayDatos)
    ui.eliminarFavoritos(arrayDatos)





} //TERMINA IF PADRE


















const ht1 = document.querySelector("#xe");

if (ht1 !== null) {
    if (ht1.id === "xe") {
        console.log(ht1.id)
        html1();
    }

}




const ht2 = document.querySelector("#html2");

if (ht2 !== null) {
    if (ht2.id === "html2") {
        console.log(ht2.id)
        html2();
    }

}


/* ui.selectCategory(ui); */


/* 
console.log(xx.id, "THE SIMPSOOONE"); */


/* console.log(window.document.all, "ESTE ES EL BODY")

for(let i of window.document.all){
    console.log(i.id)
} */



