# Multimodal LLM Testing Instructions Generator

## Project Overview

This project is a **Multimodal Large Language Model (LLM)** tool designed to generate detailed testing instructions based on images (screenshots) and user input text. The tool takes multiple screenshots, analyzes them, and produces comprehensive test cases for digital product features.

The project utilizes **Google's Gemini API** (Generative AI) to process the images and user-provided context, offering structured test cases for various features like **source/destination selection**, **bus and seat selection**, and **pick-up/drop-off points**.

## Key Features

- **Multi-image support**: Upload multiple screenshots at once to generate a single, unified set of test cases.
- **Text input-based prompt**: Input custom prompts alongside images for context-based testing instructions.
- **Cyberpunk-inspired UI**: A visually striking red and black gradient UI with hover effects for interactive experience.
- **Hover Image Effect**: Images slightly enlarge and appear unblurred upon hover while the background blurs.
- **RESTful API**: Built with Express.js to handle image uploads and interaction with the **Google Gemini API**.
  
## Core Functionalities

### Testing Instructions Generation
The tool supports generating test instructions for the following:
- **Core Features**: 
  - Source, Destination, and Date Selection
  - Bus Selection
  - Seat Selection
  - Pick-up and Drop-off Point Selection
- **Bonus Features**: 
  - Offers
  - Filters
  - Bus Information

Each generated test case includes:
- **Description**
- **Pre-conditions**
- **Testing Steps**
- **Expected Result**

## Technologies Used

- **Backend**: Node.js, Express.js, Multer (for image uploads)
- **AI Model**: Google Generative AI (Gemini API)
- **Frontend**: HTML, CSS (Cyberpunk aesthetic)
- **Storage**: File system for image storage
- **Language**: JavaScript (ES6+)

## Project Setup

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14+)
- **npm** or **yarn**
- **Git**
- **Google Generative AI API Key** (Google Cloud account required)

### Installation

1. **Clone the repository**:
   ```bash
   
   git clone https://github.com/adityaahj/redbus-multimodal.git

2. Navigate to the project directory:
   ```bash
   
   cd redbus-multimodal
   
3. Install the dependencies:
   ```bash
   
   npm install

4. Create a .env file with your Google Gemini API key:
   ```bash
   
   GEMINI_API_KEY=your-google-api-key

## Running the Project

### Start the server
    
    npm start 
    
The server will start on http://localhost:8000

Open your browser and navigate to http://localhost:8000. You will see the web interface where you can upload screenshots, input your text, and generate testing instructions.

Usage
**Upload Screenshots:** Upload one or multiple screenshots that represent the features you want to test.

**Input Context:** Provide any additional text or context related to the features.

**Analyze:** Click the Analyze button to generate a unified list of test cases.

**Clear:** Reset the form and start over if necessary.

## Project Structure

**server.js:** The main server file handling API requests and interactions with Google Generative AI.

**public/:** Directory where uploaded images are stored.

**views/:** Contains HTML and CSS files for the frontend.

**README.md:** Documentation for the project.

**.env:** Stores API keys and environment variables (not included in the repo for security).

## Future Enhancements

**Integration with Other LLMs:** Explore integrating with other AI models to compare output quality.

**User Authentication:** Add a user authentication layer to store user-specific analysis data.

**Expanded Feature Set:** Allow the generation of testing instructions for other digital product features.

## License

*This project is licensed under the MIT License - see the LICENSE file for details.*

## Acknowledgements

**Google Generative AI** for the Gemini API used to generate content.
**WebStorm** for providing a seamless development environment.


## Screenshots 

![image](https://github.com/user-attachments/assets/8be41faf-1133-49e0-9615-2a24c6210914)

![image](https://github.com/user-attachments/assets/0fd4830b-1793-4535-b630-eca3faa3d853)

![image](https://github.com/user-attachments/assets/d1f82384-0c6c-4ca4-8d75-39ef20e0abb9)

![image](https://github.com/user-attachments/assets/8acf2d01-d5a8-443e-9320-3c7b6a8677f9)

![image](https://github.com/user-attachments/assets/ec086517-3526-4d1b-9468-1ce670455e7f)

![image](https://github.com/user-attachments/assets/2d7d1da1-2ca2-45b5-8f83-fc93332c067e)

![image](https://github.com/user-attachments/assets/7a37ca87-5564-428c-92b1-c3ba5605a4be)

![image](https://github.com/user-attachments/assets/dbd71544-f867-4d35-b9a7-0d12287ea0eb)

![image](https://github.com/user-attachments/assets/36a2a157-3525-4ec1-8cea-e3491d54de72)

![image](https://github.com/user-attachments/assets/f711bae6-3c7c-43ea-aacb-83dcf1993501)

![image](https://github.com/user-attachments/assets/df668965-2e24-4063-bde1-666b31ec5b08)
