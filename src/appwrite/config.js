import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import authService from "./auth";

const requiredConfig = [conf.appwriteUrl, conf.appwriteProjectId, conf.appwriteDatabaseId, conf.appwriteCollectionId];
const isConfigured = requiredConfig.every((value) => value && value !== "undefined");

const client = new Client();
if (isConfigured) {
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
}

const databases = new Databases(client);


const toApplication = (document) => ({
  id: document.$id,
  role: document.role,
  company: document.company,
  location: document.location,
  jobLink: document.jobLink || "",
  status: document.status,
  dateApplied: document.dateApplied,
  notes: document.notes || "",
});

const toDocumentData = ({
  role,
  company,
  location,
  jobLink,
  status,
  dateApplied,
  notes,
}) => ({
  role,
  company,
  location,
  jobLink: jobLink || "",
  status,
  dateApplied: new Date(dateApplied).toISOString(),
  notes: notes || "",
});

const ensureConfigured = () => {
  if (!isConfigured) throw new Error("Add your Appwrite database and collection IDs to the .env file.");
};

export const applicationService = {
  async list() {
    ensureConfigured();
    const user = await authService.getCurrentUser();
    const result = await databases.listDocuments({
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      queries: [
        Query.equal("userID", user.$id),
        Query.limit(100),
      ],
    });
    return result.documents.map(toApplication);
  },

  async create(application) {
    ensureConfigured();
    const user = await authService.getCurrentUser();
    const document = await databases.createDocument({
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      documentId: ID.unique(),
      data: {
        ...toDocumentData(application),
        userID:user.$id
      }
    });
    console.log(application);
    console.log(toDocumentData(application));
    return toApplication(document);
  },

  async update(application) {
    ensureConfigured();
    const document = await databases.updateDocument({
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      documentId: application.id,
      data: toDocumentData(application),
    });
    return toApplication(document);
  },

  async remove(id) {
    ensureConfigured();
    await databases.deleteDocument({
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      documentId: id,
    });
  },
};
