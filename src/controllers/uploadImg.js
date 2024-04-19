const path = require("path");
const { google } = require("googleapis");
const stream = require("stream");
const dotenv = require("dotenv");

// Función para manejar la subida de imágenes de productos
const postImageProduct = async (file, oldClave, newClave) => {
  try {
    return await uploadFile(file, process.env.IdFolderProducts, oldClave, newClave);
  } catch (error) {
    console.error("Error al subir imagen del estilo:", error);
    return error;
  }
};
// Función para manejar la subida de imágenes de emprendedores
const postImageEntrepreneur = async (file, oldNumeroCliente, newNumeroCliente) => {
  try {
    return await uploadFile(file, process.env.IdFolderEntrepreneurs, oldNumeroCliente, newNumeroCliente);
  } catch (error) {
    console.error("Error al subir imagen del emprendedor:", error);
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
  postImageEntrepreneur,
};
