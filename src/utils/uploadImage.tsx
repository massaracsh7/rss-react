import { file64 } from './file64';

const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg'];
const maxSize = 2000;

export const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    const file = event.target.files && event.target.files[0];
    if (!allowedMimes.includes(file.type)) {
      return 'Error - Only png,jpg,jpeg allowed';
    }
    if (file.size / 1024 > maxSize) {
      return `Error - Image should be less than ${maxSize / 1000} MB`;
    }
    const base64 = await file64(file);
    return base64;
  }
};
