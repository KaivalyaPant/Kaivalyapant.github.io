const ui = {
  hp: document.querySelector("#hp"),
  wave: document.querySelector("#wave"),
  trace: document.querySelector("#trace"),
  itPing: document.querySelector("#itPing"),
  message: document.querySelector("#message"),
  clock: document.querySelector("#clock"),
  fileCount: document.querySelector("#fileCount"),
  fileGrid: document.querySelector("#fileGrid"),
  terminalLog: document.querySelector("#terminalLog"),
  commandForm: document.querySelector("#commandForm"),
  commandInput: document.querySelector("#commandInput"),
  terminalApp: document.querySelector("#terminalApp"),
  closeTerminal: document.querySelector("#closeTerminal"),
  taskTerminal: document.querySelector("#taskTerminal"),
  scannerApp: document.querySelector("#scannerApp"),
  closeScanner: document.querySelector("#closeScanner"),
  taskScanner: document.querySelector("#taskScanner"),
  scanRemote: document.querySelector("#scanRemote"),
  scannerOutput: document.querySelector("#scannerOutput"),
  notepadApp: document.querySelector("#notepadApp"),
  closeNotepad: document.querySelector("#closeNotepad"),
  taskNotepad: document.querySelector("#taskNotepad"),
  mailApp: document.querySelector("#mailApp"),
  closeMail: document.querySelector("#closeMail"),
  taskMail: document.querySelector("#taskMail"),
  mailToast: document.querySelector("#mailToast"),
  mailLoading: document.querySelector("#mailLoading"),
  mailMessage: document.querySelector("#mailMessage"),
  mailMeter: document.querySelector("#mailMeter"),
  mailLoadText: document.querySelector("#mailLoadText"),
  desktopClock: document.querySelector("#desktopClock"),
  restart: document.querySelector("#restart")
};

const attacks = [
  {
    name: "BRUTE FORCE LOGIN",
    prompt: "Password hammer detected on ADMIN account.",
    command: "block",
    damage: 14,
    hint: "Use block to close the port."
  },
  {
    name: "TROJAN FILE DROP",
    prompt: "Unknown .EXE copied into SYSTEM32.",
    command: "scan",
    damage: 12,
    hint: "Use scan before it hides."
  },
  {
    name: "BOOT SECTOR VIRUS",
    prompt: "Virus signature writing itself to boot sector.",
    command: "purge",
    damage: 18,
    hint: "Use purge to delete active malware."
  },
  {
    name: "ZERO-DAY EXPLOIT",
    prompt: "Exploit opened a hole in the network driver.",
    command: "patch",
    damage: 16,
    hint: "Use patch to close the exploit."
  },
  {
    name: "SPOOFED ROUTE",
    prompt: "Attacker is bouncing through fake addresses.",
    command: "spoof",
    damage: 10,
    hint: "Use spoof to confuse the fake route."
  },
  {
    name: "RANSOMWARE LOCK",
    prompt: "Personal files are being encrypted one by one.",
    command: "decrypt",
    damage: 20,
    hint: "Use decrypt to break the lock."
  },
  {
    name: "FILE WIPE SCRIPT",
    prompt: "Deletion script targeting your backup folder.",
    command: "backup",
    damage: 18,
    hint: "Use backup to restore files."
  },
  {
    name: "BOTNET FLOOD",
    prompt: "Hundreds of infected machines are hitting one port.",
    command: "isolate",
    damage: 17,
    hint: "Use isolate to cut off the port."
  },
  {
    name: "ROOTKIT BEACON",
    prompt: "Hidden rootkit is calling home from memory.",
    command: "trace",
    damage: 15,
    hint: "Use trace to find the source."
  }
];

const taunts = [
  "HACKER: nice little machine you have here.",
  "HACKER: type faster. i am already in.",
  "HACKER: your firewall looks tired.",
  "HACKER: i can hear that old hard drive screaming.",
  "HACKER: defend one port, i open three more.",
  "HACKER: this desktop belongs to me now.",
  "HACKER: wrong command and i eat another file."
];

