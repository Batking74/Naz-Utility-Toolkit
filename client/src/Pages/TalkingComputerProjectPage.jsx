import { useState } from "react"

export default function TalkingComputerProjectPage() {
    const [ParagraphCount, setParagraphCount] = useState(0);
    const [SentenceCount, setSentenceCount] = useState(0);
    const [SpeedInput, setSpeedInput] = useState(1);
    const [TextInput, setTextInput] = useState('');
    const [CharCount, setCharCount] = useState(0);
    const [WordCount, setWordCount] = useState(0);
    const isDisabled = true;

    // This function reads the text out loud that the user inputs
    const playText = ({ target }) => {
        const textInputElement = target.parentElement.previousElementSibling.children[0];
        const utterance = new SpeechSynthesisUtterance(TextInput);
        utterance.rate = SpeedInput;

        if (speechSynthesis.paused && speechSynthesis.speaking) return speechSynthesis.resume();
        utterance.addEventListener('end', () => textInputElement.disabled = !isDisabled);
        if (speechSynthesis.speaking) return;

        textInputElement.disabled = isDisabled;
        speechSynthesis.speak(utterance);
    }

    // Pause reading out loud
    const pauseText = () => {
        if (speechSynthesis.speaking) speechSynthesis.pause();
    }

    // Stop reading out loud
    const stopText = ({ target }) => {
        const textInputElement = target.parentElement.previousElementSibling.children[0];
        textInputElement.disabled = !isDisabled;
        speechSynthesis.cancel();
    }

    // Clear all input
    const clearText = ({ target }) => {
        const textInputElement = target.parentElement.previousElementSibling.children[0];
        setParagraphCount(0);
        setSentenceCount(0);
        setTextInput('');
        setCharCount(0);
        setWordCount(0);
        textInputElement.value = '';
        textInputElement.disabled = !isDisabled;
        speechSynthesis.cancel();
    }

    const updateCountItems = ({ target }) => {
        setTextInput(target.value);
        // Char count with spaces
        setCharCount(target.value.length);
        // Char count without spaces
        // setCharCount(target.value.replace(/\s+/g, '').length);
        // Removing whitespace
        let textTrim = target.value.trim();
        // Counting Words
        setWordCount(textTrim.split(/\s+/).filter(item => item).length);
        // Counting Sentences
        setSentenceCount(textTrim.split('.').filter(item => item).length);
        // Counting Paragraphs
        setParagraphCount(textTrim.split('\n\n').filter(item => item).length);
    }

    return (
        <main className="TalkingComputer-Main-Container">
            <section>
                <div className="count-items">

                    {/* Item 1 */}
                    <div className="item">
                        <span className="word-count"> {WordCount} </span>
                        <p>Words</p>
                    </div>

                    {/* Item 2 */}
                    <div className="item">
                        <span className="char-count">{CharCount}</span>
                        <p>Characters</p>
                    </div>

                    {/* Item 3 */}
                    <div className="item">
                        <span className="sentence-count">{SentenceCount}</span>
                        <p>Sentences</p>
                    </div>

                    {/* Item 4 */}
                    <div className="item">
                        <span className="paragraph-count">{ParagraphCount}</span>
                        <p>Paragraphs</p>
                    </div>

                </div>
                <div className="line"></div>
                <div className="text-container">
                    <textarea onInput={updateCountItems} id="text" rows={13} className="input-text" placeholder="Start typing, or copy and paste your text here..."></textarea>
                </div>
                <div className="controls">
                    <label htmlFor="speed">Speed</label>
                    <input type="number" id="speed" min={-5} max={3} step={0.5} value={1} onChange={() => { }} />
                    <button onClick={playText}>Play</button>
                    <button onClick={pauseText}>Pause</button>
                    <button onClick={stopText}>Stop</button>
                    <button onClick={clearText}>Clear</button>
                </div>
            </section>
        </main>
    )
}