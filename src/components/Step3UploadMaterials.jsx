import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Document, Page, pdfjs } from 'react-pdf'

// ✅ This sets the worker source to a CDN version (safe & stable)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const Step3UploadMaterials = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const file = watch('file')
  const [numPages, setNumPages] = useState(null)

  useEffect(() => {
    if (!file || file.length === 0) {
      setNumPages(null)
    }
  }, [file])

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  const isPdf = file && file.length > 0 && file[0].type === 'application/pdf'
  const isImage = file && file.length > 0 && file[0].type.startsWith('image/')

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Materials</h2>
      <div className="mb-4">
        <label htmlFor="file" className="block font-medium mb-1">
          Upload PDF or Image
        </label>
        <input
          id="file"
          type="file"
          accept="application/pdf,image/*"
          {...register('file')}
          aria-invalid={errors.file ? 'true' : 'false'}
          aria-describedby="file-error"
          className="w-full"
        />
        {errors.file && (
          <p id="file-error" className="text-red-600 mt-1">
            {errors.file.message}
          </p>
        )}
      </div>
      <div className="border p-4 rounded bg-gray-50">
        {isPdf && (
          <Document
            file={file[0]}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
            className="mx-auto"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
        {isImage && (
          <img
            src={URL.createObjectURL(file[0])}
            alt="Uploaded preview"
            className="mx-auto max-h-96"
          />
        )}
        {!isPdf && !isImage && <p>No preview available</p>}
      </div>
    </div>
  )
}

export default Step3UploadMaterials
