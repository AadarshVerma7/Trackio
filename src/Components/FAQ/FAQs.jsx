import React from 'react'
import FAQCard from './FAQCard'
function FAQs( {theme} ) {
  return (
    <div className='mx-36 flex flex-col justify-center items-center p-5 gap-2'>
      <h1 className='fjalla text-5xl mb-5'>FAQs</h1>
      <FAQCard question={"What is Trackio?"} answer={"Trackio is a collaborative learning and progress-tracking platform where you and your friends can create groups, set goals, track tasks, and stay motivated through leaderboards, challenges, and shared resources."} theme={theme}/>
      <FAQCard question={"How does the leaderboard work?"} answer={"Each member’s progress is tracked based on completed tasks and activities. The leaderboard updates automatically, showing who’s making the most progress — creating a sense of healthy competition."} theme={theme}/>
      <FAQCard question={"Can I share notes and study materials with my group?"} answer={"Yes! Trackio allows you to upload files, PDFs, or links in your group space so that everyone can benefit from the same resources while learning together."} theme={theme}/>
      <FAQCard question={"What are AI-powered contests?"} answer={"Group leaders can create AI-generated quizzes or challenges for all members. Scores are calculated instantly, and points are added to your progress — making learning more interactive and fun."} theme={theme}/>
      <FAQCard question={"Is Trackio free to use?"} answer={"Yes! Trackio is completely free to join and use. In the future, we may add premium features, but the core experience of learning, sharing, and competing will always remain free."} theme={theme}/>
    </div>
  )
}

export default FAQs
