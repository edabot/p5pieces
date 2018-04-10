var img; // Declare variable 'img'.
var pixelArray = [];
var newPixels = [];
var ready = false,
  done = false;

// MODES
// 0 = rows
// 1 = columns
const mode = 0;

// threshold for starting to sort. Higher #s sort earlier
var blackThreshold = 100;

function setup() {
  createCanvas(720, 405);
  img = loadImage('assets/moonwalk.jpg'); // Load the imageloadPixels();
  slider = createSlider(10, 500, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function rgbaArrayToPixelArray(array) {
  let pixelArray = [];
  for (let i = 0; i < array.length / 4; i++) {
    pixelArray[i] = [
      array[i * 4],
      array[i * 4 + 1],
      array[i * 4 + 2],
      array[i * 4 + 3]
    ];
  }
  return pixelArray;
}

function pixelValue(pixel) {
  return pixel[0] + pixel[1] + pixel[2];
}

function comparePixels(b, a) {
  if (pixelValue(a) < pixelValue(b)) {
    return -1;
  }
  if (pixelValue(a) > pixelValue(b)) {
    return 1;
  }
  return 0;
}

function sortPixelArray(array) {
  return array.sort(comparePixels);
}

function sortWholeRow(row) {
  return sortRgbaArray(row);
}

function isBlack(pixel) {
  return pixelValue(pixel) < slider.value();
}

function sortBlackMode(array) {
  let result = [],
    subset = [];
  for (var i = 0; i < array.length; i++) {
    subset = subset.concat([array[i]]);
    if (isBlack(array[i])) {
      result = result.concat(sortPixelArray(subset));
      subset = [];
    }
  }

  result = result.concat(subset);
  return result;
}

const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

const transposeArray = function(arr, rows, cols) {
  let result = [];
  for (let row = 0; row < cols; row++) {
    for (let col = 0; col < rows; col++) {
      let oldIndex = col * cols + row;
      result.push(arr[oldIndex]);
    }
  }
  return result;
};

function draw() {
  image(img, 0, 0);
  loadPixels();

  pixelArray = rgbaArrayToPixelArray(pixels);

  if (
    pixels[0] !== 0 &&
    pixels[1] !== 0 &&
    pixels[2] !== 0 &&
    pixels[3] !== 0
  ) {
    ready = true;
  }

  if (ready && !done && mode == 0) {
    for (var i = 0; i < height; i++) {
      console.log(`row: ${i}`);
      let row = pixelArray.slice(width * i, width * (i + 1));
      newPixels = newPixels.concat(sortBlackMode(row));
    }
    newPixels = flatten(newPixels);
    done = true;
  }

  if (ready && !done && mode == 1) {
    pixelArray = transposeArray(pixelArray, height, width);
    for (var i = 0; i < width; i++) {
      console.log(`col: ${i}`);
      let col = pixelArray.slice(height * i, height * (i + 1));
      newPixels = newPixels.concat(sortBlackMode(col));
    }
    newPixels = transposeArray(newPixels, width, height);
    newPixels = flatten(newPixels);
    done = true;
  }

  for (var i = 0; i < pixels.length; i++) {
    pixels[i] = newPixels[i];
  }

  if (slider.value() !== blackThreshold) {
    blackThreshold = slider.value();
    done = false;
  }

  updatePixels();
  // if (done) {
  //   noLoop();
  // }
  // console.log(newPixels.length);
}
