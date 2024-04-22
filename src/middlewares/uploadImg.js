
const dotenv = require("dotenv");
dotenv.config(); 
const AWS = require('aws-sdk');
// Configura el SDK de AWS con la región y las credenciales
AWS.config.update({ 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const bucketName = 'vir-to'; 
const s3 = new AWS.S3();

const uploadImage = async (file, oldName, newName, folder) => {
  try {
    const headParams = {
      Bucket: bucketName,
      Key: `${folder}/${oldName}`
    };

    console.log(await s3.headObject(headParams).promise());

    await s3.deleteObject(headParams).promise();
    console.log(`Archivo existente '${oldName}' eliminado correctamente.`);
    const uploadParams = {
      Bucket: bucketName,
      Key: `${folder}/${newName}`,
      Body: file.buffer,
      ACL: 'public-read'
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log(`Nuevo archivo '${newName}' subido correctamente a S3:`, uploadResult.Location);

    return uploadResult.Location;
  } catch (error) {
    if (error.code === 'NotFound') {
      const uploadParams = {
        Bucket: bucketName,
        Key: `${folder}/${newName}`,
        Body: file.buffer,
        ACL: 'public-read'
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      console.log(`Archivo '${newName}' subido correctamente a S3 como nuevo:`, uploadResult.Location);

      return uploadResult.Location;
    } else {
      console.error('Error al procesar la operación en AWS S3:', error);
      return error;
    }
  }
};

const deleteImage = async ( folder, nameFile ) => {
  try {
    const headParams = {
      Bucket: bucketName,
      Key: `${folder}/${nameFile}`
    };

    await s3.deleteObject(headParams).promise();

  } catch (error) {
    return error;
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
