'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type LegalType = 'privacy' | 'terms';

interface LegalOverlayProps {
  type: LegalType | null;
  isOpen: boolean;
  onClose: () => void;
}

const PRIVACY_CONTENT = `PRIVACY POLICY
Last Updated: October 2025

1. Introduction
Hollow Princess ("we," "our," or "us") is committed to protecting the privacy and security of our customers. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or purchase from our capsule collections.

2. Information We Collect
We collect information that serves to improve your shopping experience and fulfill legal obligations. This includes:

Personal Data: Name, billing address, shipping address, email address, and phone number provided during checkout.

Payment Information: Encrypted transaction details processed by our secure payment providers. We do not store full credit card numbers on our servers.

Technical Data: IP address, browser type, time zone setting, and device information used to access our platform.

3. How We Use Your Information
Your data is used strictly for the following purposes:

Order Fulfillment: Processing payments, shipping capsule items, and managing returns.

Client Services: Responding to inquiries and providing updates regarding the status of your order.

Marketing: With your explicit consent, we may send newsletters regarding upcoming capsule drops or exclusive events.

4. Cookies and Tracking
Our website uses cookies to distinguish you from other users. This helps us provide you with a seamless experience when browsing our collections and allows us to improve our site functionalities. You may adjust your browser settings to refuse cookies, though some aspects of the site may function incorrectly.

5. Third-Party Disclosure
We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.`;

const TERMS_CONTENT = `TERMS AND CONDITIONS
Version: 1.0

1. General Provisions
By accessing or using the Hollow Princess website, you agree to be bound by these Terms and Conditions. These Terms apply to all visitors, users, and others who access the Service. If you disagree with any part of the terms, you may not access the Service.

2. Products and Availability
Hollow Princess operates on a limited-run capsule model.

Availability: All products are subject to availability. We reserve the right to limit the quantity of products we supply, supply only part of an order, or divide up orders.

Accuracy: We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.

3. Intellectual Property
The content of our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Hollow Princess and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of Hollow Princess.

4. Limitation of Liability
In no event shall Hollow Princess, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.

5. Governing Law
These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Hollow Princess is registered, without regard to its conflict of law provisions.

6. Changes to Terms
We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.

7. Contact Information
For any questions regarding these Terms or the Privacy Policy, please contact us at:

Hollow Princess Client Services

Email: legal@hollowprincess.design

Phone: +1 (555) 019-2834`;

export default function LegalOverlay({
  type,
  isOpen,
  onClose,
}: LegalOverlayProps) {
  const content = type === 'privacy' ? PRIVACY_CONTENT : TERMS_CONTENT;

  // Lock body scroll when overlay is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          {/* Backdrop with blur and transparency */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple style ease
            className="scrollbar-hide relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-transparent font-sans text-white"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 z-50 p-2 text-white/50 transition-colors hover:text-white"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-8 pb-20 text-gray-200">
              {content.split('\n').map((line, i) => {
                // Handling rudimentary formatting
                if (line.trim() === '') return <br key={i} />;
                if (line.match(/^TERMS AND CONDITIONS/))
                  return (
                    <h1
                      key={i}
                      className="mb-8 text-center text-3xl font-light tracking-widest"
                    >
                      {line}
                    </h1>
                  );
                if (line.match(/^PRIVACY POLICY/))
                  return (
                    <h1
                      key={i}
                      className="mb-8 text-center text-3xl font-light tracking-widest"
                    >
                      {line}
                    </h1>
                  );
                if (line.match(/^\d+\. /))
                  return (
                    <h3
                      key={i}
                      className="mt-8 mb-4 text-xl font-medium text-white"
                    >
                      {line}
                    </h3>
                  );
                if (
                  line.startsWith('Last Updated:') ||
                  line.startsWith('Version:')
                )
                  return (
                    <p
                      key={i}
                      className="mb-8 text-center text-sm text-gray-400"
                    >
                      {line}
                    </p>
                  );
                if (line.includes(':')) {
                  // Possible label logic
                  const [label, ...rest] = line.split(':');
                  if (
                    rest.length > 0 &&
                    !line.includes('http') &&
                    line.length < 100
                  ) {
                    // simple heuristic
                    return (
                      <p key={i}>
                        <strong className="text-white">{label}:</strong>
                        {rest.join(':')}
                      </p>
                    );
                  }
                }
                return (
                  <p key={i} className="leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
