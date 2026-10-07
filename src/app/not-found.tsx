import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-bold text-gray-900 tracking-tight">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">页面未找到</p>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          抱歉，您要查找的页面不存在或已被移除。请检查URL或返回主页。
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            返回主页
          </Link>
        </div>
      </div>
    </div>
  );
}
