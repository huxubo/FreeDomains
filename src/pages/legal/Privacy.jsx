import { LegalLayout } from "@/layouts/LegalLayout";

export function Privacy() {
    return (
        <LegalLayout title="Privacy Policy" date="January 7, 2026">
            <p className="lead">
                Welcome to <strong>Stackryze Domains</strong>, a free subdomain service operated by <strong>Stackryze</strong>, a registered MSME (Micro, Small and Medium Enterprise) in India. This Privacy Policy describes how we collect, use, store, and protect your information when you use our services.
            </p>
            <p className="font-medium">
                This policy is governed by and construed in accordance with the laws of India.
            </p>
            <p>
                We believe privacy is a fundamental right and collect only what is necessary to operate this service securely.
            </p>
            <p>
                By using Stackryze Domains, you agree to the practices described below. If you do not agree with this policy, please discontinue use of the platform.
            </p>

            <h3>1. Data Controller</h3>
            <p>
                <strong>Stackryze</strong> (registered MSME, India) is the data controller for all personal information collected through our domain services. All data processing is conducted in accordance with the Information Technology Act, 2000, and applicable Indian data protection laws.
            </p>

            <h3>2. Information We Collect</h3>
            <p><strong>Information You Provide:</strong></p>
            <ul>
                <li>Name, email address, and contact details</li>
                <li>Chosen subdomain and optional project descriptions</li>
                <li>DNS configuration data (nameservers, records)</li>
                <li>GitHub account information (if using OAuth authentication) — we only access basic account information (such as username and email) as permitted by GitHub OAuth scopes</li>
            </ul>

            <p><strong>Automatically Collected Information:</strong></p>
            <ul>
                <li>IP address, browser type, and user-agent</li>
                <li>DNS query logs and request timestamps</li>
                <li>System access logs for security and abuse prevention</li>
            </ul>

            <p><strong>Cookies and Storage:</strong></p>
            <p>
                We use minimal essential cookies for session persistence and authentication. We do NOT use advertising or tracking cookies. We do NOT engage in behavioral profiling or third-party analytics.
            </p>

            <h3>3. How We Use Information</h3>
            <p>
                We collect and use your information solely for:
            </p>
            <ul>
                <li>Processing subdomain requests and DNS management</li>
                <li>Maintaining platform security and preventing abuse</li>
                <li>Communicating about your account and service updates</li>
                <li>Complying with legal obligations and court orders</li>
                <li>Investigating violations of our policies</li>
            </ul>
            <p>
                We do not use your data for advertising, marketing, profiling, or commercial purposes. We do not sell, rent, or share your data with third parties for their commercial use.
            </p>

            <h3>4. Data Storage and Security</h3>
            <p>
                User data is hosted on enterprise-grade infrastructure including Oracle Cloud and DigitalOcean, with industry-standard encryption and access controls.
            </p>
            <p>
                Security disclaimer: While we employ reasonable security measures, no online platform can guarantee absolute protection. By using our service, you acknowledge that data breaches, unauthorized access, or loss may occur despite our best efforts, and Stackryze shall not be liable for such events.
            </p>

            <h3>5. Data Retention</h3>
            <ul>
                <li><strong>Active Subdomains:</strong> Data retained while subdomain is active</li>
                <li><strong>Technical Logs:</strong> Automatically deleted within 30 days, except where longer retention is required by law or active investigations</li>
                <li><strong>Deleted Accounts:</strong> Data permanently erased without recovery options</li>
            </ul>
            <p>
                Once deleted, data CANNOT be restored. We do not maintain backups of deleted user data.
            </p>

            <h3>6. Data Sharing and Disclosure</h3>
            <p>
                We do not sell or rent personal information. However, we may disclose data when:
            </p>
            <ul>
                <li>Required by Indian law, court orders, or government authorities</li>
                <li>Necessary to investigate abuse, fraud, or policy violations</li>
                <li>Required to protect Stackryze's legal rights and interests</li>
                <li>Shared with trusted service providers under confidentiality agreements</li>
            </ul>

            <h3>7. Abuse Handling and Enforcement</h3>
            <p>
                We reserve the right to review user data and subdomains in response to:
            </p>
            <ul>
                <li>Verified abuse reports or legal complaints</li>
                <li>Suspected illegal activity or policy violations</li>
                <li>Law enforcement requests or court orders</li>
            </ul>
            <p>
                Stackryze may suspend or terminate services and share relevant data with authorities without prior notice when required by law or to prevent harm.
            </p>

            <h3>8. User Rights</h3>
            <p>
                Subject to applicable Indian law, you may request:
            </p>
            <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your account and data</li>
            </ul>
            <p>
                Contact <a href="mailto:privacy@stackryze.com" className="text-[#FF6B35] hover:underline">privacy@stackryze.com</a> or <a href="mailto:support@stackryze.com" className="text-[#FF6B35] hover:underline">support@stackryze.com</a> to exercise these rights. Response time: 5–10 business days.
            </p>

            <h3>9. Children's Privacy</h3>
            <p>
                Our services are not directed at children under 13. We do not knowingly collect personal data from minors. If we discover such data, we will delete it immediately.
            </p>

            <h3>10. International Data Transfers</h3>
            <p>
                Our infrastructure may involve servers in India and other jurisdictions where our cloud providers operate. By using our service, you consent to data transfer, storage, and processing in these regions under Indian law.
            </p>

            <h3>11. Limitation of Liability for Data Incidents</h3>
            <p>
                To the maximum extent permitted by Indian law:
            </p>
            <ul>
                <li>Stackryze shall not be liable for data breaches, unauthorized access, or loss of data</li>
                <li>Stackryze shall not be liable for damages arising from privacy incidents</li>
                <li>Users acknowledge and accept the inherent risks of online data storage</li>
            </ul>

            <h3>12. Governing Law and Jurisdiction</h3>
            <p>
                This Privacy Policy is governed by the laws of India. Any privacy-related disputes shall be resolved exclusively in the courts of Andhra Pradesh, India.
            </p>

            <h3>13. Policy Updates</h3>
            <p>
                We may update this Privacy Policy periodically. Significant changes will be announced via our website or email. Continued use after updates constitutes acceptance of the revised policy.
            </p>

            <h3>14. Contact Information</h3>
            <ul className="list-none pl-0 space-y-2">
                <li>Privacy Inquiries: <a href="mailto:privacy@stackryze.com" className="text-[#FF6B35] hover:underline">privacy@stackryze.com</a></li>
                <li>General Support: <a href="mailto:support@stackryze.com" className="text-[#FF6B35] hover:underline">support@stackryze.com</a></li>
                <li>Security Issues: <a href="mailto:security@stackryze.com" className="text-[#FF6B35] hover:underline">security@stackryze.com</a></li>
                <li>Abuse Reports: <a href="mailto:reportabuse@stackryze.com" className="text-[#FF6B35] hover:underline">reportabuse@stackryze.com</a></li>
            </ul>

            <h3>15. Acknowledgment</h3>
            <p>
                By using Stackryze Domains, you acknowledge that:
            </p>
            <ul>
                <li>You have read and understood this Privacy Policy</li>
                <li>Data collection is minimal and used solely for service operation</li>
                <li>No absolute security guarantee exists for online platforms</li>
                <li>Stackryze is not liable for data incidents or privacy breaches</li>
                <li>Indian law governs all data processing and privacy matters</li>
            </ul>
        </LegalLayout>
    );
}
