import Link from 'next/link';
import Hero from './components/Hero';
import MemorialCard from './components/MemorialCard';
import IncenseCounter from './components/IncenseCounter';
import { getAllMemorials } from '@/lib/memorials';

export default function Home() {
    const memorials = getAllMemorials();

    return (
        <>
            <Hero/>

            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">社团英雄名录</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        他们用自己的智慧和汗水，为俱乐部的发展做出了不可磨灭的贡献
                    </p>
                </div>

                {memorials.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">暂无英灵数据</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memorials.map((memorial) => (
                            <Link href={`/memorials/${memorial.id}`} key={memorial.id} className="block">
                                <MemorialCard
                                    title={memorial.title}
                                    name={memorial.name}
                                    description={memorial.description}
                                    tags={memorial.tags}
                                />
                            </Link>
                        ))}
                    </div>
                )}

                <IncenseCounter/>
            </div>
        </>
    );
}
