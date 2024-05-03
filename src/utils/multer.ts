import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

type FileNameCallback = (error: Error | null, filename: string) => void

const fileStorage = multer.diskStorage({
  filename: (
    req: Request, 
    file: Express.Multer.File, 
    callback: FileNameCallback
  ): void => {
    const ext = file.mimetype.split('/')[1];
    callback(null, `nxt-${Date.now()}.${ext}`);
  }
})

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype.startsWith('application') || 
    file.mimetype.startsWith('video') || 
    file.mimetype.startsWith('image')
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 300 * 1024 * 1024,
  },
});

const singleUpload = upload.single('file');
const multipleUpload = upload.array('photo');

export {
  singleUpload,
  multipleUpload
}

