const carrito = document.getElementById('carrito')
const template = document.getElementById('template').content
const total = document.getElementById('total')
const templateTotal = document.getElementById('template-Total').content
const fragment = document.createDocumentFragment()
let carritoArrayObjetos = []

document.addEventListener('click', e =>{
    // console.log(e.target.matches(".card .btn-outline-primary"));
    if (e.target.matches(".card .btn-outline-primary")) {
        // console.log('este es el boton');
        agregarCarrito(e)
    }

    if (e.target.matches('.list-group-item .btn-success')) {
        btnAumentar(e)
    }
    if (e.target.matches('.list-group-item .btn-danger')) {
        btnDisminuir(e)
    }
    if (e.target.matches('.btn-outline-info')) {
        btnFinalizar(e)
    }
})
const agregarCarrito = (e)=>{
    // console.log(e.target);
    // console.log(e.target.dataset);
    // console.log(e.target.dataset.fruta);
    const producto = {
        titulo: e.target.dataset.fruta,
        id:e.target.dataset.fruta,
        cantidad:1,
        precio:parseInt(e.target.dataset.precio)
    }
    // console.log(producto);
    const index = carritoArrayObjetos.findIndex(element=>
        element.id === producto.id
    )
    // console.log(index);
    
    if (index === -1) {
        carritoArrayObjetos.push(producto)
    }else{
        // console.log(carritoArrayObjetos[index]);
        carritoArrayObjetos[index].cantidad++
        // carritoArrayObjetos[index].precio = carritoArrayObjetos[index].cantidad * producto.precio
    }
    // console.log(carritoArrayObjetos);

    pintarCarrito()
}

const pintarCarrito = ()=>{
    carrito.innerHTML = ''
    // carrito.textContent = ''
    carritoArrayObjetos.forEach(element=>{
        // console.log(element);
        const clone = template.cloneNode(true)
        clone.querySelector('.text-white .lead').textContent = element.titulo
        clone.querySelector('.badge').textContent = element.cantidad
        clone.querySelector('div .lead span').textContent = element.precio * element.cantidad
        clone.querySelector('.btn-danger').dataset.id = element.id
        clone.querySelector('.btn-success').dataset.id = element.id


        fragment.appendChild(clone)
    })
    carrito.appendChild(fragment)
    pintarTotal()
}

const pintarTotal = ()=>{
    total.textContent = ""
    if (carritoArrayObjetos.length === 0) {
        total.textContent = ""
    } else {
    const sumaCantidades = carritoArrayObjetos.reduce((acc,valorActual)=> acc + valorActual.cantidad * valorActual.precio, 0)
    // console.log(sumaCantidades);
    const clone = templateTotal.cloneNode(true)
    clone.querySelector('span').textContent = sumaCantidades
    total.appendChild(clone)
    }
    // const sumaCantidades = carritoArrayObjetos.reduce((acc,valorActual)=> acc + valorActual.cantidad * valorActual.precio, 0)
    // // console.log(sumaCantidades);
    // const clone = templateTotal.cloneNode(true)
    // clone.querySelector('span').textContent = sumaCantidades
    // total.appendChild(clone)
}

const btnAumentar = e =>{
    // console.log('me diste click');
    carritoArrayObjetos = carritoArrayObjetos.map(element=>{
        if (element.id === e.target.dataset.id) {
            element.cantidad++
        }
        return element
    })
    
    pintarCarrito()
}

const btnDisminuir = e =>{
        // console.log(e.target);
    carritoArrayObjetos = carritoArrayObjetos.filter(element=>{
        if (element.id === e.target.dataset.id) {
            if (element.cantidad > 0) {
                element.cantidad--
            }if (element.cantidad === 0) return
            return element
        }else{
            return element
        }
    })

    pintarCarrito()
}
const btnFinalizar = e =>{
    carritoArrayObjetos = []
    // console.log('me diste click');
    pintarCarrito()
}