const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/proteus/api/config/global/app")) { 
  #删除机器人提示
  if(obj?.result?.aiBot){
    delete obj.result.aiBot;
  }
}

if (url.includes("/ads/v3/type/2/items" || "/genesis/openApi/post/recommend/help")) { 
  #删除首页广告社区用户贴
  if(obj?.result){
    obj.result = []
  }
}
$done({ body: JSON.stringify(obj) });
