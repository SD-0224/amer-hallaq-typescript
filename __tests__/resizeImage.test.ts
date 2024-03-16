import { resizeImage } from '../src/controllers/imageController';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';


describe('resizeImage', () => {
    let req: Request;
    let res: Response;
    let redirectMock: jest.Mock;
  
    beforeEach(() => {
        req = {
          params: { image: 'test.jpg' },
          query: { width: '100', height: '100' },
        } as unknown as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
        redirectMock = jest.fn();
        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
          redirect: redirectMock,
        } as unknown as Response;
      });
    
    it('should return 400 if filename does not exist', async () => {
      const imageName = 'nonexistent.jpg';
      req.params.image = imageName;
      await resizeImage(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Filename does not exist.' });
    });
  
    it('should return 400 if width or height are missing', async () => {
      req.query = {}; // Missing width and height
      await resizeImage(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Width and height are required.' });
    });
  
    it('should resize image and redirect on success', async () => {
      await resizeImage(req, res);
      expect(redirectMock).toHaveBeenCalledWith(`/process/${req.params.image}`);
    });
  
    
  });