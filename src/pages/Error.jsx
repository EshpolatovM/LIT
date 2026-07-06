import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="inline-block">
            <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-bounce">
              404
            </div>
          </div>
        </div>

        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-200 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative p-6 bg-white rounded-full shadow-2xl">
              <svg className="w-24 h-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Sahifa topilmadi!
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Afsuski, siz qidirgan sahifa topilmadi. URL manzilni tekshirib ko'ring yoki bosh sahifaga qaytib ko'ring.
          </p>
        </div>

        {/* Error details */}
        <div className="mb-12 p-6 bg-white bg-opacity-80 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Status:</span>
              <span className="text-red-500 font-bold">404 Not Found</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">URL:</span>
              <span className="text-blue-600 text-sm truncate">{window.location.pathname}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Vaqt:</span>
              <span className="text-gray-700">{new Date().toLocaleTimeString('uz-UZ')}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-200"
          >
            Dashboard-ga qaytish
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl border-2 border-blue-600 transition duration-200"
          >
            Bosh sahifaga
          </button>
        </div>

        {/* Fun illustration */}
        <div className="mt-16 mb-8 opacity-40">
          <svg className="w-40 h-40 mx-auto text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Footer message */}
        <p className="text-gray-600 text-sm">
          Agar muammo davom etsa, <span className="text-blue-600 font-semibold cursor-pointer hover:underline">support ga murojaat qiling</span>
        </p>
      </div>
    </div>
  );
}

export default Error;