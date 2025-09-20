const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteNotesId: String(import.meta.env.VITE_COLLECTION_ID_NOTES),
    encKey:String(import.meta.env.VITE_SECRET_KEY),
}

export default conf