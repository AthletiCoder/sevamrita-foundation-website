/**
 * Resources page content — edit this list to add/rename sections or files.
 *
 * Section shape:
 *   { key, title, icon, description?, documents: Document[] }
 *
 * Document shape:
 *   { label, href?, icon?, year? }
 *   - href: path under /public (e.g. '/documents/tax_complicance/PAN.pdf').
 *     Omit or set null until the file is ready — the label still shows as “coming soon”.
 *   - icon: optional Font Awesome class; defaults to 'fas fa-file-pdf'.
 */

export const RESOURCE_SECTIONS = [
  {
    key: 'annual-reports',
    title: 'Annual Reports',
    icon: 'fas fa-book-open',
    description: 'Yearly overview of our programs, impact, and organizational progress.',
    documents: [
      {
        label: 'Annual Report 2025',
        href: '/documents/yearly_reports/Annual_Report_2025.pdf',
        icon: 'fas fa-file-alt',
        year: '2025',
      },
    ],
  },
  {
    key: 'tax-compliance',
    title: 'Tax & Compliance Documents',
    icon: 'fas fa-stamp',
    description: 'Statutory tax registrations and compliance certificates.',
    documents: [
      {
        label: '12A Registration Certificate',
        href: '/documents/tax_complicance/12A_signed.pdf',
        icon: 'fas fa-file-contract',
      },
      {
        label: '80G Certificate',
        href: '/documents/tax_complicance/80G_certificate.pdf',
        icon: 'fas fa-certificate',
      },
      {
        label: 'PAN Document',
        href: '/documents/tax_complicance/PAN.pdf',
        icon: 'fas fa-id-card',
      },
    ],
  },
  {
    key: 'organization-governance',
    title: 'Organization & Governance',
    icon: 'fas fa-landmark',
    description: 'Foundational governance documents of Sevamrita Foundation.',
    documents: [
      {
        label: 'Articles of Association (AoA)',
        href: '/documents/org_governance/AoA.pdf',
        icon: 'fas fa-gavel',
      },
    ],
  },
  {
    key: 'registrations-certifications',
    title: 'Registrations & Certifications',
    icon: 'fas fa-award',
    description: 'Official registrations and statutory certifications.',
    documents: [
      {
        label: 'Certificate of Incorporation',
        href: '/documents/registrations/Certificate_of_Incorporation.pdf',
        icon: 'fas fa-file-signature',
      },
      {
        label: 'MSME Registration Certificate',
        href: '/documents/registrations/msme_sevamrita.pdf',
        icon: 'fas fa-industry',
      },
      {
        label: 'ESIC Certificate',
        href: '/documents/registrations/ESIC.pdf',
        icon: 'fas fa-briefcase-medical',
      },
    ],
  },
];

export const EMPTY_SECTION_MESSAGE = 'Documents will be available here soon.';
export const DOC_PENDING_LABEL = 'Coming soon';
export const DEFAULT_DOC_ICON = 'fas fa-file-pdf';
