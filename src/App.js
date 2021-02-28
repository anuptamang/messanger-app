import React, {useState, useEffect, useRef} from 'react'
import Message from './Message'

import FlipMove from 'react-flip-move'
import imgMessanger from './assets/images/messanger.png'

import db from './firebase'
import firebase from 'firebase'
import Login from './Login'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));  

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMsgHandle = (e) => {
    e.preventDefault();
    // setMessages([...messages, input]);
    sendMessage(input)
    setInput('')
  }
  
  const sendMessage = (text) => {    
    let payload = {
      text: text,
      timestamp: firebase.firestore.Timestamp.now(),
      username: user.name,
      userImage: user.photo,
    };

    db.collection('messages').add(payload);
  }

  const loadMessages = () => {    
    db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))
      )
    })
  }

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="webpage bg-gray-100 dark:bg-gray-700 relative top-0 left-0 w-full h-full">
          <div className="relative top-0 left-0 w-full h-screen">
            <h1 className="text-xl md:text-3xl font-extrabold text-blue-400 mb-5 text-center flex items-center justify-center dark:text-white">
              <div className="img mr-2">
                <img src={imgMessanger} width="100" height="100" alt="" />
              </div>
              Facebook Messanger Clone
            </h1>
            <div className="messages-holder h-3/5 overflow-auto px-5">
              <FlipMove>
                {messages.map(({ id, message }) => (
                  <Message key={id} message={message} user={user} />
                ))}
              </FlipMove>
              <div ref={messagesEndRef} />
            </div>
            <form className="absolute bottom-0 left-0 w-full p-5 bg-gray-100 dark:bg-gray-700 h-20">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Write your messege here..."
                className="rounded-full bg-whitedark:bg-gray-500 dark:bg-gray-500 dark:text-gray-300 py-2 px-4 shadow-xl focus:outline-none pr-16 w-full"
              />

              <button
                type="submit"
                onClick={sendMsgHandle}
                className="absolute right-8 top-7 width-40 text-blue-500 focus:outline-none hover:opacity-70 transition-all"
              ></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
