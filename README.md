# FotoFrame

[![GitHub license](https://img.shields.io/github/license/Deba1995/FotoFrame)](https://github.com/Deba1995/FotoFrame/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Deba1995/FotoFrame)](https://github.com/Deba1995/FotoFrame/issues)
[![GitHub stars](https://img.shields.io/github/stars/Deba1995/FotoFrame)](https://github.com/Deba1995/FotoFrame/stargazers)

## Project Overview
Welcome to our FotoFrame! This is a user-friendly platform designed to allow users to create, share, and engage with images in a Pinterest-like manner. Our website stands out due to its simplicity and intuitive interface, making it easy for anyone to start pinning and sharing images right away.

## Live Demo

Check out the application: https://foto-prame.netlify.app/

      
         🚀 Give a Star ⭐️ & Fork to this project ... Happy coding! 🐼`

Feel free to explore the features and functionalities of the application. Please note that this is a demo environment and may not reflect the latest changes made to the codebase.


## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Screenshots
![LightMode Webiste Look](https://github.com/Deba1995/FotoFrame/assets/38239468/64f7dffd-2c0f-4f70-971d-d22a9560ff6f)

Shows the website in light mode

![DarkMode Webiste Look](https://github.com/Deba1995/FotoFrame/assets/38239468/e8165b92-f7c1-4dc5-808a-aa29168d03c0)

Shows the website in dark mode

## Features

Highlight the key features of your project. Use bullet points to make it easy to read.

- Image Upload: Users can easily upload their favorite images to create a pin. The process is straightforward and doesn't require any technical knowledge.
- Once a pin is created, users can share it with others or like it to express their interest. This feature fosters a sense of community among users.
- Users can comment on pins, providing a space for discussion and interaction. This adds a social aspect to the website, encouraging users to engage with each other's content.
- Each user has their own profile where they can view all their pins, liked pins, and comments. This personalized experience allows users to track their activity and discover new content.

## Installation

Follow these steps to set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/Deba1995/FotoFrame.git
   cd FOTO_FRAME_CLIENT

2. Create an account on Sanity and obtain the following credentials:
   VITE_SANITY_PROJECT_ID
   VITE_SANITY_TOKEN
3. Set up Google API key and obtain:
   VITE_GOOGLE_API_TOKEN
   
 - Configure environment variables by creating a .env file in the root directory of the fotoframe client folder and add the obtained credentials.

 - Configure CORS settings in Sanity and Google API to allow the necessary origins (local or deployed).

4. Go to server dir:
   
   ```bash
     cd ..
     cd FOTO_FRAME_SANITY_SERVER

5. In the fotoframe sanity server, go to the root directory and edit sanity.config.js with the required information. Refer to Sanity documentation for details.
6.
   ```bash
   # In the client and sanity server directories
    npm install
    npm run dev
7. To manage Sanity, use sanity manage in the server root directory.
8. For production build:
    ```bash
    # In the client directory
      npm run build
    # In the sanity server directory
      sanity deploy

## Contributing

I welcome contributions from everyone who wants to learn and grow. Here are some guidelines to help you get started:

Fork the Project: Create your own fork of the project by clicking the 'Fork' button at the top right corner of the repository page.
Clone the Repository: Clone the forked repository to your local machine using git clone https://github.com/your-username/repository-name.
Create a New Branch: Create a new branch for your changes using git checkout -b branch-name.
Make Your Changes: Make the necessary changes in the code. Ensure that your changes adhere to the existing coding style and conventions.
Commit Your Changes: Commit your changes using git commit -m 'commit message'. Be sure to write a clear and concise commit message explaining the changes you made.
Push Your Changes: Push your changes to your forked repository using git push origin branch-name.
Submit a Pull Request: Go to your forked repository on GitHub and click the 'New pull request' button. Fill in the necessary details and submit your pull request.
Before submitting a pull request, please ensure that your changes do not break any existing functionality. I appreciate your contribution and look forward to seeing your changes merged into the main project.

## Usage

Follow these steps to add a pin in your application:

1. Navigate to the "Create Pin" section in the user interface.
2. Fill in the following details for the new pin:
   - Photo Title: Provide a descriptive title for the photo.
   - About Destination: Add information about the destination related to the pin.
   - URL: Enter the URL associated with the pin.
   - Category: Specify the category or type of the pin.
   - Original Image Upload: Upload the original image for the pin.
3. Click on the "Save" button to add the pin to your collection.

This process allows users to contribute and share new pins with relevant information about destinations. Feel free to customize the instructions based on your actual user interface and features.



  
