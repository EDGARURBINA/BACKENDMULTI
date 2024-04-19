const path = require("path");
const { google } = require("googleapis");
const stream = require("stream");
const dotenv = require("dotenv");
dotenv.config(); 
const AWS = require('aws-sdk');
const fs = require('fs');
// Configura el SDK de AWS con la región y las credenciales
AWS.config.update({ 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const bucketName = 'vir-to'; 
const s3 = new AWS.S3();

const uploadImageEntrepreneur = async (file, oldNumeroCliente, newNumeroCliente) => {
  try {
    const headParams = {
      Bucket: bucketName,
      Key: `imgsEntrepreneurs/${oldNumeroCliente}`
    };

    console.log(await s3.headObject(headParams).promise());

    await s3.deleteObject(headParams).promise();
    console.log(`Archivo existente '${oldNumeroCliente}' eliminado correctamente.`);

    const uploadParams = {
      Bucket: bucketName,
      Key: `imgsEntrepreneurs/${newNumeroCliente}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log(`Nuevo archivo '${newNumeroCliente}' subido correctamente a S3:`, uploadResult.Location);

    return uploadResult.Location;
  } catch (error) {
    if (error.code === 'NotFound') {
      const uploadParams = {
        Bucket: bucketName,
        Key: `imgsEntrepreneurs/${newNumeroCliente}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      console.log(`Archivo '${newNumeroCliente}' subido correctamente a S3 como nuevo:`, uploadResult.Location);

      return uploadResult.Location;
    } else {
      console.error('Error al procesar la operación en AWS S3:', error);
      return error;
    }
  }
};

const deleteImageEntrepreneur = async ( numeroCliente ) => {
  try {
    const headParams = {
      Bucket: bucketName,
      Key: `imgsEntrepreneurs/${numeroCliente}`
    };

    await s3.deleteObject(headParams).promise();

  } catch (error) {
    return error;
  }
};
// Función para manejar la subida de imágenes de productos
const postImageProduct = async (file, oldClave, newClave) => {
  try {
    return await uploadFile(file, process.env.IdFolderProducts, oldClave, newClave);
  } catch (error) {
    console.error("Error al subir imagen del estilo:", error);
    return error;
  }
};

const uploadFile = async (fileObject, folderId, oldName, newName) => {
  try {
    const { fieldname, originalname, mimetype, buffer } = fileObject;

    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const drive = await getDriveService();
    const existingFiles = await drive.files.list({
      q: `'${folderId}' in parents and name='${oldName}' and trashed=false`,
      fields: 'files(id)',
    });

    if (existingFiles.data.files.length > 0) {
      const fileId = existingFiles.data.files[0].id;
      await drive.files.delete({ fileId });
    }

    const { data } = await drive.files.create({
      resource: {
        name: newName,
        parents: [folderId],
      },
      media: {
        mimeType: mimetype,
        body: bufferStream,
      },
      fields: "id,name,webViewLink",
    });

    return data;
  } catch (error) {
    console.error("Error al subir archivo a Google Drive:", error);
    throw new Error("Error al subir archivo a Google Drive.");
  }
};



// Función para obtener el servicio de Google Drive
const getDriveService = async () => {
  try {
    const KEYFILEPATH = path.join(__dirname, "bdimages-35380-7ff54c901789.json");
    const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    const driveService = google.drive({ version: "v3", auth: authClient });

    return driveService;
  } catch (error) {
    console.error("Error al obtener servicio de Google Drive:", error);
    throw new Error("Error al obtener servicio de Google Drive.");
  }
};

module.exports = {
  postImageProduct,
  uploadImageEntrepreneur,
  deleteImageEntrepreneur,
};
