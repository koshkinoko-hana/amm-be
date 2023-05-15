import { getDownloadURL } from '@firebase/storage'
import { Injectable } from '@nestjs/common'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

@Injectable()
export class FirebaseStorageProvider {
  public async upload(file: Express.Multer.File, path: string, fileName: string): Promise<string> {
    const storage = getStorage()
    const fileExtension = file.originalname.split('.').pop()
    const fileRef = ref(storage, `${path}/${fileName}.${fileExtension}`)

    const metadata = {
      contentType: file.mimetype,
    }
    const uploaded = await uploadBytes(fileRef, file.buffer, metadata)

    return uploaded.metadata.fullPath
  }

  public async getFile(path: string): Promise<string> {
    const storage = getStorage()
    const fullpath = await getDownloadURL(ref(storage, path))

    return fullpath
  }
}
