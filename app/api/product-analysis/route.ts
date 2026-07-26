import {NextResponse} from "next/server";


export async function POST(
req:Request
){

const {
product
}=await req.json();



const analysis=[


{
title:"成本风险",
content:
`当前产品目标成本 $${product.target_cost || 0}，建议确认面料和供应链报价。`
},


{
title:"开发建议",
content:
`当前处于 ${product.stage} 阶段，建议同步推进材料和样衣验证。`
},


{
title:"上市判断",
content:
"当前数据不足，建议完成样品测试后进行市场评估。"
}


];



return NextResponse.json({

analysis

});


}