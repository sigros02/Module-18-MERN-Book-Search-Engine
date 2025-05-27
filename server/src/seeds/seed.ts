import db from "../config/connection.js";
import { User } from "../models/index.js";
import userSeeds from "./userData.json" with { type: "json" };
import cleanDB from "./cleanDB.js";
import bcrypt from 'bcrypt';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      userSeeds.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users directly without triggering middleware
    await User.insertMany(hashedUsers, { rawResult: true });

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error seeding database:", error.message);
    } else {
      console.error("Unknown error seeding database");
    }
    process.exit(1);
  }
};

seedDatabase();
