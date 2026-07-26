export default function ProductImages() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white/70">产品图像</h2>

        <button
          type="button"
          className="text-xs text-white/35 transition hover:text-white"
        >
          上传图片
        </button>
      </div>

      <div className="mt-5 flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl text-white/40">
            +
          </div>

          <p className="mt-4 text-sm text-white/35">产品主图</p>

          <p className="mt-1 text-xs text-white/20">
            Sketch · Sample · Reference
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {["设计稿", "样衣图", "参考图"].map((item) => (
          <div
            key={item}
            className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-xs text-white/25"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}