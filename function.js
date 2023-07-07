async function insertCardPortatili(value){
    /**  Inserisco le card in base alla categoria scelta dalla select(value)*/
    
    let product = await importData()
    // importo i dati dal json in base al valore della value 
    product = product[value]
    let objLeng = Object.keys(product).length

    let main = document.getElementById('mainContent')

    //Creo 5 div all'interno del main content
    for (let i = 1; i < 6; i++) {
        let div = document.createElement('div')
        div.id=i
        div.className="card"  
        main.appendChild(div)
    }
    //Inserisco gli articoli all'interno di ogni div precendentemente creato
    for (let j = 1; j <= objLeng; j++) {

        let container = document.getElementById(`${j}`)
        
        let title = product[j]["title"]
        let img = product[j]["img"]
        let price= product[j]["price"]
        
        let article = document.createElement('article')
        
        let divImg = document.createElement('div')
        divImg.className='image'
        divImg.innerHTML='<img src="'+img+'" alt="image" width="80%">'
        
        let divTitle = document.createElement('div')
        divTitle.className='cardTitle'
        divTitle.innerHTML='<p>'+title+'</p>'
        
        let divPrice = document.createElement('div')
        divPrice.className='price'
        divPrice.innerHTML='<p class="priceTitle">Compralo a</p><p class="priceValue">'+price+'</p>'
        
        let buttonCard=document.createElement('div')
        buttonCard.className='buttonCard'
        let heart=document.createElement('div')
        heart.className='heart'
        heart.innerHTML='<button class="btnHeart"><img src="./img/Heart.png" alt="heart" width="50%"></button>'
        let cart=document.createElement('div')
        cart.className='cart'
        
        let btnCart = document.createElement('button')
        btnCart.className="btnCart"
        btnCart.id=j
        btnCart.setAttribute("onClick","addCart(this.id)")
        let image = document.createElement('img')
        image.src="./img/Cart.png"
        image.alt="cart"
        image.setAttribute("width","50%")

        btnCart.appendChild(image)
        cart.appendChild(btnCart)
        buttonCard.appendChild(heart)
        buttonCard.appendChild(cart)
        article.appendChild(divImg)
        article.appendChild(divTitle)
        article.appendChild(divPrice)
        article.appendChild(buttonCard)
        
        container.appendChild(article)
    }
}
function watchSelect(){
    /**In base alla categoria selezionata inserisco gli articoli */

    let main = document.getElementById('mainContent')

    let value = document.getElementById('Filter').value

    switch (value) {
        case 'portatili':
            main.innerHTML=''
            insertCardPortatili(value)
            break;
        case 'fissi':
            main.innerHTML=''
            insertCardPortatili(value)
            break;
        case 'smartphone':
            main.innerHTML=''
            insertCardPortatili(value)
            break;
        default:
            main.innerHTML=''
            break;
    }
}

async function importData(){
    /**Importo i dati da product.json */
    
    await fetch('product.json')
    .then((response) => response.json())
    .then((json) => data = json);
    return data
    
}

var cart = []

async function addCart(id){
    let data = await importData()
    
    
    let counterAppend = document.getElementById('counter')
    let category = document.getElementById('Filter').value
    let cartDiv = document.getElementById('carrello')

    let item ={
        category:category,
        id:id
    }
    cart.push(item)
    counterAppend.innerHTML=cart.length
    
    let product = data[category]
    
    let img = product[id]["img"]
    let title = product[id]["title"]
    let price = product[id]["price"]

    let div = document.createElement('div')
    div.id='contCart'
    div.className='contCart'

    let divImg = document.createElement('div')
    divImg.className='image'
    divImg.innerHTML='<img src="'+img+'" alt="image" width="80%">'

    let divTitle = document.createElement('div')
    divTitle.className='cardTitle'
    divTitle.innerHTML='<p>'+title+'</p>'

    let divPrice = document.createElement('div')
    divPrice.className='price'
    divPrice.innerHTML='<p class="priceValue">'+price+'</p>'

    div.appendChild(divImg)
    div.appendChild(divTitle)
    divImg.appendChild(divPrice)

    cartDiv.appendChild(div)
}

function openCart(){
    document.getElementById('carrello').style.display='flex'
}

function closeCart(){
    document.getElementById('carrello').style.display='none'
}


