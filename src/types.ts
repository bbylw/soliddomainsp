export interface LinkItem {
  title: string;
  url: string;
  icon: string;
  internal?: boolean;
}

export interface Category {
  id: string;
  title: string;
  links: LinkItem[];
}

export interface LinksData {
  categories: Category[];
  domains: LinkItem[];
}
