import logo from "../assets/logo.svg";

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo and name container */}
        <div className="flex items-center gap-6 mb-12">
          {/* Logo with animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative p-4 bg-white rounded-2xl shadow-2xl animate-bounce">
              <img 
                src={logo} 
                alt="LIT Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Name */}
          <p className="text-5xl font-bold text-white">
            LIT Academy
          </p>
        </div>

        {/* Loading spinner */}
        <div className="mb-12">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-lg font-semibold tracking-widest">
          Yuklanyapti
          <span className="inline-block ml-2 animate-pulse">...</span>
        </p>

        {/* Subtext */}
        <p className="text-gray-500 text-sm mt-4">
          Iltimos, kuting...
        </p>
      </div>
    </div>
  );
}

export default Loading;