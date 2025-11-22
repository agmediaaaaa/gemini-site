export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  stats?: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  author?: string;
  company?: string;
  quote?: string;
  tag?: string;
  metricHighlight?: string;
  metricHighlightLabel?: string;
  wistiaId?: string;
  aspectRatio?: number;
}

export interface HiringSignal {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
  detail: string;
}

export interface ComparisonMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}