import instance from "./AxiosInstance";
import emailinstance from "./emailinstance";

const apiMethods = {
    createUser: async function (formData) {
        try {
            let res = await instance.post("create_user", formData)
            return res.data
        } catch (e) {
            return e
        }
    },
   
    sendOtp: async function (formData) {
        try{
            let res = await emailinstance.post("sendemailotp",formData)
            return res.data
        } catch (e) {
            return e
        }
    },

    verifyOtp: async function (formData) {
        try{
            let res = await emailinstance.post("emailotpverification",formData)
            return res.data
        } catch (e) {
            return e
        }
    }
}

export default apiMethods;