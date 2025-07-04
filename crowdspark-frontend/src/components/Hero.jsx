import heroImage from '../assets/Hero.png';

export default function Hero() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-32 relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-yellow-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold">Igniting Ideas, Fueling Innovation</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Launch your project or support a cause you believe in. Join a global community transforming ideas into reality.
        </p>
        <div className="mt-6">
          <a
            href="/create"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-lg"
          >
            Start a Campaign
          </a>
        </div>
      </div>
    </section>
  );
}
