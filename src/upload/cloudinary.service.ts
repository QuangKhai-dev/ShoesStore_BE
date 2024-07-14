import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url); // Chỉ trả về URL an toàn của hình ảnh
          }
        },
      );

      const readableStream = new Readable();
      readableStream._read = () => {}; // _read là cần thiết để triển khai custom stream
      readableStream.push(file.buffer);
      readableStream.push(null); // Đánh dấu kết thúc của stream
      readableStream.pipe(uploadStream);
    });
  }

  async uploadImages(files: Array<Express.Multer.File>) {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url); // Chỉ trả về URL an toàn của hình ảnh
            }
          },
        );

        const readableStream = new Readable();
        readableStream._read = () => {}; // _read là cần thiết để triển khai custom stream
        readableStream.push(file.buffer);
        readableStream.push(null); // Đánh dấu kết thúc của stream
        readableStream.pipe(uploadStream);
      });
    });

    return Promise.all(uploadPromises);
  }
}
