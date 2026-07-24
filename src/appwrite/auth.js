import conf from '../conf/conf';
import {Client, Account, ID} from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const user = await this.account.create(ID.unique(), email,password,name);
            if(user){
                return this.login({email,password});
            }
            else{
                return user;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}){
        try{
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        }
        catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    async updateName(name){
        try{
            return await this.account.updateName(name);
        } catch (error) {
            console.error("Error updating name:", error);
            throw error;
        }
    }

}

const authService= new AuthService();

export default authService;
