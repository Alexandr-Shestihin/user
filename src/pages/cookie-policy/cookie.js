import React from "react";
//
import styled from "styled-components";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ERA from "../../assets/icons/arrow-left.svg";

export default function TermsOfUse() {
  let history = useHistory();

  return (
    <StyledAuth>
      <a
        className="notification__search-link calendar__searching-link"
        onClick={history.goBack}
      >
        <img
          className="search__era-logo"
          src={ERA}
          alt=""
          width="25"
          height="25"
        />
      </a>
      <Logo />
      <Link className="discipline__go-back-link" to="/signup"></Link>

      <div class="elementor-text-editor elementor-clearfix">
        <p>Aurora Gaming OÜ, registered in Estonia&nbsp;</p>
        <p>
          Address:&nbsp;
          <span>
            Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
            10152 Estonia
          </span>
        </p>
        <p>Reg.code: 14745198</p>
        <p>VAT number: EE100530247</p>
        <p>
          Email: <a href="mailto:info@aurora.pm">info@aurora.pm</a>&nbsp;
        </p>
        <p></p>
        <p>Last updated: August 15, 2020</p>
        <p>This document may be available to you in other languages.</p>
        <p>
          This document is posted by&nbsp;Aurora Gaming OÜ, a company registered
          under the laws of Estonia with its registered office at&nbsp;
          <span>
            Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
            10152 Estonia
          </span>
          <span>
            , hereinafter named “we”, “our” or “us”, to assist&nbsp;our web site
            users&nbsp;with knowing our cookies policy.
          </span>
        </p>
        <p>
          We believe in being clear and open about how we collect and use data
          related to you. In the spirit of transparency, this policy provides
          detailed information about how and when we use cookies.
        </p>
        <p>
          As used in this Cookie Policy, except as may otherwise be provided
          herein, all capitalized terms which are defined in our Terms of use
          shall have the same meaning herein as therein, all of such terms and
          their definitions being incorporated herein by reference.
        </p>
        <ol>
          <li>
            <strong>How we use cookies, tags and similar technologies</strong>
          </li>
        </ol>
        <p>
          1.1.&nbsp;Please review this Cookie Policy carefully. This policy
          describes our information practices relating to using of our Website
          including all of our online products and services.
        </p>
        <p>
          1.2.&nbsp;This Cookie Policy should be read together with the terms
          and conditions posted elsewhere on our Website, including our Privacy
          Policy and our Website terms of use.
        </p>
        <ol start="2">
          <li>
            <strong>Cookies</strong>
          </li>
        </ol>
        <p>
          2.1.&nbsp;A cookie is a small text file which includes a unique
          identifier that is sent by a web server to your computer, mobile phone
          or any other internet enabled device when you visit a website or
          mobile app. Cookies are widely used to make sites work efficiently and
          to collect information about users’ online preferences.&nbsp;
        </p>
        <p>
          When you visit our Website, the Website asks your browser to put and
          store a cookie on your device to remember such information as your
          language or location to understand your preferences and customize the
          design of our Websites for you. Cookies cannot read data from your
          device and cannot download information from any other cookies created
          by other websites.&nbsp;
        </p>
        <p>
          For simplicity, this Policy refers to cookies but we may use other
          similar technologies in the same way.
        </p>
        <ol start="3">
          <li>
            <strong>How do we use cookies?</strong>
          </li>
        </ol>
        <p>
          3.1.&nbsp;We use cookies to record session information and provide our
          services to you. We use this information to make decisions about ways
          to improve the services we offer you by making browsing easier,
          providing a more personalised service, tailoring the recommendations
          and advertising that you see on our site, and our own analysis, which
          helps us develop and improve our site.
        </p>
        <p>3.2.&nbsp;We use cookies to:</p>
        <ul>
          <li>enable you to use our Websites;</li>
          <li>
            personalize our Websites to your preferences and enable us to
            improve your experience;
          </li>
          <li>help you with entering into your account;</li>
          <li>analyze your use of our Websites and products;</li>
          <li>personalize our marketing activities;</li>
          <li>protect our servers from crashes and overloads.</li>
        </ul>
        <p>
          3.3. We use all or some of the following categories of cookies on our
          Website:
        </p>
        <p>
          <strong>(a) Essential cookies.</strong>&nbsp;These cookies are
          essential for parts of our Website to operate. They enable you to move
          around our Website and allow us to recognise you within our Website so
          that we can provide you with the service that you have asked for such
          as remembering your sign-in details.
        </p>
        <p>
          <strong>(b) Functionality cookies.</strong>&nbsp;These cookies help us
          customise our site content based on your preferences. They remember
          choices you make, your language and the country you visit our Website
          from. The information these cookies collect may be anonymised and they
          cannot track your browsing activity on other websites.
        </p>
        <p>
          <strong>(c) Performance cookies.</strong>&nbsp;These cookies collect
          information on how you use our Website in order to help us improve
          areas such as navigation and to help us fix technical issues or
          errors. For example, we use these cookies to help us understand how
          you arrive at our Website, browse or use our Website and highlight
          areas where we can improve. The information stored by these cookies
          never shows personal details from which your identity can be
          established.
        </p>
        <p>
          <strong>(d) Targeting cookies.</strong>&nbsp;These cookies collect
          information about your browsing habits in order to make advertising,
          and the content we deliver, more relevant to you and your interests.
          They are also used to limit the number of times you see an advert or
          particular content, as well as help measure the effectiveness of an
          advertising or marketing campaign. These cookies are usually placed by
          third party advertising networks. They remember the websites you visit
          and that information is shared with other parties such as advertisers.
        </p>
        <p>
          3.4.&nbsp;We may engage third party providers such as Google
          Analytics, AddThis to act on our behalf to ensure safe browsing,
          enrich user experience, track and analyse your usage of our Website
          through the use of cookies, pixel tags / web beacons, and similar
          technologies. These third parties collect, and share with us, usage
          information about visits to our Website, measure and research the
          effectiveness of our advertisements, track page usage, help us target
          our recommendations and advertising, and track use of our
          recommendations and advertisements.
        </p>
        <ol start="4">
          <li>
            <strong>How do I reject cookies?</strong>
          </li>
        </ol>
        <p>
          4.1.&nbsp;At any time, you can prevent cookies from being set on your
          browser. For instructions on how to block, delete or disable any
          cookies, please consult your browser’s ‘Help’ or ‘Support’ section.
          Please note that by deleting our cookies or disabling future cookies
          you may not be able to access certain areas or features of our
          Website.
        </p>
        <ol start="5">
          <li>
            <strong> Changes to this Policy</strong>
          </li>
        </ol>
        <p>
          5.1. From time to time, we may change and/or update this Cookie
          Policy. If this Cookie Policy changes in any way, we will post an
          updated version on this page. We recommend you regularly review this
          page to ensure that you are always aware of our information practices
          and any changes to such. Any changes to this Cookie Policy will go
          into effect on posting to this page.
        </p>
        <ol start="6">
          <li>
            <strong> Contact Details</strong>
          </li>
        </ol>
        <p>
          6.1. If you have any comments or questions about this policy and our
          use of cookies please contact us at{" "}
          <a href="mailto:info@aurora.pm">info@aurora.pm</a> or at&nbsp;
          <span>
            Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
            10152 Estonia.
          </span>
        </p>{" "}
      </div>
    </StyledAuth>
  );
}
const StyledAuth = styled.div`
  background: rgb(40, 31, 28);
  background: linear-gradient(
    110deg,
    rgba(40, 31, 28, 1) 0%,
    rgba(115, 51, 34, 1) 35%,
    rgba(77, 41, 31, 1) 100%
  );

  background-size: 130%;
  min-height: 100vh;
  padding: 85px 28px;

  & > .auth__text {
    text-align: center;
    margin: 42px 0;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
  }

  & > .auth__form {
    border: 1px solid #999999;
    padding: 16px 12px;
    border-radius: 16px;

    & > .sign__up {
      text-align: center;
      color: #999999;
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      margin-bottom: 16px;

      & > span {
        color: #f7a01d;
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.56px;
        line-height: normal;
        cursor: pointer;
        margin-left: 16px;
      }
    }

    & > .access__wrapper {
      margin-bottom: 30px;

      & > div {
        display: flex;
        align-items: flex-start;

        &:first-of-type {
          margin-bottom: 30px;
        }
      }
    }

    & > .input__group {
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 25px;

      & > .input__group__border {
        border-top: 1px solid #999999;
      }
    }

    & > .btn__group {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    & > .forgot__password {
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.56px;
      line-height: normal;
      text-align: center;
      text-decoration: underline;
      margin-top: 28px;
      cursor: pointer;
    }
  }

  & > .social__auth {
    margin-top: 25px;

    & > .social__label {
      font-size: 16px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.61px;
      line-height: normal;
    }

    & > .social__wrapper {
      margin-left: 30px;
      display: flex;
      align-items: center;

      & > .google,
      & > .facebook {
        padding: 13px 25px 10px;
        border-radius: 20px;
        background-color: #f26052;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        & > i {
          width: 23px;
          height: 23px;
        }
      }

      & > .google {
        padding: 14px 15px 10px;
      }

      & > .facebook {
        background-color: #3669a5;
        margin-left: 10px;
      }
    }
  }

  @media (max-width: 400px) {
    padding: 50px 1rem;

    & > .auth__form {
      & > .btn__group {
        flex-direction: column;
        gap: 10px;

        & > button {
          width: 100%;
        }
      }
    }

    & > .social__auth {
      //flex-direction: column;

      & > .social__wrapper {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }
`;
