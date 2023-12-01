import { file64 } from './file64';

const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg'];
const maxV = 2000;

export const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
    const file = event.target.files && event.target.files[0];
    if (!allowedMimes.includes(file.type)) {
      // if allowedMimes array does not have the extension
      console.log('Only png,jpg,jpeg allowed');
    }
    if (file.size / 1024 > maxV) {
      // if the file size is gratter than maxMb
      console.log(`Image should be less than ${maxV / 1000} MB`);
    }
    const base64 = await file64(file);
    return base64;
  }
};
