// Function to fetch JSON data and load items
function loadItemsFromJson() {
    fetch('/samp/item.json')  // Replace with your actual JSON file path
        .then(response => response.json())
        .then(data => {
            let itemsContainer = document.getElementById('items-container');

            // Clear the container before appending new items
            itemsContainer.innerHTML = '';

            data.forEach(item => {
                // Create a new div for the item
                let itemDiv = document.createElement('div');
                itemDiv.className = 'item';

                // Dynamically construct the image URL using the id from JSON
                let imgUrl = "../images/premium/" + item.id + ".jpg";

                // Create the image element
                let imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = item.name;

                // Create the item name element
                let nameElement = document.createElement('p');
                nameElement.textContent = item.name;

                // Create the item credit element
                let creditElement = document.createElement('p');
                creditElement.textContent = "Credits: " + item.credits;

                // Create a new button for adding the item
                let addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.className = 'button';
                addButton.onclick = function () {
                    addItem(item.credits, item.name);
                };

                // Append all elements to the item div
                itemDiv.appendChild(imgElement);
                itemDiv.appendChild(nameElement);
                itemDiv.appendChild(creditElement);
                itemDiv.appendChild(addButton);

                // Append the item div to the container
                itemsContainer.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Function to add item to the list and update credits and cash
function addItem(creditValue, itemName) {
    let credits = document.getElementById('Credits');
    let cash = document.getElementById('cash');

    // Update credits and cash values
    let currentCredits = parseInt(credits.textContent);
    credits.textContent = currentCredits + creditValue;

    let currentCash = parseInt(cash.textContent);
    cash.textContent = currentCash + creditValue;

    // Add the item to the list
    let itemsList = document.getElementById('items');
    let newItem = document.createElement('li');
    newItem.textContent = itemName + " - " + creditValue + " credits";

    // Add click event to remove the item when clicking on the list item (newItem)
    newItem.onclick = function () {
        removeItem(newItem, creditValue);
    };

    itemsList.appendChild(newItem);
}

// Function to remove item from the list and update credits and cash
function removeItem(itemElement, creditValue) {
    let credits = document.getElementById('Credits');
    let cash = document.getElementById('cash');

    // Subtract the item's credit value from the total credits and cash
    let currentCredits = parseInt(credits.textContent);
    credits.textContent = currentCredits - creditValue;

    let currentCash = parseInt(cash.textContent);
    cash.textContent = currentCash - creditValue;

    // Remove the item from the list
    itemElement.remove();
}

// Function to clear the list and reset credits and cash
function clearList() {
    document.getElementById('Credits').textContent = '0';
    document.getElementById('cash').textContent = '0';
    document.getElementById('items').innerHTML = '';  // Clear all items from the list
}

// Function to close the terms popup
function closeTermsPopup() {
    sessionStorage.setItem('agreed', 'true');
    document.getElementById('terms-popup').style.display = 'none';
}
// show qr code 
function showqrcode() {
    
}
// Load items from the JSON file when the window loads
window.onload = function () {
    // Check if the user has already agreed to the terms today
    let agreed = sessionStorage.getItem('agreed');
    if (!agreed) {
        document.getElementById('terms-popup').style.display = 'block';
    }

    // Call the function to load items from JSON when the page loads
    loadItemsFromJson();
};
