
const PageThree = ({
  shadeGroup, setShadeGroup,
  shadeType, setShadeType,
  shadeData,
  setDesignSelections,
  handleImageUpload,
  uploadedPhotos,
  comment, setComment,
  setCurrentPage, handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Shade Group</label>
          <select
            value={shadeGroup}
            onChange={(e) => {
              setShadeGroup(e.target.value);
              setShadeType("");
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
          >
            <option value="">-- Select Shade Group --</option>
            {Object.keys(shadeData).map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Shade Type</label>
          <select
            value={shadeType}
            onChange={(e) => setShadeType(e.target.value)}
            disabled={!shadeGroup}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none disabled:bg-slate-100"
          >
            <option value="">-- Select Shade Type --</option>
            {shadeGroup && shadeData[shadeGroup].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-sky-50 p-3 rounded-2xl border border-sky-100 text-center">
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <span className="block font-bold text-slate-700 mb-1">Metal Design</span>
          <span className="text-[10px] text-slate-400 block mb-2">(Select From Photo)</span>
          <input type="checkbox" onChange={(e) => setDesignSelections(p => ({...p, metalDesign: e.target.checked}))} />
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <span className="block font-bold text-slate-700 mb-1">Pontic Design</span>
          <span className="text-[10px] text-slate-400 block mb-2">(Select From Photo)</span>
          <input type="checkbox" onChange={(e) => setDesignSelections(p => ({...p, ponticDesign: e.target.checked}))} />
        </div>

        <div className="bg-white p-2 rounded-xl border border-slate-200 text-xs">
          <span className="block font-bold text-slate-700 mb-1">Occlusal Staining</span>
          <div className="flex justify-around items-center mt-3 text-[10px]">
            <label><input type="radio" name="staining" value="Non" defaultChecked onChange={(e) => setDesignSelections(p => ({...p, occlusalStaining: e.target.value}))}/> Non</label>
            <label><input type="radio" name="staining" value="Light" onChange={(e) => setDesignSelections(p => ({...p, occlusalStaining: e.target.value}))}/> Light</label>
            <label><input type="radio" name="staining" value="Dark" onChange={(e) => setDesignSelections(p => ({...p, occlusalStaining: e.target.value}))}/> Dark</label>
          </div>
        </div>

        <div className="bg-white p-2 rounded-xl border border-slate-200 text-xs">
          <span className="block font-bold text-slate-700 mb-1">Occlusal Type</span>
          <div className="flex justify-around items-center mt-3 text-[10px]">
            <label><input type="radio" name="occType" value="Non" defaultChecked onChange={(e) => setDesignSelections(p => ({...p, occlusalType: e.target.value}))}/> Non</label>
            <label><input type="radio" name="occType" value="Light" onChange={(e) => setDesignSelections(p => ({...p, occlusalType: e.target.value}))}/> Light</label>
            <label><input type="radio" name="occType" value="Reg" onChange={(e) => setDesignSelections(p => ({...p, occlusalType: e.target.value}))}/> Reg</label>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <span className="block font-bold text-slate-700 mb-1">Smile Pattern</span>
          <span className="text-[10px] text-slate-400 block mb-2">(Select From Photo)</span>
          <input type="checkbox" onChange={(e) => setDesignSelections(p => ({...p, smilePattern: e.target.checked}))} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Upload Photos (Max 5, auto-compressed to ~25-30KB)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {uploadedPhotos.map((src, index) => (
            <div key={index} className="relative w-16 h-16 border rounded-lg overflow-hidden flex-shrink-0">
              <img src={src} alt="Uploaded" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Comment / Instructions</label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write any additional instructions or comments here..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none"
        />
      </div>

      <div className="pt-4 flex justify-between">
        <button type="button" onClick={() => setCurrentPage(2)} className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl">
          &larr; Back
        </button>
        <button type="submit" className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-green-500/20 transition-all">
          Submit Order
        </button>
      </div>
    </form>
  );
};

export default PageThree;