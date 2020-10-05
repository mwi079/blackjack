document.getElementById("playerTitle").innerHTML="Player's Cards"
document.getElementById("scoreTitle").innerHTML="Player's Score = ?"
document.getElementById("dealer score").innerHTML = "Dealer's Score = ?";

let h = document.getElementById("btnhit")
let s = document.getElementById("btnstay")
let r= document.getElementById("btnReset")
h.style.display="none"
s.style.display="none"
r.style.display="none"

let name;

if(localStorage.getItem("playerName") !== null)
{
    name=localStorage.getItem("playerName")
    document.getElementById("playerTitle").innerHTML=name+"'s Cards"
    document.getElementById("scoreTitle").innerHTML=name+"'s Score = ?"
}
else
{
    name="Player"
} 

let deck = []
let playerHand=[]
let dealerHand=[]
let player= {Name: name, Hand: playerHand, Score: 0, Aces:0}
let dealer= {Name: "Dealer", Hand: dealerHand, Score: 0, Aces:0}
let winner;

let showplayercard1=document.getElementById('playercard1')
showplayercard1.src = "back.jpg"

let showplayercard2=document.getElementById('playercard2')
showplayercard2.src = "back.jpg"

let showplayercard3=document.getElementById('playercard3')
showplayercard3.style.display="none"

let showplayercard4=document.getElementById('playercard4')
showplayercard4.style.display="none"

let showplayercard5=document.getElementById('playercard5')
showplayercard5.style.display="none"

let showplayercard6=document.getElementById('playercard6')
showplayercard6.style.display="none"

let showdealercard1="back.jpg"
document.getElementById('dealercard1').src = showdealercard1

let showdealercard2="back.jpg"
document.getElementById('dealercard2').src = showdealercard2

let showdealercard3=document.getElementById('dealercard3')
showdealercard3.style.display="none"

let showdealercard4=document.getElementById('dealercard4')
showdealercard4.style.display="none"

let showdealercard5=document.getElementById('dealercard5')
showdealercard5.style.display="none"

let showdealercard6=document.getElementById('dealercard6')
showdealercard6.style.display="none"



function greet()
{
    name=document.querySelector('#name').value;

    if(name==""){
        name="Player"
    }

    $("#welcome").dialog()
    document.getElementById("greetings").innerHTML="Hello "+name+"! Click 'Deal' to begin and good luck!"

    document.getElementById("playerTitle").innerHTML=name+"'s Cards"
    document.getElementById("scoreTitle").innerHTML=name+"'s Score = ?"

    localStorage.setItem("playerName", name);
}

function createDeck() 
{
    let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    
    for (let i = 0 ; i < suits.length; i++)
    {
        for(let j = 0; j < numbers.length; j++)
        {
            let value = parseInt(numbers[j]);
            if (numbers[j] == "J" || numbers[j] == "Q" || numbers[j] == "K")
                value = 10;
            if (numbers[j] == "A")
                value = 11; 
            let card = { Number: numbers[j], Suit: suits[i], Value: value };
            deck.push(card);
        }
    }
}

function deal()
{

    for(let i=0; i<2; i++) // players cards
    {
        let id="player"
        let random=Math.floor(Math.random() * deck.length)
        let card=deck.splice(random,1)
        player.Hand.push(card[0]);
        show(playerHand[i].Number, playerHand[i].Suit,id, playerHand.length)
        player.Score+=card[0].Value
        if (playerHand[i].Number=="A")
        {
            player.Aces++
        }
        document.getElementById("scoreTitle").innerHTML = name+"'s Score = "+player.Score;
    }

    for(let i=0; i<2; i++) // dealers cards
    {
        let id="dealer"
        let random=Math.floor(Math.random()* deck.length)
        let card=deck.splice(random,1)
        dealer.Hand.push(card[0])
        show(dealerHand[i].Number, dealerHand[i].Suit,id, dealerHand.length)
        dealer.Score+=card[0].Value
        if (dealerHand[i].Number=="A")
        {
            dealer.Aces++
        }
    }
}

function start() //button
{
    createDeck()
    deal()
    let playername=document.getElementById("playerName")
    playername.style.display="none"
    r.style.display="inline"
    let d = document.getElementById("btnDeal")
    d.style.display="none"
    h.style.display="inline"
    s.style.display="inline"
}

