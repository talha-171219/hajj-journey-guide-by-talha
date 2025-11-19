// Node script to open the sim page via Puppeteer, record the WebM base64 blob and save + convert to MP4 via ffmpeg.
// Requirements: `npm i puppeteer` and `ffmpeg` installed in PATH. Run `npm run dev` first to serve the app.

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

(async function(){
  const puppeteer = require('puppeteer');
  const SIM_URL = process.env.SIM_URL || 'http://localhost:8080/kaaba-sim.html';
  const OUT_DIR = path.resolve(__dirname, '../public/assets/videos');
  if(!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, {recursive:true});
  const webmPath = path.join(OUT_DIR, 'kaaba_sim.webm');
  const mp4Path = path.join(OUT_DIR, 'kaaba_sim.mp4');

  console.log('Opening', SIM_URL);
  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox'], defaultViewport: {width:1280, height:720}});
  try{
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    await page.goto(SIM_URL, {waitUntil:'networkidle2'});

    // wait for three.js scene to initialize
    console.log('Waiting for scene to initialize...');
    await page.waitForFunction('window.recordSimulation !== undefined');

    const duration = parseInt(process.env.DURATION || '25', 10);
    const fps = parseInt(process.env.FPS || '60', 10);
    console.log(`Recording ${duration}s at ${fps}fps`);

    const b64 = await page.evaluate(async (d, f) => {
      // call the recording helper on the page which returns base64 webm
      return await window.recordSimulation(d, f);
    }, duration, fps);

    console.log('Received base64, writing webm...');
    const buffer = Buffer.from(b64, 'base64');
    fs.writeFileSync(webmPath, buffer);
    console.log('Saved webm to', webmPath);

    // convert webm -> mp4 using ffmpeg
    console.log('Converting to mp4 (requires ffmpeg in PATH)...');
    try{
      child_process.execSync(`ffmpeg -y -i "${webmPath}" -c:v libx264 -preset veryfast -crf 18 "${mp4Path}"`, {stdio:'inherit'});
      console.log('MP4 saved to', mp4Path);
    }catch(err){
      console.error('ffmpeg conversion failed. WebM is saved at', webmPath);
    }

    await browser.close();
  }catch(err){
    console.error(err);
    await browser.close();
    process.exit(1);
  }
})();
