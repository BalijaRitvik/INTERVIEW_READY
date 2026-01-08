// backend/src/lib/streams.js
import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
import {StreamClient} from "@stream-io/node-sdk";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key/secret not defined in environment variables");
}

// Server-side client (secret available)
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //will be used chat features
export const streamClient = new StreamClient(apiKey, apiSecret); //will be used for video calls

/**
 * Upsert (create or update) a Stream user.
 * userData should be an object like:
 * { id: 'user-123', name: 'Ritvik', image: 'https://...' }
 */
export const upsertStreamUser = async (userData) => {
  try {
    if (!userData || !userData.id) {
      throw new Error("Invalid userData for upsertStreamUser");
    }

    // Stream expects { id, name, image, ... } typically
    await chatClient.upsertUser(userData);
    console.log("✅ Stream user upserted:", userData.id);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

/**
 * Delete a Stream user by id
 */
export const deleteStreamUser = async (userId) => {
  try {
    if (!userId) throw new Error("Invalid userId for deleteStreamUser");

    // deleteUser signature: client.deleteUser(userId, { ...options })
    await chatClient.deleteUser(userId, { mark_messages_deleted: true });
    console.log("✅ Stream user deleted:", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
    throw error;
  }
};

// todo: add another method to generate Toekn