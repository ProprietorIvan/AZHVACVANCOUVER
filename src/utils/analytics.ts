import { track } from "@vercel/analytics";

/**
 * Centralized analytics utility functions for Vercel Analytics
 * All tracking events go through these helper functions for consistency
 */

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Generic event tracking function
 */
export const trackEvent = (
  eventName: string,
  properties?: AnalyticsProperties
) => {
  try {
    track(eventName, properties);
  } catch (error) {
    console.warn("Analytics tracking error:", error);
  }
};

/**
 * Track form submission events
 */
export const trackFormSubmission = (
  formType: string,
  page: string,
  additionalProperties?: AnalyticsProperties
) => {
  trackEvent("form_submitted", {
    form_type: formType,
    page,
    ...additionalProperties,
  });
};

/**
 * Track form started event
 */
export const trackFormStarted = (
  formType: string,
  page: string,
  properties?: AnalyticsProperties
) => {
  trackEvent("form_started", {
    form_type: formType,
    page,
    ...properties,
  });
};

/**
 * Track form field focus
 */
export const trackFormFieldFocused = (
  fieldName: string,
  formType: string,
  page: string
) => {
  trackEvent("form_field_focused", {
    field_name: fieldName,
    form_type: formType,
    page,
  });
};

/**
 * Track form success
 */
export const trackFormSuccess = (
  formType: string,
  page: string,
  properties?: AnalyticsProperties
) => {
  trackEvent("form_success", {
    form_type: formType,
    page,
    ...properties,
  });
};

/**
 * Track form error
 */
export const trackFormError = (
  formType: string,
  page: string,
  errorMessage?: string
) => {
  trackEvent("form_error", {
    form_type: formType,
    page,
    error_message: errorMessage,
  });
};

/**
 * Track phone number clicks
 */
export const trackPhoneClick = (location: string, page: string) => {
  trackEvent("phone_clicked", {
    location, // hero, cta, contact, sticky, etc.
    page,
  });
};

/**
 * Track phone number copied
 */
export const trackPhoneCopied = (page: string) => {
  trackEvent("phone_copied", {
    page,
  });
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (
  buttonLocation: string,
  buttonText: string,
  page: string,
  additionalProperties?: AnalyticsProperties
) => {
  trackEvent("cta_clicked", {
    button_location: buttonLocation, // hero, mid_page, bottom, sticky
    button_text: buttonText,
    page,
    ...additionalProperties,
  });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent(`scroll_${depth}`, {
    page,
    scroll_depth: depth,
  });
};

/**
 * Track time spent on page
 */
export const trackTimeOnPage = (
  duration: number,
  page: string,
  milestone?: string
) => {
  const eventName = milestone
    ? `time_on_page_${milestone}`
    : "time_on_page";
  trackEvent(eventName, {
    duration_seconds: duration,
    page,
    milestone,
  });
};

/**
 * Track FAQ interactions
 */
export const trackFAQInteraction = (
  question: string,
  page: string,
  action: "expanded" | "collapsed" = "expanded"
) => {
  trackEvent("faq_interaction", {
    question,
    page,
    action,
  });
};

/**
 * Track conversion funnel steps
 */
export const trackConversionFunnel = (
  step: string,
  page: string,
  properties?: AnalyticsProperties
) => {
  trackEvent("conversion_funnel", {
    step, // page_view, cta_viewed, form_started, form_submitted, conversion_complete
    page,
    ...properties,
  });
};

/**
 * Track page view (call on component mount)
 */
export const trackPageView = (page: string, properties?: AnalyticsProperties) => {
  trackConversionFunnel("page_view", page, properties);
};

/**
 * Track CTA viewed (when CTA enters viewport)
 */
export const trackCTAViewed = (
  ctaLocation: string,
  page: string,
  properties?: AnalyticsProperties
) => {
  trackConversionFunnel("cta_viewed", page, {
    cta_location: ctaLocation,
    ...properties,
  });
};

/**
 * Track conversion complete
 */
export const trackConversionComplete = (
  page: string,
  conversionType: string,
  properties?: AnalyticsProperties
) => {
  trackConversionFunnel("conversion_complete", page, {
    conversion_type: conversionType, // form_submission, phone_call, etc.
    ...properties,
  });
};
