export const SITE = {
  website: "https://ben.perlmutter.io/", // replace this with your deployed domain
  author: "Ben Perlmutter",
  profile: "https://ben.perlmutter.io/",
  desc: "Ben Perlmutter's personal website.",
  title: "Ben Perlmutter",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/bpmutter/bpio-iii/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
