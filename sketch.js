let bobaImg;
let bobaData;
let bobaMap;

let cityPositions = []; 
let cityRadius = 70;  
let shopPositions = []; 

function preload() {
    bobaImg = loadImage('images/boba.png');  
    bobaData = loadJSON('bobaShops.json'); 
    bobaMap = loadImage('images/bayareamap.png') 
}

function setup() {
    createCanvas(900, 1000); 
    console.log(bobaData);

    cityPositions = [
        { name: "Alameda", x: 250, y: 410, cityColor: [144, 238, 144,120], shopColor: [111, 78, 55] }, 
        { name: "Berkeley", x: 300, y: 180, cityColor: [255,165,0,120], shopColor: [111, 78, 55] },  
        { name: "Hayward", x: 680, y: 730, cityColor: [250, 95, 85, 120], shopColor: [111, 78, 55] }, 
        { name: "San Leandro", x: 510, y: 560, cityColor: [218,112,214, 120], shopColor: [111, 78, 55] }  
    ];

    for (let i = 0; i < cityPositions.length; i++) {
        let city = cityPositions[i];
        let cityData = bobaData[city.name];
        shopPositions[i] = [];

        for (let j = 0; j < cityData.length; j++) {
            let shop = cityData[j];
            let angle = random(TWO_PI); 
            let distanceFromCenter = random(0.3 * cityRadius, 0.7 * cityRadius); 
            
            //positions of shop circles
            let shopX = city.x + cos(angle) * distanceFromCenter; 
            let shopY = city.y + sin(angle) * distanceFromCenter;

            //shop size based on rating
            shopPositions[i].push({ x: shopX, y: shopY, size: map(shop.rating, 1, 5, 10, 30), shop: shop });
        }
    }
}

function draw() {
    //bobamapbackground
    background(bobaMap, 900, 1000)

    //star rating
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text(' = 1 star', 85, 840);
    image(bobaImg, 45, 800, 50, 50)

    //bottom instructions
    fill(255, 110, 0);
    textSize(20);
    textAlign(LEFT);
    text('Hover on a point to read more!', 60, 900);

    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Refresh the page to see the data move', 60, 930);

    for (let i = 0; i < cityPositions.length; i++) {
        let city = cityPositions[i];

        //city circle
        drawingContext.filter = 'blur(10px)';
        fill(city.cityColor);  
        noStroke();
        ellipse(city.x, city.y, cityRadius * 2, cityRadius * 2);  

        drawingContext.filter = 'none';

       //city name
        fill(0);
        textSize(16);
        textAlign(CENTER);
        text(city.name, city.x, city.y - cityRadius - 10);

        
for (let j = 0; j < shopPositions[i].length; j++) {
  let shopData = shopPositions[i][j];  

  //boba shop circle
  fill(city.shopColor);  
  ellipse(shopData.x, shopData.y, shopData.size, shopData.size);

  //hovering over shop circle
  if (dist(mouseX, mouseY, shopData.x, shopData.y) < shopData.size / 2) {
    
      //information box
      fill(255);  
      noStroke();
      rectMode(CENTER);
      rect(shopData.x, shopData.y - 20, 150, 60, 15);

      //boba shop info
      fill(0);
      textSize(12);
      textAlign(CENTER);
      text(`${shopData.shop.name}\n(${shopData.shop.rating} stars, ${shopData.shop.review_count} reviews)`, shopData.x, shopData.y - 30);

      //boba rating image
      for (let r = 0; r < Math.floor(shopData.shop.rating); r++) {
          image(bobaImg, shopData.x + r * 20 - 10, shopData.y - 8, 22, 22);  
      }
  }
}

    }
}
