export class Helper {
    static customFileName(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split(".")[1];
      const originalName = file.originalname.split(".")[0];
      cb(null, originalName + '-' + uniqueSuffix+"."+fileExtension);
    }
   
    static destinationPath(req, file, cb) {
      cb(null, './uploads/')
    }
  }