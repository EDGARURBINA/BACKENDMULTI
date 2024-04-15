import path from "path";
import { google } from "googleapis";
import  stream  from "stream";
import dotenv from "dotenv"

dotenv.config();

export const getPrueba = async (req, res)=> {
  return res.status(200).send("Root de /upload");
}


export const postImageProduct = async (file)=>{
  return await uploadFile(file, `${process.env.IdFolderProducts}`);

}

export const postImageEntrepreneur = async (file)=>{
  return await uploadFile(file, `${process.env.IdFolderEntrepreneurs}`);
}

const uploadFile = async (fileObject, folder) => {
  const folderId = folder;
  const bufferStream = new  stream.PassThrough();
  bufferStream.end(fileObject.file.data);
  const drive = await getDriveService();
  const { data } = await drive.files.create({
    resource: {  
      name: fileObject.file.name,
      parents: [folderId],
    },
    media: {
      mimeType: fileObject.file.mimeType,
      body: bufferStream,
    },
    fields: "id,name,webViewLink",
  });
  return data || null;
};


const getDriveService = async () => {
  const KEYFILEPATH = path.join(
    __dirname,
    "bdimages-35380-7ff54c901789.json"
  );
  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  const driveService = google.drive({ version: "v3", auth: authClient });
  return driveService;
};

