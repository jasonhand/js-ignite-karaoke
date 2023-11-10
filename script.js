const images = [];
let currentIndex = 0;
let slideshowInterval = null;
let imagesDisplayed = 0; // Counter for the number of images displayed
let maxImagesToShow = 6; // The maximum number of images to show before stopping
const startButton = document.getElementById('startButton');
const slideshowImage = document.getElementById('slideshowImage');
const imageCounter = document.getElementById('imageCounter'); // Add this line after you get your other elements by ID
const imageSourceDropdown = document.getElementById('imageSourceDropdown');


// Get the dropdown element
let imageCountDropdown = document.getElementById('imageCountDropdown');

// Event listener for the dropdown
imageCountDropdown.addEventListener('change', function() {
  // Update the maxImagesToShow with the selected value from the dropdown
  maxImagesToShow = parseInt(this.value, 10);

  // Do not start the slideshow here. Just update the maxImagesToShow variable.
  // The slideshow should only start when the start button is clicked.
});;

//new
function preloadImages() {
  let jsonFile = imageSourceDropdown.value === 'datadog' ? 'datadog_images.json' : 'images.json';

  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      images.length = 0; // Clear existing images
      images.push(...data);
      startButton.disabled = false;
    })
    .catch(error => {
      console.error('Error loading images:', error);
      startButton.disabled = true;
    });
}

imageSourceDropdown.addEventListener('change', function() {
  preloadImages(); // Call this function to load images when the dropdown selection changes
});

//end new



// Event listener for the new dropdown
imageSourceDropdown.addEventListener('change', preloadImages);

function setNextImage() {
  if (imagesDisplayed >= maxImagesToShow) {
    stopSlideshow();
    return; // Stop showing more images
  }
  
  if (images.length === 0) {
    console.log('No more unique images to display.');
    stopSlideshow();
    return;
  }

  // Generate a random index based on the remaining length of the images array
  currentIndex = Math.floor(Math.random() * images.length);
  
  // Retrieve the image at the random index and remove it from the array
  const nextImage = images.splice(currentIndex, 1)[0].replace(/&quot;/g, '').replace(/"/g, "");
  
  // Set the image source
  slideshowImage.style.backgroundImage = 'url(' + nextImage + ')';
  
  // Apply the Ken Burns effect by adding the class to the element
  slideshowImage.classList.remove('ken-burns-effect');
  void slideshowImage.offsetWidth;
  slideshowImage.classList.add('ken-burns-effect');
  
  // Update the overlay text with the current image count
  imageCounter.textContent = `🎤  ${imagesDisplayed + 1} of ${maxImagesToShow} 🔥`;
  
  imagesDisplayed++; // Increment the counter
}

function startSlideshow() {
  if (images.length === 0) {
    console.log('No images to display.');
    return;
  }

  // Hide the dropdowns when the slideshow starts
  imageCountDropdown.style.display = 'none';
  imageSourceDropdown.style.display = 'none';

  imagesDisplayed = 0; // Reset the counter when the slideshow starts
  setNextImage();
  slideshowInterval = setInterval(setNextImage, 10000);
  startButton.style.display = 'none';
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowImage.style.backgroundImage = '';
  slideshowImage.classList.remove('ken-burns-effect');
  startButton.style.display = 'block';

  // Show the dropdowns again
  imageCountDropdown.style.display = 'block';
  imageSourceDropdown.style.display = 'block';

  if (imagesDisplayed >= maxImagesToShow) {
    setTimeout(function() {
      location.reload();
    }, 2000); // Wait for 2 seconds
  } else {
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
