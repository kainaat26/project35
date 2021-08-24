//Create variables here
var dog, dogImg, happydog,database, foodS , foodStock;
var lastFed, feedTime;
var foodObj;

function preload()
{
	//load images here
  happydog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
  
}

function setup() {
	createCanvas(500, 500);

 dog = createSprite(250,250,20,20);
dog.addImage(dogImg);
dog.scale = 0.25;

  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
  milk1 = new Food();
  milk1.visible = false;

  feed = createButton("feed the dog");
  feed.position(500,100);
  feed.mousePressed(Feedfood);
  
addfood = createButton("add milk");
addfood.position(600,100);
addfood.mousePressed(addFoood);

}


function draw() {  
  background("green")

  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254)
  textSize(15) 
  if(lastFed>=12){
  text("Last Feed : "+ lastFed%12+ "Pm",200,30);
  }else if(lastFed==0){
    text("Last Feed :12 AM",200,30);
  }else{
    text("Last Feed" + lastFed +"AM",180,30);
  }
  
  
  
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happydog)
  }
  drawSprites();
  //add styles here
milk1.display();
}
function readStock(data){
foodS = data.val();
//console.log("readvalue"+ foodS)
milk1.updateFoodStock(foodS);
}

function writeStock(x){
if(x=0){
  x=0;
}else{
  x=x -1
}

database.ref('/').update({
  food:x
})

}

function Feedfood(){
dog.addImage (happydog);

milk1.updateFoodStock(milk1.getFoodStock()-1);
database.ref('/').update({
  food: milk1.getFoodStock(),
  feedTime:hour()
})
}

function addFoood(){
  foodS++
  database.ref('/').update({
    food:foodS
  })
}



