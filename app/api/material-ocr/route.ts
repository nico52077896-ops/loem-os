import OpenAI from "openai";
import { NextResponse } from "next/server";


const client = new OpenAI({

  apiKey: process.env.DEEPSEEK_API_KEY,

  baseURL:"https://api.deepseek.com"

});



export async function POST(
req:Request
){


try{


const {
image
}=await req.json();



const completion =
await client.chat.completions.create({

model:"deepseek-chat",


messages:[


{
role:"system",

content:
`
你是一名专业服装面料资料录入专家。

请识别料卡图片中的文字信息。

提取：

- 面料名称
- 面料类型
- 成分
- 克重
- 颜色
- 供应商
- 门幅
- 后整理


只返回JSON。

格式：

{
"name":"",
"type":"",
"composition":"",
"weight":"",
"color":"",
"supplier":"",
"width":"",
"finish":""
}

没有的信息填写空字符串。
`
},


{


role:"user",

content:image


}


],


temperature:0.2


});




const text =
completion.choices[0]
.message
.content
||
"{}";



const json =
JSON.parse(text);



return NextResponse.json({

data:json

});



}catch(error:any){


console.error(error);



return NextResponse.json({

error:error.message

},{

status:500

});


}


}