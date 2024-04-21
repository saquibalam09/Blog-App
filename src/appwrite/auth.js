import conf from '../conf/conf';
import { Client, Account, ID} from "appwrite";



export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)

    }
    async createAccount({email , password , name}){
        try {
            
            const userAccount =await this.account.create(ID.unique(), email , password , name);
            
            if (userAccount) {
                // call another method
                return await this.login({email, password})
            } else {
                return userAccount;          
            }

        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);     
        }
    }
    async login({email , password}){
        try {         
           return await this.account.createEmailSession(email , password)  

        } catch (error) {
            console.log("Appwrite service :: createEmailSession :: error", error);     
        }
    }
    async getCurrentUser(){
        try {  
           return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);

        }
        return null;
    }
    async logout(){
        try { 
            await this.account.deleteSessions("current");
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }   
    }
    // async getPosts(queries = [Query.equal("status" , "active")]){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             // [
    //             //     Query.equal("status" , "active")
    //             // ]
    //             queries, 
    //         )
            
    //     } catch (error) {
    //         console.log("Appwrite service :: logout :: error", error);
    //         return false;
    //     }
    // }
    //file upload service
    // async uploadFile(file){
    //     try {
    //         return await this.bucket.createFile(
    //             conf.appwriteBucketId,
    //             ID.unique(),
    //             file,
    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: logout :: error", error);
    //         return false;
    //     }
    // }
    // async deleteFile(fileId){
    //     try {
    //         await this.bucket.deleteFile(
    //             conf.appwriteBucketId,
    //             fileId
    //         )
    //         return true;
            
    //     } catch (error) {
    //         console.log("Appwrite service :: logout :: error", error);
    //         return false;
    //     }
    // }
    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
}
const authService = new AuthService();
export default authService;