import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllMemorials, getMemorialById } from '@/lib/memorials';
import { getTagLabel } from '@/lib/types';

// 静态导出下只服务 generateStaticParams 列出的路径。
// 注意：显式写成 true 会直接导致构建失败，保持 false。
export const dynamicParams = false;

export function generateStaticParams() {
    return getAllMemorials().map((memorial) => ({ id: String(memorial.id) }));
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params;
    const memorial = getMemorialById(Number(id));

    return {
        title: memorial ? `${memorial.name} · iOS Club 凌烟阁` : '未找到 · iOS Club 凌烟阁',
    };
}

export default async function MemorialDetailPage({params}: { params: Promise<{ id: string }> }) {
    // Next.js 16：params 是 Promise，必须 await
    const {id} = await params;
    const memorial = getMemorialById(Number(id));

    if (!memorial) {
        // 返回 never，同时完成类型收窄。
        // 静态导出下这条分支不可达 —— 参数由 generateStaticParams 枚举。
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                        返回名录
                    </Link>

                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center mb-4">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <span
                                    className="text-sm font-medium text-gray-500 uppercase tracking-wider">{memorial.title}</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{memorial.name}</h1>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">简介</h2>
                                <p className="text-gray-600 leading-relaxed">{memorial.description}</p>
                            </div>

                            {memorial.deed && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">具体事迹</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{memorial.deed}</p>
                                </div>
                            )}

                            {memorial.tags.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">标签</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {memorial.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                {getTagLabel(tag)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">编号：{memorial.id}</span>
                                    {memorial.createdAt && (
                                        <span className="text-sm text-gray-500">
                                            创建时间: {new Date(memorial.createdAt).toLocaleDateString('zh-CN')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
