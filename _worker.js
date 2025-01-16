async function downloadProxy(request, proxyConfig2) {
  const requestUrl = new URL(request.url);
  let downUrlString = proxyConfig2[requestUrl.pathname];
  if (!downUrlString) {
    return new Response("not found", { status: 404 });
  }
  let downUrl;
  try {
    downUrl = new URL(downUrlString);
  } catch (error) {
    return new Response("url error: " + error, { status: 404 });
  }
  let headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("referer");
  headers.delete("origin");
  let res = await fetch(downUrl, {
    method: request.method,
    headers,
    body: request.body
  });
  return new Response(res.body, {
    headers: res.headers,
    status: res.status
  });
}
const proxyConfig = {"/down/h9d1v56yx0m/850098208/%E6%96%87%E4%BB%B6%E6%A0%91-%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%911.mp4":"https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm"}
export default {fetch:(req)=>downloadProxy(req,proxyConfig)};