import { useSettings } from "../hooks/useSettings";
import Translate from "../components/Translate";

const Terms = () => {
  const { settings } = useSettings();
  const siteName = settings?.logoText || "NexTrendX";
  const email = settings?.contactEmail || "nextrendx.contact@gmail.com";

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-display font-bold mb-2 text-ink dark:text-white">
        <Translate>Terms &amp; Conditions</Translate>
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
        <Translate>Last updated:</Translate> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="prose-content">
        <p>
          <Translate>
            These Terms &amp; Conditions govern your use of
          </Translate> {siteName}. <Translate>By accessing this website, you agree to these terms in full. If you disagree with any part of these terms, please do not use this site.</Translate>
        </p>

        <h2>
          <Translate>Use of Content</Translate>
        </h2>
        <p>
          <Translate>
            All articles, images, and other content on
          </Translate> {siteName} <Translate>are provided for general informational purposes only and are protected by copyright. You may share links to our articles, but reproduction, republication, or redistribution of our content without prior written permission is prohibited.</Translate>
        </p>

        <h2>
          <Translate>User-Submitted Content</Translate>
        </h2>
        <p>
          <Translate>
            When you submit a comment or contact form, you agree not to post content that is unlawful, defamatory, abusive, or infringes on the rights of others. We reserve the right to moderate, edit, or remove any user-submitted content at our discretion.
          </Translate>
        </p>

        <h2>
          <Translate>Accuracy of Information</Translate>
        </h2>
        <p>
          <Translate>
            While we strive for accuracy,
          </Translate> {siteName} <Translate>makes no warranties about the completeness, reliability, or accuracy of the information published. Any action you take based on information on this site is strictly at your own risk.</Translate>
        </p>

        <h2>
          <Translate>Third-Party Links and Advertising</Translate>
        </h2>
        <p>
          <Translate>
            Our site may contain links to third-party websites and displays advertisements, including via Google AdSense. We are not responsible for the content, accuracy, or practices of third-party sites or advertisers.
          </Translate>
        </p>

        <h2>
          <Translate>Limitation of Liability</Translate>
        </h2>
        <p>
          {siteName} <Translate>and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.</Translate>
        </p>

        <h2>
          <Translate>Changes to These Terms</Translate>
        </h2>
        <p>
          <Translate>
            We may revise these Terms &amp; Conditions at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.
          </Translate>
        </p>

        <h2>
          <Translate>Governing Law</Translate>
        </h2>
        <p>
          <Translate>
            These terms are governed by applicable local law in the jurisdiction where
          </Translate> {siteName} <Translate>operates, without regard to conflict of law principles.</Translate>
        </p>

        <h2>
          <Translate>Contact Us</Translate>
        </h2>
        <p>
          <Translate>Questions about these Terms &amp; Conditions can be sent to</Translate>{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </div>
    </div>
  );
};

export default Terms;