const openings = [
  {
    name: "EXPOSED MODEM BUFFER",
    prompt: "His dial-up modem buffer is exposed.",
    command: "ping",
    damage: 18,
    hint: "Use ping to hammer the modem."
  },
  {
    name: "OPEN REMOTE SHELL",
    prompt: "A forgotten command shell is open on his side.",
    command: "inject",
    damage: 24,
    hint: "Use inject to send a counter-script."
  },
  {
    name: "PACKET RELAY LOOP",
    prompt: "His packet relay is repeating traffic.",
    command: "jam",
    damage: 20,
    hint: "Use jam to flood the relay."
  },
  {
    name: "MEMORY LEAK",
    prompt: "His attack tool is leaking memory.",
    command: "crash",
    damage: 28,
    hint: "Use crash to overload it."
  },
  {
    name: "EXPOSED IP ADDRESS",
    prompt: "Scanner found his public IP: 198.51.100.77.",
    command: "spoofip",
    damage: 22,
    hint: "Use spoofip to poison the route."
  },
  {
    name: "VISIBLE MAC ADDRESS",
    prompt: "Scanner found his network card MAC: 00-16-3E-7A-22-91.",
    command: "clone",
    damage: 21,
    hint: "Use clone to impersonate the card."
  },
  {
    name: "OPEN FILE SHARE",
    prompt: "His C:\\WARROOM\\FILES share is open.",
    command: "wipe",
    damage: 26,
    hint: "Use wipe to delete his attack files."
  },
  {
    name: "ATTACK PROCESS",
    prompt: "Process VIRUS_LAUNCHER.EXE is visible.",
    command: "kill",
    damage: 24,
    hint: "Use kill to terminate the process."
  },
  {
    name: "INTEL FOLDER",
    prompt: "Folder C:\\INTEL\\OPPOSING_COUNTRY is exposed.",
    command: "breach",
    damage: 32,
    hint: "Use breach to steal the war intel."
  }
];

const openingAreas = {
  "EXPOSED MODEM BUFFER": "NETWORK / MODEM",
  "OPEN REMOTE SHELL": "REMOTE ACCESS",
  "PACKET RELAY LOOP": "NETWORK / RELAY",
  "MEMORY LEAK": "PROCESS MEMORY",
  "EXPOSED IP ADDRESS": "NETWORK / IP",
  "VISIBLE MAC ADDRESS": "HARDWARE / MAC",
  "OPEN FILE SHARE": "FILESYSTEM",
  "ATTACK PROCESS": "PROCESS LIST",
  "INTEL FOLDER": "FILESYSTEM / INTEL"
};

const fileNames = [
  "KERNEL.SYS",
  "LOGIN.DLL",
  "BOOT.INI",
  "MEMORY.BIN",
  "FIREWALL.CFG",
  "NOTES.TXT",
  "NUCLEAR_DATA",
  "SECRET_FILES",
  "LAUNCH_CODES"
];

let state;
let timer;
let desktopTimer;
let terminalOpened = false;
let topWindowZ = 10;
let storyElapsed = 0;
let mailElapsed = 0;
let mailTimer;
let mailStarted = false;
let mailLoaded = false;
const STORY_BASE_MINUTES = 12 * 60 + 53;
const ATTACK_START_SECONDS = 2 * 12;
const IT_PING_SECONDS = 12 * 12;

function rand(max) {
  return Math.floor(Math.random() * max);
}

function makeState() {
  return {
    hp: 100,
    wave: 1,
    trace: 0,
    hackerHp: 100,
    firewall: 0,
    notesUsed: 0,
    timeLeft: 12,
    phase: "idle",
    combo: 0,
    current: null,
    opening: null,
    scannedOpening: false,
    files: fileNames.map(name => ({ name, corrupt: 0, deleted: false, secret: name.includes("_") })),
    over: false,
    won: false,
    deletionPlayed: false
  };
}

function line(text, tone = "") {
  const row = document.createElement("p");
  row.className = tone;
  row.textContent = text;
  ui.terminalLog.appendChild(row);
  ui.terminalLog.scrollTop = ui.terminalLog.scrollHeight;
}

