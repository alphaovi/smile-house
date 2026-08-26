
/**
 * Step 3 Modal: Shade Customization, Image Uploads & Notes
 */
const RequestOrderPageThree = ({
  orderData,
  onChange,
  onImageUpload,
  uploadedPhotos,
  onPrev,
}) => {
  return (
    <div className="space-y-4 text-xs text-slate-700">
      {/* Shade Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1 text-slate-700">Shade Group</label>
          <select
            name="shadeGroup"
            value={orderData.shadeGroup}
            onChange={onChange}
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white"
          >
            <option value="VITA Classic">VITA Classic</option>
            <option value="3D Master">3D Master</option>
            <option value="Bleach">Bleach</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 text-slate-700">Shade Type</label>
          <input
            type="text"
            name="shadeType"
            value={orderData.shadeType}
            onChange={onChange}
            placeholder="e.g. A2, A3, BL2"
            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
      </div>

      {/* File / Photo Upload */}
      <div>
        <label className="block font-semibold mb-1 text-slate-700">
          Upload Photos / Clinical Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-slate-600"
        />
        {uploadedPhotos.length > 0 && (
          <p className="text-[11px] text-green-600 mt-1 font-medium">
            ✓ {uploadedPhotos.length} photo(s) uploaded successfully.
          </p>
        )}
      </div>

      {/* Comments & Special Instructions */}
      <div>
        <label className="block font-semibold mb-1 text-slate-700">
          Special Instructions / Lab Notes
        </label>
        <textarea
          rows={3}
          name="comment"
          value={orderData.comment}
          onChange={onChange}
          placeholder="Add specific instructions for the dental technician..."
          className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none"
        />
      </div>

      {/* Step Navigation Back Button */}
      <div className="flex justify-start pt-4 border-t">
        <button
          type="button"
          onClick={onPrev}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition"
        >
          ⬅ Step 2
        </button>
      </div>
    </div>
  );
};

export default RequestOrderPageThree;