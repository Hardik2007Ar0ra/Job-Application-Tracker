import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

const requiredConfig = [conf.appwriteUrl, conf.appwriteProjectId, conf.appwriteDatabaseId, conf.appwriteCollectionId];
const isConfigured = requiredConfig.every((value) => value && value !== "undefined");

const client = new Client();
if (isConfigured) {
  client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
}

const databases = new Databases(client);
const user = await authService.getCurrentUser();

const toApplication = (document) => ({
  id: document.$id,
  role: document.role,
  company: document.company,
  location: document.location,
  jobUrl: document.jobUrl || "",
  status: document.status,
  appliedDate: document.appliedDate,
  notes: document.notes || "",
});

const toDocumentData = ({ role, company, location, jobUrl, status, appliedDate, notes }) => ({
  role,
  company,
  location,
  jobUrl: jobUrl || "",
  status,
  appliedDate,
  notes: notes || "",
});

const ensureConfigured = () => {
  if (!isConfigured) throw new Error("Add your Appwrite database and collection IDs to the .env file.");
};

export const applicationService = {
  async list() {
    ensureConfigured();
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
    const document = await databases.createDocument({
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      documentId: ID.unique(),
      data: {
        ...toDocumentData(application),
        userID:user.$id
      }
    });
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
