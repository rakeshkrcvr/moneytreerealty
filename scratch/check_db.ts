
import { getAllProperties, getAllPropertyTypes } from '../src/lib/server-functions';

async function check() {
  try {
    const properties = await getAllProperties();
    const types = await getAllPropertyTypes();
    console.log("PROPERTIES:", properties.length);
    console.log("TYPES:", types.length);
    if (properties.length > 0) {
      console.log("First Property Slug:", properties[0].slug);
    }
  } catch (e) {
    console.error("ERROR:", e);
  }
}

check();
