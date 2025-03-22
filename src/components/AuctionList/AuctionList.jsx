// import React, { useState } from "react";
// import CountdownTimer from "../CountdownTimer/CountdownTimer";

// const AuctionList = () => {
//     // مصفوفة تمثل بيانات المزادات (Mock API)
//     const mockAuctions = [
//         {
//             id: 1,
//             title: "فرص",
//             description: "مزاد فرص - مكة المكرمة, المدينة المنورة",
//             currentPrice: 186952,
//             location: "مكة المكرمة, المدينة المنورة",
//             startTime: new Date("2025-03-22T00:00:00").toISOString(),
//             endTime: new Date("2025-03-23T00:00:00").toISOString(),
//             numberOfAssets: 2,
//             bidsCount: 50,
//             status: "مفتوح",
//             src:"../../../public/s5.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },
//         {
//             id: 1,
//             title: "فرص",
//             description: "مزاد فرص - مكة المكرمة, المدينة المنورة",
//             currentPrice: 186952,
//             location: "مكة المكرمة, المدينة المنورة",
//             startTime: new Date("2025-03-22T00:00:00").toISOString(),
//             endTime: new Date("2025-03-23T00:00:00").toISOString(),
//             numberOfAssets: 2,
//             bidsCount: 50,
//             status: "مفتوح",
//             src:"../../../public/s5.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },
//         {
//             id: 1,
//             title: "فرص",
//             description: "مزاد فرص - مكة المكرمة, المدينة المنورة",
//             currentPrice: 186952,
//             location: "مكة المكرمة, المدينة المنورة",
//             startTime: new Date("2025-03-22T00:00:00").toISOString(),
//             endTime: new Date("2025-03-23T00:00:00").toISOString(),
//             numberOfAssets: 2,
//             bidsCount: 50,
//             status: "مفتوح",
//             src:"../../../public/s5.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },
//         {
//             id: 2,
//             title: "فرص",
//             description: "مزاد فرص - الرياض",
//             currentPrice: 150000,
//             location: "الرياض",
//             startTime: new Date("2025-04-15T00:00:00").toISOString(),
//             endTime: new Date("2025-04-17T00:00:00").toISOString(),
//             numberOfAssets: 3,
//             bidsCount: 75,
//             status: "قيد التنفيذ",
//             src:"../../../public/s6.jpg"
//         },

//     ];

//     const [auctions] = useState(mockAuctions);

//     return (
//         <div className="auction-list">
//             {auctions.map((auction) => (
//                 <div key={auction.id} className="auction-card">
//                     <div className="card-header">
//                         <img src={auction.src} alt="Logo" className="logo" />
//                         <h2>{auction.title}</h2>
//                         <span className={`status-badge ${auction.status === "مفتوح" ? "open" : ""}`}>
//                             {auction.status === "مفتوح" ? "مفتوح الآن" : "قادم"}
//                         </span>
//                     </div>
//                     <div className="card-body">
//                         <p>التواصل والإستفسار: 0533523311</p>
//                         <div className="dates">
//                             <div>
//                                 <strong>يبدأ في:</strong>
//                                 <small>{new Date(auction.startTime).toLocaleDateString()}</small>
//                             </div>
//                             <div>
//                                 <strong>ينتهي في:</strong>
//                                 <small>{new Date(auction.endTime).toLocaleDateString()}</small>
//                             </div>
//                         </div>
//                         <hr />
//                         <div className="details">
//                             <div>
//                                 <i className="fas fa-box"></i>
//                                 <strong>عدد الأصول:</strong> {auction.numberOfAssets}
//                             </div>
//                             <div>
//                                 <i className="fas fa-gavel"></i>
//                                 <strong>العروض:</strong> {auction.bidsCount}
//                             </div>
//                         </div>
//                         <div className="price">
//                             <strong>{auction.currentPrice.toLocaleString()} ر.س</strong>
//                         </div>
//                         <div className="timer">
//                             <i className="fas fa-clock"></i>
//                             <CountdownTimer endTime={auction.endTime} />
//                         </div>
//                     </div>
//                     <div className="card-footer">
//                         <button className={`register-btn ${auction.status === "مفتوح" ? "open" : ""}`}>
//                             التسجيل <i className="fas fa-check"></i>
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AuctionList;