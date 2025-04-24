import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const Step2Requirements = () => {
  const { setValue, watch } = useFormContext()
  const prerequisites = watch('prerequisites') || []
  const [inputValue, setInputValue] = useState('')

  const addPrerequisite = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !prerequisites.includes(trimmed)) {
      setValue('prerequisites', [...prerequisites, trimmed], { shouldValidate: true })
      setInputValue('')
    }
  }

  const removePrerequisite = (item) => {
    setValue(
      'prerequisites',
      prerequisites.filter((prereq) => prereq !== item),
      { shouldValidate: true }
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addPrerequisite()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
      <div className="mb-4">
        <label htmlFor="prerequisite-input" className="block font-medium mb-1">
          Add Prerequisites
        </label>
        <input
          id="prerequisite-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded"
          aria-label="Add prerequisite"
        />
        <button
          type="button"
          onClick={addPrerequisite}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {prerequisites.map((item) => (
          <div
            key={item}
            className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => removePrerequisite(item)}
              aria-label={`Remove prerequisite ${item}`}
              className="ml-2 text-indigo-600 hover:text-indigo-900 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step2Requirements
