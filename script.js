/* =========================================
   1. CLIENT CONFIGURATION (EDIT PER ORDER)
========================================= */

const clientData = {
  profileName: "Josh & Sarah",
  
  // Hardcode the Hero Memory (Top featured video)
  heroMemory: {
    title: "The Story of Us",
    description: "A collection of memories, laughter, chaos and moments worth watching again.",
    mediaSrc: "https://files.catbox.moe/apwnxt.MOV", // Replace with your hero video
    thumbnail: "assets/vid4-thumb.jpeg",
    mediaType: "video" 
  },

  // Hardcode the client's memory grid here
  memories: [
    {
  id: "mem-05",

  title: "Beach Day",

  description: "Trying to surf and failing miserably.",

  mediaSrc: "assets/vid4.MOV",

  thumbnail: "assets/vid4-thumb.jpeg",

  mediaType: "video",
},
    {
  id: "mem-05",

  title: "Beach Day",

  description: "Trying to surf and failing miserably.",

  mediaSrc: "assets/vid4.MOV",

  thumbnail: "assets/vid4-thumb.jpeg",

  mediaType: "video",
},
    {
  id: "mem-05",

  title: "Beach Day",

  description: "Trying to surf and failing miserably.",

  mediaSrc: "assets/vid4.MOV",

  thumbnail: "assets/vid4-thumb.jpeg",

  mediaType: "video",

  featured: true
},
    {
  id: "mem-05",

  title: "Beach Day",

  description: "Trying to surf and failing miserably.",

  mediaSrc: "assets/vid4.MOV",

  thumbnail: "assets/vid4-thumb.jpeg",

  mediaType: "video",

  featured: true
},
    {
  id: "mem-05",

  title: "Beach Day",

  description: "Trying to surf and failing miserably.",

  mediaSrc: "assets/vid4.MOV",

  thumbnail: "assets/vid4-thumb.jpeg",

  mediaType: "video",

  featured: true
}
  ]
};


/* -------------------------
   INTRO
------------------------- */

const intro = document.querySelector(".intro");

if (intro) {
  setTimeout(() => {
    intro.classList.add("hide");
  }, 2000);
}


/* -------------------------
   UI ELEMENTS & SETUP
------------------------- */

const hero = document.querySelector(".hero");
const memories = document.querySelector("#memories");
const homeButton = document.querySelector("#home-button");
const memoriesButton = document.querySelector("#memories-button");

const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchResultsSection = document.querySelector("#search-results");
const searchResultsGrid = document.querySelector("#search-results-grid");
const searchResultsTitle = document.querySelector("#search-results-title");
const searchMessage = document.querySelector("#search-message");

const memoryGrid = document.querySelector("#memory-grid");

const greatestHitsGrid =
  document.querySelector("#greatest-hits-grid");

const PROFILE_DATABASE =
  "OurTVProfileDB";

const PROFILE_STORE =
  "profile";

const PROFILE_ID =
  "main-profile";


/* -------------------------
   MEMORY DETAILS & PLAYER UI CREATION
------------------------- */

// 1. Create Details View UI
const detailsView = document.createElement("div");
detailsView.className = "memory-details";
detailsView.innerHTML = `
  <button class="close-details-button" id="close-details">← Back</button>
  <div class="details-background" id="details-bg"></div>
  <div class="details-content">
    <h1 class="details-title" id="details-title"></h1>
    <p class="details-description" id="details-desc"></p>
    <div class="details-actions">
      <button class="primary-button" id="details-play">▶ Watch Now</button>
    </div>
  </div>
`;
document.body.appendChild(detailsView);

