let dcitems = "";
// Fetch and load items from the database
// Load items from the database
function loadItemsFromDatabase() {
    fetch('premium.php?action=getPlans') // Calls the same PHP script but with a query parameter
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            let itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = ''; // Clear container before loading items

            data.forEach(item => {
                let itemDiv = document.createElement('div');
                itemDiv.className = 'item';

                // Construct image URL dynamically
                let imgUrl = `http://weedarr.wdfiles.com/local--files/veh/${item.id}.png`;

                // Create image element
                let imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = item.name;

                // Create name element
                let nameElement = document.createElement('p');
                nameElement.textContent = item.name;

                // Create credit element
                let creditElement = document.createElement('p');
                creditElement.textContent = "Credits: " + item.credits;

                let addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.className = 'button';
                addButton.onclick = function () {
                    addItem(item.credits, item.name, item.id);
                };

                itemDiv.appendChild(imgElement);
                itemDiv.appendChild(nameElement);
                itemDiv.appendChild(creditElement);
                itemDiv.appendChild(addButton);
                itemsContainer.appendChild(itemDiv);
            });
        })
        .catch(error => {
            console.error('Error loading items:', error); // Log errors in the console
        });
}

// Function to add item to the list and update credits
function addItem(creditValue, itemName, itemid) {
    let credits = document.getElementById('Credits');

    // Ensure credits are updated correctly (no string concatenation)
    let currentCredits = credits.textContent;
    credits.textContent = parseInt(currentCredits) + parseInt(creditValue);

    // Add the item to the list
    let itemsList = document.getElementById('items');
    let newItem = document.createElement('li');
    newItem.textContent = itemName + " - " + creditValue + " credits";
    dcitems += itemid + "\n";


    // Add click event to remove the item when clicking on the list item (newItem)
    newItem.onclick = function () {
        removeItem(newItem, creditValue, itemid); // Pass the itemName to removeItem
    };

    itemsList.appendChild(newItem);
}


// Function to remove item from the list and update credits
function removeItem(itemElement, creditValue, itemid) {
    let credits = document.getElementById('Credits');

    // Subtract the item's credit value from the total credits
    let currentCredits = credits.textContent; // Default to 0 if NaN
    credits.textContent = parseInt(currentCredits) - parseInt(creditValue);

    // Remove the item from the list
    itemElement.remove();

    // Update the dcitems string
    dcitems = dcitems.replace(itemid + "\n", "");
}

// Function to clear the list and reset credits
function clearList() {
    document.getElementById('Credits').textContent = '0'; // Reset credits
    document.getElementById('items').innerHTML = ''; // Clear the item list
}

// Function to close the terms popup
function closeTermsPopup() {
    sessionStorage.setItem('agreed', 'true');
    document.getElementById('terms-popup').style.display = 'none';
}

function clearList() {
    document.getElementById('Credits').textContent = '0'; // Reset credits
    document.getElementById('items').innerHTML = ''; // Clear the item list
    dcitems = ""; // Clear dcitems string
}


function dbbalance(balance) {
    message = `userid: ${cuserid}\ncredit: ${balance}`;
    sendMessageToDiscord(message, creditupdatewebhook, '');
    setTimeout(() => {
        fetchUserCredits();
    }, 2000);
}

