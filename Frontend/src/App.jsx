import {useState,useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'

import './App.css'

function App() {
  const[code,setCode] = useState(`function sum(){
    return 1+1
    }`)

    const[review,setReview] = useState(``)
    const[loading,setLoading] = useState(false);

  useEffect(()=>{
    prism.highlightAll();
});

async function reviewCode() {
    setLoading(true);         // Show loader
    setReview("");            // Clear previous review
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setReview(" Error getting review. Please check the server.");
    } finally {
      setLoading(false);     // Hide loader
    }
  }

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 17,
              border : '1pxs solid #ddd',
              borderRadius: '4px',
              height: '100%',
              width: '100%',
            }} 
            />
        </div>
      
        <div onClick={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
        {loading ?(
          <div className='loader'></div>
        ):(
        <Markdown>{review}</Markdown>
      )}
        </div>
    </main>
    </>
  )
}


export default App
