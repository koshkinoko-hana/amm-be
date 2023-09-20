import { Photo } from '@entities'
import { getDownloadURL } from '@firebase/storage'
import { Injectable } from '@nestjs/common'
import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage'
import LinkResource = Photo.LinkResource

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

  public async getFile(photo: Photo): Promise<string> {
    if (photo.linkResource === LinkResource.EXTERNAL_LINK) {
      return photo.path
    }
    const storage = getStorage()
    const fullpath = await getDownloadURL(ref(storage, photo.path))

    return fullpath
  }

  public async deleteFile(photo: Photo): Promise<void> {
    if (photo.linkResource === LinkResource.EXTERNAL_LINK) {
      return
    }
    const storage = getStorage()
    const fileRef = ref(storage, photo.path)
    await deleteObject(fileRef)
  }
}
