import { useFormContext } from 'react-hook-form'

const Step1BasicDetails = ({ categories }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby="title-error"
          className={`w-full p-2 border rounded ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p id="title-error" className="text-red-600 mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-describedby="description-error"
          className={`w-full p-2 border rounded ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={4}
        />
        {errors.description && (
          <p id="description-error" className="text-red-600 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          aria-invalid={errors.category ? 'true' : 'false'}
          aria-describedby="category-error"
          className={`w-full p-2 border rounded ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" className="text-red-600 mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="duration" className="block font-medium mb-1">
          Duration (hours)
        </label>
        <input
          id="duration"
          type="number"
          {...register('duration')}
          aria-invalid={errors.duration ? 'true' : 'false'}
          aria-describedby="duration-error"
          className={`w-full p-2 border rounded ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          }`}
          min="0"
        />
        {errors.duration && (
          <p id="duration-error" className="text-red-600 mt-1">
            {errors.duration.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block font-medium mb-1">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          {...register('startDate')}
          aria-invalid={errors.startDate ? 'true' : 'false'}
          aria-describedby="startDate-error"
          className={`w-full p-2 border rounded ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.startDate && (
          <p id="startDate-error" className="text-red-600 mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Step1BasicDetails
