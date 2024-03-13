# Image Processing API using TypeScript and Express
# Description
The project aims to develop a backend API using TypeScript and Express for processing images uploaded by users. The API will provide various image processing functionalities such as resizing, cropping, filtering, and watermarking. It will allow users to upload images, apply different transformations, and download the processed images. The project will focus on efficient image processing techniques and error handling.

# Main Features
Image Upload: Users can upload images to the server. 
Image Resizing: Users can resize images to specified dimensions. 
Image Cropping: Users can crop images to a specified area. 
Image Download: Users can download the processed images. 
Error Handling: Implement proper error handling for image processing failures and invalid requests.

# Bonus Features
Image Filtering: Implement various image filters such as grayscale and blur. Image Watermarking: Users can apply a watermark to images.
Check Sharp for image processing.
Suggested Starter Structure

project-directory/
│
├── src/
│   ├── controllers/
│   │   └── imageController.ts
│   ├── routes/
│   │   └── imageRoutes.ts
│   ├── utils/
│   │   └── errorHandler.ts
│   ├── app.ts
│   └── server.ts
│
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
Implement same Gate concept you used for Week 5 project - You need to have some unit tests and a Github workflow that keeps your main branch safe!
Search a deployment strategy up and deploy your app to an online portal (you can deploy it directly or by using a docker containter to a portal).