function hit() //button
{
    let id="player"
    let random=Math.floor(Math.random() * deck.length)
    let card=deck.splice(random,1)
    player.Hand.push(card[0])
    show(card[0].Number, card[0].Suit,id,playerHand.length)

    if (card[0].Number=="A")
    {
        player.Aces++
    }

    player.Score+=card[0].Value

    if(player.Score>21 &&player.Aces>0)
    {
        player.Score-=10
        player.Aces--
    }

    document.getElementById("scoreTitle").innerHTML = name+"'s Score = "+player.Score;
    
    if(player.Score>21 &&player.Aces==0) 
    {
        document.getElementById('dealercard2').src = showdealercard2
        document.getElementById("dealer score").innerHTML = "Dealer's Score =" +dealer.Score
        winner="dealer"
        end(winner)
    }
    
}

function opponent()
{
    document.getElementById('dealercard2').src = showdealercard2
    document.getElementById("dealer score").innerHTML = "Dealer's Score =" +dealer.Score

    while(dealer.Score < player.Score && dealer.Score < 22)
    {
        let id="dealer"
        let random=Math.floor(Math.random() * deck.length)
        let card=deck.splice(random,1)
        dealer.Hand.push(card[0])
        show(card[0].Number, card[0].Suit,id,dealerHand.length)
        
        if (card[0].Number=="A")
        {
            dealer.Aces++
        }
        
        dealer.Score+=card[0].Value

        if(dealer.Score>21 &&dealer.Aces>0)
        {
        dealer.Score-=10
        dealer.Aces--
        }

        document.getElementById("dealer score").innerHTML = "Dealer's Score =" +dealer.Score;
    }

    if(dealer.Score>21||player.Score>dealer.Score)
    {
        winner="player"
        end(winner)
    }

    if(dealer.Score>player.Score&& dealer.Score<22)
    {
        winner="dealer"
        end(winner)
    }
    if(dealer.Score==player.Score)
    {
        winner="draw"
        end(winner)
    }

}

function turn()
{
    document.getElementById('dealercard2').src = showdealercard2 
}

function stay() //button
{
    turn()
    opponent()
}

function show(number,suit,id,count)
{
    if (id=="player")
    {
        if (count==1)
        {
            showplayercard1=suit+"/"+number+".jpg"
            document.getElementById('playercard1').src = showplayercard1
        }
        if (count==2)
        {
            showplayercard2=suit+"/"+number+".jpg"
            document.getElementById('playercard2').src = showplayercard2
        }
        if (count==3)
        {
            showplayercard3.src = suit+"/"+number+".jpg"
            showplayercard3.style.display="inline"
        }
        if (count==4)
        {
            showplayercard4.src = suit+"/"+number+".jpg"
            showplayercard4.style.display="inline"
        }
        if (count==5)
        {
            showplayercard5.src = suit+"/"+number+".jpg"
            showplayercard5.style.display="inline"
        }
        if (count==6)
        {
            showplayercard6.src = suit+"/"+number+".jpg"
            showplayercard6.style.display="inline"
        }
    }
    if (id=="dealer")
    {
        if (count==1)
        {
            showdealercard1=suit+"/"+number+".jpg"
            document.getElementById('dealercard1').src = showdealercard1
        }
        if (count==2)
        {
            showdealercard2=suit+"/"+number+".jpg"
        }
        if (count==3)
        {
            showdealercard3.src = suit+"/"+number+".jpg"
            showdealercard3.style.display="inline"
        }
        if (count==4)
        {
            showdealercard4.src = suit+"/"+number+".jpg"
            showdealercard4.style.display="inline"
        }
        if (count==5)
        {
            showdealercard5.src = suit+"/"+number+".jpg"
            showdealercard5.style.display="inline"
        }
        if (count==6)
        {
            showdealercard6.src = suit+"/"+number+".jpg"
            showdealercard6.style.display="inline"
        }
    } 
}

function end(winner)
{
    $("#test").dialog()
    
    if(winner=="player"){
        document.getElementById('test1').innerHTML = "You have "+player.Score+" and the dealer has "+dealer.Score+", you win! :)"
    }
    if(winner=="dealer"){
        document.getElementById('test1').innerHTML ="You have "+player.Score+" and the dealer has "+dealer.Score+", the dealer wins :("
    }
    if(winner=="draw"){
        document.getElementById('test1').innerHTML ="You both have " +player.Score+ ", a draw means the dealer wins :("
    }
    h.style.display="none"
    s.style.display="none"
}

function reset()
{
    location.reload()
}




