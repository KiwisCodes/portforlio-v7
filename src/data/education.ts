export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  highlightLabel: string;
  highlightValue: string;
  isHighlightPositive?: boolean;
  achievements: Array<{
    icon: string;
    text: string;
    isFeatured?: boolean;
  }>;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 1,
    institution: 'Vietnamese-German Univ.',
    degree: 'B.S. Computer Science',
    period: '2023 — 2027 (Expected)',
    highlightLabel: 'GPA',
    highlightValue: '3.68 / 4.00 ⬆',
    isHighlightPositive: true,
    achievements: [
      { icon: '🏅', text: 'DAAD Study & Stay 2024', isFeatured: true },
      { icon: '🏅', text: 'DAAD Additional Scholarship' },
      { icon: '🏅', text: 'VGU 100% Merit Scholarship' }
    ]
  },
  {
    id: 2,
    institution: 'Frankfurt Univ. of Applied Sciences',
    degree: 'DAAD Scholar',
    period: 'Oct 2025 — March 2026',
    highlightLabel: 'Location',
    highlightValue: 'Frankfurt, Germany',
    achievements: [
      { icon: '🌍', text: 'Study as a DAAD Scholar' }
    ]
  },
  {
    id: 3,
    institution: 'Tran Dai Nghia High School',
    degree: 'Math Specialized',
    period: '2020 — 2023',
    highlightLabel: 'Focus',
    highlightValue: 'Mathematics',
    achievements: [
      { icon: '🥉', text: 'Third Prize - City Math Competition' }
    ]
  }
];
