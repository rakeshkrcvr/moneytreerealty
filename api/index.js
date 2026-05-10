import server from '../dist/server/server.js';

export default async function handler(req, res) {
  // If Vercel node adapter passes standard request/response
  if (req instanceof Request) {
    return server.fetch(req, process.env, {});
  }
  
  // Fallback for standard Node req/res (Vercel Node <= v2)
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const url = new URL(req.url, `${protocol}://${req.headers.host}`);
  
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    }
  }

  const requestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    requestInit.body = req;
    requestInit.duplex = 'half'; // Required for Node streams
  }

  const webRequest = new Request(url, requestInit);

  try {
    const webResponse = await server.fetch(webRequest, process.env, {});
    
    res.statusCode = webResponse.status;
    res.statusMessage = webResponse.statusText;

    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webResponse.body) {
      for await (const chunk of webResponse.body) {
        res.write(chunk);
      }
    }
    res.end();
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
