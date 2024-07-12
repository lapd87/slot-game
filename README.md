# Slot Game API

This is a Node.js API for a slot machine game, allowing users to play the game,
simulate multiple games, and manage their wallet. 
The game includes configurable wheels and symbols and offers both positive
and negative test cases for robustness.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/lapd87/slot-game.git
    ```
   then navigate to it

   ```bash
   cd slot-game
   ```
2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```
    The API will be accessible at http://localhost:3000.

## Usage
You can use Swagger's interactive UI to test the API endpoints by navigating to http://localhost:3000/docs

Alternatively you can use tools like Postman or Curl to access the API endpoints.

Example using Curl:

- Get all news
   ```bash
    curl -X GET http://localhost:3000/wallet/ballance
  ```

- Create a news article
  ```bash
    curl -X POST http://localhost:3000/play -H "Content-Type: application/json" -d '{"bet":10}'
   ```

### Game Endpoints
The API provides endpoints for playing the game, simulating multiple plays, retrieving the RTP (Return to Player) percentage, and managing the user's wallet.

- **POST /play**
    - Request:
      ```json
      {
        "bet": 10
      }
      ```
    - Response:
      ```json
      {
        "matrix": [["1", "2", "3"], ["4", "5", "1"], ["2", "3", "4"]],
        "winnings": 0
      }
      ```

- **POST /sim**
    - Request:
      ```json
      {
        "count": 10,
        "bet": 10
      }
      ```
    - Response:
      ```json
      {
        "totalWinnings": 0,
        "netResult": -100
      }
      ```

- **GET /rtp**
    - Response:
      ```json
      {
        "rtp": 87.5
      }
      ```

### Wallet Endpoints

- **POST /wallet/deposit**
    - Request:
      ```json
      {
        "amount": 100
      }
      ```
    - Response:
      ```json
      {
        "totalBalance": 100
      }
      ```

- **POST /wallet/withdraw**
    - Request:
      ```json
      {
        "amount": 50
      }
      ```
    - Response:
      ```json
      {
        "totalBalance": 50
      }
      ```

- **GET /wallet/balance**
    - Response:
      ```json
      {
        "totalBalance": 50
      }
      ```

## Error Handling

The API handles errors gracefully and provides meaningful error messages. Validation errors return a `400 Bad Request` status, while unexpected errors return a `500 Internal Server Error` status.

## Testing

The project includes tests for all API endpoints using Mocha and Chai. To run the tests:

```bash
npm test
