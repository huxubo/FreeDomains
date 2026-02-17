import { useState, useLayoutEffect, useRef } from "react";
import { X, Info, Globe, ArrowRight } from "lucide-react";

export function IncidentAnnouncement() {
    const [showModal, setShowModal] = useState(false);
    const bannerRef = useRef(null);

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (bannerRef.current) {
                const height = bannerRef.current.offsetHeight;
                document.documentElement.style.setProperty('--incident-height', `${height}px`);
                console.log('Incident banner height:', height);
            }
        };

        // Initial update
        updateHeight();

        // Update on resize
        window.addEventListener('resize', updateHeight);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateHeight);
            document.documentElement.style.removeProperty('--incident-height');
        };
    }, []);

    return (
        <>
            {/* Announcement Banner */}
            <div ref={bannerRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-indigo-200 w-full fixed top-0 left-0 right-0 z-[100]">
                <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-indigo-900">
                                <span className="font-bold">New Domain Extension:</span> We've added <span className="font-bold">sryze.cc</span>! You can now register subdomains under this extension.
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="ml-2 text-indigo-700 hover:text-indigo-900 underline font-bold"
                                >
                                    Learn more
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-[#E5E3DF]">
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b-2 border-indigo-200 flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Globe className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#1A1A1A]">New Domain Available!</h2>
                                    <p className="text-sm text-indigo-800 mt-1">Expanding your options with sryze.cc</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-indigo-100 rounded-lg transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-[#4A4A4A]" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 text-[#1A1A1A]">
                            <p className="text-base leading-relaxed">
                                We are excited to announce the addition of a new domain extension to our platform!
                            </p>

                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <Globe className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-indigo-900 mb-1">sryze.cc is now live!</h3>
                                        <p className="text-sm text-indigo-800">
                                            You can immediately start registering subdomains under this new extension. It's short, memorable, and ready for your projects.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-bold text-gray-900">What this means for you:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>More choices for your custom subdomains.</li>
                                    <li>Fresh availability for popular names.</li>
                                    <li>Same easy setup and management as our existing domains.</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Visit your dashboard to claim your new <strong>sryze.cc</strong> subdomain today!
                                </p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="sticky bottom-0 bg-white border-t-2 border-[#E5E3DF] p-4 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 bg-white border-2 border-[#E5E3DF] text-[#1A1A1A] py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <a
                                href="/dashboard"
                                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                                Go to Dashboard <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
