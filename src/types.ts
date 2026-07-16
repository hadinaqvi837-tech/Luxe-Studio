export interface BrandKit {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logoUrl?: string;
  logoText: string;
}

export interface SectionItem {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

export interface Section {
  id: string;
  type: 'features' | 'gallery' | 'text_content' | 'cta' | 'hero_section';
  title: string;
  subtitle?: string;
  items?: SectionItem[];
  layout?: 'grid' | 'list' | 'carousel' | 'split';
}

export interface DesignMockup {
  id: string;
  name: string;
  brandName: string;
  logoText: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
    cardBg: string;
  };
  fontFamily: string;
  headerLinks: string[];
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    imageUrl?: string;
  };
  sections: Section[];
  footer: {
    text: string;
    links: string[];
  };
}

export interface CanvasComment {
  id: string;
  author: string;
  authorInitials: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  x: number; // percentage coordinates on canvas
  y: number;
  resolved: boolean;
  replies?: CanvasCommentReply[];
}

export interface CanvasCommentReply {
  id: string;
  author: string;
  authorInitials: string;
  text: string;
  timestamp: string;
}

export interface VersionSnapshot {
  id: string;
  timestamp: string;
  description: string;
  mockupState: DesignMockup;
  author: string;
}

export interface Asset {
  id: string;
  name: string;
  url: string;
  tags: string[];
  type: 'image' | 'illustration' | 'icon';
  size: string;
}

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  cursorX: number; // percentage coordinates
  cursorY: number;
  activeElementId?: string;
}
