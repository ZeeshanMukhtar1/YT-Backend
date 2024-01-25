import multer from "multer";

// we are using multer for storing files in the server , there are two options in documentation , one is diskStorage and other is memoryStorage, we are using diskStorage because memory storage will fillout the memory of the server and it will crash the server 😜

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb means callback 🤦‍♂️
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

// documentation link of (DiskStorage) : https://github.com/expressjs/multer
