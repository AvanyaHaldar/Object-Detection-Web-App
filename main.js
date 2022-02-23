status = "";
objects = [];

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);

}

function modelLoaded() {
  console.log("Cocossd Is Initialized");
  status = true;
  objectDetector.detect(img, gotResult);
}

function preload() {
  img = loadImage("dog_cat.jpg");
}

function draw() {
  image(img, 0, 0, 600, 500);

  /*fill("magenta");
  text("Dog", 300, 30);
  textSize(20);
  noFill();
  stroke("magenta");
  rect(270, 10, 250, 460);

  fill("purple");
  text("Cat", 110, 140);
  textSize(20);
  noFill();
  stroke("purple");
  rect(70, 110, 190, 370);*/

  if (status != "") {
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status :" + " Object Detected";
      percent = Math.floor(objects[i].confidence * 100);
      //console.log(percent);
      fill("red");
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke("red");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(result);
    objects = result;
  }
}