/**
 * Resources page content.
 * Add documents as { label, href, year? } — href points to a file in /public
 * (e.g. '/documents/audit-report-2025.pdf') or an external URL.
 */

export const RESOURCE_SECTIONS = [
  {
    key: 'legal',
    title: 'Legal Documents',
    icon: 'fas fa-file-contract',
    description:
      'Registration certificates and statutory documents of Sevamrita Foundation.',
    documents: [],
  },
  {
    key: 'financial',
    title: 'Yearly Audit Financial Reports',
    icon: 'fas fa-file-invoice-dollar',
    description:
      'Audited financial statements published at the end of every financial year.',
    documents: [],
  },
  {
    key: 'activities',
    title: 'Yearly Activities Reports',
    icon: 'fas fa-file-alt',
    description:
      'Annual reports covering our events, programs and their impact.',
    documents: [],
  },
];

export const EMPTY_SECTION_MESSAGE = 'Documents will be available here soon.';
