import axios from "axios";

export class imageUpload {
  constructor(
    public file: File,
    public fileName: string,
    public folder: String
  ) {}
}

export async function handleUpload(file: imageUpload) {
  if (file) {
    const formData = new FormData();
    formData.append("image", file.file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-image/" + file.folder,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
