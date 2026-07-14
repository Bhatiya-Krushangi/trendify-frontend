import { useSettings } from "../hooks/useSettings";
import Translate from "../components/Translate";

const Privacy = () => {
  const { settings } = useSettings();
  const siteName = settings?.logoText || "NexTrendX";
  const email = settings?.contactEmail || "nextrendx.contact@gmail.com";

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-display font-bold mb-2 text-ink dark:text-white">
        <Translate>Privacy Policy</Translate>
      </h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-8">
        <Translate>Last updated:</Translate> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="prose-content">
        <p>
          <Translate>This Privacy Policy explains how</Translate> {siteName} <Translate>("we", "us", "our") collects, uses, and protects information when you visit this website. By using this site, you agree to the practices described below.</Translate>
        </p>

        <h2>
          <Translate>Information We Collect</Translate>
        </h2>
        <p>
          <Translate>
            We collect information you voluntarily provide, such as your name and email address when you submit a comment, contact form, or newsletter signup. We also automatically collect limited technical data, like browser type, device information, and pages visited, through standard server logs and analytics tools.
          </Translate>
        </p>

        <h2>
          <Translate>Cookies and Similar Technologies</Translate>
        </h2>
        <p>
          <Translate>
            Like most websites,
          </Translate> {siteName} <Translate>uses cookies to improve site functionality, remember preferences, and analyze traffic. Cookies are small text files stored on your device by your browser.</Translate>
        </p>

        <h2>
          <Translate>Third-Party Advertising (Google AdSense)</Translate>
        </h2>
        <p>
          <Translate>
            This site displays advertisements served by Google AdSense and other third-party ad networks. These providers may use cookies, web beacons, and similar technologies to collect information about your visits to this and other websites in order to serve ads based on your interests.
          </Translate>
        </p>
        <ul>
          <li>
            <Translate>Google uses cookies, including the DoubleClick cookie, to serve ads based on prior visits to this and other websites.</Translate>
          </li>
          <li>
            <Translate>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the internet.</Translate>
          </li>
          <li>
            <Translate>You may opt out of personalized advertising by visiting</Translate> <a href="https://adssettings.google.com" target="_blank" rel="noreferrer"><Translate>Google Ads Settings</Translate></a>.
          </li>
          <li>
            <Translate>You can also opt out of some third-party vendor use of cookies for personalized advertising via</Translate> <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">aboutads.info</a>.
          </li>
        </ul>

        <h2>
          <Translate>How We Use Information</Translate>
        </h2>
        <p>
          <Translate>
            We use collected information to operate and improve the site, moderate comments, respond to inquiries, send newsletters (only if you subscribe), and serve relevant advertising. We do not sell your personal information to third parties.
          </Translate>
        </p>

        <h2>
          <Translate>Data Retention</Translate>
        </h2>
        <p>
          <Translate>
            Comments and contact form submissions are retained as needed to moderate content and respond to inquiries. You may request deletion of your submitted data at any time by contacting us.
          </Translate>
        </p>

        <h2>
          <Translate>Children's Privacy</Translate>
        </h2>
        <p>
          <Translate>
            This site is not directed at children under 13, and we do not knowingly collect personal information from children.
          </Translate>
        </p>

        <h2>
          <Translate>Your Choices</Translate>
        </h2>
        <p>
          <Translate>
            You can control cookies through your browser settings. Disabling cookies may affect some site features. You can unsubscribe from our newsletter at any time using the link in any email we send.
          </Translate>
        </p>

        <h2>
          <Translate>Changes to This Policy</Translate>
        </h2>
        <p>
          <Translate>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
          </Translate>
        </p>

        <h2>
          <Translate>Contact Us</Translate>
        </h2>
        <p>
          <Translate>If you have questions about this Privacy Policy, please contact us at</Translate>{" "}
          <a href={`mailto:${email}`}>{email}</a> <Translate>or via our</Translate> <a href="/contact"><Translate>Contact page</Translate></a>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;

