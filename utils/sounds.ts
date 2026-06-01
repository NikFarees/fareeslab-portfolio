let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx || ctx.state === "closed") ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playKeyClick() {
  try {
    const c = ac();
    const now = c.currentTime;

    // Very short white-noise burst — real keyboard clicks are transient noise, not tones
    const frames = Math.floor(c.sampleRate * 0.012);
    const buf = c.createBuffer(1, frames, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

    const noise = c.createBufferSource();
    noise.buffer = buf;

    // Bandpass around 3 kHz — the "tick" frequency of a mechanical switch
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(0.8, now);

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);

    noise.start(now);
    noise.stop(now + 0.012);
  } catch {}
}

export function playQuack() {
  try {
    const audio = new Audio("/sound/quack.mp3");
    audio.volume = 0.8;
    audio.play();
  } catch {}
}

export function playConfettiSound() {
  try {
    const audio = new Audio("/sound/confetti-pop.mp3");
    audio.volume = 0.9;
    audio.currentTime = 0;
    audio.play();
  } catch {}
}
