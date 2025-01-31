# workshop_8

link to website: https://siennabienna.github.io/workshop_8/

# Things I looked at in this Workshop
- finding my IP Adress using ipify
- finding an API and learning to gather data from it for code
- using `fetch` and `await`
- using `window.location.reload()`
- creating an interactive sketch using an API

# Finding my IP Adress as practice of using an API

I first opened the ipify website and found the json API URL. I then made a simple sketch that would allow me to see my IP, to check I was retrieving the data correctly.

```js
let ip;
let ip_api = 'https://api.ipify.org?format=json';
async function getIP() {
  let data = await fetch(ip_api);
  let j_data = await data.json(); 
ip j_data.ip;
}
function setup() {
  createCanvas(400, 400);
  getIP();
}
function draw() {
  background(220);
  text(ip, 20, 100);
}
```

It appeared in my sketch perfectly, so I felt I was ready to start using a bigger API to make an interactive sketch.

# Finding an API to use

I looked at a few APIs that looked really interesting online, and I eventually decided on Deck of Cards API. I was going to code a magic trick.

https://deckofcardsapi.com/

I planned the order of how this would work:
1. A draw a card page with a button
2. A 'this is your card' page
3. A shuffling `setTimeout` page
4. a revel page

The twist of the magic trick is that the card that we show back is always correct. Proof that code is magic.

# Starting my Magic Trick Sketch

I first made a background using a google drawing.

![image](https://github.com/user-attachments/assets/ff6caa18-183c-4863-8e2d-291a733cccf4)

Then I inserted this into VSCode and put it into a mainscreen function that I made.

```js
function mainScreen() {
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
```

Next, I had to figure out how to get a random card from the API. I found the draw card function that would allow me to generate a random card everytime the `drawCardButton` is pressed.

https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2 

I put this into my code.

```js
async function drawCard() {
  image(starScreen, 0, 0);
  drawCardButton.hide();
  let drawCardRequest = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
  let hand = await drawCardRequest.json();
}
```
After it had selected a random card from the API, I had to show it on screen. However, when I attepted ths, the new screen would show before the card had loaded onto it. To get some help problemsolving this, I asked my friend Ghen about it, and he showed me how to use a callback funtion.

```js
cardImage = (hand.cards[0].image, () => {
    image(cardImage, 110, 65, cardImage.width * scale, cardImage.height * scale);

    textSize(20)
    text("memorise your card", 200, 40);
    putBackButton = createButton("put it back in the deck")
    putBackButton.position(125, 335);
    putBackButton.mousePressed(magic);
  });
```
This made sure that the new screen wouldn't appear until the image of the card had loaded. I was very happy with how this was looking, and so I moved onto the next screen. This just used `setTimeout` to show a few pieces of text before the card would be revealed again.

```js
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
```

Next, I did the reveal page. This would just use the same random card from the first screen, minus `fetch`, as I didn't want to generate a new card. I then added a button that would allow for the page to be refreshed, which I took from this p5 project by lucwhite:

https://editor.p5js.org/lucwhite/sketches/zmlPLWgWZ

```js
function bigReveal() {
  image(starScreen, 0, 0);
  text("is this your card?", 200, 40);
  image(cardImage, 110, 65, cardImage.width * scale, cardImage.height * scale);
  omgButton = createButton("Oh My! How did you know?!")
  omgButton.position(110, 335);
  omgButton.mousePressed(() => {
    window.location.reload();
  })
}
```

# Ideas for Further Development
- Create some sort of shuffling animation using images of the back of cards
- Experiement with a more complex card trick/game using the API - perhaps the game 'last card' (if I had lots of time)
- Create a different magic trick sketch, maybe a ball under one of three cups and the user can guess which cup it's under
- Make it interactive - the user has to physically pick out the card themself
- Use more funtions other than just the draw a card funtion to create a more immersive magic trick
