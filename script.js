/* =========================================
   1. CLIENT CONFIGURATION (EDIT PER ORDER)
========================================= */

const clientData = {
  profileName: "Josh & Sarah",
  
  // Hardcode the Hero Memory (Top featured video)
  heroMemory: {
    title: "The Story of Us",
    description: "A collection of memories, laughter, chaos and moments worth watching again.",
    mediaSrc: "assets/vid1.MOV", // Replace with your hero video
    mediaType: "video" 
  },

  // Hardcode the client's memory grid here
  memories: [
    {
      id: "mem-01",
      title: "Our First Trip",
      description: "That freezing weekend up in the mountains. We had no idea what we were doing.",
      mediaSrc: "assets/vid1.MOV", 
      mediaType: "video" 
    },
    {
      id: "mem-02",
      title: "Pizza Night",
      description: "Attempting to make dough from scratch. A complete disaster but so fun.",
      mediaSrc: "assets/photo1.jpeg", 
      mediaType: "image"
    },
    {
      id: "mem-03",
      title: "Summer Concert",
      description: "Front row at the festival. Best night ever.",
      mediaSrc: "assets/vid2.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-04",
      title: "City Lights",
      description: "Walking around downtown after midnight.",
      mediaSrc: "assets/vid3.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-05",
      title: "Beach Day",
      description: "Trying to surf and failing miserably.",
      mediaSrc: "assets/vid4.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-01",
      title: "Our First Trip",
      description: "That freezing weekend up in the mountains. We had no idea what we were doing.",
      mediaSrc: "assets/vid1.MOV", 
      mediaType: "video" 
    },
    {
      id: "mem-02",
      title: "Pizza Night",
      description: "Attempting to make dough from scratch. A complete disaster but so fun.",
      mediaSrc: "assets/photo1.jpeg", 
      mediaType: "image"
    },
    {
      id: "mem-03",
      title: "Summer Concert",
      description: "Front row at the festival. Best night ever.",
      mediaSrc: "assets/vid2.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-04",
      title: "City Lights",
      description: "Walking around downtown after midnight.",
      mediaSrc: "assets/vid3.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-05",
      title: "Beach Day",
      description: "Trying to surf and failing miserably.",
      mediaSrc: "assets/vid4.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-01",
      title: "Our First Trip",
      description: "That freezing weekend up in the mountains. We had no idea what we were doing.",
      mediaSrc: "assets/vid1.MOV", 
      mediaType: "video" 
    },
    {
      id: "mem-02",
      title: "Pizza Night",
      description: "Attempting to make dough from scratch. A complete disaster but so fun.",
      mediaSrc: "assets/photo1.jpeg", 
      mediaType: "image"
    },
    {
      id: "mem-03",
      title: "Summer Concert",
      description: "Front row at the festival. Best night ever.",
      mediaSrc: "assets/vid2.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-04",
      title: "City Lights",
      description: "Walking around downtown after midnight.",
      mediaSrc: "assets/vid3.MOV", 
      mediaType: "video"
    },
    {
      id: "mem-05",
      title: "Beach Day",
      description: "Trying to surf and failing miserably.",
      mediaSrc: "assets/vid4.MOV", 
      mediaType: "video"
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

// 2. Create Fullscreen Player UI
const playerView = document.createElement("div");
playerView.className = "memory-player";
playerView.innerHTML = `
  <button class="memory-player-close" id="close-player">×</button>
  <div class="memory-player-media" id="player-media"></div>
`;
document.body.appendChild(playerView);

// 3. Grab Player Elements
const closeDetailsBtn = document.getElementById("close-details");
const detailsBg = document.getElementById("details-bg");
const detailsTitle = document.getElementById("details-title");
const detailsDesc = document.getElementById("details-desc");
const detailsPlayBtn = document.getElementById("details-play");

const closePlayerBtn = document.getElementById("close-player");
const playerMedia = document.getElementById("player-media");

let currentMediaURL = "";
let currentMediaType = "";


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
    if (clientData.heroMemory.mediaType === "video") {
      heroBg.innerHTML = `<video src="${clientData.heroMemory.mediaSrc}" autoplay muted loop playsinline></video>`;
    } else {
      heroBg.innerHTML = `<img src="${clientData.heroMemory.mediaSrc}" alt="Hero Background">`;
    }

    // Hero Action: "Watch Now" (Jumps straight to fullscreen player)
    heroPlayBtn.addEventListener("click", () => {
      currentMediaURL = clientData.heroMemory.mediaSrc;
      currentMediaType = clientData.heroMemory.mediaType;
      
      playerMedia.innerHTML = "";
      let mediaElement;
      
      if (currentMediaType === "video") {
        playerMedia.innerHTML = `<video src="${currentMediaURL}" controls autoplay></video>`;
        mediaElement = playerMedia.querySelector("video");
      } else {
        playerMedia.innerHTML = `<img src="${currentMediaURL}">`;
        mediaElement = playerView;
      }
      
      playerView.classList.add("show");
      
      if (mediaElement) {
        if (mediaElement.requestFullscreen) {
          mediaElement.requestFullscreen().catch(err => console.log(err));
        } else if (mediaElement.webkitRequestFullscreen) {
          mediaElement.webkitRequestFullscreen();
        }
      }
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
    if (memory.mediaType === "video") {
      mediaHTML = `<video src="${memory.mediaSrc}" class="memory-media" muted loop preload="metadata"></video>`;
    } else {
      mediaHTML = `<img src="${memory.mediaSrc}" alt="${memory.title}" class="memory-media">`;
    }

    // Build the Card Content Overlay
    memoryCard.innerHTML = `
      ${mediaHTML}
      <div class="memory-card-content">
        <h3>${memory.title}</h3>
        <p>${memory.description}</p>
      </div>
    `;

    // Click to Open Player
    memoryCard.addEventListener("click", () => {
      openMemoryPlayer(memory.mediaSrc, memory.mediaType, memory.title, memory.description);
    });

    // Netflix Hover Effect (Auto-play video preview on hover)
    if (memory.mediaType === "video") {
      const vid = memoryCard.querySelector("video");
      memoryCard.addEventListener("mouseenter", () => {
        vid.play().catch(e => {}); // Catch silent play errors
      });
      memoryCard.addEventListener("mouseleave", () => {
        vid.pause();
        vid.currentTime = 0; 
      });
    }

    memoryGrid.appendChild(memoryCard);
  });
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", initializeApp);


/* -------------------------
   PLAYER FUNCTIONS
------------------------- */

// Function: Open Details View 
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

// Function: Open Fullscreen Player
detailsPlayBtn.addEventListener("click", () => {
  playerMedia.innerHTML = ""; 
  let mediaElement;

  if (currentMediaType === "video") {
    playerMedia.innerHTML = `<video src="${currentMediaURL}" controls autoplay></video>`;
    mediaElement = playerMedia.querySelector("video");
  } else {
    playerMedia.innerHTML = `<img src="${currentMediaURL}">`;
    mediaElement = playerView;
  }

  playerView.classList.add("show");

  if (mediaElement) {
    if (mediaElement.requestFullscreen) {
      mediaElement.requestFullscreen().catch(err => console.log("Fullscreen blocked:", err));
    } else if (mediaElement.webkitRequestFullscreen) { 
      mediaElement.webkitRequestFullscreen();
    }
  }
});

// Function: Close Fullscreen Player
function closeFullscreenPlayer() {
  const playingVideo = playerMedia.querySelector("video");
  if (playingVideo) playingVideo.pause(); 
  
  playerView.classList.remove("show");
  setTimeout(() => { playerMedia.innerHTML = ""; }, 300);
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

document.addEventListener("click", (event) => {
  if (profileWrapper && !profileWrapper.contains(event.target)) {
    profileMenu?.classList.remove("show");
  }
});


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
   NATIVE FULLSCREEN SYNC
------------------------- */
// This forces our custom player to close if the user presses ESC to exit native fullscreen
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    closeFullscreenPlayer();
  }
});

// Safari Support for the same feature
document.addEventListener("webkitfullscreenchange", () => {
  if (!document.webkitFullscreenElement) {
    closeFullscreenPlayer();
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
const bottomNav = document.querySelector(".mobile-bottom-nav");

// 1. Open Mobile Search & Hide Home Screen
if (mobileSearch) {
  mobileSearch.addEventListener("click", (e) => {
    e.stopPropagation();
    setMobileActive(mobileSearch);
    
    // Hide dock, show search bar
    bottomNav.style.opacity = "0";
    bottomNav.style.visibility = "hidden";
    mobileSearchBar.classList.add("show");
    
    // 🚨 NEW: Hide the hero and main grid!
    document.body.classList.add("search-active");
    
    // Show the dark search results screen
    searchResultsSection.classList.add("show");
    searchResultsTitle.textContent = "Search Memories";
    searchMessage.textContent = "Start typing to search your memories.";
    searchResultsGrid.innerHTML = "";
    
    mobileSearchInput.focus();
    window.scrollTo(0, 0); // Instantly snap to the top of the screen
  });
}

// 2. Close Mobile Search & Bring Home Screen Back
if (mobileSearchClose) {
  mobileSearchClose.addEventListener("click", () => {
    mobileSearchBar.classList.remove("show");
    bottomNav.style.opacity = "1";
    bottomNav.style.visibility = "visible";
    
    // 🚨 NEW: Bring the hero and grid back!
    document.body.classList.remove("search-active");
    
    searchResultsSection.classList.remove("show"); 
    setMobileActive(mobileHome); 
    mobileSearchInput.value = ""; 
  });
}

// 3. The Actual Search Engine for Mobile (Bulletproof Version)
const mobileSearchBox = document.getElementById("mobile-search-input");

if (mobileSearchBox) {
  mobileSearchBox.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Grab the exact result containers
    const resultsGrid = document.getElementById("search-results-grid");
    const resultsTitle = document.getElementById("search-results-title");
    const resultsMessage = document.getElementById("search-message");
    
    // Clear previous results
    resultsGrid.innerHTML = "";

    // If the box is empty, reset the text
    if (searchTerm === "") {
      resultsTitle.textContent = "Search Memories";
      resultsMessage.textContent = "Start typing to search your memories.";
      return;
    }

    // Find all memory cards currently on the page
    const memoryCards = document.querySelectorAll("#memory-grid .memory-card");
    let matchCount = 0;

    // Filter through them
    memoryCards.forEach((card) => {
      // Look at all the text inside the card (Title + Description)
      const searchableText = (card.textContent || "").toLowerCase();

      if (searchableText.includes(searchTerm)) {
        matchCount++;
        
        // Clone the matching card for the results page
        const resultCard = card.cloneNode(true);
        
        // Re-attach the click-to-play function to the cloned card
        resultCard.addEventListener("click", () => {
          openMemoryPlayer(
            resultCard.dataset.media,
            resultCard.dataset.mediaType,
            resultCard.dataset.title,
            resultCard.dataset.description
          );
        });

        resultsGrid.appendChild(resultCard);
      }
    });

    // Update the titles based on if we found anything
    if (matchCount > 0) {
      resultsTitle.textContent = `Results for "${e.target.value}"`;
      resultsMessage.textContent = `${matchCount} memory found` + (matchCount > 1 ? "s" : "");
    } else {
      resultsTitle.textContent = "No memories found";
      resultsMessage.textContent = `We couldn't find anything matching "${e.target.value}".`;
    }
  });
}