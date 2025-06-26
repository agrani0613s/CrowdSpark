const features = [
  { title: "Campaign Wizard", description: "Easily launch projects with goals, media, and deadlines." },
  { title: "Real-Time Tracking", description: "Track donations live with visual progress updates." },
  { title: "Secure Payments", description: "Backers pay safely via Stripe or Razorpay." },
  { title: "Live Notifications", description: "Stay informed with real-time campaign activity." },
];

export default function Features() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Platform Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-green-600">{f.title}</h4>
              <p className="mt-2 text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
