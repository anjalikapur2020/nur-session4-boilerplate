var bgimg, bg;
var carrotseedimg, potatoseedimg
var gameState = "wait"

var storybutton, mutebutton, musicbutton, nextbutton, playbutton
var ground, groundimg, rand
var infobutton, ingredients, ingredientsGroup
var tomatoimg, eggimg, basilimg, roccaleavesimg, pizzasliceimg, cheeseimg, peproniimg, capsicumimg, mushroomimg, jalapenoimg, olivesimg, cornimg, onionimg
var chef, chefidleright, chefidleleft, chefgetright, chefgetleft,item,itemsGroup
var score = 0
var timer=10
var tableimg,table,kitchenscene,kitchensceneimg,cabinetimg,cabinet,kitchenchimneyimg,kitchenchimney

function preload() {
    bgimg = loadImage("assets/splash.gif");
    level2img = loadImage("assets/floor4.jpg")
    groundimg = loadImage("assets/level1bg.PNG")
  tableimg=loadImage("assets/table.png")
  kitchensceneimg=loadImage("assets/kitchentable.png")
    tomatoimg = loadImage("assets/ingredients/tomato.png")
    eggimg = loadImage("assets/ingredients/eggs.png")
    basilimg = loadImage("assets/ingredients/basil.png")
    roccaleavesimg = loadImage("assets/ingredients/roccaleaves.png")
    pizzasliceimg = loadImage("assets/ingredients/pizzaslice.png")
    cheeseimg = loadImage("assets/ingredients/cheese.png")
    peproniimg = loadImage("assets/ingredients/peproni.png")
    capsicumimg = loadImage("assets/ingredients/capsicum.png")
    mushroomimg = loadImage("assets/ingredients/mushroom.png")
    jalapenoimg = loadImage("assets/ingredients/jalapeno.png")
    olivesimg = loadImage("assets/ingredients/olives.png")
    cornimg = loadImage("assets/ingredients/corn.png")
    onionimg = loadImage("assets/ingredients/onion.png")

    chefidleright = loadImage("assets/ingredients/chefidleright.gif")
    chefidleleft = loadImage("assets/ingredients/chefidleleft.gif")
    chefgetright = loadImage("assets/ingredients/chefgetright.gif")
    chefgetleft = loadImage("assets/ingredients/chefgetleft.gif")

    cabinetimg=loadImage("assets/cabinet1.jpg")
    kitchenchimneyimg=loadImage("assets/kitchenchimney.png")



}


function setup() {
    createCanvas(windowWidth, windowHeight)
    playbutton = createImg("assets/play.png")
    playbutton.position(width - 160, height / 2)

    musicbutton = createImg("assets/music.png")
    musicbutton.position(width - 160, height / 2 + 130)

    mutebutton = createImg("assets/mute.png")
    mutebutton.position(width - 170, height / 2 + 145)
    mutebutton.hide()

    nextbutton = createImg("assets/rightarrow.gif")
    nextbutton.position(width - 100, height - 150)
    nextbutton.size(100, 100)
    nextbutton.hide()

    infobutton = createImg("assets/ingredients2.gif")
    infobutton.position(0, 0)
    infobutton.size(width, height)
    infobutton.hide()

    ground = createSprite(width / 2, height / 2)
    ground.addImage(groundimg)
    ground.visible = false
    ground.scale = 1.75
    // groundimg.resize(width*1.5,height)
    ground.velocityX = -3
    ground.x = ground.width / 2

    // character
    chef = createSprite(150, height - 180)
    chef.addImage("idleleft", chefidleleft)
    chef.addImage("idleright", chefidleright)
    chef.addImage("chefgetleft", chefgetleft)
    chef.addImage("chefgetright", chefgetright)
    chef.visible = false
    chef.scale = 1.75


// level 2 sprites
kitchenscene=createSprite(width/3.2,height-height/4)
kitchenscene.addImage(kitchensceneimg)
kitchenscene.scale=1.2
kitchenscene.visible=false

table=createSprite(width-width/6,height-150)
table.addImage(tableimg)
table.scale=0.5
table.visible=false

cabinet=createSprite(width/2,190)
cabinet.addImage(cabinetimg)
cabinet.scale=1
cabinet.visible=false


kitchenchimney=createSprite(width/8,150)
kitchenchimney.addImage(kitchenchimneyimg)
kitchenchimney.scale=0.75
kitchenchimney.visible=false



    ingredientsGroup = new Group
itemsGroup=new Group


}

