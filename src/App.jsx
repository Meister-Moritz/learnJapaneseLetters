import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const hiragana = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','ゐ','ゑ','を','ん','が','ぎ','ぐ','げ','ご','ざ','じ','ず','ぜ','ぞ','だ','ぢ','づ','で','ど','ば','び','ぶ','べ','ぼ','ぱ','ぴ','ぷ','ぺ','ぽ']
const katakana = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヰ','ヱ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ']
const romaji =  ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so','ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wi','we','wo','n','ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','ji','zu','de','do','ba','bi','bu','be','bo','pa','pi','pu','pe','po']


function App() {

  const [myInput, setMyInput] = useState('')
  const [alphabet, setAlphabet] = useState('k')
  const [answner, setAnswer] = useState({myStatus: 'p', messg: ''})
  const [random, setRandom] = useState(Math.floor(Math.random() * katakana.length))
  const inputRef = useRef(null)
  let headline = 'Katakana'
  let character = katakana[random]
  let next = <></>

  switch (alphabet){
    case 'k':
      headline = 'Katakana'
      character = katakana[random]
      break
    case 'h':
      headline = 'Hiragana'
      character = hiragana[random]
      break
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log('enter')
      if (answner.myStatus == 'p'){
        validateInput(random, myInput, setAnswer);
      }
      else{
        handleNext(setRandom, setAnswer, setMyInput, inputRef)
      }
      
    }
  };
  if(answner.myStatus != 'p'){
    next = <button onClick={()=> handleNext(setRandom, setAnswer, setMyInput, inputRef)}>next</button>
  }

  return (
    <>
    <h1>{headline}</h1>
    <button onClick={()=> switchAlphabet(alphabet, setAlphabet)}>switch alphabet</button>
    <h1>{character}</h1>
      <input
        ref={inputRef}
        type="text"
        value={myInput}
        onChange={e => setMyInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="romaji input..."
      />
      <button onClick={()=> validateInput(random, myInput, setAnswer)}>submit</button>
      <h2>{answner.messg}</h2>
      {next}
    </>
  )
}

export default App


function switchAlphabet(alphabet, setAlphabet){
  switch (alphabet){
    case 'k':
      setAlphabet('h');
      break
    case 'h':
      setAlphabet('k');
      break
  }
}

function validateInput(random, myInput, setAnswer){
  const correctAnswer = romaji[random]
  if (correctAnswer == myInput.toLowerCase()){
    setAnswer({myStatus:'t', messg:'Correct'})
    return
  }
  setAnswer({myStatus:'f', messg:'Wrong, the right awnser is: ' + correctAnswer})
  return
}

function handleNext(setRandom, setAnswer, setMyInput, inputRef){
  setRandom(Math.floor(Math.random() * katakana.length));
  setAnswer({myStatus: 'p', messg: ''});
  setMyInput('')
  inputRef.current.focus();
}