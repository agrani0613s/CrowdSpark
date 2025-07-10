// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // const dummyCampaigns = [
// //    // Sample campaign objects with category
// //    { title: "School Kit Drive", category: "education", goal: 50000, raised: 25000, description: "Help underprivileged children get school supplies." },
// //    { title: "Solar Lights", category: "education", goal: 20000, raised: 18000, description: "Provide lights for village schools." },
// //  ];

// // export default function CategoryPage() {
// //   const { categoryName } = useParams();
// //    const campaigns = dummyCampaigns.filter(c => c.category === categoryName);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-3xl font-bold text-green-600 mb-6 capitalize">{categoryName} Campaigns</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {campaigns.map((c, idx) => {
// //           const percentage = Math.min((c.raised / c.goal) * 100, 100);
// //           return (
// //             <div key={idx} className="bg-white rounded-lg shadow-md p-4">
// //               <h3 className="text-xl font-semibold">{c.title}</h3>
// //               <p className="text-gray-600 mb-2">{c.description}</p>
// //               <div className="w-full bg-gray-200 h-3 rounded mb-1">
// //                 <div className="bg-green-600 h-3" style={{ width: `${percentage}%` }} />
// //               </div>
// //               <p className="text-sm text-gray-700">
// //                 ₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}
// //               </p>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../api/axios";

// export default function CategoryPage() {
//   const { categoryName } = useParams();
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//     const res = await axios.get(`/api/campaigns/category/${categoryName}`);
//     console.log("API response:", res.data);

//     // If API wraps array inside a `data` property
//     const campaignsArray = Array.isArray(res.data.data)
//       ? res.data.data
//       : res.data;

//     setCampaigns(campaignsArray);
//   } catch (err) {
//     console.error("Failed to fetch campaigns:", err);
//   }
//     };

//     fetchCampaigns();
//   }, [categoryName]);

//   if (loading) return <p>Loading campaigns...</p>;

//   // Example API call when category is selected

//   return (
//     // <div className="p-6">
//     //   <h2 className="text-3xl font-bold text-green-600 mb-6 capitalize">
//     //     {categoryName} Campaigns
//     //   </h2>

//     //   {loading ? (
//     //     <p className="text-gray-500">Loading campaigns...</p>
//     //   ) : campaigns.length === 0 ? (
//     //     <p className="text-gray-500">No campaigns found in this category.</p>
//     //   ) : (
//     //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     //       {campaigns.map((c) => {
//     //         const percentage = Math.min((c.raised / c.goal) * 100, 100);
//     //         return (
//     //           <div key={c._id} className="bg-white rounded-lg shadow-md p-4">
//     //             <h3 className="text-xl font-semibold">{c.title}</h3>
//     //             <p className="text-gray-600 mb-2">{c.description}</p>
//     //             <div className="w-full bg-gray-200 h-3 rounded mb-1">
//     //               <div
//     //                 className="bg-green-600 h-3"
//     //                 style={{ width: `${percentage}%` }}
//     //               />
//     //             </div>
//     //             <p className="text-sm text-gray-700">
//     //               ₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}
//     //             </p>
//     //           </div>
//     //         );
//     //       })}
//     //     </div>
//     //   )}
//     // </div>
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-green-600 mb-6 capitalize">{categoryName} Campaigns</h2>
//       {campaigns.length === 0 ? (
//         <p className="text-gray-600">No campaigns found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {campaigns.map((campaign) => (
//             <div
//               key={campaign._id}
//               className="border p-4 rounded shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold">{campaign.title}</h3>
//               <img
//                 src={campaign.image || "/default-campaign.jpeg"}
//                 alt={campaign.title}
//                 className="w-full h-40 object-cover mt-2 rounded"
//               />
//               <p className="mt-2">{campaign.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "../api/axios";


// export default function CategoryPage() {
//   const { categoryName } = useParams();
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const res = await axios.get(`/campaigns/category/${categoryName}`);
//         console.log("API response:", res.data);

//         if (Array.isArray(res.data)) {
//           setCampaigns(res.data);
//         } else {
//           console.error("API did not return an array:", res.data);
//           setCampaigns([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch campaigns:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampaigns();
//   }, [categoryName]);

//   if (loading) return <p>Loading campaigns...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-green-600 mb-6 capitalize">
//         {categoryName} Campaigns
//       </h2>
//       {campaigns.length === 0 ? (
//         <p className="text-gray-600">No campaigns found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {campaigns.map((campaign) => (
//             <div
//               key={campaign._id}
//               className="border p-4 rounded shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold">{campaign.title}</h3>
//               <img
//                 src={campaign.image || "/default-campaign.jpeg"}
//                 alt={campaign.title}
//                 className="w-full h-40 object-cover mt-2 rounded"
//               />
//               <p className="mt-2">{campaign.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`/campaigns/category/${categoryName}`);
        console.log("API response:", res.data);

        // Handle both array and object responses
        if (Array.isArray(res.data)) {
          setCampaigns(res.data);
        } else if (res.data && typeof res.data === "object") {
          setCampaigns([res.data]); // wrap single object in array
        } else {
          console.error("Unexpected API response:", res.data);
          setCampaigns([]);
        }
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading campaigns...</p>
      </div>
    );
  }

  const backendBaseURL = import.meta.env.VITE_API_URL;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6 capitalize">
        {categoryName} Campaigns
      </h2>

      


      {campaigns.length === 0 ? (
        <p className="text-gray-600 text-lg">No campaigns found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 border"
            >
              <img
                src={`${backendBaseURL}${campaign.image}` || "/default-campaign.jpeg"}
                alt={campaign.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-700 mb-3 line-clamp-3">
                  {campaign.description}
                </p>
                <Link
                  to={`/campaign/${campaign._id}`}
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
