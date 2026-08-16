const CreateNewOrder = () => {
  return (
    <>
      <div>
        <h1 className="text-center font-bold text-lg underline">
          Create New Order
        </h1>
      </div>
      <div className="p-20">
        <form action="">
          <div className="grid grid-cols-2 justify-items-center bg-[#e9e5ffbe] ">
            <div className="flex gap-5">
              <label htmlFor="">Order Date:</label>
              <input
                type="date"
                placeholder="Input Name"
                className="border px-5 "
              />
            </div>
            <div className="flex gap-5">
              <label htmlFor="">Delivery Date:</label>
              <input
                type="date"
                placeholder="Input Name"
                className="border px-5"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 justify-items-center bg-[#e9e5ffbe] mt-4">
            <div className="flex gap-5">
              <label htmlFor="">Order Date:</label>
              <input
                type="dropdown"
                placeholder="Input Name"
                className="border px-5 "
              />
            </div>
            <div className="flex gap-5">
              <label htmlFor="">Delivery Date:</label>
              <input
                type="date"
                placeholder="Input Name"
                className="border px-5"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNewOrder;
<h1>Create New Order</h1>;