function clearLogs() {
  ui.terminalLog.innerHTML = "";
}

function start() {
  clearInterval(timer);
  clearInterval(desktopTimer);
  clearInterval(mailTimer);
  state = makeState();
  clearLogs();
  terminalOpened = false;
  storyElapsed = 0;
  mailElapsed = 0;
  mailStarted = false;
  mailLoaded = false;
  ui.terminalApp.classList.add("hidden");
  ui.taskTerminal.classList.add("hidden");
  ui.scannerApp.classList.add("hidden");
  ui.taskScanner.classList.add("hidden");
  ui.notepadApp.classList.add("hidden");
  ui.taskNotepad.classList.add("hidden");
  ui.mailApp.classList.add("hidden");
  ui.taskMail.classList.add("hidden");
  ui.mailToast.classList.remove("hidden");
  ui.mailLoading.classList.remove("hidden");
  ui.mailMessage.classList.add("hidden");
  ui.mailMeter.value = 0;
  ui.mailLoadText.textContent = "Loading message: 60s";
  ui.scannerOutput.textContent = "No remote weakness scanned yet.";
  line("RETRO DEFENSE OS BOOTED.", "ok");
  line("Open Defense Terminal to answer the incoming call.", "ok");
  line("NO CARRIER", "bad");
  ui.commandInput.disabled = true;
  ui.commandInput.value = "";
  desktopTimer = setInterval(updateStoryClock, 1000);
  updateStoryClock();
  render();
}

function openTerminal() {
  ui.terminalApp.classList.remove("hidden");
  ui.taskTerminal.classList.remove("hidden");
  bringToFront(ui.terminalApp);
  ui.commandInput.focus();
  if (terminalOpened) return;
  terminalOpened = true;
  if (storyElapsed < ATTACK_START_SECONDS) storyElapsed = ATTACK_START_SECONDS;
  updateClockDisplay();
  clearLogs();
  line("RETRO DEFENSE OS BOOTED.", "ok");
  line("MEMORY MODE: type commands from memory.", "ok");
  line("Commands.txt is available, but using notes slows your trace.", "attack");
  line("12:55 WARNING: hostile server intrusion is starting.", "bad");
  line("dialing target... carrier locked at 2400 baud", "bad");
  line("HACKER: hello? anybody home?", "talk");
  ui.commandInput.disabled = false;
  nextAttack();
  clearInterval(timer);
  timer = setInterval(tick, 1000);
  render();
}

function closeTerminal() {
  ui.terminalApp.classList.add("hidden");
  ui.taskTerminal.classList.add("hidden");
}

function openScanner() {
  ui.scannerApp.classList.remove("hidden");
  ui.taskScanner.classList.remove("hidden");
  bringToFront(ui.scannerApp);
}

function closeScanner() {
  ui.scannerApp.classList.add("hidden");
  ui.taskScanner.classList.add("hidden");
}

function openNotepad() {
  ui.notepadApp.classList.remove("hidden");
  ui.taskNotepad.classList.remove("hidden");
  bringToFront(ui.notepadApp);
  if (terminalOpened && !state.over && !state.won) {
    state.notesUsed += 1;
    state.trace = Math.max(0, state.trace - 3);
    line("NOTES OPENED. Reference used. Trace progress drops 3%.", "bad");
    render();
  }
}

function closeNotepad() {
  ui.notepadApp.classList.add("hidden");
  ui.taskNotepad.classList.add("hidden");
}

function openMail() {
  ui.mailApp.classList.remove("hidden");
  ui.taskMail.classList.remove("hidden");
  ui.mailToast.classList.add("hidden");
  bringToFront(ui.mailApp);
  if (!mailStarted && !mailLoaded) startMailLoad();
}

function closeMail() {
  ui.mailApp.classList.add("hidden");
  ui.taskMail.classList.add("hidden");
}