// 2. Create CUSTOM Netflix-Style Player UI
const playerView = document.createElement("div");
playerView.className = "memory-player";
playerView.innerHTML = `
  <div class="custom-player-container">
    <div id="media-container" style="width:100%; height:100%;">
       <!-- Video or Image injected here -->
    </div>
    
    <div class="player-ui-overlay" id="player-ui">
      <!-- Top Bar -->
      <div class="player-top-bar">
        <button id="close-player">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 id="player-now-playing">Memory Title</h3>
      </div>
      
      <!-- Invisible Center (Tap to Pause/Play) -->
      <div class="player-center-click" id="player-center"></div>
      
      <!-- Bottom Controls -->
      <div class="player-bottom-bar" id="player-bottom-controls">
        <button class="player-play-btn" id="play-pause-btn">
          <svg id="play-icon" style="display:none;" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <svg id="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        </button>
        <input type="range" class="player-progress-bar" id="seek-bar" value="0" min="0" max="100">
        <span class="player-time" id="time-display">0:00</span>
      </div>
    </div>
  </div>
`;
document.body.appendChild(playerView);

// 3. Grab ALL Player Elements
const closeDetailsBtn = document.getElementById("close-details");
const detailsBg = document.getElementById("details-bg");
const detailsTitle = document.getElementById("details-title");
const detailsDesc = document.getElementById("details-desc");
const detailsPlayBtn = document.getElementById("details-play");

// Custom Player UI Elements
const mediaContainer = document.getElementById("media-container");
const closePlayerBtn = document.getElementById("close-player");
const playerUI = document.getElementById("player-ui");
const playerCenter = document.getElementById("player-center");
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const seekBar = document.getElementById("seek-bar");
const timeDisplay = document.getElementById("time-display");
const playerNowPlaying = document.getElementById("player-now-playing");
const playerBottomControls = document.getElementById("player-bottom-controls");

let currentMediaURL = "";
let currentMediaType = "";
let activeVideo = null;
let controlsTimeout = null;


/* =========================================
   2. INITIALIZE APP & RENDER CARDS
========================================= */

