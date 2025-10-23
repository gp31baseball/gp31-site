export default function About() 
{
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1A3F] to-[#07132F] text-white flex flex-col items-center justify-center p-8">
      <img
        src="/gp31-logo.png"
        alt="GP31 Logo"
        className="w-40 mb-6 drop-shadow-lg"
      />
      <h1 className="text-5xl font-bold text-[#D4AF37] mb-4 drop-shadow-md">
        About GP31 Baseball
      </h1>

      <p className="max-w-2xl text-center text-lg text-gray-200 leading-relaxed mb-8">
        <strong>GP31 Baseball</strong> was founded on the principles of faith,
        discipline, and teamwork. Guided by Romans 8:31 — “If God is for us, who
        can be against us,” our mission is to develop young athletes into
        leaders — both on and off the field.  
      </p>

      <p className="max-w-2xl text-center text-lg text-gray-200 leading-relaxed mb-8">
        Our coaching staff brings years of professional baseball experience,
        with a shared focus on character, preparation, and competitive growth.
        Through hard work and dedication, we aim to build not just great players
        — but great young men.
      </p>

      <a
        href="/"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-3 px-6 rounded-2xl shadow-md transition-transform transform hover:scale-105"
      >
        ← Back to Home
      </a>
    </div>
  );
}
