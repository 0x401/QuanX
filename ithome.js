const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/news/indexv2/iphone/")) {
  if (obj?.data?.list) {
    let newList = [];
    obj.data.list.forEach((l) => {
      if (l?.feedContent?.focusNewsData) {
        l.feedContent.focusNewsData = l.feedContent.focusNewsData.filter(
          (d) => !d.isAd,
        );
      }
      if (l?.feedContent?.flag != 2) {
        if (l?.feedContent?.content) {
          l.feedContent.content = l.feedContent.content.replace(
            /(<div class='tougao-user'[^>]*>([\s\S]*)<\/div>|<p class="ad-tips"[^>]*>([\s\S]*)<\/p>|IT\s?之家[^，。：]*[，。：])/g,
            "",
          );
        }
        newList.push(l);
      }
    });
    obj.data.list = newList;
  }
}

$done({
  body: JSON.stringify(obj),
});