function startMailLoad() {
  mailStarted = true;
  mailTimer = setInterval(() => {
    mailElapsed += 1;
    ui.mailMeter.value = mailElapsed;
    ui.mailLoadText.textContent = `Loading message: ${Math.max(0, 60 - mailElapsed)}s`;
    if (mailElapsed >= 60) {
      clearInterval(mailTimer);
      mailLoaded = true;
      ui.mailLoading.classList.add("hidden");
      ui.mailMessage.classList.remove("hidden");
    }
  }, 1000);
}

function nextAttack() {
  if (state.over || state.won) return;
  const attack = { ...attacks[rand(attacks.length)] };
  attack.code = Math.random().toString(16).slice(2, 6).toUpperCase();
  state.current = attack;
  state.opening = null;
  state.scannedOpening = false;
  state.phase = "defense";
  state.timeLeft = Math.max(5, 13 - Math.floor(state.wave / 2));
  if (state.wave > 1 || Math.random() < 0.7) line(taunts[rand(taunts.length)], "talk");
  line(`HACKER> SEND ${attack.name} [${attack.code}]`, "bad");
  line(`HACKER> ${attack.prompt}`, "bad");
  state.files[rand(state.files.length)].corrupt += 8 + state.wave;
  render();
}

function tick() {
  if (state.over || state.won) return;
  state.timeLeft -= 1;
  if (state.timeLeft <= 0) {
    if (state.phase === "opening") missOpening();
    else failAttack("No response entered.");
  }
  render();
}

function submitCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command || state.over || state.won) return;

  line(`YOU> ${command}`, "player");
  if (command === "help") {
    line("Memorize defense commands and counter commands from Commands.txt.", "ok");
    line("Use Remote Scanner during the counter window to identify the weakness.", "attack");
    return;
  }

  const defenseCommands = ["scan", "block", "patch", "purge", "trace", "decrypt", "backup", "isolate", "spoof"];
  const attackCommands = ["ping", "inject", "jam", "crash", "spoofip", "clone", "wipe", "kill", "breach"];
  const validCommands = [...defenseCommands, ...attackCommands];
  if (!validCommands.includes(command)) {
    state.hp -= 4;
    state.combo = 0;
    line("BAD COMMAND. System stutters.", "bad");
    checkEnd();
    render();
    return;
  }

  if (state.phase === "opening") {
    counterOpening(command);
  } else if (command === state.current.command) {
    defend(command);
  } else if (attackCommands.includes(command)) {
    line("No opening is visible yet. Defend first, then counterattack.", "bad");
    state.timeLeft = Math.max(1, state.timeLeft - 2);
  } else {
    failAttack("Wrong countermeasure.");
  }
  checkEnd();
  render();
}

function startOpening() {
  const opening = { ...openings[rand(openings.length)] };
  state.opening = opening;
  state.scannedOpening = false;
  state.phase = "opening";
  state.timeLeft = 20;
  ui.scannerOutput.textContent = "Remote machine is unstable.\nRun scan now to identify the weakness.";
  line("OPENING DETECTED ON HACKER MACHINE.", "attack");
  line("Open Remote Scanner and run a scan. Use memory, or open Commands.txt for notes.", "attack");
}

function counterOpening(command) {
  if (command !== state.opening.command) {
    line("Counter missed. Recheck the scanned weakness or your memory.", "bad");
    state.timeLeft = Math.max(1, state.timeLeft - 5);
    state.trace = Math.max(0, state.trace - 2);
    return;
  }

  const hit = state.opening.damage + Math.min(12, state.combo * 2);
  state.hackerHp = Math.max(0, state.hackerHp - hit);
  state.trace = Math.min(100, state.trace + 16);
  line(`${command.toUpperCase()} landed. Hacker computer takes ${hit}% damage.`, "attack");
  if (command === "breach") line("INTEL PARTIAL: opposing-country server route copied.", "attack");
  line("HACKER: wait. how did you get into my box?", "talk");
  if (state.hackerHp <= 0 || state.trace >= 100) {
    state.won = true;
    state.over = true;
    ui.commandInput.disabled = true;
    line("HACKER> CONNECTION DESTROYED", "ok");
    line("INTEL RECOVERED: opposing country command route captured.", "ok");
    line("VICTORY. You destroyed the hacker and won the war.", "ok");
    return;
  }
  state.phase = "defense";
  state.opening = null;
  nextAttack();
}

