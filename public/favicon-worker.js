/**
 * Animated waveform favicon - draws a sine wave that animates over time.
 * Uses Web Worker so animation continues when tab is in background (Chrome/Edge).
 * Based on https://github.com/Aymkdn/animated-favicon
 */
const W = 16;
const H = 16;
let canvas;
let ctx;
let time = 0;
let intervalId;

self.onmessage = function (e) {
  if (e.data.type === "init") {
    canvas = new OffscreenCanvas(W, H);
    ctx = canvas.getContext("2d");
    startAnimation();
  } else if (e.data.type === "stop") {
    if (intervalId) clearInterval(intervalId);
  }
};

function drawWaveform() {
  ctx.clearRect(0, 0, W, H);

  // Background - match app background
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;
  const segmentCount = 24;
  const baseAmplitude = 4;
  const lineWidth = 1.5;

  // Multiple harmonics for natural audio-wave look (from sonic-waveform)
  const wave1 = (t) => Math.sin(t * 10 * Math.PI + time * 1.2) * baseAmplitude;
  const wave2 = (t) => Math.sin(t * 14 * Math.PI + time * 0.8 + 0.6) * baseAmplitude * 0.45;
  const wave3 = (t) => Math.sin(t * 6 * Math.PI + time * 0.5 + 0.35) * baseAmplitude * 0.3;

  // Envelope - taper at edges
  const envelope = (t) => Math.pow(1 - Math.abs(t - 0.5) * 2, 1.5);

  ctx.strokeStyle = "#222222";
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  for (let j = 0; j <= segmentCount; j++) {
    const t = j / segmentCount;
    const x = t * W;
    const y = cy + (wave1(t) + wave2(t) + wave3(t)) * envelope(t);

    if (j === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  time += 0.08;
  updateFavicon();
}

function updateFavicon() {
  canvas.convertToBlob({ type: "image/png" }).then((blob) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      self.postMessage({ type: "updateFavicon", dataUrl: reader.result });
    reader.readAsDataURL(blob);
  });
}

function startAnimation() {
  const fps = 12;
  intervalId = setInterval(drawWaveform, 1000 / fps);
}
