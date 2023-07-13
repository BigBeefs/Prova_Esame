async function importData(){
    /**Importo i dati da product.json */
    
    await fetch('products.json')
    .then((response) => response.json())
    .then((json) => data = json);
    return data
    
}
async function innerElement(category){
    /**  Inserisco le card in base alla categoria scelta dalla select(category)*/
    
    let products = await importData()
    // importo i dati dal json in base al valore della category 

    let product = products[category]
    let objLeng = Object.keys(product).length

    let main = document.getElementById('mainContent')

    //Inserisco gli articoli all'interno di ogni div precendentemente creato
    for (let i = 1; i <= objLeng; i++) {

        let title = product[i]["title"]
        let img = product[i]["img"]
        let price = product[i]["price"]
        let sale = product[i]["sale"]
        let id  = product[i]["id"]

        let div = document.createElement('div')
        div.id=id+"card"
        div.className="card"
        main.appendChild(div)

        let article = document.createElement('article')
        
        let divImg = document.createElement('div')
        divImg.className='image'
        divImg.innerHTML='<img id="'+id+'img" onclick="openModal(this.id)" src="'+img+'" alt="image" width="80%">'
        
        let divTitle = document.createElement('div')
        divTitle.className='cardTitle'
        divTitle.innerHTML='<p>'+title+'</p>'
        
        let divPrice = document.createElement('div')
        divPrice.className='price'
        if(sale === true){
            let promo = product[i]["promo"]
            divPrice.innerHTML='<p class="priceTitle">Compralo a</p><p class="priceValue" style="text-decoration: line-through;">$ '+price+'</p><p class="priceValue">$ '+(price-promo).toFixed(2)+'</p>'
        }else{
        divPrice.innerHTML='<p class="priceTitle">Compralo a</p><p class="priceValue">$ '+price+'</p>'
        }

        let buttonCard=document.createElement('div')
        buttonCard.className='buttonCard'
        let heart=document.createElement('div')
        heart.className='heart'
        heart.innerHTML='<button class="btnHeart"><img src="./img/Heart.png" alt="heart" width="50%"></button>'
        let cart=document.createElement('div')
        cart.className='cart'
        
        let btnCart = document.createElement('button')
        btnCart.className="btnCart"
        btnCart.id=id
        btnCart.setAttribute("onClick","addCart(this.id)")
        let image = document.createElement('img')
        image.src="./img/Cart.png"
        image.alt="cart"
        image.setAttribute("width","50%")

        btnCart.appendChild(image)
        cart.appendChild(btnCart)
        buttonCard.appendChild(heart)
        buttonCard.appendChild(cart)
        if(sale === true){
            divImg.innerHTML='<img id="'+id+'img" onclick="openModal(this.id)" class="image1" src="'+img+'" alt="image" width="80%"><img id="'+id+'img" onclick="openModal(this.id)" class="image2" src="img/Sale.png" alt="sale" >'
        }
        article.appendChild(divImg)
        article.appendChild(divTitle)
        article.appendChild(divPrice)
        article.appendChild(buttonCard)
        
        div.appendChild(article)
}
}
function watchSelect(){
    /**In base alla categoria selezionata inserisco gli articoli */

    let main = document.getElementById("mainContent")
    let category = document.getElementById('Filter').value

    switch (category) {
        case 'portatili':
            main.innerHTML=''
            innerElement(category)
            break;
        case 'fissi':
            main.innerHTML=''
            innerElement(category)
            break;
        case 'smartphone':
            main.innerHTML=''
            innerElement(category)
            break;
        default:
            main.innerHTML=''
            break;
    }
}

var cart = []

