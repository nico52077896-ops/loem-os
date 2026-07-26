import OpenAI from "openai";
import { NextResponse } from "next/server";


const client = new OpenAI({

  apiKey: process.env.DEEPSEEK_API_KEY,

  baseURL: "https://api.deepseek.com"

});



export async function POST(
  req: Request
){


  try{


    const {
      material
    } = await req.json();



    const completion = await client.chat.completions.create({


      model:"deepseek-v4-flash",


      messages:[


        {
          role:"system",

          content:
`
你是一名专业的服装面料研发工程师。

根据输入的面料信息进行分析。

只返回JSON，不要输出任何解释文字。

JSON格式必须严格如下：

{
 "level":"",
 "usage":"",
 "strength":"",
 "risk":"",
 "suggestion":""
}

字段说明：

level:
面料综合等级，例如 A级、B级

usage:
推荐使用场景，例如 春夏T恤、卫衣、外套

strength:
面料优势，例如 透气性好、手感柔软

risk:
开发风险，例如 缩水风险、色牢度风险

suggestion:
产品开发建议
`
        },


        {

          role:"user",

          content:
`
面料名称:
${material.name || "-"}

类型:
${material.type || "-"}

成分:
${material.composition || "-"}

克重:
${material.weight || "-"}

颜色:
${material.color || "-"}

供应商:
${material.supplier || "-"}

备注:
${material.notes || "-"}
`

        }


      ],


      temperature:0.3,


      response_format:{
        type:"json_object"
      }


    });



    let result;


    try{


      result = JSON.parse(
        completion.choices[0].message.content || "{}"
      );


    }catch{


      result={
        raw:
        completion.choices[0].message.content
      };

    }





    return NextResponse.json({

      analysis:result

    });




  }catch(error:any){


    console.error(
      "AI分析错误:",
      error
    );


    return NextResponse.json(

      {

        error:"AI分析失败",

        detail:error.message

      },

      {
        status:500
      }

    );


  }


}