import type { Product } from "./products";


export function generateProductInsights(
  product: Product
) {


  const insights = [];



  // 成本分析

  if(product.currentCost > product.targetCost){

    insights.push({

      title:"成本风险",

      content:
      `当前成本 $${product.currentCost}，高于目标成本 $${product.targetCost}，建议重新评估材料或供应商。`

    });

  }



  // 样衣分析

  const unfinishedSample =
    product.samples.find(
      sample =>
      sample.status !== "已完成"
    );


  if(unfinishedSample){

    insights.push({

      title:"开发风险",

      content:
      `${unfinishedSample.version} 当前状态：${unfinishedSample.status}，存在延期风险。`

    });

  }



  // 文件完整度

  const requiredDocuments = [
    "Tech Pack",
    "BOM",
    "Size Chart"
  ];


  const missingDocuments =
    requiredDocuments.filter(
      item =>
      !product.documents.some(
        doc=>doc.name===item
      )
    );


  if(missingDocuments.length>0){

    insights.push({

      title:"资料完整度",

      content:
      `缺少研发文件：${missingDocuments.join("、")}`

    });

  }



  return insights;

}