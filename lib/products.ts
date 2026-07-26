export type Product = {

  id:string;


  // 产品基础信息
  name:string;


  // 新增：产品编号
  product_code:string;


  // 新增：上市季度
  launch_season:string;


  // 原来的季节描述
  season:string;


  category:string;



  source:
    | "原创设计"
    | "买样开发";



  stage:
    | "Planning"
    | "Design"
    | "Material"
    | "Pattern"
    | "Sample"
    | "Costing"
    | "Production"
    | "Launch";



  progress:number;


  owner:string;

  designer:string;

  factory:string;


  retailPrice:number;

  targetCost:number;

  currentCost:number;



  costs:{
    material:number;
    trims:number;
    manufacturing:number;
    packaging:number;
    shipping:number;
  };


  materials:{
    name:string;
    type:string;
    supplier:string;
    specification:string;
    composition:string;
    price:number;
  }[];


  samples:{
    version:string;

    status:
      | "已完成"
      | "修改中"
      | "待确认";

    date:string;

    factory:string;

    issues:string[];

    fitScore:number;

    aiReview:string;

  }[];



  documents:{
    name:string;
    type:string;
    date:string;
    status:string;
    version?:string;
    uploadedBy?:string;
    aiCheck?:string[];
  }[];



  timeline:any[];



  aiInsights:{
    title:string;
    content:string;
  }[];

};
export const products: Product[] = [

  {
    id: "LO-SS26-001",

    name: "Heavyweight Boxy Tee",

    product_code: "LO-TS-26SS-001",

    launch_season: "2026 SS",

    season: "2026 Spring",

    category: "T-Shirt",

    source: "原创设计",

    stage:"Costing",

    progress:45,


    owner:"Nico Park",

    designer:"Nico",

    factory:"Guangzhou Factory",


    retailPrice:220,

    targetCost:28,

    currentCost:30.4,
    costs:{
      material:8.5,
      trims:0.15,
      manufacturing:12,
      packaging:2,
      shipping:5
    },


        materials:[

      {
        name:"Heavyweight Cotton Jersey",
        type:"主面料",
        supplier:"Guangzhou Textile",
        specification:"320gsm",
        composition:"100% Cotton",
        price:8.5
      },


      {
        name:"Care Label",
        type:"辅料",
        supplier:"Dongguan Accessories",
        specification:"Custom",
        composition:"Polyester",
        price:0.15
      }

    ],


    samples:[

      {
  version:"V1",

  status:"已完成",

  date:"2026-01-10",

  factory:"Guangzhou Factory",

  issues:[
    "肩宽偏大 -1cm",
    "袖长偏长 -2cm",
    "面料手感符合预期"
  ],

  fitScore:92,

  aiReview:
  "版型整体符合预期，建议微调肩部比例，提高穿着舒适度。"

},


      {
  version:"V2",

  status:"修改中",

  date:"2026-01-20",

  factory:"Guangzhou Factory",

  issues:[
    "调整版型比例",
    "确认最终尺寸表"
  ],

  fitScore:78,

  aiReview:
  "当前样衣存在版型调整风险，建议确认肩宽和衣长比例。"

}

    ],

    documents:[

  {
 name:"Tech Pack",
 type:"PDF",
 date:"2026-01-20",
 status:"完成",

 version:"V1",

 uploadedBy:"Nico",

 aiCheck:[
   "款号识别完成",
   "尺寸表识别完成",
   "工艺备注完整"
 ]
},


  {
 name:"BOM",
 type:"XLSX",
 date:"2026-01-18",
 status:"完成",

 version:"V1",

 uploadedBy:"Nico",

 aiCheck:[
   "物料数量识别完成",
   "供应商信息完整"
 ]
},


  {
 name:"Size Chart",
 type:"PDF",
 date:"2026-01-15",
 status:"审核中",

 version:"V2",

 uploadedBy:"Nico",

 aiCheck:[
   "尺寸表识别完成",
   "缺少儿童尺码"
 ]
},


  {
    name:"Fabric Test Report",
    type:"PDF",
    date:"2026-01-12",
    status:"完成"
  }

],

timeline:[

{
stage:"Planning",
date:"2025-12-01",
status:"已完成",
owner:"Nico",
progress:100,
ai:"产品方向已确认"
},


{
stage:"Design",
date:"2025-12-15",
status:"已完成",
owner:"Nico",
progress:100,
ai:"设计稿已确认"
},


{
stage:"Material",
date:"2025-12-22",
status:"已完成",
owner:"Nico",
progress:100,
ai:"面料已确认，进入打样"
},


{
stage:"Sample",
date:"2026-01-10",
status:"已完成",
owner:"Guangzhou Factory",
progress:100,
ai:"V1样衣完成，需要调整肩宽"
},


{
stage:"Sample",
date:"2026-01-20",
status:"进行中",
owner:"Guangzhou Factory",
progress:70,
ai:"等待最终尺寸确认"
},


{
stage:"Costing",
date:"",
status:"未开始",
owner:"Nico",
progress:0,
ai:"等待成本确认"
},


{
stage:"Production",
date:"",
status:"未开始",
owner:"Factory",
progress:0,
ai:"等待生产"
},


{
stage:"Launch",
date:"",
status:"未开始",
owner:"Marketing",
progress:0,
ai:"等待上市"
}

],
    aiInsights:[

      {
        title:"测试AI数据",
        content:
        "当前成本比目标成本高 $2.40，建议重新评估面料单价。"
      },


      {
        title:"供应商建议",
        content:
        "广州 Factory B 同类产品报价预计低 7%。"
      },


      {
        title:"资料完整度",
        content:
        "当前缺少 BOM、尺寸表和面料检测报告。"
      }

    ]

  },


];