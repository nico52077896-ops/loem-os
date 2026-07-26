export const categoryCodes:any={


"T-Shirt":
"TS",


"衬衫":
"SH",


"卫衣":
"SW",


"外套":
"JK",


"裤子":
"PT",


"短裤":
"ST",


"睡衣":
"PJ",


"睡袍":
"RB",


"内裤":
"UW",


"浴巾":
"TB"


};





export function generateProductCode(

category:string,

season:string,

index:number

){


const categoryCode =

categoryCodes[category] || "OT";



const year =

season?.slice(2,4) || "26";



const quarter =

season?.includes("SS")

?

"SS"

:

"FW";




const serial = String(index)

.padStart(
3,
"0"
);



return `LO-${categoryCode}-${year}${quarter}-${serial}`;


}