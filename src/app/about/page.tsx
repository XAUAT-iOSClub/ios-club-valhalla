const AboutPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        关于凌烟阁
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        致敬那些为 iOS Club 发展做出卓越贡献的伟大人物
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            凌烟阁的由来
                        </h2>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-6">
                                    <div
                                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">1</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        创立初心
                                    </h3>
                                    <p className="text-gray-600">
                                        凌烟阁项目旨在纪念那些为俱乐部发展做出杰出贡献的人物。通过数字化的方式，
                                        永久保存他们的功绩，激励后来者继续前行。
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-6">
                                    <div
                                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">2</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        发展历程
                                    </h3>
                                    <p className="text-gray-600">
                                        从最初的简单名单到现在的交互式平台，凌烟阁经历了多次迭代升级。
                                        我们不断完善功能，优化用户体验，让更多人能够方便地了解这些杰出人物的事迹。
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 mr-6">
                                    <div
                                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">3</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        未来展望
                                    </h3>
                                    <p className="text-gray-600">
                                        我们将持续完善凌烟阁的功能，增加更多互动元素，并拓展到其他领域，
                                        让更多杰出人物得到应有的认可和纪念。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            我们的价值观
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">铭记贡献</h3>
                                <p className="text-gray-600">
                                    我们相信每一位为集体做出贡献的人都应该被铭记，无论贡献大小。
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">传承精神</h3>
                                <p className="text-gray-600">
                                    我们不仅记录事迹，更传承精神，让后人从中汲取前进的力量。
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">社区共建</h3>
                                <p className="text-gray-600">
                                    我们鼓励社区参与，共同维护这份珍贵的记忆，让英灵殿更加完善。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            我们的使命
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            通过数字化方式永久保存杰出人物的贡献，激励更多人投身于集体事业，
                            形成良性循环，推动整个社区不断发展进步。
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;