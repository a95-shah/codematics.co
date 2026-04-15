"use client";

import { CldUploadWidget } from "next-cloudinary";
import { HiUpload, HiTrash } from "react-icons/hi";

export default function ImageUpload({ value, onChange }: { value: string, onChange: (url: string) => void }) {
  const handleSuccess = (result: any) => {
    if (typeof result?.info === 'object' && result?.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  return (
    <div className="w-full">
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        onSuccess={handleSuccess}
        options={{
          maxFiles: 1,
          resourceType: "image",
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-4">
              {value ? (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-glass-border group bg-bg-primary">
                  <img src={value} alt="Upload" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      type="button" 
                      onClick={() => open()}
                      className="p-3 bg-glass-bg hover:bg-glass-border rounded-full text-white-theme transition-colors"
                    >
                      <HiUpload className="h-5 w-5" />
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange('');
                      }}
                      className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-500 transition-colors"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full h-40 rounded-2xl bg-bg-primary border-2 border-dashed border-glass-border hover:border-[#c92228] transition-all flex flex-col items-center justify-center group text-gray-500 hover:text-white-theme outline-none"
                >
                  <div className="h-10 w-10 rounded-full bg-glass-bg flex items-center justify-center mb-3 group-hover:bg-[#c92228]/10 group-hover:text-[#c92228] transition-colors">
                    <HiUpload className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Click to Upload Image</span>
                </button>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
