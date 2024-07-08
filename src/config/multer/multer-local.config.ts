// multer.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfigLocal = {
  storage: diskStorage({
    destination: './media', // Đường dẫn tới thư mục lưu trữ
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};

export const multerOptionsLocal = {
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
};
