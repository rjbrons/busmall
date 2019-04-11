'use strict';

// Data declarations
let timesClicked = 0;
let products = [];
let previousNums = [];
//array for image data [ [imageName, source], ..... ]
let images = [
  ['bag', './img/bag.jpg'],
  ['banana', './img/banana.jpg'],
  ['bathroom', './img/bathroom.jpg'],
  ['boots', './img/boots.jpg'],
  ['breakfast', './img/breakfast.jpg'],
  ['bubblegum', './img/bubblegum.jpg'],
  ['chair', './img/chair.jpg'],
  ['cthulhu', './img/cthulhu.jpg'],
  ['dog-duck', './img/dog-duck.jpg'],
  ['dragon', './img/dragon.jpg'],
  ['pen', './img/pen.jpg'],
  ['pet-sweep', './img/pet-sweep.jpg'],
  ['scissors', './img/scissors.jpg'],
  ['shark', './img/shark.jpg'],
  ['sweep', './img/sweep.png'],
  ['tauntaun', './img/tauntaun.jpg'],
  ['unicorn', './img/unicorn.jpg'],
  ['usb', './img/usb.gif'],
  ['water-can', './img/water-can.jpg'],
  ['wine-glass', './img/wine-glass.jpg']
];

let imgIds = ['one', 'two', 'three'];

// Behaviors
//constructor for image objects
function ImageObject(image) {
  this.name = image[0];
  this.src = image[1];
  this.viewed = 0;
  this.clicked = 0;

  products.push(this);
}
// populate products with image objects
getData();
//set up data for images
function getData() {
  if (localStorage.imageObjects) {
    let storedData = JSON.parse(localStorage.imageObjects);
    products = storedData;
  } else {
    images.forEach(value => new ImageObject(value));
  }
}

//function to store data
function storeProducts() {
  localStorage.imageObjects = JSON.stringify(products);
}

//function to place images in DOM
function getImageIndices() {
  //new set of numbers
  console.log('previous Nums ', previousNums);
  let newNums = [];
  while (newNums.length < 3) {
    let num = Math.floor(Math.random() * 20);
    console.log('temp num ', num);
    if (previousNums.includes(num) || newNums.includes(num)) {
      continue;
    } else {
      newNums.push(num);
    }
  }
  console.log('new nums ', newNums);
  previousNums = newNums;
  return newNums;
}

function swapImages() {
  let nums = getImageIndices();
  for (let i = 0; i < imgIds.length; i++) {
    let el = document.getElementById(imgIds[i]);
    el.alt = products[nums[i]].name;
    el.src = products[nums[i]].src;
    products[nums[i]].viewed += 1;
  }
  console.log(previousNums);
}

function countClicks(event) {
  if (event.target.id === 'one') {
    products[previousNums[0]].clicked += 1;
  } else if (event.target.id === 'two') {
    products[previousNums[1]].clicked += 1;
  } else if (event.target.id === 'three') {
    products[previousNums[2]].clicked += 1;
  }
}
function displayResults() {
  let parent = document.getElementById('results');
  products.forEach(function(product) {
    let child = document.createElement('p');
    child.innerText = `${product.name} was displayed ${
      product.viewed
    } times, and was clicked ${Math.round(
      (product.clicked / product.viewed) * 100
    )}% of the time.`;
    parent.appendChild(child);
  });
  displayChart();
}

function getChartData() {
  let viewedData = [];
  let clickedData = [];
  let chartLabels = [];
  products.forEach(function(item) {
    viewedData.push(item.viewed);
    clickedData.push(item.clicked);
    chartLabels.push(item.name);
  });
  return [chartLabels, viewedData, clickedData];
}

