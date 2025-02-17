export const sendGAEvent = ({ event, value }: { event: string; value: unknown }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, {
      event_category: "user_interaction",
      event_label: value,
    });
  } else {
    console.warn("Google Analytics is not initialized");
  }
};
