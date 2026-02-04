const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/news/indexv2/iphone/")) {
  if (obj?.data?.list) {
    let newList = [];
    obj.data.list.forEach((l) => {
      //按文章类型去除（10003 置顶，10004 推广红包倒计时？）
      if(l.?feedType == 10003 || l.?feedType == 10004) continue;
      //去掉轮播里有ad tag的
      if (l?.feedContent?.focusNewsData) {
        l.feedContent.focusNewsData = l.feedContent.focusNewsData.filter(
          (d) => !d.isAd,
        );
      }
      //去掉新闻内容里无用的信息
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
} else if (url.includes("/api/news/getdetail/")) {
  if (obj?.data?.content) {
    obj.data.content = obj.data.content.replace(
            /(<div class='tougao-user'[^>]*>([\s\S]*)<\/div>|<p class="ad-tips"[^>]*>([\s\S]*)<\/p>|IT\s?之家[^，。：]*[，。：])/g,
            "",
          );
  }
}

$done({
  body: JSON.stringify(obj),
});