function displayChart() {
  let context = document.getElementById('chart').getContext('2d');
  let data = getChartData();
  console.log('retrieved data ', data);
  console.log('this ran');
  let myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: data[0],
      datasets: [
        {
          label: 'product selection rate',
          data: data[2],
          backgroundColor: [
            'rgba(123, 104, 238, 0.5)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(173, 255, 47, 0.5)',
            'rgba(210, 105, 30, 0.5)',
            'rgba(255, 165, 0, 0.5)',
            'rgba(0, 191, 255, 0.5)',
            'rgba(255, 0, 255, 0.5)',
            'rgba(0, 255, 127, 0.5)',
            'rgba(238, 130, 238, 0.5)',
            'rgba(255, 255, 0, 0.5)',
            'rgba(0, 128, 0, 0.5)',
            'rgba(255, 215, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(192, 192, 192, 0.5)',
            'rgba(75, 0, 130, 0.5)',
            'rgba(255, 228, 225, 0.5)',
            'rgba(165,42,42,.5)',
            'rgba(240, 230, 140, 0.5)',
            'rgba(127, 255, 212, 0.5)',
            'rgba(47, 79, 79, 0.5)'
          ],
          borderColor: [
            'rgba(123, 104, 238, 1)',
            'rgba(255, 0, 1)',
            'rgba(173, 255, 47, 1)',
            'rgba(210, 105, 30, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(255, 0, 255, 1)',
            'rgba(0, 255, 127, 1)',
            'rgba(238, 130, 238, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(0, 128, 0, 1)',
            'rgba(255, 215, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(75, 0, 130, 1)',
            'rgba(255, 228, 225, 1)',
            'rgba(165,42,42,1)',
            'rgba(240, 230, 140, 1)',
            'rgba(127, 255, 212, 1)',
            'rgba(47, 79, 79, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'product display rate',
          data: data[1],
          backgroundColor: [
            'rgba(123, 104, 238, 0.5)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(173, 255, 47, 0.5)',
            'rgba(210, 105, 30, 0.5)',
            'rgba(255, 165, 0, 0.5)',
            'rgba(0, 191, 255, 0.5)',
            'rgba(255, 0, 255, 0.5)',
            'rgba(0, 255, 127, 0.5)',
            'rgba(238, 130, 238, 0.5)',
            'rgba(255, 255, 0, 0.5)',
            'rgba(0, 128, 0, 0.5)',
            'rgba(255, 215, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(192, 192, 192, 0.5)',
            'rgba(75, 0, 130, 0.5)',
            'rgba(255, 228, 225, 0.5)',
            'rgba(165,42,42,.5)',
            'rgba(240, 230, 140, 0.5)',
            'rgba(127, 255, 212, 0.5)',
            'rgba(47, 79, 79, 0.5)'
          ],
          borderColor: [
            'rgba(123, 104, 238, 1)',
            'rgba(255, 0, 1)',
            'rgba(173, 255, 47, 1)',
            'rgba(210, 105, 30, 1)',
            'rgba(255, 165, 0, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(255, 0, 255, 1)',
            'rgba(0, 255, 127, 1)',
            'rgba(238, 130, 238, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(0, 128, 0, 1)',
            'rgba(255, 215, 0, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(75, 0, 130, 1)',
            'rgba(255, 228, 225, 1)',
            'rgba(165,42,42,1)',
            'rgba(240, 230, 140, 1)',
            'rgba(127, 255, 212, 1)',
            'rgba(47, 79, 79, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
  });
  console.log(myChart);
}

// Execution
let elStart = document.getElementById('start');
elStart.addEventListener('click', function(event) {
  event.preventDefault();
  swapImages(); //initiate DOM with images.
  document.getElementById('images').style.display = 'block';
  document.getElementById('instructions').style.display = 'none';
});

let targetEl = document.getElementById('images');

targetEl.addEventListener('click', function(event) {
  if (event.target.id === 'images') {
    return;
  }
  countClicks(event);
  swapImages();
  timesClicked++;
  if (timesClicked >= 25) {
    let elImages = document.getElementById('images');
    let elResults = document.getElementById('results');
    elImages.style.display = 'none';
    elResults.style.display = 'block';
    displayResults();
    storeProducts();
  }
});
