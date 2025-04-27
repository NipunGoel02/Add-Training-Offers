import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Step1BasicDetails from './Step1BasicDetails'
import Step2Requirements from './Step2Requirements'
import Step3UploadMaterials from './Step3UploadMaterials'
import SummaryModal from './SummaryModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  duration: yup.number().typeError('Duration must be a number').positive('Duration must be positive').required('Duration is required'),
  startDate: yup.date().required('Start Date is required'),
  prerequisites: yup.array().of(yup.string()),
  file: yup
    .mixed()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (!value || value.length === 0) return true
      const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      return supportedFormats.includes(value[0].type)
    }),
})

const TrainingOfferFormTemp3 = ({ onUnauthorized }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      category: '',
      duration: '',
      startDate: '',
      prerequisites: [],
      file: null,
    },
  })

  const [step, setStep] = useState(1)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('https://training-backend-re06.onrender.com/api/categories')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data)
        } else if (res.data && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories)
        } else {
          setCategories([])
          toast.error('Invalid categories data format')
        }
      })
      .catch(() => {
        toast.error('Failed to load categories')
      })
  }, [])

  const [showSummary, setShowSummary] = useState(false)

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('category', data.category)
      formData.append('duration', data.duration)
      formData.append('startDate', data.startDate)
      data.prerequisites.forEach((prereq, index) => {
        formData.append(`prerequisites[${index}]`, prereq)
      })
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0])
      }

      const token = localStorage.getItem('token')

      await axios.post('https://training-backend-re06.onrender.com/api/training-offers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      })
      toast.success('Training offer submitted successfully')
      methods.reset()
      setStep(1)
      setShowSummary(false)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Please login.')
        if (onUnauthorized) {
          onUnauthorized()
        }
      } else {
        toast.error('Failed to submit training offer')
      }
    }
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => setShowSummary(true))}
        className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out"
        aria-label="Training Offer Form"
      >
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0">Create Training Offer</h1>
          <div className="flex space-x-4">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                  step === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-indigo-100'
                }`}
                aria-current={step === s ? 'step' : undefined}
                aria-label={`Step ${s}`}
              >
                Step {s}
              </button>
            ))}
          </div>
        </div>
        <div
          key={step}
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: 1 }}
        >
          {step === 1 && <Step1BasicDetails categories={categories} />}
          {step === 2 && <Step2Requirements />}
          {step === 3 && <Step3UploadMaterials />}
        </div>
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition transform hover:-translate-y-1"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition transform hover:-translate-y-1"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition transform hover:-translate-y-1"
            >
              Review & Submit
            </button>
          )}
        </div>
      </form>
      {showSummary && (
        <SummaryModal
          onClose={() => setShowSummary(false)}
          onSubmit={methods.handleSubmit(onSubmit)}
          data={methods.getValues()}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </FormProvider>
  )
}

export default TrainingOfferFormTemp3
