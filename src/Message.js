import React, {forwardRef} from 'react'

const Message = forwardRef(({message, user}, ref) => {  
  const isUser = user.name === message.username;
  return (
    <div
      ref={ref}
      className={`max-w-sm bg-gray-500 shadow-md flex items-center space-x-4 mb-20 p-4 relative ${
        isUser
          ? 'ml-auto mr-12 bg-blue-400 rounded-tl-full rounded-bl-full rounded-tr-full'
          : 'ml-12 rounded-tr-full rounded-br-full rounded-tl-full'
      }`}
    >
      <div
        className={`flex-shrink-0 items-start absolute -bottom-12 -right-12 rounded-full overflow-hidden ${
          isUser ? '-bottom-12 -right-12' : '-bottom-12 -left-12'
        }`}
      >
        <img
          className="rounded-full"
          src={message.userImage}
          width="40"
          height="40"
          alt=""
        />
      </div>
      <div>
        <div
          className={`absolute text-white text-sm ${
            isUser ? '-bottom-6 right-0' : '-bottom-6 left-0'
          }`}
        >
          {message.username.split(' ')[0]}
        </div>
        <p className="shadow-t text-white break-words">{message.text}</p>
      </div>
    </div>
  )
})

export default Message
