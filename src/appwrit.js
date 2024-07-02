import { Account, Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_IP)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export { client, account, databases };
