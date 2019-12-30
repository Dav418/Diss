var decks = [];
//todo 
//move this to be server side
class card {
    constructor(pos) {
        this.pos = pos;
        var type = "";
        var desc = "";
        var effect;
        Object.defineProperties(this, {
            getCardPos: {
                get: () => {
                    return pos;
                }
            },
            cardType: {
                get: () => {
                    return type;
                },
                set: (string) => {
                    type = string;
                }
            },
            cardDescryption: {
                get: () => {
                    return desc;
                },
                set: (string) => {
                    desc = string;
                }
            }
        });
    }
}

function deck(name){
    this.name = name;
    var cards = []

    Object.defineProperties(this,{
        addCard:{
            set: (card)=>{
                cards.push(card);
            }
        },
        getDeck:{
            get: ()=>{
                return cards;
            }
        },
        getName: {
            get: ()=>{
                return this.name;
            }
        }
    })
}


function generateDecks(){
    for(var i = 0; i < 2;i++){
        console.log("i: "+ i);
        if (i == 0){
            var chance = new deck("Chance");
            console.log("Chance deck created!");
            //generateChanceCards(chance);
            //testCardGen(chance);
            decks.push(chance);
        }else{
            var cc = new deck("Community Chest");
            console.log("Cumminity Chest deck created!");
            testCardGen(cc);
            decks.push(cc);
        }
    }

    console.log("Decks created!")
    
}

function testCardGen(deck){
    var c = new card(1);
    deck.addCard = c;
    c.cardType = "Trap card";
    c.cardDescryption = "Test card! \n <i>Good job dud</i>";
    c.effect = function(){
        alert("Wow you have big brain!");
    }

    console.log("Test card created!")

}

function useTestCard(id){
    console.log("Calling test card")
    decks.forEach(ele => { // loop through the decks list
        console.log("Looking for that card in the " + ele.getName+ " deck")
        var d = ele.getDeck; // get the actual deck
        d.forEach(element => { // loop through all the cards in that deck
            if(element.getCardPos == id){ // calling by position, since its the only one 
                console.log("Found the card in " + ele.getName + "!")
                console.log("Card type: " + element.cardType);
                console.log("Card description: ")
                console.log(ele.cardDescryption);
                element.effect();
            }
        })
    });
}

function generateChanceCards(deck){
    for(var j =0; j < 15; j++){ // make 16 cards in each deck
        var card = new card(j);
        deck.push(card);
        var rand = Math.floor(Math.random() * 6) + 1;
        switch(rand){
            case 1:
                card.cardType = "Cheat";
                generateCheat(card);
            break;

            case 2:
                generateJail(card);
            break;

            case 3:
                generateMovePlayer(card);
            break;

            case 4:
                generateDiscount(card);
            break;

            case 5:
                generateLooseProp(card);
            break;

            case 6:
                generateLotto(card);
            break;
        }
    }

}

function generateCheat(card){
    var rand = Math.floor(Math.random() * 5) + 1;
    switch(rand){
        case 1:
            card.cardDescryption = "Move x places f/b (random!)";
            card.effect = function(playerID){
                var randMove = Math.floor(Math.random() * 6) + 1; //move by ramdMove
                var randFowBac = Math.floor(Math.random() * 2) + 1; // 1 for foward, 2 for back
                if(randFowBac == 1){
                    randMove = randMove * -1;
                }
                movePlayer(playerID, randMove);
            }
        break;

        case 2:
            card.cardDescryption = "Lucky you! Roll again.";
            card.effect = function(playerID){
                // allow to click the dice again
            }
        break;

        case 3:
            card.cardDescryption = "Send a player of your choice to jail!";
            card.effect = function(){
                $("#jailDailog").dialog();
            }
        break;

        case 4:
            card.cardDescryption = "You bid so loud that you get the property! \n *Only usable during a auction*";
            card.effect = function(){
                //buy the proerty for its sell value
            }

        break;

        case 5:
            card.cardDescryption = "You have mastered the power of teleportation \n But only for one use \n *Swap places with a player of your choice, \n only works AFTER your turn roll*";
            card.effect = function(playerID){
                $("#posSwapDailog").dialog();
            }
            break;
    }
}

function generateCommunityCards(deck){

}

function generateQuest(card){
    

}