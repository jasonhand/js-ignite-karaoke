const images = [];
let currentIndex = 0;
let slideshowInterval = null;
let imagesDisplayed = 0; // Counter for the number of images displayed
const maxImagesToShow = 6; // The maximum number of images to show before stopping
const startButton = document.getElementById('startButton');
const slideshowImage = document.getElementById('slideshowImage');

function preloadImages() {
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      images.push(...data);
      startButton.disabled = false; // Enable the button once images are loaded
    })
    .catch(error => {
      console.error('Error loading images:', error);
      startButton.disabled = true; // Disable the button if images fail to load
    });
}

function startSlideshow() {
  if (images.length === 0) {
    console.log('No images to display.');
    return;
  }
  imagesDisplayed = 0; // Reset the counter when the slideshow starts
  setNextImage();
  slideshowInterval = setInterval(setNextImage, 10000);
  startButton.style.display = 'none';
}

function setNextImage() {  
  if (imagesDisplayed >= maxImagesToShow) {
    stopSlideshow();
    return; // Exit the function to prevent showing more images
  }

  const nextImageIndex = Math.floor(Math.random() * images.length); // Random index
  const nextImage = images[nextImageIndex].replace(/&quot;/g, '').replace(/"/g, "");
  const imgElement = document.getElementById('slideshowImage');
    
  imgElement.style.backgroundImage = 'url(' + nextImage + ')';
  imagesDisplayed++; // Increment the number of images displayed
  
  // Optional: if you want to remove the shown image from the array
  // images.splice(nextImageIndex, 1);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowImage.style.backgroundImage = ''; // Reset the background image
  startButton.style.display = 'block'; // Show the start button
  // Reset the currentIndex for when the slideshow starts again
  currentIndex = 0;
}

startButton.addEventListener('click', startSlideshow);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { // Changed to 'Escape' for more conventional control
    stopSlideshow();
  }
});

window.onload = preloadImages;
