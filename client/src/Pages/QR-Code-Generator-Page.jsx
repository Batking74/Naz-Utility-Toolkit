import { useState } from "react";

export default function QRCodeGeneratorPage() {
    const [QRCode, setQRCode] = useState('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example');
    const [Value, setValue] = useState('');
    const generateQRCode = async ({ target }) => {
        try {
            if(Value != '') {
                const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${Value}`);
                const blob = await res.blob();
                const imgURL = URL.createObjectURL(blob);
                setQRCode(imgURL);
                target.previousElementSibling.classList.add('show-img');
            }
        }
        catch (error) {
            console.error('Failed to fetch QR-Code!: ', error.message);
            throw error;
        }
    }
    return (
        <main className="QR-Code-Gen-Main-Container">
            <p>Enter your text or URL</p>
            <input type="text" onInput={({ target }) => setValue(target.value)} placeholder="Text or URL" />
            <div className="img-container">
                <img src={QRCode} alt="Generated QR code" />
            </div>
            <button onClick={generateQRCode}>Generate QR Code</button>
        </main>
    );
}