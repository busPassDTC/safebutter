import { Client, Account, Databases } from 'appwrite';
import conf from '../conf/conf';

const client = new Client()
    .setEndpoint(conf.appwriteUrl) 
    .setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);

// 68e3e14c003500944d31