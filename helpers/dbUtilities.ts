import { MongoClient } from "mongodb";
import { Output } from "../pages/api/comments/[eventId]";

/**
 * @desc MongoDBのuri情報
 */
const defaultUri: string = process.env.MONGO ? process.env.MONGO : "";

/**
 * process.env経由でmongoDB Atlasとの接続を試みる。
 * 使用した後はcloseする。
 * @return Promise<MongoClient>
 * @param uri - string 接続先を変えたければお好きに。
 * @example
 * const client = await connectDatabase()
 * client.close()
 */
export const connectDatabase = async (
  uri: string = defaultUri
): Promise<MongoClient> => {
  const connectOption: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  } = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return MongoClient.connect(uri, connectOption).catch((reason) =>
    Promise.reject({
      statusCode: 500,
      message: `API-Comment:Connecting to the database failed. MongoDB-Comment:${reason}`,
    })
  );
};

/**
 * Use MongoClient insertDocument
 * @param client - MongoClient
 * @param collection - string
 * @param document - object
 * @throws reason - object
 */
export const insertDocument = async (
  client: MongoClient,
  collection: string,
  document: object
) => {
  const db = await client.db();
  await db
    .collection(collection)
    .insertOne(document)
    .catch((reason) =>
      Promise.reject({
        statusCode: 500,
        message: `API Error:${reason}`,
      })
    );
};
/**
 *
 * @param client
 * @param collection
 * @param sort - ex: { _id: -1 }
 * @param filter? - ex: { eventId: eventId }
 * @desc sortも?で対応してデフォルト値を入れても良いかもしれない。
 */
export const getAllDocuments = async (
  client: MongoClient,
  collection: string,
  sort: object,
  filter?: object
) => {
  const db = client.db();
  const document: Output = await db
    .collection(collection)
    .find(filter) //
    .sort(sort) //時系列順？
    .toArray()
    .catch((reason) =>
      Promise.reject({
        statusCode: 500,
        message: `API-Comment:Getting Data failed. MongoDB-Comment:${reason}`,
      })
    );
  return document;
};
