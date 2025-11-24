const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/api/news/indexv2/iphone/")) {
    if (obj?.data?.list) {
        obj.data.list.forEach(l => {
            if (l?.feedContent?.content) {
                l.feedContent.content = l.feedContent.content.replace(/IT之家[^，。：]*[，。：]/g, "")
            }
        })
    }
}

$done({
    body: JSON.stringify(obj)
});