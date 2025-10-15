const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/proteus/api/config/global/app")) { 
  if(obj?.result?.aiBot){
    delete obj.result.aiBot;
  }
}

$done({ body: JSON.stringify(obj) });
