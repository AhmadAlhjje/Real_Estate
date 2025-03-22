// import React, { useEffect, useState } from "react";

// const CountdownTimer = ({ endTime }) => {
//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//     function calculateTimeLeft() {
//         const difference = new Date(endTime) - new Date();
//         if (difference > 0) {
//             const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//             const minutes = Math.floor((difference / 1000 / 60) % 60);
//             const seconds = Math.floor((difference / 1000) % 60);
//             return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//         }
//         return "انتهى المزاد";
//     }

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [endTime]);

//     return <span>{timeLeft}</span>;
// };

// export default CountdownTimer;