interface SendFileArg {
  body: FormData;
}

class FileService {
  public static sendFile({ body }: SendFileArg) {
    return fetch('http://localhost:3001/api/uploads', {
      method: 'POST',
      body,
    });
  }
}

export default FileService;
