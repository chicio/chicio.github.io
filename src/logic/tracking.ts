export const tracking = {
  action: {
    download_curriculum_vitae: "download_curriculum_vitae",
    open_blog: "open_blog",
    open_github: "open_github",
    open_linkedin: "open_linkedin",
    send_mail: "send_email",
    open_medium: "open_medium",
    open_devto: "open_devto",
    open_twitter: "open_twitter",
    open_facebook: "open_facebook",
    open_instagram: "open_instagram",
    call_phone: "call_phone",
    open_personal_projects_tab: "open_personal_projects_tab",
    open_education_and_experiences_tab: "open_education_and_experiences_tab",
    open_sclt_github: "open_sclt_github",
    open_sclt_thesis: "open_sclt_thesis",
    open_spectral_brdf_explorer_github: "open_spectral_brdf_explorer_github",
    open_id3tageditor_github: "open_id3tageditor_github",
    open_id3tageditor_doc: "open_id3tageditor_doc",
    open_mp3id3tagger_github: "open_mp3id3tagger_github",
    open_mp3id3tagger_dmg: "open_mp3id3tagger_dmg",
    open_rangeuislider_github: "open_rangeuislider_github",
    open_rangeuislider_doc: "open_rangeuislider_doc",
    open_tabbaruiaction_github: "open_tabbaruiaction_github",
    open_tabbaruiaction_doc: "open_tabbaruiaction_doc",
    open_home: "open_home",
    open_about_me: "open_about_me",
    open_blog_archive: "open_blog_archive",
    open_blog_tags: "open_blog_tags",
    reload: "reload",
    open_blog_post: "open_blog_post",
    open_blog_next_page: "open_blog_next_page",
    open_blog_previous_page: "open_blog_previous_page",
    open_blog_author: "open_blog_author",
    open_blog_tag: "open_blog_tag",
    open_design_system: "open_design_system",
    pull_to_refresh: "pull_to_refresh",
  },
  category: {
    home: "home",
    blog_home: "blog_home",
    blog_archive: "blog_archive",
    blog_post: "blog_post",
    blog_tags: "blog_tags",
    blog_tag: "blog_tags",
    cookie_policy: "cookie_policy",
    privacy_policy: "privacy_policy",
    notfound: "notfound",
  },
  label: {
    footer: "footer",
    body: "body",
    header: "header",
  },
};

export interface TrackingData {
  category: string;
  label: string;
  action: string;
}

export interface TrackingElementProps {
  trackingData: TrackingData;
}

export const trackWith = (tracking: TrackingData) => {
  const payload = tracking.label
    ? { event_category: tracking.category, event_label: tracking.label }
    : { event_category: tracking.category };
  // @ts-ignore
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    // @ts-ignore
    window.gtag("event", tracking.action, payload);
  }
};
