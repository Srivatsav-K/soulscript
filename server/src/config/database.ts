import { connect } from "mongoose";

const configDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (mongoUri) {
      const db = await connect(mongoUri);
      console.log(`Connected to ${db.connection.name} db`);
    } else {
      throw new Error("Mongo URI not found");
    }
  } catch (e) {
    console.log("Error connecting to db", e);
  }
};

export default configDb;
