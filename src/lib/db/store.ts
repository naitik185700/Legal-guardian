import fs from 'fs';
import path from 'path';
import { EnquiryRecord, ConsultationRecord, ArticleItem, FAQItem, AdminUserSession } from '@/types';
import { FIRM_CONFIG } from '@/lib/config/firm';

const DATA_DIR = path.join(process.cwd(), '.data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filename: string, defaultValue: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

function writeJSON<T>(filename: string, data: T) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    if (fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch {}
    }
  }
}

// Initial Admin User (Hash for "GuardianLegal@2026")
const INITIAL_ADMIN_USERS = [
  {
    id: 'admin-001',
    email: 'admin@guardianlegalsolutions.com',
    passwordHash: '$2b$10$kMP4Q9GRJ0KNKcEajB9e/uHUX3P9lr.KZUA2JGIOCv8EoQ1/gm5LK',
    name: 'Senior Managing Partner',
    role: 'SUPER_ADMIN' as const,
    isActive: true,
  },
  {
    id: 'admin-002',
    email: 'intake@guardianlegalsolutions.com',
    passwordHash: '$2b$10$kMP4Q9GRJ0KNKcEajB9e/uHUX3P9lr.KZUA2JGIOCv8EoQ1/gm5LK',
    name: 'Intake & Registrar Office',
    role: 'INTAKE_OFFICER' as const,
    isActive: true,
  },
];

const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-001',
    slug: 'commercial-contracts-indemnity-clauses-risk-mitigation',
    title: 'Indemnity vs. Liquidated Damages: Structuring Enforceable Commercial Remedy Clauses',
    excerpt:
      'A comparative analysis of indemnification provisions and liquidated damages under the Indian Contract Act, 1872, with drafting protocols to avoid judicial strikes.',
    content: `Commercial contracts often rely heavily on indemnification and liquidated damages clauses to protect parties from prospective breaches. However, poorly drafted clauses frequently encounter enforceability challenges during judicial scrutiny.

### Understanding Section 74 of the Indian Contract Act, 1872
Under Indian jurisprudence, courts distinguish sharply between a genuine pre-estimate of damages and penal stipulations. Section 74 stipulates that where a sum is named in the contract as the amount to be paid in case of breach, the party complaining of the breach is entitled only to receive reasonable compensation not exceeding the amount so named.

### Key Considerations for Commercial Counsel:
1. **Evidentiary Foundations:** Establish in the recitals why direct assessment of damages would be commercially arduous, justifying the pre-estimated quantum.
2. **Carve-Outs for Consequential Losses:** Explicitly delineate whether indirect, special, or consequential damages are capped or excluded.
3. **Limitation of Liability Interplay:** Ensure indemnity obligations are harmonized with the overall liability cap of the agreement.

Rigorous drafting at the transaction stage eliminates years of protracted commercial litigation.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    readingTime: '6 min read',
    category: 'Commercial Law',
    authorName: 'Adv. Rajesh V. Sharma',
    authorDesignation: 'Senior Managing Counsel',
    publishedAt: '2026-09-15',
    isPublished: true,
  },
  {
    id: 'art-002',
    slug: 'arbitration-invocation-timelines-section-11-delhi-high-court',
    title: 'Statutory Timelines in Invoking Arbitration: Mitigating Limitation Pitfalls',
    excerpt:
      'Examining Section 21 statutory notice requirements and the critical three-year limitation period for Section 11 petitions before High Courts.',
    content: `The commencement of arbitral proceedings is legally anchored in Section 21 of the Arbitration and Conciliation Act, 1996. The date on which a request for that dispute to be referred to arbitration is received by the respondent marks the crucial statutory milestone for limitation purposes.

### The Section 21 Notice Requirement
Arbitration cannot be unilaterally instituted in court without first issuing a formal notice invoking the arbitration clause. The notice must:
- Clearly set forth the specific disputes that have arisen.
- Reference the exact dispute resolution clause in the underlying agreement.
- Nominate or call upon the counterparty to concur on the appointment of an independent arbitrator.

### Application of Article 137 of the Limitation Act
Where the counterparty fails to concur within thirty days, a petition under Section 11(6) must be filed before the competent High Court. The Supreme Court has affirmed that Article 137 of the Limitation Act applies, granting a three-year period from the expiry of the thirty-day statutory window.

