// Define constants
#define MAX_DISTANCE 100.0  // Maximum distance to check for players and vehicles
#define MAX_BOTS 100        // Maximum number of bots we can spawn

// Define arrays to store the data of the "photo" (positions of players and vehicles)
new Float photoPlayerPos[MAX_BOTS][3];  // Array to store positions of players in the photo
new photoVehiclePos[MAX_BOTS][3];        // Array to store positions of vehicles in the photo
new photoPlayers[MAX_BOTS];              // Array to store the player IDs who were in the photo
new photoVehicles[MAX_BOTS];             // Array to store the vehicle IDs

// Command to take a photo
cmd_takephoto(playerid, params[])
{
    new Float:x, Float:y, Float:z;
    new playerCount = 0, vehicleCount = 0;
    new botSkin, vehicleModel;

    // Get the player's position
    GetPlayerPos(playerid, x, y, z);

    // Inform the player the photo is being taken
    SendClientMessage(playerid, COLOR_GREEN, "Taking photo...");

    // Step 1: Detect nearby players and replace them with bots
    for (new i = 0; i < MAX_PLAYERS; i++) {
        if (i != playerid && IsPlayerConnected(i)) {
            new Float:px, Float:py, Float:pz;
            GetPlayerPos(i, px, py, pz);

            // Check if the player is within the defined range
            if (GetDistanceBetweenCoords(x, y, z, px, py, pz) < MAX_DISTANCE) {
                // Save the position of the player and store the player ID
                photoPlayerPos[playerCount][0] = px;
                photoPlayerPos[playerCount][1] = py;
                photoPlayerPos[playerCount][2] = pz;
                photoPlayers[playerCount] = i;
                
                // Replace player with a bot (random skin)
                botSkin = 280 + random(8);  // Random skins from 280 to 287
                SetPlayerPos(i, x + random(5) - 2.5, y + random(5) - 2.5, z);  // Move the bot slightly
                SetPlayerSkin(i, botSkin);  // Assign random bot skin
                SetPlayerHealth(i, 100);    // Set bot health to 100
                SetPlayerInvulnerable(i, 1); // Make the bot invulnerable
                playerCount++;
            }
        }
    }

    // Step 2: Detect nearby vehicles and replace them with static vehicles
    for (new v = 0; v < MAX_VEHICLES; v++) {
        if (IsVehicleOnScreen(v)) {
            new Float:vx, Float:vy, Float:vz;
            GetVehiclePos(v, vx, vy, vz);

            // Check if the vehicle is within the defined range
            if (GetDistanceBetweenCoords(x, y, z, vx, vy, vz) < MAX_DISTANCE) {
                // Save the vehicle position and store the vehicle ID
                photoVehiclePos[vehicleCount][0] = vx;
                photoVehiclePos[vehicleCount][1] = vy;
                photoVehiclePos[vehicleCount][2] = vz;
                photoVehicles[vehicleCount] = v;

                // Replace vehicle with a static vehicle (you can customize the model ID)
                vehicleModel = 541;  // Example: static vehicle (you can change to any model ID)
                DestroyVehicle(v); // Remove the current vehicle
                AddStaticVehicle(vehicleModel, vx, vy, vz, 0.0, 0, 0); // Spawn a static vehicle
                vehicleCount++;
            }
        }
    }

    return 1;
}

// Command to view the photo (recreate the scene)
cmd_viewphoto(playerid, params[])
{
    // Check if a photo has been taken
    if (photoPlayers[0] == 0 && photoVehicles[0] == 0) {
        SendClientMessage(playerid, COLOR_RED, "No photo has been taken yet.");
        return 0;
    }

    // Show the players and vehicles in the photo
    SendClientMessage(playerid, COLOR_BLUE, "Displaying photo...");

    // Step 1: Restore bots to original players
    for (new i = 0; i < MAX_BOTS; i++) {
        if (photoPlayers[i] != 0) {
            // Restore the original player (remove bot)
            SetPlayerSkin(photoPlayers[i], 0); // Set the skin back to normal
            SetPlayerPos(photoPlayers[i], photoPlayerPos[i][0], photoPlayerPos[i][1], photoPlayerPos[i][2]);
            SetPlayerHealth(photoPlayers[i], 100);
            SetPlayerInvulnerable(photoPlayers[i], 0); // Make the player vulnerable again
        }
    }

    // Step 2: Restore vehicles to their original positions
    for (new v = 0; v < MAX_BOTS; v++) {
        if (photoVehicles[v] != 0) {
            // Destroy the static vehicle
            DestroyVehicle(photoVehicles[v]);
            // Restore the vehicle (you can choose to spawn it again or leave it removed)
            AddVehicle(photoVehicles[v], photoVehiclePos[v][0], photoVehiclePos[v][1], photoVehiclePos[v][2], 0.0, 0, 0);
        }
    }

    return 1;
}