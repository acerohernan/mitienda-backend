import multer from 'multer';

export const multerImageStorage = multer.memoryStorage();

export const imageFileTypeRegex = /jpeg|jpg|png/;
export const imageMaxSize = 1 * 1000 * 1000; //1mb
