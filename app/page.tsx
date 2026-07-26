import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">
            LOĒM OS
          </h1>
          <p className="text-gray-400 mt-2">
            AI-Powered Operating System
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
  <div className="h-2 w-2 rounded-full bg-green-500" />

  <span className="text-sm font-medium text-white">
    Nico Park
  </span>
</div>
      </header>


      <section className="grid grid-cols-4 gap-6">

        <Card
          title="AI Dashboard"
          desc="AI控制台"
        />

        <Link href="/product">
  <Card
    title="Product Studio"
    desc="产品研发"
  />
</Link>

        <Card
          title="PSIF"
          desc="产销存&履约"
        />

        <Card
          title="Supply"
          desc="供应商管理"
        />

        <Card
          title="Brand Knowledge"
          desc="品牌知识库"
        />

        <Card
          title="Growth"
          desc="营销增长"
        />

        <Card
          title="Finance"
          desc="财务管理"
        />

        <Card
          title="Contract"
          desc="合同管理"
        />

      </section>


    </main>
  )
}



function Card({
  title,
  desc
}:{
  title:string
  desc:string
}) {

  return (

    <div
      
  className="
  cursor-pointer
  rounded-3xl
  bg-white/5
      border
      border-white/10
      p-8
     hover:bg-white/10
hover:-translate-y-1
hover:border-white/20
      transition
      "
    >

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-400 mt-3">
        {desc}
      </p>

    </div>

  )
}