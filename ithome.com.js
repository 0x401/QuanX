var html = $response.body;
const regex =
  /(<div class='tougao-user'[^>]*>[\s\S]*?<\/div>|<p class="ad-tips"[^>]*>[\s\S]*?<\/p>|(<a[^>]*>)?IT\s?之家(<\/>a)?[^，。：]*[，。：])/g;
const contentDiv = html.match(
  /<div class="post_content"[^>]*>([\s\S]*)<\/div>[\s\S]*<div class="newserror"/,
);
if (contentDiv && contentDiv[1]) {
  //console.log(contentDiv[1].match(regex).join("\n"));
  let cleanContent = contentDiv[1].replaceAll(regex, "");
  html = html.replace(contentDiv[1], cleanContent);
}
$done({ body: html });
