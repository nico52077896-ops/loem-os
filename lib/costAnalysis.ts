import type { Product } from "./products";


export function generateCostAnalysis(
  product: Product
) {


  const insights = [];


  const costs = product.costs || {
    material:0,
    trims:0,
    manufacturing:0,
    packaging:0,
    shipping:0
  };


  const totalCost =
    costs.material +
    costs.trims +
    costs.manufacturing +
    costs.packaging +
    costs.shipping;



  // 成本是否超标

  if(totalCost > product.targetCost){

    insights.push({

      title:"成本超标",

      content:
      `当前成本 $${totalCost.toFixed(2)}，
      高于目标成本 $${product.targetCost}，
      建议优化材料或供应商。`

    });

  }else{

    insights.push({

      title:"成本状态良好",

      content:
      `当前成本 $${totalCost.toFixed(2)}，
      低于目标成本。`

    });

  }




  // 找最高成本项

  const costItems = [

    {
      name:"Material",
      value:costs.material
    },

    {
      name:"Trims",
      value:costs.trims
    },

    {
      name:"Manufacturing",
      value:costs.manufacturing
    },

    {
      name:"Packaging",
      value:costs.packaging
    },

    {
      name:"Shipping",
      value:costs.shipping
    }

  ];



  const highestCost =
    costItems.sort(
      (a,b)=>b.value-a.value
    )[0];



  insights.push({

    title:"成本结构分析",

    content:
    `${highestCost.name} 是当前最高成本项，
    金额为 $${highestCost.value}，
    建议重点优化。`

  });



  return insights;

}