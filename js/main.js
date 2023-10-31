// Clase Tools
class Tools {

    getProductType(ProductType){

		switch (ProductType) {
			case '1': return "Collares"
					break
			case '2': return "Pulceras"
					break
			case '3': return "Maquillajes"
					break
            default: "Ninguno"
        }
    }
}
class Client {
    constructor(id, name, phon, producto) {
        this.id=id
        this.name = name
        this.phon = phon
        this.producto = producto
    }
}

const myProducts = []

class ClientCRUD {

    constructor() {
        this.encabezado=resultado.innerHTML
        this.dates = JSON.parse( localStorage.getItem('myProducts') )
        if(this.dates != null){
            let i = 0
            this.dates.forEach(elemen=>{
                this.showClient(this.dates[i])
                i+=1
            })
        }
    }
    loadClient(id,name,phon,producto) {

        document.querySelector('#mod_id').value=id
        document.querySelector('#mod_names').value=name
        document.querySelector('#mod_phon').value=phon
        document.querySelector('#mod_producto').value=producto

    }
    showClient(inserClient){

        let contador = parseInt(inserClient.id)+1
        let sproductoType = myTools.getProductType(inserClient.producto)

        resultado.innerHTML += `<tr>
        <td>${contador}</td>
        <td>${inserClient.name}</td>
        <td>${inserClient.phon}</td>
        <td>${sproductoType}</td>
        <td><a onclick=\"myProduct.loadClient( ${inserClient.id},'${inserClient.name}','${inserClient.phon}',${inserClient.producto});\" style='color:#000000;' data-bs-toggle="modal" data-bs-target="#exampleModal" data-placement='top' title='Editar producto' style='cursor:pointer'><img src='img/editar.png' alt='Farheso' width='20' height='20'/></a></td>
        <td><a onclick=\"myProduct.deleteClient( ${inserClient.id});\"><img src='img/eliminar.png' alt='Farheso' width='20' height='20'/></a></td>
        </tr>`

}
    newProducto(){

        let id = 0
        let names = document.querySelector('#names').value;
        let phon = document.querySelector('#phon').value;
        let producto = document.querySelector('#producto').value;
        let dates = JSON.parse( localStorage.getItem('myProducts') )

        if(dates == null){
            let inserClient = new Client(id,names,phon,producto)
            this.showClient(inserClient)
            myProducts.push(inserClient)
            localStorage.setItem('myProducts', JSON.stringify(myProducts))
        }
        else{

            dates.forEach(elemen=>{
                id+=1
            })

            let inserClient = new Client(id,names,phon,producto)
            localStorage.removeItem("myProducts")
            dates.push(inserClient)
            this.showClient(inserClient)
            localStorage.setItem('myProducts', JSON.stringify(dates))

        }
    }
    deleteClient (idDelete){

        let myProductsDelete = JSON.parse( localStorage.getItem('myProducts') )
        localStorage.removeItem("myProducts")
        resultado.innerHTML=this.encabezado
        const myProductsNuevos = []

        let idcount=0
        myProductsDelete.forEach(elemen=>{
            if( myProductsDelete[idcount].id != idDelete ){
                myProductsNuevos.push(myProductsDelete[idcount])
                this.showClient(myProductsDelete[idcount])
            }
            idcount+=1
        })

        localStorage.setItem('myProducts', JSON.stringify(myProductsNuevos))

    }
    updateClient() {

        let idUpdate = document.querySelector('#mod_id').value;
        let names = document.querySelector('#mod_names').value;
        let phon = document.querySelector('#mod_phon').value;
        let producto = document.querySelector('#mod_producto').value;

        let myProductsUpdate = JSON.parse( localStorage.getItem('myProducts') )
        localStorage.removeItem("myProducts")
        resultado.innerHTML=this.encabezado
        const myProductsNuevosEd = []

        let idcount=0
        myProductsUpdate.forEach(elemen=>{
            if( myProductsUpdate[idcount].id == idUpdate ){
                let inserClient = new Client(idUpdate,names,phon,producto)
                myProductsNuevosEd.push(inserClient)
                this.showClient(inserClient)

            }else{
                myProductsNuevosEd.push(myProductsUpdate[idcount])
                this.showClient(myProductsUpdate[idcount])
            }
            idcount+=1
        })

        localStorage.setItem('myProducts', JSON.stringify(myProductsNuevosEd))

        $('#exampleModal').modal('hide');

    }

}


const myTools = new Tools()
const myProduct = new ClientCRUD()