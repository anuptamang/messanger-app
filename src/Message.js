import React, {forwardRef} from 'react'

const Message = forwardRef(({message, user}, ref) => {  
  const isUser = user.name === message.username;
  return (    
    <div ref={ref}
      className={`max-w-sm bg-white dark:bg-gray-500 rounded-2xl shadow-md flex items-center space-x-4 mb-6 p-4 ${
        isUser ? 'ml-auto dark:bg-blue-900' : 'mr-auto'
      }`}
    >
      <div className="flex-shrink-0 items-start">
        <img src={message.userImage} width="60" height="60" alt="" />
      </div>
      <div>
        <div className="text-md md:text-xl font-medium text-black dark:text-white">
          {message.username}
        </div>
        <p className="text-gray-500 dark:text-white">{message.text}</p>
      </div>
    </div>
  )
})

export default Message
