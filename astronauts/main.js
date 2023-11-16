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
        let astroContainer = document.createElement("div");
        astroContainer.classList.add("astroContainer");
  
        let astroImage = document.createElement("img");
        astroImage.src = "astro.webp";
        astroImage.alt = person.name;
  
        let astroDescript = document.createElement("p");
        astroDescript.classList.add("astroDescript");
        astroDescript.innerHTML = `<b>${person.craft}:</b> ${person.name}`;
  
        astroContainer.appendChild(astroImage);
        astroContainer.appendChild(astroDescript);
  
        astroList.appendChild(astroContainer);

        animateCalmFloat(astroContainer, Math.random() * 360);
    
        astroContainer.addEventListener("mouseenter", () => {
            astroDescript.style.display = "block";
        });
        
        astroContainer.addEventListener("mouseleave", () => {
            astroDescript.style.display = "none";
        });
    }
}

function animateCalmFloat(element, startAngle) {
    let amplitude = 100;
    let frequency = 0.0001;
  
    function float() {
      let angle = startAngle + Date.now() * frequency;
      let newPosition = Math.sin(angle) * amplitude;
  
      element.style.transform = `translateY(${newPosition}px)`;
  
      requestAnimationFrame(float);
    }
  
    float();
}

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
        const timestamp = new Date(data.timestamp * 1000);
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