import React, { useRef, useState, useEffect } from 'react'

const CommentsForm = ( slug ) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccesMessage, setShowSuccesMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const stireEl = useRef()

  const handleCommentSubmission = () => {

  }


  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        CommentsForm
      </h3> 
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          name='comment'
          ref={commentEl}
          placeholder='Comments'
          className='
            p-4 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200
            bg-gray-100 text-gray-700
        '/>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input 
          name='name'
          type="text"
          ref={nameEl}
          placeholder='Name'
          className='
            py-2 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200
            bg-gray-100 text-gray-700 px-4
        '/>
        <input 
          name='email'
          type="text"
          ref={emailEl}
          placeholder='Email'
          className='
            py-2 outline-nome w-full rounded-lg focus:ring-2 focus:ring-gray-200
            bg-gray-100 text-gray-700 px-4
        '/>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required.</p>}
      <div className='mt-8'>
        <button 
          type='button' 
          onClick={handleCommentSubmission}
          className='
            transition duration-500 ease hover:bg-indigo-900 inline-block 
            bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer
        '>
          Post Comment
        </button>
        {showSuccesMessage && 
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comment submitted for review
          </span>}
      </div>
    </div>
  )
}

export default CommentsForm