function initializeApp() {
  
  // --- 1. SET PROFILE NAME ---
  document.querySelectorAll(".profile-details h3, #profile-name-input").forEach(el => {
    if (el.tagName === "INPUT") {
      el.value = clientData.profileName;
    } else {
      el.textContent = clientData.profileName;
    }
  });

  // --- 2. SETUP HERO SECTION ---
  const heroTitle = document.getElementById("hero-title");
  const heroDesc = document.getElementById("hero-desc");
  const heroBg = document.getElementById("hero-bg");
  const heroPlayBtn = document.getElementById("hero-play");
  const heroInfoBtn = document.getElementById("hero-info");

  if (clientData.heroMemory && heroTitle) {
    heroTitle.textContent = clientData.heroMemory.title;
    heroDesc.textContent = clientData.heroMemory.description;

    // Set Hero Background Media
    const isMobile = window.innerWidth <= 768;

if (clientData.heroMemory.mediaType === "video" && !isMobile) {

  heroBg.innerHTML = `
    <video
      src="${clientData.heroMemory.mediaSrc}"
      autoplay
      muted
      loop
      playsinline
    ></video>
  `;

} else {

  heroBg.innerHTML = `
    <img
      src="${clientData.heroMemory.thumbnail || clientData.heroMemory.mediaSrc}"
      alt="Hero Background"
    >
  `;

}

      const heroVideo =
    heroBg.querySelector("video");

  if (heroVideo) {

    document.addEventListener(
      "visibilitychange",
      () => {

        if (document.hidden) {

          heroVideo.pause();

        } else {

          heroVideo.play().catch(() => {});

        }

      }
    );

  }

    // Hero Action: "Watch Now" (Jumps straight to custom player)
    heroPlayBtn.addEventListener("click", () => {
      launchCustomPlayer(
        clientData.heroMemory.mediaSrc, 
        clientData.heroMemory.mediaType, 
        clientData.heroMemory.title
      );
    });

    // Hero Action: "More Info" (Opens the Details View)
    heroInfoBtn.addEventListener("click", () => {
      openMemoryPlayer(
        clientData.heroMemory.mediaSrc,
        clientData.heroMemory.mediaType,
        clientData.heroMemory.title,
        clientData.heroMemory.description
      );
    });
  }

  // --- 3. RENDER THE MEMORY CARDS ---
  if (memoryGrid) {
  memoryGrid.innerHTML = "";
}

if (greatestHitsGrid) {
  greatestHitsGrid.innerHTML = "";
}

  clientData.memories.forEach(memory => {
    const memoryCard = document.createElement("div");
    memoryCard.className = "memory-card";
    
    // Dataset for the search function
    memoryCard.dataset.title = memory.title;
    memoryCard.dataset.description = memory.description;
    memoryCard.dataset.media = memory.mediaSrc;
    memoryCard.dataset.mediaType = memory.mediaType;

    // Build the Card Media
let mediaHTML = "";

// Check whether this device supports hover
const isDesktop =
  window.matchMedia("(hover: hover)").matches;

if (
  memory.mediaType === "video" &&
  isDesktop
) {

  // Desktop → real video preview
  mediaHTML = `<video
    src="${memory.mediaSrc}"
    class="memory-media"
    muted
    loop
    playsinline
    preload="metadata"
  ></video>`;

} else if (memory.mediaType === "video") {

  // Mobile → thumbnail only
  mediaHTML = `<img
    src="${memory.thumbnail}"
    alt="${memory.title}"
    class="memory-media"
  >`;

} else {

  // Normal image memory
  mediaHTML = `<img
    src="${memory.mediaSrc}"
    alt="${memory.title}"
    class="memory-media"
  >`;

}

    // Build the Card Content Overlay
    memoryCard.innerHTML = `
      ${mediaHTML}
      <div class="memory-card-content">
        <h3>${memory.title}</h3>
        <p>${memory.description}</p>
      </div>
    `;

    // Click to Open Details View
    memoryCard.addEventListener("click", () => {
      openMemoryPlayer(memory.mediaSrc, memory.mediaType, memory.title, memory.description);
    });

    // Netflix Hover Effect — desktop only
if (
  memory.mediaType === "video" &&
  window.matchMedia("(hover: hover)").matches
) {

  const vid =
    memoryCard.querySelector("video");

  memoryCard.addEventListener(
    "mouseenter",
    () => {

      vid.play().catch(() => {});

    }
  );

  memoryCard.addEventListener(
    "mouseleave",
    () => {

      vid.pause();
      vid.currentTime = 0;

    }
  );

}

    // Add EVERY memory to Our Memories
if (memoryGrid) {
  memoryGrid.appendChild(memoryCard);
}

// If featured, also add a copy to Greatest Hits
if (memory.featured === true && greatestHitsGrid) {

  const featuredCard = memoryCard.cloneNode(true);

  featuredCard.addEventListener("click", () => {
    openMemoryPlayer(
      memory.mediaSrc,
      memory.mediaType,
      memory.title,
      memory.description
    );
  });

  if (memory.mediaType === "video") {
    const vid = featuredCard.querySelector("video");

    featuredCard.addEventListener("mouseenter", () => {
      vid.play().catch(e => {});
    });

    featuredCard.addEventListener("mouseleave", () => {
      vid.pause();
      vid.currentTime = 0;
    });
  }

  greatestHitsGrid.appendChild(featuredCard);
}
  });
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", initializeApp);


/* -------------------------
   PLAYER FUNCTIONS
------------------------- */

// Function: Open Details View (The "More Info" screen)
function openMemoryPlayer(mediaURL, mediaType, title, description) {
  currentMediaURL = mediaURL;
  currentMediaType = mediaType;
  
  detailsTitle.textContent = title;
  detailsDesc.textContent = description;
  detailsBg.innerHTML = ""; 

  if (mediaType === "video") {
    detailsBg.innerHTML = `<video src="${mediaURL}" autoplay muted loop playsinline></video>`;
  } else {
    detailsBg.innerHTML = `<img src="${mediaURL}" alt="${title}">`;
  }

  detailsView.classList.add("show");
}

// Function: Close Details View
function closeDetailsView() {
  detailsView.classList.remove("show");
  setTimeout(() => { detailsBg.innerHTML = ""; }, 300);
}

closeDetailsBtn.addEventListener("click", closeDetailsView);


/* --- CUSTOM PLAYER LOGIC --- */

// Function: Format Seconds into M:SS
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substring(14, 19);
  return result.startsWith("00:") ? result.substring(3) : result; 
}