Parties must avoid prolonged informal email exchanges that jeopardize their limitation window.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    readingTime: '5 min read',
    category: 'Arbitration & ADR',
    authorName: 'Adv. Ananya Sengupta',
    authorDesignation: 'Partner — Litigation',
    publishedAt: '2026-10-02',
    isPublished: true,
  },
  {
    id: 'art-003',
    slug: 'rera-delayed-possession-remedies-homebuyers-commercial-allottees',
    title: 'Remedies for Delayed Real Estate Possession: RERA Provisions and Consumer Fora Jurisprudence',
    excerpt:
      'A practical guide to asserting buyer rights under Section 18 of RERA against protracted real estate delivery defaults and unilateral builder agreements.',
    content: `Real estate investments represent critical capital commitments for both individual allottees and commercial purchasers. When builders default on sanctioned delivery schedules, buyers have definitive statutory recourse under the Real Estate (Regulation and Development) Act, 2016 (RERA).

### Section 18 Statutory Rights
Under Section 18 of RERA, if the promoter fails to complete or is unable to give possession of an apartment, plot, or building in accordance with the terms of the agreement for sale:
- **Refund with Prescribed Interest:** The allottee has the unqualified right to exit the project and demand full refund of all amounts paid, along with interest at the prescribed rate (SBI MCLR + 2%).
- **Monthly Delay Compensation:** If the allottee chooses to remain invested in the project, the promoter is statutorily mandated to pay monthly interest for every month of continued delay until the handover of possession.

### Concurrent Remedies
The Supreme Court has clarified that remedies under RERA, the Consumer Protection Act, 2019, and the Insolvency and Bankruptcy Code (IBC) are concurrent, providing aggrieved purchasers strategic flexibility depending on project insolvency risk.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    readingTime: '7 min read',
    category: 'Real Estate & Property',
    authorName: 'Adv. Vikramjit Singh',
    authorDesignation: 'Counsel — Banking & Real Estate',
    publishedAt: '2026-10-18',
    isPublished: true,
  },
];

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-001',
    category: 'General Practice',
    question: 'How do I initiate a formal legal enquiry with Guardian Legal Solutions?',
    answer:
      'You can submit your enquiry through our secure online contact form or consultation portal. Our intake office will review your request, conduct preliminary conflict-of-interest checks, and schedule a confidential discussion with the appropriate practice counsel.',
    order: 1,
  },
  {
    id: 'faq-002',
    category: 'General Practice',
    question: 'Does submitting a website enquiry establish an advocate-client relationship?',
    answer:
      'No. Submitting an enquiry or booking request does not constitute or establish an advocate-client relationship. A formal relationship is created only after conflict checks are cleared and a bilateral Vakalatnama or professional engagement agreement is signed.',
    order: 2,
  },
  {
    id: 'faq-003',
    category: 'Consultations',
    question: 'What formats are available for legal consultations?',
    answer:
      'We offer scheduled in-person consultations at our central chambers as well as secure encrypted video conferences and telephonic discussions for domestic and international clients.',
    order: 3,
  },
  {
    id: 'faq-004',
    category: 'Consultations',
    question: 'What documentation should I prepare before our initial conference?',
    answer:
      'We recommend assembling the primary agreement or notice in question, relevant chronological correspondence (letters, emails), proof of notices served, and a brief chronological summary of facts. Our team provides an itemized checklist upon intake confirmation.',
    order: 4,
  },
  {
    id: 'faq-005',
    category: 'Litigation & Disputes',
    question: 'Which courts and tribunals does the firm regularly appear before?',
    answer:
      'Our advocates appear before the Supreme Court of India, High Courts (with dedicated daily practice before the High Court of Delhi), Commercial Courts, District & Sessions Courts, National Company Law Tribunal (NCLT), Debt Recovery Tribunals (DRT), Consumer Commissions (NCDRC/SCDRC), and Arbitral Tribunals.',
    order: 5,
  },
  {
    id: 'faq-006',
    category: 'Corporate & Contracts',
    question: 'What is the typical turnaround time for reviewing commercial contracts?',
    answer:
      'Standard commercial agreements (NDAs, vendor contracts, MSAs) are typically reviewed and redlined with an actionable risk assessment matrix within 2 to 4 business days, depending on transaction volume and complexity.',
    order: 6,
  },
];

export const dbStore = {
  // Enquiries
  getEnquiries: (): EnquiryRecord[] => readJSON<EnquiryRecord[]>('enquiries.json', []),
  saveEnquiry: (record: EnquiryRecord) => {
    const list = dbStore.getEnquiries();
    list.unshift(record);
    writeJSON('enquiries.json', list);
    return record;
  },
  updateEnquiry: (id: string, updates: Partial<EnquiryRecord>): EnquiryRecord | null => {
    const list = dbStore.getEnquiries();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
    writeJSON('enquiries.json', list);
    return list[index];
  },

  // Consultations
  getConsultations: (): ConsultationRecord[] => readJSON<ConsultationRecord[]>('consultations.json', []),
  saveConsultation: (record: ConsultationRecord) => {
    const list = dbStore.getConsultations();
    list.unshift(record);
    writeJSON('consultations.json', list);
    return record;
  },
  updateConsultation: (id: string, updates: Partial<ConsultationRecord>): ConsultationRecord | null => {
    const list = dbStore.getConsultations();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
    writeJSON('consultations.json', list);
    return list[index];
  },

  // Articles
  getArticles: (): ArticleItem[] => readJSON<ArticleItem[]>('articles.json', INITIAL_ARTICLES),
  saveArticle: (article: ArticleItem) => {
    const list = dbStore.getArticles();
    const index = list.findIndex((a) => a.id === article.id);
    if (index >= 0) {
      list[index] = article;
    } else {
      list.unshift(article);
    }
    writeJSON('articles.json', list);
    return article;
  },

  // FAQs
  getFAQs: (): FAQItem[] => readJSON<FAQItem[]>('faqs.json', INITIAL_FAQS),

  // Admin Users
  getAdminUsers: () => readJSON('admin_users.json', INITIAL_ADMIN_USERS),

  // Audit Logs
  getAuditLogs: (): Array<{ id: string; action: string; entity: string; details: string; timestamp: string }> =>
    readJSON('audit_logs.json', []),
  logAction: (action: string, entity: string, details: string) => {
    const logs = dbStore.getAuditLogs();
    logs.unshift({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      action,
      entity,
      details,
      timestamp: new Date().toISOString(),
    });
    writeJSON('audit_logs.json', logs.slice(0, 500)); // Keep last 500
  },
};
