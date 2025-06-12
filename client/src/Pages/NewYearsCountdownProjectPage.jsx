import { useEffect, useState } from "react";

export default function NewYearsCountdownProjectPage() {
    const [Weeks, setWeeks] = useState('00');
    const [Days, setDays] = useState('00');
    const [Hours, setHours] = useState('00');
    const [Minutes, setMinutes] = useState('00');
    const [Seconds, setSeconds] = useState('00');
    const updateCountdown = () => {
        const currentYear = new Date().getFullYear();
        const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`);
        const currentTime = new Date();
        const diff = newYearTime - currentTime;
        const w = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
        const d = Math.floor(diff / 1000 / 60 / 60 / 24);
        const h = Math.floor((diff / 1000 / 60 / 60) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setWeeks(w);
        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }
    useEffect(() => {
        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <main className="NewYearsCountdown-Main-Container">
            <h1>New Year Countdown</h1>
            <section className="countdown">
                <div className="time">
                    <h2 className="weeks">{Weeks}</h2>
                    <small>Weeks</small>
                </div>
                <div className="time">
                    <h2 className="days">{Days}</h2>
                    <small>Days</small>
                </div>
                <div className="time">
                    <h2 className="hours">{Hours}</h2>
                    <small>Hours</small>
                </div>
                <div className="time">
                    <h2 className="minutes">{Minutes}</h2>
                    <small>Minutes</small>
                </div>
                <div className="time">
                    <h2 className="seconds">{Seconds}</h2>
                    <small>Seconds</small>
                </div>
            </section>
        </main>
    );
}