// Function: Launch the Custom Player
function launchCustomPlayer(mediaSrc, mediaType, title) {
  mediaContainer.innerHTML = ""; 
  playerNowPlaying.textContent = title;
  
  if (mediaType === "video") {
    playerBottomControls.style.display = "flex"; // Show controls
    
    // playsinline stops the iPhone from hijacking it!
    mediaContainer.innerHTML = `<video src="${mediaSrc}" id="active-video" autoplay playsinline></video>`;
    activeVideo = document.getElementById("active-video");
    
    // Video Events
    activeVideo.addEventListener("timeupdate", () => {
      const value = (100 / activeVideo.duration) * activeVideo.currentTime;
      seekBar.value = value || 0;
      timeDisplay.textContent = formatTime(activeVideo.duration - activeVideo.currentTime);
      
      // Paint the slider red dynamically
      seekBar.style.background = `linear-gradient(to right, #e50914 ${value}%, rgba(255,255,255,0.3) ${value}%)`;
    });

  } else {
    // If it's a photo, just show the photo and hide the timeline controls
    mediaContainer.innerHTML = `<img src="${mediaSrc}">`;
    playerBottomControls.style.display = "none";
    activeVideo = null;
  }

  playerView.classList.add("show");
  resetControlsTimeout();
}

// Wire the Details "Watch Now" button to the new player
detailsPlayBtn.addEventListener("click", () => {
  launchCustomPlayer(currentMediaURL, currentMediaType, detailsTitle.textContent);
});

// Function: Toggle Play/Pause
function togglePlay() {
  if (!activeVideo) return;
  if (activeVideo.paused) {
    activeVideo.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    activeVideo.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}

playPauseBtn.addEventListener("click", togglePlay);
playerCenter.addEventListener("click", () => {
  togglePlay();
  resetControlsTimeout(); // Wake up UI if they tap the middle
});

// Function: Scrub the Timeline
seekBar.addEventListener("input", () => {
  if (activeVideo) {
    const time = activeVideo.duration * (seekBar.value / 100);
    activeVideo.currentTime = time;
  }
});

// Function: Auto-Hide UI (Like Netflix)
function resetControlsTimeout() {
  playerUI.classList.remove("hide-controls");
  clearTimeout(controlsTimeout);
  
  // Hide UI after 3 seconds of no activity
  controlsTimeout = setTimeout(() => {
    if (activeVideo && !activeVideo.paused) {
      playerUI.classList.add("hide-controls");
    }
  }, 3000);
}

// Wake up UI on mouse move or tap
playerView.addEventListener("mousemove", resetControlsTimeout);
playerView.addEventListener("touchstart", resetControlsTimeout);

// Function: Close Custom Player
function closeFullscreenPlayer() {
  if (activeVideo) {
    activeVideo.pause(); 
    activeVideo = null;
  }
  playerView.classList.remove("show");
  clearTimeout(controlsTimeout);
  setTimeout(() => { mediaContainer.innerHTML = ""; }, 300);
}

closePlayerBtn.addEventListener("click", closeFullscreenPlayer);


/* -------------------------
   SEARCH
------------------------- */

function openSearch() {
  if (!searchBox) return;
  searchInput.value = "";
  searchResultsGrid.innerHTML = "";
  searchResultsTitle.textContent = "Search Memories";
  searchMessage.textContent = "Start typing to search your memories.";
  searchBox.classList.add("active");
  searchResultsSection.classList.add("show");
  searchInput.focus();
  searchResultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeSearch() {
  if (!searchBox) return;
  searchBox.classList.remove("active");
  searchInput.value = "";
  searchResultsGrid.innerHTML = "";
  searchResultsSection.classList.remove("show");
  searchInput.blur();
}

if (searchButton) {
  searchButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openSearch();
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchResultsGrid.innerHTML = "";

    if (searchTerm === "") {
      searchResultsTitle.textContent = "Search Memories";
      searchMessage.textContent = "Start typing to search your memories.";
      return;
    }

    const memoryCards = document.querySelectorAll("#memory-grid .memory-card");
    const matches = [];

    memoryCards.forEach((card) => {
      const searchableText = (
        (card.dataset.title || "") + " " +
        (card.dataset.description || "") + " " +
        card.textContent
      ).toLowerCase();

      if (searchableText.includes(searchTerm)) {
        matches.push(card);
      }
    });

    if (matches.length > 0) {
      searchResultsTitle.textContent = `Results for "${searchInput.value}"`;
      searchMessage.textContent = `${matches.length} memory found` + (matches.length > 1 ? "s" : "");

      matches.forEach((card) => {
        const resultCard = card.cloneNode(true);
        
        if (resultCard.dataset.mediaType === "video") {
          const vid = resultCard.querySelector("video");
          resultCard.addEventListener("mouseenter", () => vid.play().catch(e => {}));
          resultCard.addEventListener("mouseleave", () => {
            vid.pause();
            vid.currentTime = 0;
          });
        }

        resultCard.addEventListener("click", () => {
          openMemoryPlayer(
            resultCard.dataset.media,
            resultCard.dataset.mediaType,
            resultCard.dataset.title,
            resultCard.dataset.description
          );
        });

        searchResultsGrid.appendChild(resultCard);
      });
    } else {
      searchResultsTitle.textContent = "No memories found";
      searchMessage.textContent = `We couldn't find anything matching "${searchInput.value}".`;
    }
  });
}

