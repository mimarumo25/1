function functionOnsubmit(event) {
    event.preventDefault();
}


const dolar = 'USD';
const pesoMex = 'MXN';
const pesoCol = 'COP';
const euro = 'EUR';
const esterlina = 'GBP';
let result = null;
const moneda = ['Elige tu Moneda', 'Dolar', 'Peso Mexicano', 'Peso Colombiano', 'Euro', 'Libra Esterlina', ];
let select = document.getElementById("selectFromMoneda"); //Seleccionamos el select
let select1 = document.getElementById("selectToMoneda"); //Seleccionamos el select
let cant = Number(document.getElementById('inputCantidad').value);


const btncalcular = document.getElementById('btnConvertir');
btncalcular.addEventListener('click', function click() {
    convertirMonedas();
});

cargarMoneda();

function cargarMoneda() {

    moneda.forEach(element => {
        let option = document.createElement("option"); //Creamos la opcion
        let option1 = document.createElement("option"); //Creamos la opcion
        option.innerHTML = element; //Metemos el texto en la opción
        option1.innerHTML = element; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select
        select1.appendChild(option1); //Metemos la opción en el select

    });
}

function convertirMonedas() {

    let cant = Number(document.getElementById('inputCantidad').value);
    let from = document.getElementById('selectFromMoneda').value;
    let to = document.getElementById('selectToMoneda').value;

    let valid = document.getElementById("inputValidaciones");


    if (!cant == '') {

        switch (from) {
            case 'Dolar':
                from = dolar;
                valid.setAttribute("hidden", false);
                break;
            case 'Peso Mexicano':
                from = pesoMex;
                valid.setAttribute("hidden", false);

                break;
            case 'Peso Colombiano':
                from = pesoCol;
                valid.setAttribute("hidden", false);

                break;
            case 'Euro':
                from = euro;
                valid.setAttribute("hidden", false);

                break;
            case 'Libra Esterlina':
                valid.setAttribute("hidden", false);
                from = esterlina;

                break;
            default:
                document.getElementById("inputValidaciones").value = "Por favor selecione su Moneda Principal";
                // form.classList.add('was-validated')
                //let valid = document.getElementById("inputValidaciones");
                valid.classList.add('bg-danger');
                valid.classList.add('text-white');
                valid.removeAttribute('hidden');
                return

                break;
        }
        switch (to) {
            case 'Dolar':
                to = dolar;
                valid.setAttribute("hidden", false);
                break;
            case 'Peso Mexicano':
                to = pesoMex;
                valid.setAttribute("hidden", false);
                break;
            case 'Peso Colombiano':
                to = pesoCol;
                valid.setAttribute("hidden", false);
                break;
            case 'Euro':
                to = euro;
                valid.setAttribute("hidden", false);
                break;
            case 'Libra Esterlina':
                to = esterlina;
                valid.setAttribute("hidden", false);
                break;
            default:
                document.getElementById("inputValidaciones").value = "Por favor selecione su Moneda a Convertir";
                // form.classList.add('was-validated')

                valid.classList.add('bg-danger');
                valid.classList.add('text-white');
                valid.removeAttribute('hidden');
                return
                break;
        }
    } else {
        document.getElementById("inputValidaciones").value = "Por ingrese una cantidad Valida";

        valid.classList.add('bg-danger');
        valid.classList.add('text-white');
        valid.removeAttribute('hidden');
        return
    }

    const datos = `${from}_${to}`;
    const url = `https://free.currconv.com/api/v7/convert?q=${datos}&compact=ultra&apiKey=71debcafa87ead94d26d`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            let valor = data[datos];
            result = valor * cant;

            document.getElementById("inputResultado").value = new Intl.NumberFormat().format(result) + ' ' + to;



        })
        .catch(err => console.log(err))
}