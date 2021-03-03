import React, {useState, useEffect, useRef} from 'react'
import Message from './Message'

import FlipMove from 'react-flip-move'
import imgMessanger from './assets/images/messanger.webp'

import db from './firebase'
import firebase from 'firebase'
import Login from './Login'
import SendIcon from '@material-ui/icons/Send'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Loader from './Loader'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));  
  const [isLoading, setLoader] = useState(false)

  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
      setLoader(true)
      setMessages(
        snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))
      )
    })
  }

  const signOut = () => {
    localStorage.removeItem('user')
    setUser('')
  }

  useEffect(() => {
    loadMessages()
  }, [isLoading])

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div className="webpage bg-gray-700 relative top-0 left-0 w-full h-full">
          <div className="relative top-0 left-0 w-full h-screen">
            <div className="header">
              <h1 className="text-xl md:text-3xl font-extrabold mb-5 pt-5 text-center flex items-center justify-center text-white">
                <div className="img mr-2">
                  <img src={imgMessanger} width="100" height="100" alt="" />
                </div>
                Messanger App
              </h1>
              <h2 className="text-white text-lg text-center">
                Hello{' '}
                <strong>
                  <i>{user.name.split(' ')[0]}</i>
                </strong>
                , Welcome to the chat !
              </h2>
              <div
                onClick={signOut}
                className="logout absolute right-5 top-5 text-white cursor-pointer transition-all hover:opacity-75"
              >
                Logout <ExitToAppIcon className="fill-current text-white" />
              </div>
            </div>

            {!isLoading ? (
              <Loader />
            ) : (
              <div className="messages-holder h-4/6 overflow-y-auto px-5">
                {messages.length === 0 && (
                  <div className="no-messages pt-12 text-white text-center">
                    There are no any messages ! Start the chat !
                  </div>
                )}
                <FlipMove>
                  {messages.map(({ id, message }) => (
                    <Message key={id} message={message} user={user} />
                  ))}
                </FlipMove>
                <div ref={messagesEndRef} />
              </div>
            )}
            <form className="absolute bottom-0 left-0 w-full p-5 bg-gray-700 h-20">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your messege here..."
                className="rounded-full bg-gray-500 text-white py-2 px-4 shadow-xl focus:outline-none pr-16 w-full h-10 resize-none"
              ></textarea>
              <button
                type="submit"
                onClick={sendMsgHandle}
                disabled={!input}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 width-40 text-blue-500 focus:outline-none hover:opacity-70 transition-all"
              >
                <SendIcon className="fill-current text-gray-100" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