function declinePurchase() {
    document.getElementById('confirmationPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showqrcode() {
    document.querySelector('.qrcode-container').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

function closeQRCode() {
    document.querySelector('.qrcode-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
let permitem;
let gcredit;

// Make showConfirmation async to properly use await
function showConfirmation(msg, item) {
    let userCredits = fetchUserCredits();
    // Get premium item name based on the provided item ID
    permitem = document.getElementById(`${item}premiumname`).textContent;

    // Set gcredit based on the item type
    switch (item) {
        case 'vehicles':
            gcredit = parseInt(document.getElementById('Credits').textContent);
            break;
        case 'diamond':
            gcredit = parseInt(document.getElementById('diamondpremium').textContent);
            break;
        case 'gold':
            gcredit = parseInt(document.getElementById('goldpremium').textContent);
            break;
        case 'platinum':
            gcredit = parseInt(document.getElementById('platinumpremium').textContent);
            break;
        case 'gang':
            gcredit = parseInt(document.getElementById('gangpremium').textContent);
            break;
        case 'shop':
            gcredit = parseInt(document.getElementById('shoppremium').textContent);
            break;
        case 'house':
            gcredit = parseInt(document.getElementById('housepremium').textContent);
            break;
        case 'backpack':
            gcredit = parseInt(document.getElementById('backpackpremium').textContent);
            break;
    }

    // Await the result of fetchUserCredits to get the correct user credits

    // Check if the user has enough credits and proceed accordingly
    if (userCredits != 0) {
        document.getElementById('confirmpurchase').innerHTML = msg;
        document.getElementById('confirmationPopup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
}

// Function to confirm the purchase
let isProcessing = false;
const COOLDOWN_TIME = 1000; // 1 second cooldown time

async function confirmPurchase() {
    if (isProcessing) {
        // If a purchase is already being processed, ignore the call
        return;
    }

    isProcessing = true;  // Set the flag to indicate processing is in progress

    try {
        let balance = parseInt(document.getElementById('dbcredit').textContent);
        let userCredits = await fetchUserCredits();

        if (gcredit <= userCredits) {
            purchase(dcitems, permitem); // Assuming dcitems and permitem are defined
            clearList(); // Assuming clearList is defined
            dbbalance(balance - gcredit); // Update the database balance
        } else {
            alert("You don't have enough balance. First, buy credits.\n\n\nSent cash through QR code and send the screenshot to Discord. Wait for the admin's response.");
        }

        document.getElementById('confirmationPopup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    } catch (error) {
        console.error("Error during purchase:", error);
    } finally {
        // Reset the flag after the cooldown period
        setTimeout(() => {
            isProcessing = false; // Reset processing flag after cooldown time
        }, COOLDOWN_TIME);
    }
}

// Function to fetch user credits and update the balance
async function fetchUserCredits() {
    // Get the user ID from the local storage or browser cache (ensure cuserid is defined properly)
    if (cuserid) {
        try {
            const response = await fetch(`premium.php?action=getUserCredits&user_id=${cuserid}`);
            const data = await response.json();
            if (data.credit_points) {
                document.getElementById("dbcredit").textContent = data.credit_points;
                return data.credit_points; // Return the credit points
            } else {
                console.error('Error fetching user credits:', data.error);
                return 0; // Return 0 if there is an error
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return 0; // Return 0 on fetch failure
        }
    } else {
        console.error('User ID not found in cache.');
        return 0; // Return 0 if user ID is not found
    }
}



// Load items from the database when the window loads
window.onload = function () {
    // Check if the user has already agreed to the terms today
    let agreed = sessionStorage.getItem('agreed');
    if (!agreed) {
        document.getElementById('terms-popup').style.display = 'block';
    }

    // Call the function to load items from the database when the page loads
    fetchUserCredits();
    loadItemsFromDatabase();
};
function notification(msg, time, color) {
    const notificationContainer = document.getElementById('notification-container');
    const noti = document.createElement('div');
    noti.classList.add('notification');
    noti.innerHTML = `
      <img src="../images/icon/envelope-regular.svg" alt="notification-icon" width="18px" height="18px">
      &nbsp;&nbsp; ${msg}
    `;
    noti.style.backgroundColor = color;
    notificationContainer.appendChild(noti);

    setTimeout(() => {
        noti.style.opacity = '1';
        noti.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        noti.style.opacity = '0';
        noti.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            notificationContainer.removeChild(noti);
        }, 300);
    }, time);
}
function packs() {
    const hardPlans = document.getElementById('hardplans');
    hardPlans.style.display = (hardPlans.style.display === 'flex') ? 'none' : 'flex';
}

function handleDiamondSelection() {
    const select = document.getElementById('diamond-select');
    const selectedValue = select.value;
    const creditValues = {
        diamond1: { credits: 100, name: 'Diamond Premium 1 month' },
        diamond2: { credits: 300, name: 'Diamond Premium 3 months' },
        diamond3: { credits: 1000, name: 'Diamond Premium 1 year' }
    };
    const selectedDiamond = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('diamondpremium').innerText = selectedDiamond.credits;
    document.getElementById('diamondpremiumname').innerText = selectedDiamond.name;
}

function handleGoldSelection() {
    const select = document.getElementById('gold-select');
    const selectedValue = select.value;
    const creditValues = {
        gold1: { credits: 75, name: 'Gold Premium 1 month' },
        gold2: { credits: 175, name: 'Gold Premium 3 months' },
        gold3: { credits: 500, name: 'Gold Premium 1 year' }
    };
    const selectedGold = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('goldpremium').innerText = selectedGold.credits;
    document.getElementById('goldpremiumname').innerText = selectedGold.name;
}

function handlePlatinumSelection() {
    const select = document.getElementById('platinum-select');
    const selectedValue = select.value;
    const creditValues = {
        platinum1: { credits: 50, name: 'Platinum Premium 1 month' },
        platinum2: { credits: 150, name: 'Platinum Premium 3 months' }
    };
    const selectedPlatinum = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('platinumpremium').innerText = selectedPlatinum.credits;
    document.getElementById('platinumpremiumname').innerText = selectedPlatinum.name;
}

function handleGangSelection() {
    const select = document.getElementById('gang-select');
    const selectedValue = select.value;
    const creditValues = {
        gang1: { credits: 150, name: 'Heli' },
        gang2: { credits: 400, name: 'Custom vehicle' },
        gang3: { credits: 500, name: 'Heli + Custom vehicle' }
    };
    const selectedGang = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('gangpremium').innerText = selectedGang.credits;
    document.getElementById('gangpremiumname').innerText = selectedGang.name;
}

function handleShopSelection() {
    const select = document.getElementById('shop-select');
    const selectedValue = select.value;
    const creditValues = {
        shop1: { credits: 500, name: '24/7' },
        shop2: { credits: 300, name: 'Food shop' },
        shop3: { credits: 250, name: 'Cloth shop' },
        shop4: { credits: 500, name: 'Fuel shop' }
    };
    const selectedShop = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('shoppremium').innerText = selectedShop.credits;
    document.getElementById('shoppremiumname').innerText = selectedShop.name;
}

function handleHouseSelection() {
    const select = document.getElementById('house-select');
    const selectedValue = select.value;
    const creditValues = {
        house1: { credits: 100, name: 'Small House' },
        house2: { credits: 250, name: 'Medium House' },
        house3: { credits: 400, name: 'Large House' },
        house4: { credits: 600, name: 'Mansion' }
    };
    const selectedHouse = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('housepremium').innerText = selectedHouse.credits;
    document.getElementById('housepremiumname').innerText = selectedHouse.name;
}

function handleBackpackSelection() {
    const select = document.getElementById('backpack-select');
    const selectedValue = select.value;
    const creditValues = {
        backpack1: { credits: 300, name: 'Small Backpack' },
        backpack2: { credits: 500, name: 'Medium Backpack' },
        backpack3: { credits: 600, name: 'Large Backpack' }
    };
    const selectedBackpack = creditValues[selectedValue] || { credits: 0, name: '' };
    document.getElementById('backpackpremium').innerText = selectedBackpack.credits;
    document.getElementById('backpackpremiumname').innerText = selectedBackpack.name;
}

