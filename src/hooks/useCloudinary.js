import { CLODUINARY_COCKTAIL_UPLOAD_URL, CLOUDINARY_API_KEY } from "../api/cloudinaryConfig"
import { CLOUDINARY_SIGN_URL } from "../api/apiURL"
import useAxiosPrivate from "./useAxiosPrivate"
import { axiosPublic } from "../api/axios"

const useCloudinary = () => {
    const axiosPrivate = useAxiosPrivate()

    const uploadToCloudinary = async (imgFile) => {
        try {
          const signatureRes = await axiosPrivate.get(CLOUDINARY_SIGN_URL)
          if (!signatureRes) return
    
          const formData = new FormData()
          formData.append('file', imgFile)
          formData.append('api_key', CLOUDINARY_API_KEY)
          formData.append('signature', signatureRes.data.signature)
          formData.append('timestamp', signatureRes.data.timestamp)
    
          const response = await axiosPublic.post(CLODUINARY_COCKTAIL_UPLOAD_URL, formData, {
            headers: {
              'Content-Type':'multipart/form-data'
            }
          })
          return {
            public_id: response.data.public_id,
            version: response.data.version,
            signature: response.data.signature
          }
        } catch (err) {
          console.log(err)
        }
    }

    return uploadToCloudinary
}

export default useCloudinary
