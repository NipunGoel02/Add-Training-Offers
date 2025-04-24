import { useEffect } from 'react'

const SummaryModal = ({ onClose, onSubmit, data }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Review Training Offer</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <div>
            <strong>Title:</strong> {data.title}
          </div>
          <div>
            <strong>Description:</strong> {data.description}
          </div>
          <div>
            <strong>Category:</strong> {data.category}
          </div>
          <div>
            <strong>Duration:</strong> {data.duration} hours
          </div>
          <div>
            <strong>Start Date:</strong> {data.startDate}
          </div>
          <div>
            <strong>Prerequisites:</strong>{' '}
            {data.prerequisites && data.prerequisites.length > 0
              ? data.prerequisites.join(', ')
              : 'None'}
          </div>
          <div>
            <strong>Uploaded File:</strong> {data.file && data.file.length > 0 ? data.file[0].name : 'None'}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default SummaryModal
