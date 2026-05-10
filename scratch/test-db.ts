
import { getLaunchBySlug } from '../src/lib/server-functions';

async function test() {
  try {
    const res = await getLaunchBySlug({ data: 'emaar-luxury-50-dubai-marina' });
    console.log("RESULT:", res);
  } catch (e) {
    console.error("ERROR:", e);
  }
}

test();