function missOpening() {
  line("COUNTER WINDOW CLOSED. Hacker patched the opening.", "bad");
  line("HACKER: too slow. i closed that door.", "talk");
  state.phase = "defense";
  state.opening = null;
  state.scannedOpening = false;
  ui.scannerOutput.textContent = "No active opening. Wait until you defend the next payload.";
  nextAttack();
}

function scanRemoteMachine() {
  if (!terminalOpened) {
    ui.scannerOutput.textContent = "No live connection. Open Defense Terminal first.";
    return;
  }
  if (state.phase !== "opening" || !state.opening) {
    ui.scannerOutput.textContent = "No active weakness found.\nDefend a hacker payload first, then scan during the opening.";
    return;
  }
  state.scannedOpening = true;
  ui.scannerOutput.textContent = `REMOTE SCAN COMPLETE\nAREA: ${openingAreas[state.opening.name] || "UNKNOWN"}\nWEAKNESS: ${state.opening.name}\n\n${state.opening.prompt}\n\nType the matching counter in Terminal from memory, or open Commands.txt if you need notes.\nTime left: ${state.timeLeft}s`;
}

function defend(command) {
  state.combo += 1;
  state.wave += 1;
  state.trace = Math.min(100, state.trace + (command === "trace" ? 22 : 8) + state.combo);
  state.firewall = Math.min(12, state.firewall + (["block", "isolate", "spoof"].includes(command) ? 2 : 1));
  healFiles(["patch", "backup", "decrypt"].includes(command) ? 24 : 10);
  line(`${command.toUpperCase()} accepted. Attack neutralized.`, "ok");
  if (state.combo > 2) line(`HACKER: lucky streak. combo ${state.combo} won't last.`, "talk");
  if (state.trace >= 100) {
    state.won = true;
    state.over = true;
    ui.commandInput.disabled = true;
    line("HACKER> CONNECTION LOST", "ok");
    line("TRACE COMPLETE. Opposing country command route captured.", "ok");
    line("VICTORY. You recovered the intel and won the war.", "ok");
    return;
  }
  startOpening();
}

function failAttack(reason) {
  const shield = state.firewall > 0 ? 6 : 0;
  const damage = Math.max(4, state.current.damage + Math.floor(state.wave / 2) - shield);
  state.hp -= damage;
  state.firewall = Math.max(0, state.firewall - 1);
  state.combo = 0;
  corruptFiles(12 + state.wave);
  line(`${reason} Damage taken: ${damage}%.`, "bad");
  line("HACKER> PAYLOAD LANDED", "bad");
  checkEnd();
  if (!state.over) nextAttack();
}

function corruptFiles(amount) {
  for (let i = 0; i < 2; i++) {
    const file = state.files[rand(state.files.length)];
    file.corrupt = Math.min(100, file.corrupt + amount);
  }
}

function healFiles(amount) {
  for (const file of state.files) file.corrupt = Math.max(0, file.corrupt - amount);
}

function checkEnd() {
  const deadFiles = state.files.filter(file => file.corrupt >= 100).length;
  if (state.hp <= 0 || deadFiles >= 3) {
    state.over = true;
    state.won = false;
    ui.commandInput.disabled = true;
    hackerDeletesSecretFiles();
  }
}

function hackerDeletesSecretFiles() {
  if (state.deletionPlayed) return;
  state.deletionPlayed = true;
  ui.terminalApp.classList.remove("hidden");
  ui.taskTerminal.classList.remove("hidden");
  line("HACKER> SYSTEM OWNED", "bad");
  line("HACKER> opening C:\\SYSTEM\\FILES", "bad");
  line("HACKER> found folder: NUCLEAR_DATA", "bad");
  line("HACKER> found folder: SECRET_FILES", "bad");
  line("HACKER> delete NUCLEAR_DATA /force", "bad");
  line("HACKER> delete SECRET_FILES /force", "bad");
  line("HACKER> delete LAUNCH_CODES /force", "bad");
  line("CRITICAL FAILURE. Secret folders deleted. Press REBOOT to try again.", "bad");
  for (const file of state.files) {
    if (file.secret) {
      file.deleted = true;
      file.corrupt = 100;
    }
  }
}