async function addCart(id){
    /**Aggiunge il prodotto selezionato tramite id del button(this.id) */

    let data = await importData()
    // importo i dati dal json in base al valore della category
    let product = data[category] 
    
    let counterAppend = document.getElementById('counter')
    let category = document.getElementById('Filter').value
    let cartDiv = document.getElementById('cartDiv')
    let totDiv = document.getElementById('tot')

    let objLeng = Object.keys(product).length
    for (let i = 1; i <= objLeng; i++){
        if (product[i]["id"]===id){
            var img = product[i]["img"]
            var title = product[i]["title"]
            var price = product[i]["price"]
            var sale = product[i]["sale"]
            var promo = product[i]["promo"]

            let item={}
            //Creo un Object Item con all'interno i valori del prodotto selezionato
            if(sale===true){
                item ={
                    id:id,
                    price:price,
                    sale:sale,
                    promo:promo
                }
            }else{
                item ={
                    id:id,
                    price:price,
                    sale:sale
                }
            }
            //Aggiungo l'item all'array del carrello
            cart.push(item)

            //Ottengo il numero di elementi all'interno del carrello
            counterAppend.innerHTML=cart.length

            let sum=0.0
            
            //Calcolo il totale dei prezzi degli elementi all'interno del carrello
            for (let j = 0; j < cart.length; j++) {
                num= cart[j]['price']
                sum += parseFloat(num)
                if(cart[j]['sale']===true){
                    sum = sum - cart[j]['promo']
                }
            }

            //Genero i div all'interno del carrello e li popolo con i valori del prodotto selezionato
            let div = document.createElement('div')
            div.id=id+'cart'
            div.className='contCart'

            let divImg = document.createElement('div')
            divImg.className='imageCart'
            divImg.innerHTML='<img src="'+img+'" alt="image" width="100%">'

            let divTitle = document.createElement('div')
            divTitle.className='cardTitleCart'
            divTitle.innerHTML=title

            let divPrice = document.createElement('div')
            divPrice.className='priceCart'
            if(sale === true){
                let promo = product[i]["promo"]
                divPrice.innerHTML='<p class="priceValue" style="text-decoration: line-through;">$ '+price+'</p><p class="priceValue">$ '+(price-promo).toFixed(2)+'</p>'
            }else{
            divPrice.innerHTML='<p class="priceTitle">Compralo a</p><p class="priceValue">$ '+price+'</p>'
            }

            let rmBtn = document.createElement('div')
            rmBtn.className='divBtnCart'
            rmBtn.innerHTML='<button id="'+id+'btn" class="rmBtn" onclick="removeArt(this.id)">Rimuovi</button>'

            totDiv.innerHTML='<p>ToT. $'+sum.toFixed(2)+'</p>'

            div.appendChild(divImg)
            div.appendChild(divTitle)
            div.appendChild(divPrice)
            div.appendChild(rmBtn)

            cartDiv.appendChild(div)
        }
    }
}

function openCart(){
    document.getElementById('carrello').style.display='inline'
}

function closeCart(){
    document.getElementById('carrello').style.display='none'
}

async function openModal(id){
    /**Apre e alimenta il modal con le caratteristiche del prodotto selezionato */

    document.getElementById('modal').style.display='inline'

    let category = document.getElementById('Filter').value
    let divCaratt = document.getElementById("caratt")

    divCaratt.innerHTML=""

    let data = await importData()
    let product = data[category] 
    let objLeng = Object.keys(product).length
    
    for (let i = 1; i <= objLeng; i++){
        if (product[i]["id"]===id.substr(0,3)){
            
            var cpu = product[i]["spec"]["cpu"]
            var memory = product[i]["spec"]["memory"]
            var color = product[i]["spec"]["color"]

            let ulCaratt = document.createElement("ul")
            ulCaratt.className="ulCaratt"

            let liCpu = document.createElement("li")
            let textCpu = document.createTextNode("Cpu: "+cpu)
            liCpu.appendChild(textCpu)

            let liMem = document.createElement("li")
            let textMem = document.createTextNode("Memory: "+memory)
            liMem.appendChild(textMem)

            let liColor = document.createElement("li")
            let textColor = document.createTextNode("Color: "+color)
            liColor.appendChild(textColor)

            ulCaratt.appendChild(liCpu)
            ulCaratt.appendChild(liMem)
            ulCaratt.appendChild(liColor)

            divCaratt.appendChild(ulCaratt)
        }
    }
}

function closeModal(){
    document.getElementById('modal').style.display='none'
}

function removeArt(id){
    /**Rimuovo il prodotto selezionato tramite l'id del bottone*/

    //"id=id+btn" pertanto seleziono solo i primi tre elemnti della stringa "id"
    id = id.substr(0,3)
    console.log(id)

    //Elimino il prodotto dall'array del carrello
    cart.forEach((element,index) => {
        
        if ((element["id"])==id){
            cart.splice(index, 1)
        }
    });
    
    //Aggiorno il totale del carrello
    let sum=0.0
    for (let i = 0; i < cart.length; i++) {
        num = cart[i]['price']
        sum += parseFloat(num)
        if(cart[i]['sale']===true){
            sum = sum - cart[i]['promo']
        }
    }

    //Inserisco il totale del carrello e il numero di prodotti nel carrello aggiornati
    let counterAppend = document.getElementById('counter')
    let totDiv = document.getElementById('tot')
    totDiv.innerHTML='<p>ToT. $'+sum.toFixed(2)+'</p>'
    counterAppend.innerHTML=cart.length

    //Rimuovo il div dell'elemtno eliminato
    document.getElementById(id+'cart').remove()
}

