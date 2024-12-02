// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGODB_URL, {
//         });
//         console.log(`Connected to MongoDB: ${connection.connection.host}`);
//     } catch (error) {
//         console.error(`Error connecting to MongoDB: ${error.message}`);
//         process.exit(1);
//     }
// };

// export default connectDB;





//----------------Sử dụng SingletonConnection----------------


// connectionManager.js

import mongoose from "mongoose";

class ConnectionManager {
  static #instance = null;

  constructor() {
    if (ConnectionManager.#instance) {
      throw new Error("Use ConnectionManager.getInstance() to get the instance.");
    }

    this.connection = null;
  }

  static getInstance() {
    if (!ConnectionManager.#instance) {
      ConnectionManager.#instance = new ConnectionManager();
    }

    return ConnectionManager.#instance;
  }

  async connectDB() {
    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`Connected to MongoDB: ${this.connection.connection.host}`);
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1);
    }
  }
}

export default ConnectionManager;
