let currentMode = null;
let currentElement = null;

const tracks = [
  { title: "Deep Focus", type: "study", genre: "lofi", src: "music1.mp3" },
  { title: "Work Flow", type: "work", genre: "ambient", src: "music2.mp3" },
  { title: "Chill Night", type: "chill", genre: "chill", src: "music3.mp3" },
  { title: "Sleep Calm", type: "sleep", genre: "sleep", src: "music4.mp3" }
];

function selectMode(mode) {
  currentMode = mode;

  document.getElementById("modeSelect").style.display = "none";
  document.getElementById("playerUI").classList.remove("hidden");

  startAutoPlay();
}

function startAutoPlay() {
  const filtered = tracks.filter(t => t.type === currentMode);

  if (filtered.length === 0) return;

  const random = filtered[Math.floor(Math.random() * filtered.length)];

  document.getElementById("status").innerText = "Now Playing (" + currentMode + ")";

  play(random.src);
  renderList(filtered);
}

function play(src, element = null) {
  const player = document.getElementById("player");

  player.src = src;
  player.play();

  if (currentElement) {
    currentElement.classList.remove("active");
  }

  if (element) {
    element.classList.add("active");
    currentElement = element;
  }
}

function renderList(list) {
  const container = document.getElementById("tracks");
  container.innerHTML = "";

  list.forEach(track => {
    const div = document.createElement("div");
    div.className = "track";

    div.innerHTML = `
      <div class="track-title">${track.title}</div>
      <div class="track-meta">${track.genre}</div>
    `;

    div.onclick = () => play(track.src, div);

    container.appendChild(div);
  });
    }
