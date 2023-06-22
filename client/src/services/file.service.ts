interface SendFileArg {
  accessToken: string;
  body: FormData;
}

class FileService {
  public static sendFile({ accessToken, body }: SendFileArg) {
    return fetch('http://localhost:3001/api/uploads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
  }
}

export default FileService;
