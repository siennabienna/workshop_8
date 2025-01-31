let ip;
let ip_api = 'https://api.ipify.org?format=json';
let intro, punchline;
let card_api = 'https://deckofcardsapi.com/apihttps://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2/deck/new/shuffle/?deck_count=1'
let currentCard;
let starScreen;
let cardSpread;

function preload(){
  starScreen = loadImage("starry_sky.jpg");
  cardSpread = loadImage("cardspread.png");
}

// async function getIP() {
//   let data = await fetch(ip_api);
//   let j_data = await data.json();
//   ip = j_data.ip;
// }
// 
// async function getCard() {
//   let data = await fetch(card_api);
//   let j_data = await data.json();
//   intro = j_data.setup;
//   punchline = j_data.delivery;
// }

function setup() {
  createCanvas(400, 400);
  // getIP();
  // setInterval(getCard, 5000);

  /*
  1. show the deck and button draw a card
  2. memorize and put back in deck
  3. shuffle deck (timeout scree thats like 2 seconds that says "shuffling the deck")
  timeout screen for like 2 secinds taht says "ready to see your card?"
  5. show that card again
  6. celebrate hurrah and huzzah
  */

  mainScreen();
}

function draw() {
  // background(0, 0, 64);
}

let drawCardButton, putBackButton;

function mainScreen(){
  image(starScreen, 0, 0);
  image(cardSpread, 45, 90, 300, 300);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15)
  text("want to see a magic trick?", 200, 100)
  drawCardButton = createButton("draw a card")
  drawCardButton.position(155, 335);
  drawCardButton.mousePressed(drawCard);
}

let cardImage;
let scale = 0.8;

async function drawCard() {
  image(starScreen, 0, 0);
  drawCardButton.hide();
  let drawCardRequest = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
  let hand = await drawCardRequest.json();
  
  cardImage = loadImage(hand.cards[0].image, () => {
    image(cardImage, 110, 65, cardImage.width*scale, cardImage.height*scale);
    textSize(20)
    text("memorise your card", 200, 40);
    putBackButton = createButton("put it back in the deck")
    putBackButton.position(125, 335);
    putBackButton.mousePressed(magic);
  });
}

function magic() {
  putBackButton.hide();
  image(starScreen, 0, 0);

  
  text("shuffling...", 200, 200);

  setTimeout(() => {
    image(starScreen, 0, 0);
  
    
    text("ready for your card to be guessed?", 200, 200);

    setTimeout(bigReveal, 2000);
  }, 5000);
}

function bigReveal() {
  image(starScreen, 0, 0);
  text("is this your card?", 200, 40);
  image(cardImage, 110, 65, cardImage.width*scale, cardImage.height*scale);
  omgButton = createButton("Oh My! How did you know?!")
  omgButton.position(110, 335);
  omgButton.mousePressed(() => {
    window.location.reload();
  })
}