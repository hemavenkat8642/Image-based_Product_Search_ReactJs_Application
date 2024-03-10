# Image-Based Product Search ReactJS Application

This is a single-page ReactJS application that allows users to search for products by uploading images. The application integrates the Google Cloud Vision API for image analysis and retrieves similar products based on the uploaded image. Real-time product search API from RapidAPI is used to fetch product data.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Demo](#demo)
- [Features](#features)
- [Error Handling Scenarios](#error-handling)
- [Technologies Used](#technologies-used)


## Installation

To install and run the application locally, follow these steps:

1. Clone this repository to your local machine using:
`git clone https://github.com/hemavenkat8642/Image-based_Product_Search_ReactJs_Application.git`

2. Navigate to the project directory:
`cd Image-based_Product_Search_ReactJs_Application`

3. Install dependencies using npm:
`npm install`


## Usage

To run the application locally, use:
`npm start`

This will start the development server and open the application in your default web browser.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Configuration

Before running the application, ensure that the API keys for both Google Cloud Vision API and the Real-time product search API from RapidAPI need to be configured. If not, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. Enable the Google Cloud Vision API for your project.
4. Generate an API key for the Vision API.
5. Sign up for [RapidAPI](https://rapidapi.com/) and subscribe to the Real-time product search API.
6. Obtain the API key for the Real-time product search API.
7. Replace the placeholder API keys in the source code with your own API keys.


## Demo

A live demo of the application can be found [here](https://drive.google.com/file/d/1LEHAu19D8pKVHA96f95loDWfafHJfeBf/view?usp=sharing).


## Features

- User-friendly interface for image upload.
- Integration with Google Cloud Vision API for image analysis.
- Integration with Real-time product search API from RapidAPI to fetch product data.
- Display of similar products based on image analysis, with clickable links to the product shopping page.
- Responsive and modern UI/UX design.
- Error handling for failed image uploads and API errors.

### Error Handling

The application includes error handling for the following scenarios:

1. If the file is not selected or if the selected file type is not an image.
2. If the image exceeds its size limit of 32MB (Google Cloud Vision API accepts images only up to 32MB).
3. If an error occurs while fetching or receiving a response from the Google Cloud Vision API.
4. If an error occurs while fetching or receiving a response from the Real-time Product Search API.

If a user encounters any errors continuously more than twice, they will see the following message:
"Encountering recurring errors? Please contact Nagateja for prompt assistance and solutions."


## Technologies Used

- ReactJS
- Google Cloud Vision API
- Real-time product search API from RapidAPI
- HTML/CSS
- JavaScript

