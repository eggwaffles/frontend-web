async function loadAstrosData() {
    let apiUrl = "http://api.open-notify.org/astros.json";
    // get the package
    let response = await fetch(apiUrl).catch(err => console.error(err));
    console.log(response);
    // open the package as a a javascript object
    let json = await response.json();
    console.log(json);
    let people = json.people;
    let craft = json.craft;
    
    for (let person of people) {
        // Create a container div for each astronaut
        let astroContainer = document.createElement("div");
        astroContainer.classList.add("astroContainer");
  
        // Create an image element
        let astroImage = document.createElement("img");
        astroImage.src = "astro.webp";
        astroImage.alt = person.name;
  
        // Create a paragraph element for the astronaut's name
        let astroDescript = document.createElement("p");
        astroDescript.classList.add("astroDescript");
        astroDescript.innerHTML = `<b>${person.craft}:</b> ${person.name}`;
  
        // Append image and information to the container
        astroContainer.appendChild(astroImage);
        astroContainer.appendChild(astroDescript);
  
        // Append the container to the astroList
        astroList.appendChild(astroContainer);

        // Animate astronaut
        animateCalmFloat(astroContainer, Math.random() * 360);
    
        astroContainer.addEventListener("mouseenter", () => {
            astroDescript.style.display = "block";
        });
        
        astroContainer.addEventListener("mouseleave", () => {
            astroDescript.style.display = "none";
        });
    }
}

  // Function to add up and down float animation
function animateCalmFloat(element, startAngle) {
    let amplitude = 100; // Float amplitude in pixels
    let frequency = 0.0001; // Float frequency
  
    function float() {
      let angle = startAngle + Date.now() * frequency;
      let newPosition = Math.sin(angle) * amplitude;
  
      element.style.transform = `translateY(${newPosition}px)`;
  
      requestAnimationFrame(float);
    }
  
    float();
}
  
// ... (your existing code)

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
  
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
  
    star.style.left = `${xPos}vw`;
    star.style.top = `${yPos}vh`;
  
    return star;
}
  
function generateStars() {
    const starsContainer = document.querySelector(".stars");
  
    for (let i = 0; i < 50; i++) {
      starsContainer.appendChild(createStar());
    }
}

function getISSLocation() {
    fetch('http://api.open-notify.org/iss-now.json')
      .then(response => response.json())
      .then(data => {
        const timestamp = new Date(data.timestamp * 1000); // Convert UNIX timestamp to JavaScript Date
        const latitude = data.iss_position.latitude;
        const longitude = data.iss_position.longitude;

        const locationString = `Timestamp: ${timestamp.toLocaleString()}<br>Latitude: ${latitude}<br>Longitude: ${longitude}`;
        issLocationInfo.innerHTML = locationString;
      })
      .catch(error => {
        console.error('Error fetching ISS location:', error);
        issLocationInfo.innerHTML = 'Failed to fetch ISS location.';
      });
  }

getISSLocation();
generateStars();
loadAstrosData();