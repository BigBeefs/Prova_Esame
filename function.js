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
        console.log(title)
        
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
        cart.innerHTML='<button class="btnCart"><img src="./img/Cart.png" alt="cart" width="50%"></button>'
        
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