function renderFiles() {
  ui.fileGrid.innerHTML = "";
  for (const file of state.files) {
    const item = document.createElement("div");
    item.className = "file";
    if (file.secret) item.classList.add("secret");
    if (file.corrupt >= 60) item.classList.add("danger");
    if (file.corrupt >= 100) item.classList.add("dead");
    if (file.deleted) item.classList.add("deleted");
    item.innerHTML = `<span>${file.name}</span><meter min="0" max="100" value="${file.corrupt}"></meter><b>${file.deleted ? "DEL" : `${file.corrupt}%`}</b>`;
  ui.fileGrid.appendChild(item);
  }
  ui.fileCount.textContent = `${state.files.filter(file => file.corrupt < 100).length} FILES`;
}

function render() {
  ui.hp.textContent = `${Math.max(0, state.hp)}%`;
  ui.wave.textContent = state.wave;
  ui.trace.textContent = `${state.trace}%`;
  ui.itPing.textContent = storyElapsed >= IT_PING_SECONDS ? "PING" : formatCountdown(Math.max(0, IT_PING_SECONDS - storyElapsed));

  if (!terminalOpened) {
    ui.message.textContent = "Open Defense Terminal. Study Commands.txt first if you want, then play from memory.";
  } else if (state.won) {
    ui.message.textContent = "Victory. The server is safe and the war is won.";
  } else if (state.over) {
    ui.message.textContent = "System crashed. Reboot to defend again.";
  } else if (state.phase === "opening") {
    ui.message.textContent = `Counter window open: ${state.timeLeft}s. Scan the hacker's computer and type the counter from memory.`;
  } else {
    ui.message.textContent = `${state.current.name}: ${state.timeLeft}s to defend. Type the learned command.`;
  }
  renderFiles();
}

ui.commandForm.addEventListener("submit", event => {
  event.preventDefault();
  submitCurrentCommand();
});

ui.commandInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitCurrentCommand();
  }
});

function submitCurrentCommand() {
  submitCommand(ui.commandInput.value);
  ui.commandInput.value = "";
}

ui.restart.addEventListener("click", start);
document.querySelectorAll("[data-open-terminal]").forEach(button => {
  button.addEventListener("click", openTerminal);
  button.addEventListener("dblclick", openTerminal);
});
document.querySelectorAll("[data-open-scanner]").forEach(button => {
  button.addEventListener("click", openScanner);
  button.addEventListener("dblclick", openScanner);
});
document.querySelectorAll("[data-open-notepad]").forEach(button => {
  button.addEventListener("click", openNotepad);
  button.addEventListener("dblclick", openNotepad);
});
document.querySelectorAll("[data-open-mail]").forEach(button => {
  button.addEventListener("click", openMail);
  button.addEventListener("dblclick", openMail);
});
ui.taskTerminal.addEventListener("click", openTerminal);
ui.closeTerminal.addEventListener("click", closeTerminal);
ui.taskScanner.addEventListener("click", openScanner);
ui.closeScanner.addEventListener("click", closeScanner);
ui.taskNotepad.addEventListener("click", openNotepad);
ui.closeNotepad.addEventListener("click", closeNotepad);
ui.taskMail.addEventListener("click", openMail);
ui.closeMail.addEventListener("click", closeMail);
ui.mailToast.addEventListener("click", openMail);
ui.scanRemote.addEventListener("click", scanRemoteMachine);
document.addEventListener("click", () => {
  if (terminalOpened && !state?.over && !ui.terminalApp.classList.contains("hidden")) ui.commandInput.focus();
});

