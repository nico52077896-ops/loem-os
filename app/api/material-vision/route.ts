import { NextResponse } from "next/server";


export async function POST(
req:Request
){


try{


const {
image
}=await req.json();



if(!image){

throw new Error(
"没有收到图片"
);

}



const response = await fetch(

"https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",

{


method:"POST",


headers:{


"Content-Type":"application/json",


"Authorization":

`Bearer ${process.env.DASHSCOPE_API_KEY}`


},



body:JSON.stringify({


model:"qwen-vl-plus",



input:{


messages:[


{

role:"user",

content:[


{

image:image

},


{

text:`
请识别这张服装面料料卡。

提取：

面料名称
类型
成分
克重
颜色
供应商
门幅
后整理


只返回JSON：

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

不要输出任何解释。
`

}


]

}


]


}



})


}

);



const data =
await response.json();



console.log(
"千问完整返回:",
JSON.stringify(
data,
null,
2
)
);





// 兼容千问不同返回格式

let content =
"";



const message =
data?.output?.choices?.[0]?.message;



if(message){


if(typeof message.content==="string"){


content =
message.content;


}


else if(Array.isArray(message.content)){


content =
message.content
.map((item:any)=>item.text || "")
.join("");

}


}




if(!content){


throw new Error(
"千问没有返回内容"
);


}




const clean =
content

.replace(
/```json/g,
""
)

.replace(
/```/g,
""
)

.trim();




const result =
JSON.parse(clean);



return NextResponse.json({

data:result

});



}catch(error:any){


console.error(
"视觉识别错误:",
error
);



return NextResponse.json({

error:error.message

},
{
status:500
}
);


}


}