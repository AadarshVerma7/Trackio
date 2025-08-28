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
        className='bg-[#DDD9D6] w-full flex justify-between py-3 px-8 rounded-md shadow-lg shadow-black/30' 
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h1 className='text-3xl font-semibold'>{question}</h1>
        <span className={`text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </button>
      <div 
        ref={contentRef}
        className='bg-[#DDD9D6] py-0.5 px-6 overflow-hidden transition-all duration-300 rounded-md mb-2 mx-3 shadow-lg shadow-black/30' 
        style={{ height: myHeight }}
        aria-hidden={!isOpen}
      >
        <p className='text-2xl'>
          {answer}
        </p>
      </div>
    </>
  )
}

export default FAQCard