document.addEventListener("click", (event) => {
  if (
    searchBox &&
    searchBox.classList.contains("active") &&
    !searchBox.contains(event.target) &&
    !searchResultsSection.contains(event.target)
  ) {
    closeSearch();
  }
});


/* -------------------------
   NAVIGATION
------------------------- */

function setActive(button) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  if (button) button.classList.add("active");
}

if (homeButton) {
  homeButton.addEventListener("click", () => {
    closeSearch();
    setActive(homeButton);
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (memoriesButton) {
  memoriesButton.addEventListener("click", () => {
    closeSearch();
    setActive(memoriesButton);
    if (memories) memories.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}


/* -------------------------
   PROFILE MENU
------------------------- */

const profileButton = document.querySelector("#profile-button");
const profileMenu = document.querySelector("#profile-menu");
const profileWrapper = document.querySelector(".profile-menu-wrapper");

if (profileButton && profileMenu) {
  profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("show");
  });
}

document.addEventListener(
  "click",
  (event) => {

    const clickedDesktopProfile =
      profileWrapper &&
      profileWrapper.contains(
        event.target
      );


    const clickedMobileProfile =
      mobileProfile &&
      mobileProfile.contains(
        event.target
      );


    const clickedProfileMenu =
      profileMenu &&
      profileMenu.contains(
        event.target
      );


    if (
      !clickedDesktopProfile &&
      !clickedMobileProfile &&
      !clickedProfileMenu
    ) {

      profileMenu?.classList.remove(
        "show"
      );


      profileMenu?.classList.remove(
        "mobile-profile-open"
      );

    }

  }
);


/* -------------------------
   EDIT PROFILE
------------------------- */

const editProfileButton = document.querySelector("#edit-profile-button");
const backProfileButton = document.querySelector("#back-profile-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const saveProfileButton = document.querySelector("#save-profile-button");
const changePhotoButton = document.querySelector("#change-photo-button");
const profilePhotoInput = document.querySelector("#profile-photo-input");
const editProfileImage = document.querySelector("#edit-profile-image");
const profileNameInput = document.querySelector("#profile-name-input");
const profileNameDisplay = document.querySelector(".profile-details h3");
const navbarProfileImage = document.querySelector(".profile-button img");
const menuProfileImage = document.querySelector(".profile-large-image img");

function closeEditProfile() {
  if (profileMenu) profileMenu.classList.remove("editing");
}

if (editProfileButton) {
  editProfileButton.addEventListener("click", () => {
    profileMenu.classList.add("editing");
    if (profileNameInput && profileNameDisplay) {
      profileNameInput.value = profileNameDisplay.textContent;
    }
  });
}

if (backProfileButton) {
  backProfileButton.addEventListener("click", closeEditProfile);
}

if (cancelEditButton) {
  cancelEditButton.addEventListener("click", () => {
    if (profileNameInput && profileNameDisplay) {
      profileNameInput.value = profileNameDisplay.textContent;
    }
    if (editProfileImage && menuProfileImage) {
      editProfileImage.src = menuProfileImage.src;
    }
    closeEditProfile();
  });
}

if (changePhotoButton) {
  changePhotoButton.addEventListener("click", () => {
    profilePhotoInput?.click();
  });
}

if (profilePhotoInput) {
  profilePhotoInput.addEventListener("change", () => {
    const file = profilePhotoInput.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    if (editProfileImage) editProfileImage.src = imageURL;
  });
}

/* =========================
   PROFILE INDEXEDDB
========================= */

function openProfileDatabase() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(
        PROFILE_DATABASE,
        1
      );


    request.onupgradeneeded =
      (event) => {

        const database =
          event.target.result;


        if (
          !database.objectStoreNames.contains(
            PROFILE_STORE
          )
        ) {

          database.createObjectStore(
            PROFILE_STORE,
            {
              keyPath: "id"
            }
          );

        }

      };


    request.onsuccess =
      () => {

        resolve(
          request.result
        );

      };


    request.onerror =
      () => {

        reject(
          request.error
        );

      };

  });

}


async function saveProfileToDatabase(
  name,
  photo
) {

  const database =
    await openProfileDatabase();


  return new Promise(
    (resolve, reject) => {

      const transaction =
        database.transaction(
          PROFILE_STORE,
          "readwrite"
        );


      const store =
        transaction.objectStore(
          PROFILE_STORE
        );


      const request =
        store.put({
          id: PROFILE_ID,
          name: name,
          photo: photo
        });


      request.onsuccess =
        () => {

          resolve();

        };


      request.onerror =
        () => {

          reject(
            request.error
          );

        };

    }
  );

}


async function loadProfileFromDatabase() {

  const database =
    await openProfileDatabase();


  return new Promise(
    (resolve, reject) => {

      const transaction =
        database.transaction(
          PROFILE_STORE,
          "readonly"
        );


      const store =
        transaction.objectStore(
          PROFILE_STORE
        );


      const request =
        store.get(
          PROFILE_ID
        );


      request.onsuccess =
        () => {

          resolve(
            request.result || null
          );

        };


      request.onerror =
        () => {

          reject(
            request.error
          );

        };

    }
  );

}

if (saveProfileButton) {
  saveProfileButton.addEventListener("click", () => {
    const newName = profileNameInput.value.trim();
    if (newName !== "" && profileNameDisplay) {
      profileNameDisplay.textContent = newName;
      clientData.profileName = newName; 
    }
    if (navbarProfileImage && editProfileImage) {
      navbarProfileImage.src = editProfileImage.src;
    }
    if (menuProfileImage && editProfileImage) {
      menuProfileImage.src = editProfileImage.src;
    }
    closeEditProfile();
  });
}


/* -------------------------
   PLAY RANDOM MEMORY
------------------------- */
const randomMemoryBtn = document.getElementById("random-memory-button");

if (randomMemoryBtn) {
  randomMemoryBtn.addEventListener("click", () => {
    const totalMemories = clientData.memories.length;
    const randomIndex = Math.floor(Math.random() * totalMemories);
    const randomMem = clientData.memories[randomIndex];
    
    // Updated to use the new details view before playing, just like a normal click
    openMemoryPlayer(
      randomMem.mediaSrc, 
      randomMem.mediaType, 
      randomMem.title, 
      randomMem.description
    );
  });
} 

/* -------------------------
   ESCAPE KEY HANDLER
------------------------- */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  /* CLOSE SEARCH */
  if (searchBox && searchBox.classList.contains("active")) {
    closeSearch();
  }

  /* CLOSE FULLSCREEN PLAYER */
  if (playerView && playerView.classList.contains("show")) {
    closeFullscreenPlayer();
  } 
  /* CLOSE DETAILS VIEW */
  else if (detailsView && detailsView.classList.contains("show")) {
    closeDetailsView();
  }

  /* CLOSE PROFILE MENU */
  if (profileMenu && profileMenu.classList.contains("show")) {
    if (profileMenu.classList.contains("editing")) {
      closeEditProfile();
    } else {
      profileMenu.classList.remove("show");
    }
  }
});


