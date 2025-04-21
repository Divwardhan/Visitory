import twilio from "twilio";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const allowedPhoneNumbers = [
  "+911111111111",
  "+911111111112",  
  "+1112233445",  
  "+919876257236",
  "+917354296919"
];

export async function sendNotification(phoneNumber, message) {
  try {
    if (!allowedPhoneNumbers.includes(phoneNumber)) {
      console.log("Phone number not authorized for notification.");
      return { msg: "Phone number not authorized", success: false };
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return { msg: "Notification sent successfully", success: true };
  } catch (error) {
    console.error("Error sending notification:", error);
    return { msg: "Failed to send notification", success: false };
  }
}
