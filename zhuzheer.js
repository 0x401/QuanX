const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/proteus/api/config/global/app") || url.includes("/proteus/api/config/global/h5")) { 
  //删除机器人
  if(obj?.result?.aiBot){
    delete obj.result.aiBot;
  }
}
else if (url.includes("/ads/v3/type/") || url.includes("/genesis/openApi/post/recommend/help")) { 
  //删除首页广告社区用户贴
  if(obj?.result){
    obj.result = []
  }
}
else if (url.includes("/jtouch/api/msg/v2/home")){
  if(obj?.result?.latest){
    obj.result.latest = obj.result.latest.filter((item) => item.groupType = 999);
  }
}
console.log(obj)
$done({ body: JSON.stringify(obj) });
