import { useEffect, useState } from 'react';

interface FilePreviewProps {
  file: File;
}

const FilePreview = ({ file }: FilePreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.includes('image')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className="mt-2">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border border-purple-600"
        />
      ) : (
        <p className="text-gray-400 text-sm font-futuristic">{file.name}</p>
      )}
    </div>
  );
};

export default FilePreview;