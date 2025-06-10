import { useState } from "react";

export default function PasswordGeneratorProjectPage() {
    const chars = 'ab789cde#$%fghijk`~!*_/?lmn123op456qrs@^&tuvwxyz';
    const [PasswordText, setPasswordText] = useState('');

    // Generates New Password and displays it to the user
    const generatePassword = () => {
        const passwordLength = validatePasswordLength();
        if (!passwordLength) return;

        // Generating
        let newPassword = '';
        let i = 0;

        while (i < passwordLength) {
            newPassword += chars.charAt(Math.random() * passwordLength);
            i++;
        }
        setPasswordText(newPassword);
    }

    // Validates what length the user inputs
    const validatePasswordLength = () => {
        const passwordLength = prompt("How long would you like your password to be? (Must be at least 12 characters and no more than 30 characters)");
        if (parseInt(passwordLength) < 12) {
            alertError("small");
            return;
        }
        else if (parseInt(passwordLength) > 30) {
            alertError("big");
            return;
        }
        return parseInt(passwordLength);
    }

    // Functions to help reduce repetitave code
    const alertError = (msg) => {
        alert(`Number is too ${msg}`);
        validatePasswordLength();
    }

    return (
        <main className="PasswordGen-Main-Container">
            <header>
                <h1>Password Generator</h1>
            </header>
            <div className="card">
                <div className="card-header">
                    <h2>Generate a Password</h2>
                </div>
                <div className="card-body">
                    <textarea
                        readOnly
                        value={PasswordText}
                        placeholder="Your Secure Password"
                        aria-label="Generated Password"
                    ></textarea>
                </div>
                <div className="card-button">
                    <button onClick={generatePassword}>Generate Password</button>
                </div>
            </div>
        </main>
    );
}