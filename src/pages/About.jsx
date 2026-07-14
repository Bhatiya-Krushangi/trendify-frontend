import { useSettings } from "../hooks/useSettings";
import { useLanguage } from "../context/LanguageContext";
import Translate from "../components/Translate";

const About = () => {
  const { settings } = useSettings();
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-display font-bold mb-6 text-ink dark:text-white">
        {t("about.title")} {settings?.logoText || "TrendPluse"}
      </h1>
      <div className="prose-content">
        <p>
          {settings?.logoText || "NexTrendX"}{" "}
          <Translate>
            is an independent news and trends publication covering world affairs, business, sports, entertainment, lifestyle, health, and travel. Our mission is simple: deliver accurate, timely, and well-sourced stories that help readers make sense of a fast-moving world.
          </Translate>
        </p>
        <h2>
          <Translate>What We Cover</Translate>
        </h2>
        <p>
          <Translate>
            Our editorial team curates breaking news alongside longer-form analysis, aiming for a balance of speed and depth. Every article is organized by category so readers can follow the topics that matter most to them.
          </Translate>
        </p>
        <h2>
          <Translate>Editorial Standards</Translate>
        </h2>
        <p>
          <Translate>
            We are committed to factual accuracy, clear sourcing, and prompt correction of errors. If you believe a story on this site contains a factual mistake, please reach out via our
          </Translate>
          {" "}<a href="/contact"><Translate>Contact page</Translate></a> <Translate>and we will review it promptly.</Translate>
        </p>
        <h2>
          <Translate>Advertising</Translate>
        </h2>
        <p>
          {settings?.logoText || "NexTrendX"}{" "}
          <Translate>
            is supported in part by advertising, including Google AdSense, which helps keep our reporting free and accessible to everyone. Advertising does not influence our editorial coverage. See our
          </Translate>{" "}
          <a href="/privacy-policy"><Translate>Privacy Policy</Translate></a>{" "}
          <Translate>for details on how ads and cookies work on this site.</Translate>
        </p>
      </div>
    </div>
  );
};

export default About;



