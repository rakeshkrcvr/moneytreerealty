import { createLead } from "../src/lib/server-functions";

async function testCreateLead() {
  try {
    console.log("Testing createLead...");
    const res = await createLead({ data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      source: "Manual Test"
    }});
    console.log("Response:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}

testCreateLead();