function bringToFront(win) {
  topWindowZ += 1;
  win.style.zIndex = topWindowZ;
}

function makeWindowDraggable(win) {
  const bar = win.querySelector(".win-titlebar");
  if (!bar) return;

  bar.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    event.preventDefault();
    bringToFront(win);

    const desktop = document.querySelector(".win98-desktop");
    const desktopRect = desktop.getBoundingClientRect();
    const rect = win.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    win.style.width = `${rect.width}px`;
    win.style.height = `${rect.height}px`;
    win.style.right = "auto";
    win.style.bottom = "auto";

    function moveWindow(moveEvent) {
      const maxLeft = desktopRect.width - rect.width - 4;
      const maxTop = desktopRect.height - rect.height - 42;
      const left = Math.max(4, Math.min(maxLeft, moveEvent.clientX - desktopRect.left - offsetX));
      const top = Math.max(4, Math.min(maxTop, moveEvent.clientY - desktopRect.top - offsetY));
      win.style.left = `${left}px`;
      win.style.top = `${top}px`;
    }

    function stopDrag() {
      window.removeEventListener("pointermove", moveWindow);
      window.removeEventListener("pointerup", stopDrag);
    }

    window.addEventListener("pointermove", moveWindow);
    window.addEventListener("pointerup", stopDrag);
  });
}

function makeWindowResizable(win) {
  const handle = document.createElement("div");
  handle.className = "resize-handle";
  handle.setAttribute("aria-hidden", "true");
  win.appendChild(handle);

  handle.addEventListener("pointerdown", event => {
    event.preventDefault();
    event.stopPropagation();
    bringToFront(win);

    const desktop = document.querySelector(".win98-desktop");
    const desktopRect = desktop.getBoundingClientRect();
    const rect = win.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const minWidth = win.classList.contains("app-window") ? 520 : 260;
    const minHeight = win.classList.contains("app-window") ? 390 : 180;
    const maxWidth = desktopRect.right - rect.left - 8;
    const maxHeight = desktopRect.bottom - rect.top - 44;

    win.style.left = `${rect.left - desktopRect.left}px`;
    win.style.top = `${rect.top - desktopRect.top}px`;
    win.style.right = "auto";
    win.style.bottom = "auto";

    function resizeWindow(moveEvent) {
      const nextWidth = startWidth + moveEvent.clientX - startX;
      const nextHeight = startHeight + moveEvent.clientY - startY;
      win.style.width = `${Math.max(minWidth, Math.min(maxWidth, nextWidth))}px`;
      win.style.height = `${Math.max(minHeight, Math.min(maxHeight, nextHeight))}px`;
    }

    function stopResize() {
      window.removeEventListener("pointermove", resizeWindow);
      window.removeEventListener("pointerup", stopResize);
    }

    window.addEventListener("pointermove", resizeWindow);
    window.addEventListener("pointerup", stopResize);
  });
}

document.querySelectorAll(".app-window, .utility-window").forEach(makeWindowDraggable);
document.querySelectorAll(".app-window, .utility-window").forEach(makeWindowResizable);

function updateStoryClock() {
  if (!state?.over && terminalOpened) storyElapsed += 1;
  updateClockDisplay();
  if (terminalOpened && !state.over && !state.won && storyElapsed >= IT_PING_SECONDS) surviveUntilPing();
  render();
}

function updateClockDisplay() {
  const minutesSinceStart = Math.floor(storyElapsed / 12);
  const totalMinutes = STORY_BASE_MINUTES + minutesSinceStart;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const display = `${hour}:${String(minute).padStart(2, "0")}`;
  ui.clock.textContent = display;
  ui.desktopClock.textContent = display;
}

function formatCountdown(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function surviveUntilPing() {
  state.won = true;
  state.over = true;
  ui.commandInput.disabled = true;
  line("1:05 IT DEPARTMENT> ping sweep locked onto hacker.", "ok");
  line("IT DEPARTMENT> hostile route exposed. Server preserved.", "ok");
  line("VICTORY. You survived long enough for IT to expose the hacker.", "ok");
}

start();