/* -------------------------
   MOBILE NAVIGATION DOCK
------------------------- */
const mobileHome = document.getElementById("mobile-home-btn");
const mobileSearch = document.getElementById("mobile-search-btn");
const mobileShuffle = document.getElementById("mobile-shuffle-btn");
const mobileProfile = document.getElementById("mobile-profile-btn");

function setMobileActive(activeBtn) {
  document.querySelectorAll(".mobile-nav-item").forEach(btn => btn.classList.remove("active"));
  if (activeBtn) activeBtn.classList.add("active");
}

if (mobileHome) {
  mobileHome.addEventListener("click", () => {
    setMobileActive(mobileHome);
    closeSearch();
    if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

const mobileSearchBar = document.getElementById("mobile-search-bar");
const mobileSearchInput = document.getElementById("mobile-search-input");
const mobileSearchClose = document.getElementById("mobile-search-close");
const mobileSearchDropdown = document.getElementById("mobile-search-dropdown");
const searchResultsList = document.getElementById("search-results-list");
const bottomNav = document.querySelector(".mobile-bottom-nav");

// 1. Open Floating Search Drawer
if (mobileSearch) {
  mobileSearch.addEventListener("click", (e) => {
    e.stopPropagation();
    setMobileActive(mobileSearch);
    
    // Hide dock, show floating drawer
    bottomNav.style.opacity = "0";
    bottomNav.style.visibility = "hidden";
    mobileSearchBar.classList.add("show");
    
    mobileSearchInput.focus();
  });
}

// 2. Close Search Drawer
if (mobileSearchClose) {
  mobileSearchClose.addEventListener("click", () => {
    mobileSearchBar.classList.remove("show");
    bottomNav.style.opacity = "1";
    bottomNav.style.visibility = "visible";
    mobileSearchDropdown.style.display = "none";
    setMobileActive(mobileHome); 
    mobileSearchInput.value = ""; 
  });
}

// 3. Live Vertical Search Engine inside Drawer
if (mobileSearchInput) {
  mobileSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    searchResultsList.innerHTML = "";

    if (searchTerm === "") {
      mobileSearchDropdown.style.display = "none";
      return;
    }

    const memoryCards = document.querySelectorAll("#memory-grid .memory-card");
    let matchCount = 0;

    memoryCards.forEach((card) => {
      const title = card.dataset.title || "";
      const desc = card.dataset.description || "";
      const media = card.dataset.media || "";
      const mediaType = card.dataset.mediaType || "";

      if ((title + " " + desc).toLowerCase().includes(searchTerm)) {
        matchCount++;
        
        // Create vertical row item (Movy style)
        const row = document.createElement("div");
        row.className = "search-result-row";
        
        let thumbHTML = mediaType === "video" 
          ? `<video src="${media}" muted></video>` 
          : `<img src="${media}" alt="">`;

        row.innerHTML = `
          ${thumbHTML}
          <div class="search-result-info">
            <h4>${title}</h4>
            <p>${mediaType.toUpperCase()} • ${desc.substring(0, 35)}...</p>
          </div>
        `;

        row.addEventListener("click", () => {
          mobileSearchBar.classList.remove("show");
          bottomNav.style.opacity = "1";
          bottomNav.style.visibility = "visible";
          mobileSearchDropdown.style.display = "none";
          openMemoryPlayer(media, mediaType, title, desc);
        });

        searchResultsList.appendChild(row);
      }
    });

    if (matchCount > 0) {
      mobileSearchDropdown.style.display = "block";
    } else {
      mobileSearchDropdown.style.display = "none";
    }
  });
}

/* -------------------------
   MOBILE PROFILE POPUP
------------------------- */

if (mobileProfile && profileMenu) {

  mobileProfile.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      setMobileActive(
        mobileProfile
      );


      profileMenu.classList.toggle(
        "show"
      );

      profileMenu.classList.toggle(
        "mobile-profile-open"
      );

    }
  );

}
