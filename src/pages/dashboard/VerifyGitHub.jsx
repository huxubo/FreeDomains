import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Star, FileText, AlertTriangle, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../hooks/use-toast';
import { subdomainAPI as api } from '../../lib/api';

export default function VerifyGitHub() {
    const { user } = useAuth();
    const { toast } = useToast();

    const [requestedDomain, setRequestedDomain] = useState('');
    const [purpose, setPurpose] = useState('');
    const [step, setStep] = useState(1); // 1: Form, 2: Instructions with code
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationData, setVerificationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const REPO_URL = 'https://github.com/stackryze/FreeDomains';

    useEffect(() => {
        // Auto-fill domain from URL param (when user clicks "claim" from Register page)
        const params = new URLSearchParams(window.location.search);
        const domainParam = params.get('domain');
        if (domainParam) {
            setRequestedDomain(domainParam.toLowerCase());
        }

        fetchVerificationStatus();
    }, []);

    const fetchVerificationStatus = async () => {
        try {
            const response = await api.get('/github/verify/status');
            if (response.status !== 'none') {
                setVerificationData(response);
                setStep(2); // Go to instructions if already has code
            }
        } catch (error) {
            console.error('Failed to fetch verification status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateCode = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await api.post('/github/verify', {
                requestedDomain,
                purpose
            });

            setVerificationData(response.verification);
            setStep(2); // Move to instructions

            toast({
                title: 'Verification Code Generated! ✅',
                description: 'Follow the instructions below to complete your verification.',
                className: 'bg-[#e6f4ea] border-green-200 text-green-900'
            });
        } catch (error) {
            toast({
                title: 'Failed to Generate Code',
                description: error.message || 'Please try again',
                className: 'bg-red-50 border-red-200 text-red-900'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyTemplate = () => {
        const template = `**Verification Code:** ${verificationData.verificationCode}
**Requested Domain:** ${verificationData.requestedDomain}.sryze.cc
**Purpose:** ${verificationData.purpose}

---

✅ I have starred this repository
✅ I agree to the Terms of Service`;

        navigator.clipboard.writeText(template);
        setCopied(true);
        toast({
            title: 'Copied! 📋',
            description: 'Template copied to clipboard. Paste it in your GitHub issue.',
            className: 'bg-blue-50 border-blue-200 text-blue-900'
        });

        setTimeout(() => setCopied(false), 3000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E63946]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-3">
                    Get Verified for sryze.cc
                </h1>
                <p className="text-lg text-[#4A4A4A]">
                    Each verified user gets 1 premium sryze.cc domain
                </p>
            </div>

            {/* Status Display */}
            {verificationData && (
                <div className={`p-6 rounded-xl border-2 ${verificationData.status === 'approved' ? 'bg-green-50 border-green-200' :
                    verificationData.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                    }`}>
                    <div className="flex items-start gap-3">
                        {verificationData.status === 'approved' && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />}
                        {verificationData.status === 'pending' && <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />}
                        {verificationData.status === 'rejected' && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />}

                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">
                                {verificationData.status === 'approved' && '✅ Verified!'}
                                {verificationData.status === 'pending' && '⏳ Pending Admin Review'}
                                {verificationData.status === 'rejected' && '❌ Request Rejected'}
                            </h3>
                            <p className="text-sm mb-2">
                                {verificationData.status === 'approved' && `You can now register your sryze.cc domain!`}
                                {verificationData.status === 'pending' && 'Your verification is under review. Complete the steps below if you haven\'t already.'}
                                {verificationData.status === 'rejected' && verificationData.rejectionReason}
                            </p>
                            <div className="text-xs text-gray-700 space-y-1 bg-white p-3 rounded border">
                                <p><strong>Code:</strong> <span className="font-mono font-bold text-[#E63946]">{verificationData.verificationCode}</span></p>
                                <p><strong>Domain:</strong> {verificationData.requestedDomain}.sryze.cc</p>
                                {verificationData.adminNotes && <p><strong>Admin Notes:</strong> {verificationData.adminNotes}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 1: Request Form */}
            {step === 1 && !verificationData && (
                <div className="bg-white rounded-xl shadow-sm border-2 border-[#E5E3DF] p-8">
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Request Verification</h2>

                    <form onSubmit={handleGenerateCode} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                                Desired Domain Name *
                            </label>
                            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                                <input
                                    type="text"
                                    value={requestedDomain}
                                    onChange={(e) => setRequestedDomain(e.target.value.toLowerCase())}
                                    placeholder={user?.username || "myproject"}
                                    className="flex-1 min-w-0 px-4 py-2.5 border-2 border-[#E5E3DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all"
                                    pattern="[a-z0-9\-]+"
                                    minLength="3"
                                    required
                                />
                                <span className="text-gray-500 font-mono font-bold whitespace-nowrap">.sryze.cc</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">3-63 characters, lowercase letters, numbers, and hyphens only</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                                Purpose / Project Description *
                            </label>
                            <textarea
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="Describe what you'll use this domain for (minimum 10 characters)&#10;Example: Personal portfolio website for showcasing my open-source projects"
                                className="w-full px-4 py-2.5 border-2 border-[#E5E3DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all"
                                rows="4"
                                minLength="10"
                                maxLength="500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">{purpose.length}/500 characters (minimum 10)</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || purpose.length < 10}
                            className="w-full bg-[#E63946] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#d32f3a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Generating Code...' : 'Generate Verification Code'}
                        </button>
                    </form>
                </div>
            )}

            {/* Step 2: Instructions */}
            {step === 2 && verificationData && verificationData.status !== 'approved' && (
                <>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Complete These Steps
                        </h2>
                        <div className="space-y-4 text-blue-900">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Star our GitHub repository</p>
                                    <a
                                        href={REPO_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        ⭐ {REPO_URL} <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Open a new issue on GitHub</p>
                                    <a
                                        href={`${REPO_URL}/issues/new`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                    >
                                        📝 Create Issue <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Copy and paste the template below into the issue</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Template to Copy */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-[#E5E3DF] p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-[#1A1A1A]">Issue Template (Copy This)</h3>
                            <button
                                onClick={copyTemplate}
                                className="flex items-center gap-2 bg-[#E63946] text-white px-4 py-2 rounded-lg hover:bg-[#d32f3a] transition-all font-medium"
                            >
                                {copied ? (
                                    <>
                                        <CheckCheck className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Template
                                    </>
                                )}
                            </button>
                        </div>

                        <pre className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap">
                            {`**Verification Code:** ${verificationData.verificationCode}
**Requested Domain:** ${verificationData.requestedDomain}.sryze.cc
**Purpose:** ${verificationData.purpose}

---

✅ I have starred this repository
✅ I agree to the Terms of Service`}
                        </pre>

                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-900">
                                <strong>⚠️ Important:</strong> Your verification code is <span className="font-mono font-bold text-[#E63946]">{verificationData.verificationCode}</span>.
                                The admin will use this code to approve your request.
                            </p>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Once you've completed these steps, our team will review your request within 24-48 hours.
                    </div>
                </>
            )}

            {/* Approved - Go Register */}
            {verificationData && verificationData.status === 'approved' && (
                <div className="text-center">
                    <a
                        href="/dashboard/register"
                        className="inline-block bg-[#E63946] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#d32f3a] transition-all"
                    >
                        Register My Domain →
                    </a>
                </div>
            )}
        </div>
    );
}
