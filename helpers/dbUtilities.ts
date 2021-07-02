import { MongoClient } from "mongodb";

/**
 * process.env経由でmongoDB Atlasとの接続を試みる。
 * 使用した後はcloseする。
 * @return Promise<MongoClient>
 * @example
 * const client = await dbUtiles()
 * client.close()
 */
export const mongoClient = async (): Promise<MongoClient> => {
  const uri: string = process.env.MONGO ? process.env.MONGO : "";
  const connectOption: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  } = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return MongoClient.connect(uri, connectOption);
};
