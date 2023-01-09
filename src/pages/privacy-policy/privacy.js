import React from "react";
//
import styled from "styled-components";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
import ERA from "../../assets/icons/arrow-left.svg";
import { useHistory } from "react-router-dom";

export default function Privacy() {
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
        <strong>Introduction</strong>
      </p>
      <p>
        We respect your privacy and pay great attention to the protection of
        your personal data. This Policy helps you to understand:
      </p>
      <ul>
        <li>what personal data we collect;</li>
        <li>why we collect it;</li>
        <li>what we do with it.</li>
      </ul>
      <p>
        The information below will elaborate on these three topics. Please read
        it carefully as it is very important. Our goal is to present the
        description and the handling of your personal data concisely, using
        clear and simple language to make this policy quick and easy to read and
        understand.
      </p>
      <ol>
        <li>
          <strong> Who we are</strong>
        </li>
      </ol>
      <p>
        1.1. We are Aurora Gaming OÜ, a company registered under the laws of
        Estonia with its registered office at&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>.</span>
      </p>
      <p>
        1.2. This Privacy Policy sets out how we collect and use your personal
        information when you use the services (“Services”) by visiting our site
        and registering your primary so-called “Main” account, available to you
        after registration on the Website, offered by Aurora Gaming OÜ and its
        affiliates or Administration Partners and the choices available to you
        in connection with our use of your personal information (the Privacy
        Policy).
      </p>
      <p>
        For the purposes hereof, “Administration Partner”&nbsp;shall mean the
        individual (individual entrepreneur) or&nbsp;legal entity developing
        or&nbsp;operating the project, service, platform, game and/or
        application, selling goods or services (Administration Partner Service).
      </p>
      <p>
        This Privacy Policy should be read alongside, and in addition to, our
        terms of use at&nbsp;
        <a href="https://passport.gg/tou/">https://passport.gg/tou/</a> (Terms)
        and our Cookie Policy (accessible online at{" "}
        <a href="https://passport.gg/cookie/">https://passport.gg/cookie/</a>).
        <br />
        In case of any contradictions between this Privacy Policy and the Terms,
        this Privacy Policy will prevail.
      </p>
      <p>
        As used in this Privacy Policy, except as may otherwise be provided
        herein, all capitalized terms which are defined in our Terms of use
        shall have the same meaning herein as therein, all of such terms and
        their definitions being incorporated herein by reference.
      </p>
      <p>
        1.3. We may subcontract some services related to our Website to third
        parties.
      </p>
      <ol start="2">
        <li>
          <strong> This Privacy Policy</strong>
        </li>
      </ol>
      <p>
        2.1. By making available the Services we, acting reasonably and in good
        faith, believe that you:
        <br />
        (a) have all necessary rights to register on the Website and use the
        Services and have reached a&nbsp;certain age which allows,
        in&nbsp;accordance with the applicable laws, being fully liable for your
        own actions (fully capable) or have all necessary consents (e.g.
        parental consents) in full compliance with the applicable laws,
        including for purposes of data protection laws;
        <br />
        (b) provide true information about yourself&nbsp; to the extent
        necessary for use of the Services;
        <br />
        (c) understand that by the posting your personal information, if there
        is such technical &nbsp;possibility in the Services and&nbsp;where it is
        accessible by other users of the Services, you have manifestly made this
        information public, and this information may become available to other
        Website users and internet users, be copied and disseminated by them;
        <br />
        (d) are aware of and accept this Privacy Policy.
      </p>
      <p>
        2.2. We do not check the user information received from you, except
        where such check is necessary in order for us to fulfill our obligations
        to you or under applicable law.
      </p>
      <ol start="3">
        <li>
          <strong> Information we collect about you</strong>
        </li>
      </ol>
      <p>
        3.1. In order to implement the agreement between you and us, and provide
        you with access to the use of the Services, we will improve, develop and
        implement new features to our Services, and enhance the available
        Services functionality. To achieve these objectives, and in compliance
        with applicable laws, we will collect, store, aggregate, organise,
        extract, compare, use, and supplement your data (hereinafter
        “processing”). We will also receive and pass this data, and our
        automatically processed analyses of this data to our affiliates and
        partners as set out in the table below and section 4 of this Privacy
        Policy.
      </p>
      <p>
        3.2. We will use the information we collect from all of our products and
        Website to deliver, support, protect and improve them and develop
        Service and/or new products and to protect us, our partners and users,
        for example:
      </p>
      <ul>
        <li>
          to provide you information, products and technical support that you
          request from us;
        </li>
        <li>to let you know about changes to our Services;</li>
        <li>
          to provide you information about other similar products we have;
        </li>
        <li>to perform any agreement, we have with you;</li>
        <li>to comply with laws and regulations that are applicable to us;</li>
        <li>
          to improve and check our Websites so that it will be convenient for
          you and your device to view content of our Websites;
        </li>
        <li>to monitor potentially illegal activities;</li>
        <li>
          to enable you take part into interactive features of our Websites when
          you choose to do so;
        </li>
        <li>to keep our Website safe and secure;</li>
        <li>
          to measure or understand the effectiveness of advertising we send you
          and others, and to deliver relevant advertising to you;
        </li>
        <li>
          to make suggestions and recommendations to you and other users of our
          Websites about our products;
        </li>
        <li>to test and analyze statistics and survey results.</li>
      </ul>
      <p>
        3.3. We set out in more detail the information we collect when you use
        our Services, why we collect and process it and the legal bases below.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Data you provide for registering in the
          Services including your email and/or mobile phone number.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to manage and
        administer the Services provided to you.
      </p>
      <p>
        We use this data to enable us to fulfill our obligations to you as part
        of the Services (e.g. in cases where you request restoration of your
        account). We also use this information in order to provide you with
        updates and information on our and selected third parties’ products and
        services we think you may be interested in.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, performance of our contract
        with you, your consent.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Where necessary, a copy of your identity
          or another document containing your name, surname, nationality,
          address, photograph, number of the principal identity document of you
          or your representative, payment details and another additional data,
          with that you may provide us, including through our support service.
        </li>
      </ol>
      <p>
        We may take additional verification steps where we consider reasonable
        in order to verify your account and your identity.
      </p>
      <p>
        <u>Purpose</u>: We use this data in order to identify you, verify your
        account and prevent abuse and infringements of your or other persons’
        rights. For example, we use this information to verify your identity if
        you lose your credentials and wish to access your account with us. We
        use this data to identify you if you submit application for special
        services.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, performance of our contract
        with you, your consent.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Additional data you provide when you
          register or edit your profile page including your first, middle and
          last name, username (nickname), nationality, citizenship, gender, date
          of birth, geo location, country, city, district, university, school,
          faculty, address, personal bio, phone, email, avatar picture, team,
          language preferences and social network ids.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to provide our Services
        to you, to manage and administer Services and as additional information
        to verify your account to prevent abuse and infringements of your or
        other persons’ rights. We also use this information in order to provide
        you with updates and information on our and selected third parties’
        products and services we think you may be interested in. We use this
        information in order to tailor and improve the adverts that may be
        presented on the Site and in our and our partners’ others different
        products and services that you choose to use and measure the
        effectiveness of these advertisements.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, performance of our contract
        with you.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Additional data received when you access
          the Services, including information regarding technical devices,
          technical interaction with the Service such as your IP-address, time
          of registration in the Service, device ids, country and language
          settings, device model and operating system used, your installed apps,
          type of browser, your Internet provider and/or phone network operator,
          network type, screen resolution, RAM size and your browsing behavior.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use your data for internal review in order to
        constantly improve the content of our Services and web pages, optimizing
        your user experience, to understand any errors you may encounter when
        using the Services, to notify you of changes to the Services and to
        personalize the use of our Services. We use this information in order to
        tailor and improve the adverts that may be presented on the Site and in
        our others different products and services that you choose to use and
        measure the effectiveness of these advertisements.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, performance of our contract
        with you.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Information that is automatically
          received at the time of access to the Services with the use of
          cookies.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: Please see our cookies policy which sets out the types
        of cookies we use and what we use these cookies for. We use this
        information in order to tailor and improve the adverts that may be
        presented on the Site and in our others different products and services
        that you choose to use and measure the effectiveness of these
        advertisements..
      </p>
      <p>
        <u>Legal basis</u>: your consent.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Information that is created by you while
          using the Services (if there is such technical possibility in the
          Services) this information can be available to some or all other users
          of our Services.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to manage and
        administer the Services including providing our services to you.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, which inter alia, include the
        processing of manifestly made public by you data where it is accessible
        by other users of the Services, performance of our contract with you.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Information that is obtained by the Main
          account from your extra accounts such as information that is received
          as the result of your behavioral actions when using the Services, that
          is received as the result of your using payment functionality of the
          Services (e.g. first and last four digits of your card number that are
          required in order to match these details with your account), etc.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to manage and
        administer the Services including providing our services to you. We use
        this information in order to tailor and improve the adverts that may be
        presented on the Site and in our others different products and services
        that you choose to use and measure the effectiveness of these
        advertisements..
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, which inter alia, include the
        processing of manifestly made public by you data where it is accessible
        by other users of the Services, performance of our contract with you.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Information that is created by you while
          placing requests to our Services support.
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to verify your identity
        and to fulfil your support request. We may also use this data in order
        to investigate any complaints on your behalf and to provide you with a
        more efficient service.
      </p>
      <p>
        <u>Legal basis:</u> Legitimate interests, performance of our contract
        with you.
      </p>
      <ol>
        <li>
          <u>Information collected</u>: Data collected via third parties,
          including your social network ids, application store ids, nickname,
          email and friends list, when you register in our Services via you
          social or application store accounts and/or connect your social
          account to our Services (e.g. Facebook, Twitter).
        </li>
      </ol>
      <p>
        <u>Purpose</u>: We use this information in order to manage and
        administer the Services provided to you. We use this information for
        certain social functions of our Services, such as to show you who of
        your friends play the same game as you. We also use this information in
        order to provide you with updates and information on our and selected
        third parties’ products and services we think you may be interested in.
      </p>
      <p>
        <u>Legal basis</u>: Legitimate interests, performance of our contract
        with you.
      </p>
      <p>
        3.4. Our legitimate interests include&nbsp; (1) maintaining and
        administrating the Services; (2) providing the Services to you; (3)
        improving the content of the Services and web pages; (4) processing of
        the data that was manifestly made public&nbsp;by you where it is
        accessible by other users of the Services; (5) ensuring your account is
        adequately protected; and (6) compliance with any contractual, legal or
        regulatory obligations under any applicable law.&nbsp;
      </p>
      <p>
        3.5. As part of maintaining and administrating the Services we use the
        information to analyze user activity and ensure that rules and terms of
        use for the Services are not violated.
      </p>
      <p>
        3.6. Your personal information may also be processed if it is required
        by a law enforcement or regulatory authority, body or agency or in the
        defense or exercise of legal claims.
        <br />
        We will not delete personal information if it is relevant to an
        investigation or a dispute.
        <br />
        It will continue to be stored until those issues are fully resolved
        and/or during the term that is required and/or permissible under
        applicable/relevant law.
      </p>
      <p>
        3.7. You may withdraw your consent to sending you marketing and/or
        advertising information by clicking to unsubscribe in email sent to you
        by us or our selected third party partners or via email sent at{" "}
        <a href="mailto:info@aurora.pm">info@aurora.pm</a>.
      </p>
      <p>
        3.8. Please note, if you do not want us to process sensitive and special
        categories of data about you (including data relating to your health,
        racial or ethnic origin, political opinion, religious or philosophical
        beliefs, sex life, and your sexual orientation) you should take care not
        to post this information or share this data on the Website.
        <br />
        Once you have provided this data it will be accessible by other Website
        users and it becomes difficult for us to remove this data.
      </p>
      <p>
        3.9. Please note, if you withdraw your consent to processing or you do
        not provide the data that we require in order to maintain and administer
        the Services, you may not be able to access the Services or register
        with the web pages.
      </p>
      <ol start="4">
        <li>
          <strong> Data sharing</strong>
        </li>
      </ol>
      <p>
        4.1. We take technical and organizational measures to ensure that your
        data is safe. Please note that by posting your personal information (if
        there is such technical&nbsp; possibility in the Services and&nbsp;where
        it is accessible by other users of the Services) you have manifestly
        made this information public, and this may become available to other
        Service users and internet users and be copied and/ or disseminated by
        such users.
      </p>
      <p>
        4.2. We may share your data with our affiliates and Administration
        Partners and their subsidiaries to
        provide,&nbsp;support,&nbsp;protect,&nbsp;improve&nbsp;and&nbsp;develop&nbsp;our
        Services. Sometimes we may also need to share your data with a third
        party in order to provide our Services to you or to administer the
        Services, for example if you choose to share your data across other
        social media platforms.&nbsp;
      </p>
      <p>
        4.3. We may share your personal data
        with&nbsp;our&nbsp;affiliates&nbsp;and trusted third parties who process
        personal data on our behalf.
      </p>
      <p>
        4.4. We may also share your data with our third party contractors and
        application developers provided these third parties assume
        confidentiality obligations regarding your personal data collected by
        your use of the applications they offer.&nbsp; The developers use the
        information provided to them in order to provide you with additional
        services. Data will only be shared with these developers with your
        consent. You can authorize developers to access your information via our
        products.
      </p>
      <p>
        4.5. Our affiliates and our selected third party partners with our
        permission, using their own ad servers, can show and/or send
        advertisements to you subject to your consent. If you agree to receive
        marketing and advertising materials from us and/or our partners,
        including InBev Belgium and its affiliates, we may share you email
        address with our selected third party partners for the sole purpose of
        provision of such best marketing and advertising materials to you.
      </p>
      <p>
        4.6. In some circumstances, it may become necessary for us to share your
        information with a government authority.
      </p>
      <p>
        We will share information with these state authorities, partners,
        companies, persons or others when we feel that it is reasonably
        necessary to:
      </p>
      <ul>
        <li>
          Comply with applicable laws, legal actions or lawful request of state
          authorities;
        </li>
        <li>
          Protect our rights, property or safety, our users or others under the
          applicable laws;
        </li>
        <li>Fulfil our obligations under our agreement with you;</li>
        <li>
          Check, prevent and investigate fraud, security or technical issues.
        </li>
      </ul>
      <ol start="5">
        <li>
          <strong> Privacy Settings</strong>
        </li>
      </ol>
      <p>
        5.1. The Services may contain links to sites operated by third parties.
        We are not responsible for your data privacy when you access these links
        or engage with third party services and you should ensure you review the
        relevant third party’s privacy statement, which will govern your data
        privacy rights.
      </p>
      <p>
        5.2. We bear no liability for the actions of third parties, which, as
        the result of your use of the internet or the Services, obtain access to
        your information in accordance with the confidentiality level selected
        by you.
      </p>
      <p>
        5.3. We bear no liability for the consequences of use of the
        information, which, due to the Services nature, is available to any
        internet user. We ask you to take a responsible approach to the scope of
        their information posted on the Website.
      </p>
      <ol start="6">
        <li>
          <strong> International Transfers</strong>
        </li>
      </ol>
      <p>
        6.1. We may transfer and maintain on our servers or databases some of
        your personal information outside the European Economic Area (EEA).
      </p>
      <p>
        6.2. The countries to which we transfer your data may not have the same
        data protection laws as your jurisdiction. We take reasonable cyber
        security measures and/or put in place the Standard Contractual Clauses
        (e.g. Model Clauses, Data Processing Agreement/Addendum) to ensure your
        data is adequately protected.
      </p>
      <ol start="7">
        <li>
          <strong> Retention Periods</strong>
        </li>
      </ol>
      <p>
        7.1. We will retain your personal information for as long as required to
        perform the purposes for which the data was collected depending on the
        legal basis for which that data was obtained and/or whether additional
        legal/regulatory obligations mandate that we retain your personal
        information during the term that is required and/or permissible under
        applicable/relevant law.
      </p>
      <p>
        7.2. You may delete your personal data by removing the data from your
        account; alternatively, you can delete your account.
      </p>
      <p>
        7.3. We may remove your account, or the information you post as provided
        by the Terms.
      </p>
      <ol start="8">
        <li>
          <strong> Your Rights</strong>
        </li>
      </ol>
      <p>
        8.1. You have the following rights, in certain circumstances, in
        relation to your personal information:
        <br />
        (a) Right to access&nbsp; your personal information.
        <br />
        (b) Right to rectify your personal information:&nbsp; you can request
        that we update, block or delete your personal data, if the data is
        incomplete, outdated, incorrect, unlawfully received or no longer
        relevant&nbsp;for the purpose of processing.
        <br />
        (c) Right to restrict the use of your personal information.
        <br />
        (d) Right to request that your personal information is erased.
        <br />
        (e) Right to object to processing of your personal information.
        <br />
        (f) Right to data portability (in certain specific circumstances).
        <br />
        (g) Right not to be subject to an automated decision.
        <br />
        (h) Right to lodge a complaint with a supervisory authority.
      </p>
      <p>
        (i) For processing based upon your consent, the right withdraw that
        consent at any time.
      </p>
      <p>
        (j) You may have other rights under your legislation of your country of
        residence, including right to define the instructions relative to the
        outcome of your personal data after your death.
      </p>
      <p>
        8.2. You also have a right to independently remove personal information
        on your account and make changes and corrections to your information,
        provided that such changes and corrections contain up-to-date and true
        information. You can also view an overview of the information we hold
        about you. If you reside in France you have the right to register on the
        list of opposition to telephone canvassing on{" "}
        <a href="http://www.bloctel.fr">www.bloctel.fr</a>.
      </p>
      <p>
        8.3. If you would like to exercise these rights, please contact Support
        Service at <a href="mailto:info@aurora.pm">info@aurora.pm</a> or send
        your request to us, in writing to&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>
          . We will aim to respond to you within 30 days from receipt of
          request. We will need to verify your identity before we are able to
          disclose any personal data to you.
        </span>
      </p>
      <ol start="9">
        <li>
          <strong> Security Measures</strong>
        </li>
      </ol>
      <p>
        9.1. We take&nbsp;reasonable technical, organizational and legal
        measures, including, where suitable, encryption, to ensure that your
        personal data are protected from unauthorized or accidental access,
        deletion, modification, blocking, copying and dissemination. We
        continuously analyze and check our procedures of collection, storage,
        and use of information including trainings of our staff.
      </p>
      <p>
        Please note that although we work hard to protect security of our
        products and Websites, the confidentiality of any communication or
        material sent to or from our products and Websites cannot be guaranteed.
        We ask you to take every precaution to protect your personal data when
        you are on the Internet.
      </p>
      <p>
        9.2. Access to the Services is authorized using your login (e-mail
        address or mobile phone number) and password. You are responsible for
        keeping this information confidential. You should not share your
        credentials with third parties and we recommend you take measures to
        ensure this information is kept confidential.&nbsp;
      </p>
      <p>
        9.3. If you forget your login details, you can request us to send you an
        SMS or email, which will contain a restoration code.
      </p>
      <p>
        9.4. To reduce the probability of third parties gaining unauthorized
        access, if you login to your account from an unusual place or after
        several failed attempts to provide valid login details, we may block
        entry to your account. You will then need to contact Service support and
        provide certain additional information to verify your credentials and
        gain access to your account.&nbsp;
      </p>
      <ol start="10">
        <li>
          <strong> Changes to this Policy</strong>
        </li>
      </ol>
      <p>
        10.1. From time to time, we may change and/or update this Privacy
        Policy. If this Privacy Policy changes in any way, we will post an
        updated version on this page. We will store the previous versions of
        this Privacy Policy in our documentation archive. When we determine that
        such changes are significant for your rights and interests, we will
        notify you by email or by a pop-up banner on our Website that requests
        your individual consent. We recommend you regularly review this page to
        ensure that you are always aware of our information practices and any
        changes to such.
      </p>
      <ol start="11">
        <li>
          <strong> Contact Us</strong>
        </li>
      </ol>
      <p>
        11.1. If you have any questions, please send your inquiries to Service
        support at <a href="mailto:info@aurora.pm">info@aurora.pm</a> or in
        writing to&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>
          . So we can deal with your enquiry effectively, please quote this
          Privacy Policy. We will aim to respond to you within 30 days from
          receipt of request.&nbsp;
        </span>
      </p>
      <p>
        11.2. All correspondence received by us from you (written or electronic
        inquiries) at <a href="mailto:info@aurora.pm">info@aurora.pm</a> or in
        writing to&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>
          &nbsp;is classified as restricted-access information and may not be
          disclosed without your written consent. The personal data and other
          information about you may not be used without your consent for any
          purpose other than for response to the inquiry, except as expressly
          provided by law.
        </span>
      </p>
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
