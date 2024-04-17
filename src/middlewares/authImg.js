export function validateImgField(req, res, next) {
    const { img } = req.body;
  
    if (typeof img === 'string') {
      next();
    } else if (req.file) {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedMimes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: 'Solo se permiten archivos JPEG, PNG o JPG' });
      }
      next();
    } else {
      return res.status(400).json({ message: 'El campo "img" debe ser una URL de imagen o un archivo de imagen' });
    }
  }
  