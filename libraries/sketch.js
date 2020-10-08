function setup(){
  createCanvas(windowWidth,windowHeight);
  sound = new p5.AudioIn();
  sound.start();
  fft = new p5.FFT();
  sound.connect(fft);
  }

function touchStarted() { getAudioContext().resume(); } 
  
function draw() {
 if (getAudioContext().state !== 'running') {
    background(220);
    text('tap here and enable mic to begin', 10, 20, width - 20);
    return;
  }
  let centroidplot = 0.0;
  let spectralCentroid = 0;
  
  background(0);
  stroke(0,255,0);
  let spectrum = fft.analyze();
  fill(0,255,0); // spectrum is green
  
  //draw the spectrum
  for (let i = 0; i < spectrum.length; i++){
    let x = map(log(i), 0, log(spectrum.length), 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    let rectangle_width = (log(i+1)-log(i))*(width/log(spectrum.length));
    rect(x, height, rectangle_width, -h )
  }
  let nyquist = 22050;
  
  // get the centroid
  spectralCentroid = fft.getCentroid();
  
  // the mean_freq_index calculation is for the display.
  let mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
  
  centroidplot = map(log(mean_freq_index), 0, log(spectrum.length), 0, width);
  
  stroke(255,0,0); // the line showing where the centroid is will be red

  rect(centroidplot, 0, width / spectrum.length, height)
  noStroke();
  fill(255,255,255);  // text is white
  text('centroid: ', 10, 20);
  text(round(spectralCentroid)+' Hz', 10, 40);

  var lvl= fft.getCentroid();

  if (lvl > 15000) {
  fill(255,0,0);
  rect(100,100,10,10)
  noLoop();
  }
}
  