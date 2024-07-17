import { listFiles, uploadFile, downloadFile, deleteFile } from '../../src/app/utils/sftp';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const files = await listFiles('/upload'); // specify the 'upload' directory
        res.status(200).json(files);
      } catch (error) {
        console.error('Error listing files:', error.message);
        res.status(500).json({ error: 'Failed to list files' });
      }
      break;

    case 'POST':
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err.message);
          res.status(500).json({ error: 'Failed to upload file' });
          return;
        }
        const { path: localPath, name } = files.file;
        try {
          await uploadFile(localPath, `/upload/${name}`); // specify the 'upload' directory
          res.status(200).json({ message: 'File uploaded successfully' });
        } catch (error) {
          console.error('Error uploading file:', error.message);
          res.status(500).json({ error: 'Failed to upload file' });
        } finally {
          fs.unlinkSync(localPath); // Delete the local file after upload
        }
      });
      break;

    case 'DELETE':
      const { remotePath } = req.query;
      try {
        await deleteFile(`/upload/${remotePath}`); // specify the 'upload' directory
        res.status(200).json({ message: 'File deleted successfully' });
      } catch (error) {
        console.error('Error deleting file:', error.message);
        res.status(500).json({ error: 'Failed to delete file' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
