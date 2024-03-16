import { cropImage } from '../src/controllers/imageController';
import { Request, Response } from 'express';

describe('cropImage', () => {
  it('should crop the image to the specified dimensions', () => {
    // Mock input data
    const image = 'base64-encoded-image-data';
    const cropDimensions = { x: 100, y: 100, width: 200, height: 200 };

    // Mock Request and Response objects
    const req = {
      body: {
        image: image,
        cropDimensions: cropDimensions
      }
    } as Request;

    const res = {
      send: jest.fn() // Mock the send method
    } as unknown as Response;

    // Call the cropImage function with the mock Request object
    cropImage(req, res);

    // Assert that the response send method was called
    expect(res.send).toHaveBeenCalled();
    // Add more specific assertions based on your implementation
  });

  // Add more test cases as needed
});