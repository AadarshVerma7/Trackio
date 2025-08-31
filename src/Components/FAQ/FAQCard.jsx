import React, { useState, useRef } from 'react'

function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const myHeight = isOpen ? contentRef.current.scrollHeight : 0;

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button 
        className='bg-[#da966f]  w-full flex justify-between py-3 px-8 rounded-md shadow-lg shadow-black/30 cursor-pointer' 
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h1 className='text-xl font-semibold text-white'>{question}</h1>
        <span className={`text-xl transform transition-transform duration-300 text-white ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>
      <div 
        ref={contentRef}
        className='bg-[#dc8655] py-0.5 px-6 overflow-hidden transition-all duration-300 rounded-md mb-2 mx-3 shadow-lg shadow-black/30' 
        style={{ height: myHeight }}
        aria-hidden={!isOpen}
      >
        <p className='text-lg text-white'>
          {answer}
        </p>
      </div>
    </>
  )
}

export default FAQCard