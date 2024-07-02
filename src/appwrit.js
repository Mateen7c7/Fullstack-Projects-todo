import { Client } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_IP)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export { client };
