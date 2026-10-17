export interface Post {
  slug: string;
  title: string;
  date: string;
  image: string;
  hashtags: string[];
  visitShowcaseUrl?: string;
  visitOtherTitle?: string;
  visitOtherUrl?: string;
  visitOtherIcon?: string;
  content: string;
}

export const postsData: Post[] = [
  {
    slug: 'embedsv1',
    title: 'Buy Me A Boba: Embeds V1',
    date: '1 January 2026',
    image: 'https://raw.githubusercontent.com/AMAMazing/amamazing.dev/main/public/postimages/1.png',
    hashtags: ['buymeaboba', 'buildinpublic'],
    visitShowcaseUrl: 'https://www.buymeaboba.com/embeds-showcase',
    visitOtherTitle: 'Buy Me A Boba',
    visitOtherUrl: 'https://www.buymeaboba.com/',
    visitOtherIcon: 'https://www.buymeaboba.com/favicon.ico',
    content: `Buy Me A Boba has officially rolled out Embeds V1! 

With Embeds V1, creators and developers can now easily embed dynamic donation buttons, interactive boba counters, and supporter badges anywhere on their personal sites, documentation, and GitHub repositories.

### Key Features
- **Zero Configuration Widgets**: Drop an iframe or script snippet into your static website or web app.
- **Dynamic Theming**: Support for light, dark, and custom accent styles to match your existing brand.
- **Fast and Lightweight**: Cached on the edge for ultra-fast loading without impacting your core page metrics.
- **Universal Support**: Seamless display on mobile browsers, desktop sites, and markdown documentation.

We are actively developing future iterations with real-time webhooks, custom goal thermometers, and Discord bot integration. Stay tuned for upcoming releases!`
  }
];

export function getAllPosts(): Post[] {
  return [...postsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((p) => p.slug === slug);
}