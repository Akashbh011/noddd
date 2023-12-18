console.log("js file connected . now insert images");
var storage=[{
    id:"div1",
    src:"./images/shirt1.jpg",
    shirt:"hoddie",
    price:"500",
    rating:"4.5",
    flag:false


}
,{    id:"div2",
    src:"./images/shirt2.jpg",
    shirt:"casual shirt",
    price:"499",
    rating:"4.2",
    flag:false
},{
        id:"div3",
    src:"./images/shirt3.jpg",
    shirt:"denim shirt",
    price:"650",
    rating:"4.1",
    flag:false
},{
        id:"div4",
    src:"./images/shirt4.jpg",
    shirt:"formal shirt",
    price:"489",
    rating:"4",
    flag:false
},{
        id:"div5",
    src:"./images/shirt5.jpg",
    shirt:"black shirt",
    price:"499",
    rating:"4.3",
    flag:false
},{
        id:"div6",
    src:"./images/shirt6.jpg",
    shirt:"blue shirt",
    price:"300",
    rating:"4.2",
    flag:false
}]

var main=document.querySelector("main")
var logo=document.querySelector(".fa-solid.fa-cart-shopping")
var popup=document.querySelector("#popup")
var close=document.querySelector(".fa-solid.fa-circle-xmark")

function open(){
logo.addEventListener("click",()=>{
    popup.style.right="0"

})
close.addEventListener("click",()=>{
    popup.style.right="-100%"

})
}
function cart(){
    storage.forEach((e)=>{
    
        main.innerHTML+=`
        <div id="${e.id}">
        <img src="${e.src}" alt="">
        <h3>${e.shirt}</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
        <div><span>${e.price}</span>
            <span>${e.rating}</span>
        </div>
        <button class="fav"><i class="fa-solid fa-bag-shopping"></i></button>
    </div>`
    })
    }
    

function addcart(){
var fav=document.querySelectorAll(".fav")

    fav.forEach((a)=>{
    a.addEventListener("click",()=>{
    popup.style.right="0"


var parentid=a.parentElement.id
        
    storage.forEach((b)=>{

    if(parentid==b.id && !b.flag){

var dynamic=document.querySelector("#dynamic")
        dynamic.innerHTML+=`<div class="cont">
        <img src="${b.src}" alt="">
        <div>
            <h3>${b.shirt}</h3>
            <p>RS.${b.price}</p>
            <input type="number" class="input">
        </div>
        <div><span class="sub">RS.${b.price}</span><i class="fa-solid fa-trash-can"></i></div>
        </div>`

                b.flag=true
            }
            remove()
            calcu()
            total()
            
    

        })

        })
    })
}

function remove(){
    var del=document.querySelectorAll(".fa-solid.fa-trash-can")
    del.forEach((c)=>{
        c.addEventListener("click",()=>{
            // c.parentElement.parentElement.remove()

            var parentelemt=c.parentElement.parentElement
            var goa=parentelemt.querySelector("h3")
            storage.forEach((j)=>{
                if(j.shirt==goa.innerHTML){
                    j.flag=false
                }
                


            })
            parentelemt.remove()
            total()
        })
    })
}

function calcu(){
    var input=document.querySelectorAll(".input")
    input.forEach((d)=>{
        d.addEventListener("input",()=>{
            if(d.value<1 || isNaN(d.value)){
                d.value=1
            }
            var parent=d.parentElement.parentElement
            var price=parent.querySelector("p").innerHTML.replace("RS.","")
            var subtotal=d.value*price
            var sub=parent.querySelector(".sub")
            sub.innerHTML=`Rs.${subtotal}`

            total()
        })
    })


}

function total(){
    var gtotal=document.querySelector("#total")
    var gsub=document.querySelectorAll(".sub")
    var temp=0
    gsub.forEach((f)=>{
        f=parseInt(f.innerHTML.replace("Rs.",""))
        temp = temp+f
        
    })
    if (gsub.length>0){
        gtotal.innerHTML=`Total : ${temp}`

    }
    else{
        gtotal.innerHTML="total :"
    }

}


function shopping(){
    cart()
    open()
    addcart()

}

shopping()
