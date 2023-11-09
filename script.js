const images = [];
let currentIndex = 0;
let slideshowInterval = null;
let imagesDisplayed = 0; // Counter for the number of images displayed
const maxImagesToShow = 6; // The maximum number of images to show before stopping
const startButton = document.getElementById('startButton');
const slideshowImage = document.getElementById('slideshowImage');
// Add this line after you get your other elements by ID
const imageCounter = document.getElementById('imageCounter');

function preloadImages() {
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      images.push(...data);
      startButton.disabled = false;
    })
    .catch(error => {
      console.error('Error loading images:', error);
      startButton.disabled = true;
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
      return; // Stop showing more images
    }
    
    // Generate a random index based on the length of the images array
    currentIndex = Math.floor(Math.random() * images.length);
    
    // Retrieve the image at the random index
    const nextImage = images[currentIndex].replace(/&quot;/g, '').replace(/"/g, "");
    
    // Set the image source
    slideshowImage.style.backgroundImage = 'url(' + nextImage + ')';
    
    // Apply the Ken Burns effect by adding the class to the element
    slideshowImage.classList.remove('ken-burns-effect'); // Remove the class if it's already there
    void slideshowImage.offsetWidth; // Trigger a reflow in between class changes
    slideshowImage.classList.add('ken-burns-effect'); // Re-add the class to restart the animation
    
    // Update the overlay text with the current image count
    imageCounter.textContent = `${imagesDisplayed + 1} of ${maxImagesToShow}`;
    
    imagesDisplayed++; // Increment the counter
  }
  

function startSlideshow() {
  if (images.length === 0) {
    console.log('No images to display.');
    return;
  }
  setNextImage();
  slideshowInterval = setInterval(setNextImage, 10000);
  startButton.style.display = 'none';
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowImage.style.backgroundImage = '';
  slideshowImage.classList.remove('ken-burns-effect');
  startButton.style.display = 'block';

  // Check if the max images have been displayed
  if (imagesDisplayed >= maxImagesToShow) {
    // Wait for a short period before refreshing to allow the user to see the last image
    setTimeout(function() {
      location.reload();
    }, 2000); // Wait for 2 seconds
  } else {
    // Reset the counter if the slideshow was stopped manually before the end
    imagesDisplayed = 0;
  }
}

startButton.addEventListener('click', startSlideshow);

document.addEventListener('keydown', (event) => {
  if (event.key === 'q' || event.key === 'Q') {
    stopSlideshow();
  }
});

window.onload = preloadImages;

