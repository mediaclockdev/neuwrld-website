import React, { useRef } from "react";

const MegaMenuDialog = ({ type, categories, onClose }) => {
  const data = categories?.find(
    (c) => c.slug?.toLowerCase() === type.toLowerCase()
  );

  // Persistent timer reference
  const closeTimer = useRef(null);

  const handleLeave = () => {
    closeTimer.current = setTimeout(onClose, 200);
  };

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
  };

  if (!data) return null;

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden w-[800px]"
        onClick={onClose}
      />

      <div
        className="absolute right-0 top-11.5 bg-white shadow-xl p-6 rounded-lg z-50"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between lg:hidden">
          <h3 className="font-semibold text-lg">{data.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-6 pb-4 border-b">
          <h3 className="font-semibold text-xl">{data.name}</h3>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.children.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm border-b pb-2">
                  {category.title}
                </h4>

                <ul className="space-y-2">
                  {category.children?.map((child) => (
                    <li
                      key={child.id}
                      className="cursor-pointer text-sm hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded"
                    >
                      {child.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenuDialog;