function draw() {

    if(chef.x>width-50){
        chef.x=0
    }
    if(chef.x<0){
        chef.x=width-50
    }

    if (gameState === "wait") {
        background(bgimg)
        nextbutton.hide()
    }

    playbutton.mousePressed(() => {
        playbutton.hide()
        infobutton.show()

    })



    infobutton.mousePressed(() => {
        gameState = "Level1"
        playbutton.hide()
        infobutton.hide()

    })



    musicbutton.mousePressed(() => {
        musicbutton.hide()
        mutebutton.show()
    })

    mutebutton.mousePressed(() => {
        musicbutton.show()
        mutebutton.hide()
    })


    if (gameState === "Level1") {
        ground.visible = true
        mutebutton.hide()
        musicbutton.hide()
        if (ground.x < 0) {
            ground.x = ground.width / 2
        }
        spawnIngredients()
        chef.visible = true

        ingredientsGroup.overlap(chef, explosion);



// timer codes
if (frameCount % 60 == 0 && timer > 0) { 
    timer --;
  }
  if (timer == 0) {
    gameState="over"
  }

if(score==2 && timer >=0){
    ingredientsGroup.destroyEach()
    level1Won()
}


    }



    if(gameState==="Level2"){
        background(level2img)
        chef.visible=false
        ground.visible=false
        kitchenscene.visible=true
        table.visible=true
        cabinet.visible=true
        kitchenchimney.visible=true
        setInterval(displayVeggies,2000)
        spawnItems()


    }

    drawSprites()


    if(gameState==="over"){
        // textSize(80)
        // text("GAME OVER",100,height/2)
        timeOver()
        ground.velocityX=0
        chef.changeImage("idleright", chefidleright)
    }



    if (gameState === "Level1") {
        fill("blue")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Items Collected : " + score, width - 250, 50)

        textSize(40)
        stroke(0)

        fill("red")
        strokeWeight(6)

        text(gameState, width / 2 - 100, 50)

        fill("blue")
        stroke("red")
        strokeWeight(2)
        textSize(20)
        text("Time Left : "+timer,100,50)
    }

}


function spawnIngredients() {



    if (frameCount % 120 == 0) {
        var randX = Math.round(random(100, width - 100))
        ingredients = createSprite(randX, 0)
        ingredients.velocityY = 4
        ingredients.scale = 0.5


        rand = Math.round(random(1, 13))
        switch (rand) {
            case 1: ingredients.addImage(onionimg)
                break;

            case 2: ingredients.addImage(olivesimg)
                break;

            case 3: ingredients.addImage(mushroomimg)
                break;

            case 4: ingredients.addImage(roccaleavesimg)
                break;

            case 5: ingredients.addImage(cheeseimg)
                break;

            case 6: ingredients.addImage(cornimg)
                break;

            case 7: ingredients.addImage(capsicumimg)
                break;

            case 8: ingredients.addImage(pizzasliceimg)
                break;

            case 9: ingredients.addImage(peproniimg)
                break;

            case 10: ingredients.addImage(basilimg)
                break;

            case 11: ingredients.addImage(jalapenoimg)
                break;

            case 12: ingredients.addImage(eggimg)
                break;

            case 13: ingredients.addImage(tomatoimg)
                break;

            default: break;


        }

        ingredientsGroup.add(ingredients)

    }
}


//collect ingredients
function explosion() {
    ingredientsGroup.destroyEach()
    score++;
    chef.changeImage("chefgetright", chefgetright)
}


//   movement function
function keyPressed() {

    if (keyCode === RIGHT_ARROW) {
        chef.velocityX = 5
        chef.velocityY = 0
        // chef.changeImage("chefgetright", chefgetright)
        chef.changeImage("idleright",chefidleright)


    }
    if (keyCode === LEFT_ARROW) {
        chef.velocityX = -5
        chef.velocityY = 0
        chef.changeImage("idleleft",chefidleleft)

        // chef.changeImage("chefgetleft",chefgetleft)
    }


    if (keyCode === UP_ARROW) {
        chef.velocityY= -10
        chef.velocityX = 0
        // chef.changeImage("chefgetright", chefgetright)
        chef.changeImage("idleright",chefidleright)

    }

    if (keyCode === DOWN_ARROW) {
        chef.velocityY=10
        chef.velocityX = 0
        // chef.changeImage("chefgetright", chefgetright)
        chef.changeImage("idleright",chefidleright)

    }


}

function keyReleased() {


    if (keyCode === LEFT_ARROW) {
        chef.velocityX = 0
        chef.velocityY = 0
        chef.changeImage("idleleft",chefidleleft)
    }
    if (keyCode === RIGHT_ARROW) {
        chef.velocityX = 0
        chef.velocityY = 0
        chef.changeImage("idleright",chefidleright)

    }

    if (keyCode === UP_ARROW) {
        chef.velocityY= 0
        chef.velocityX = 0
        // chef.changeImage("chefgetright", chefgetright)
        chef.changeImage("idleright",chefidleright)

    }

    if (keyCode === DOWN_ARROW) {
        chef.velocityY= 0
        chef.velocityX = 0
        // chef.changeImage("chefgetright", chefgetright)
        chef.changeImage("idleright",chefidleright)

    }

}


// //gameover function
function timeOver() {

    swal(
        {

            title: `Game Over!!!`,
            text: "Time Over!! Better Luck Next Time!!!",
            imageUrl: "assets/ingredients/timeup.png",
            imageSize: "250x250",
            confirmButtonText: "Restart",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    )
}


// //level 1 won function
function level1Won() {

    swal(
        {

            title: `KUDOS You WON!!!`,
            text: "Now you are a Chef.. Show Your Skills. Find Ingredients and make a Dish!!!",
            imageUrl: "assets/burger.png",
            imageSize: "250x250",
            confirmButtonText: "LEVEL 2",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            if (isConfirm) {
gameState="Level2"            }
        }
    )
}




// LEVEL 2 items
function spawnItems(){
    if(frameCount%100==0){
        item=createSprite(Math.round(random(50,width-50)),Math.round(random(50,height-50)))

        itemsGroup.add(item)
    }
}


// level 2 display veggies
function displayVeggies(){
itemsGroup.destroyEach()
}