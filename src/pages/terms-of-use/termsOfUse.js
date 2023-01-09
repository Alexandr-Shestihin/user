import React from "react";
//
import { useHistory } from "react-router-dom";
import ERA from "../../assets/icons/arrow-left.svg";

import styled from "styled-components";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";

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
      <p>Last updated: August 24, 2020</p>
      <p>This document may be available to you in other languages.</p>
      <p>
        This Website is the property of Aurora Gaming OÜ, a company registered
        under the laws of Estonia with its registered office at&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>, (reg. number: 14745198), and/or its affiliates.</span>
      </p>
      <p>
        These Terms of use shall regulate relations between the Company and the
        User of&nbsp;the Website and its Services.
      </p>
      <p>By accessing and using our Website, the User:</p>
      <p>
        <strong>(A)</strong> acknowledges that he/she has read, understood, and
        unconditionally accepted the terms and conditions of these Terms of Use,
        including the Privacy Policy (accessible online at&nbsp;
        <a href="https://passport.gg/privacy/">https://passport.gg/privacy/</a>)
        which is hereby incorporated by reference and guarantees that he/she
        will observe them during the course of Website and its Services use;
      </p>
      <p>
        <strong>(B)</strong> acknowledges and agrees that he/she has
        independently evaluated the desirability of Website and its Services use
        and is not relying on any representation, guarantee, or statement other
        than as expressly set forth herein; and
      </p>
      <p>
        <strong>(C)</strong> represents and warrants that he/she is lawfully
        able to enter into contracts (e.g., User has reached the age of capacity
        provided by applicable law). If the User is minor, he/she shall become
        acquainted of these Terms of Use with the help of his parents/legal
        guardians. Company recommends parents or legal guardians to monitor
        their children’s online activities. To protect children’s privacy,
        Company advises parents or legal guardians to check that their children
        never disclose their personal data without prior consent of their
        parents or guardians. Company reserves the right to restrict access to
        certain services on age grounds and may allow the registration for
        certain services with parental approval when underage. Company reserves
        the right to ask for written proof of parental consent for any User or
        potential User of Website and its Services suspected to be a minor. In
        all cases, use of the Website and its Services by minors must take place
        under the responsibility of their parents or legal guardians and any use
        of the Services is assumed to have been validated by them.
      </p>
      <p>
        <strong>(D)</strong> represents and warrants that he/she is not
        accessing Website and its Services through a VPN or similar tools.
      </p>
      <p>Otherwise, use of Website and its Services is prohibited. &nbsp;</p>
      <p>
        Prior to&nbsp;use the Website/relevant Service, the User shall undertake
        and confirm that he/she has become familiar with the terms and
        conditions of&nbsp;the Terms of use and the agreement for the Service
        used thereby.
      </p>
      <ol>
        <li>
          <strong>
            {" "}
            Main Terms and Definitions Used in&nbsp;these Terms of&nbsp;use
          </strong>
        </li>
      </ol>
      <p>
        <strong>Website</strong>&nbsp;shall mean the aggregate of&nbsp;the web
        pages posted on&nbsp;the Internet and managed by&nbsp;the software
        of&nbsp;the Company united by&nbsp;the interconnect address space within
        the framework of&nbsp;the Website Services functions operated both
        by&nbsp;the Company and the Partners.
      </p>
      <p>
        The Website homepage providing access to&nbsp;all the Website pages and
        certain Services is&nbsp;posted on&nbsp;the Internet at{" "}
        <a href="https://live.passport.gg/">https://live.passport.gg/</a>,{" "}
        <a href="https://passport.gg/">https://passport.gg/</a>,{" "}
        <a href="http://esports-series.net/">http://esports-series.net/</a> and
        all their domains and subdomains.
      </p>
      <p>
        The Company is entitled to change the domain name of the Website or to
        use an additional domain name(s), provided that the main functionality
        of the Website is not materially changed.
      </p>
      <p>
        <strong>Services</strong>&nbsp;shall mean the projects, games and/or
        applications of&nbsp;the Company or&nbsp;the Company Partner (Service
        of&nbsp;the Partner) posted on&nbsp;the Website and access to&nbsp;which
        is&nbsp;provided through the Website, the mobile version of&nbsp;the
        Website, and certain applications or&nbsp;the websites of&nbsp;the
        Partners.
      </p>
      <p>
        <strong>Website/Services Access</strong>&nbsp;shall mean the access
        to&nbsp;the functional options of&nbsp;the Website and certain Services
        of&nbsp;the Website which the User obtains after registration procedure
        (authorization on&nbsp;the Website/Service) which may be supported by
        Partner. The Website as&nbsp;well as&nbsp;any Website Service shall
        be&nbsp;accessed with a&nbsp;login and password.
      </p>
      <p>
        <strong>Company </strong>(<strong>“we”, “us”</strong>) shall mean Aurora
        Gaming OÜ, a company registered under the laws of Estonia with its
        registered office at&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>.</span>
      </p>
      <p>
        <strong>Partner</strong>&nbsp;shall mean the individual (individual
        entrepreneur) or&nbsp;legal entity developing or&nbsp;operating the
        project, service, platform, game and/or application (Partner Service).
        Relations between the User and the Partner occurring in&nbsp;the course
        of&nbsp;using of&nbsp;the Partner Service by&nbsp;the User shall
        be&nbsp;subject to&nbsp;regulation by&nbsp;separate agreements.
      </p>
      <p>
        <strong>Website/Service User</strong>&nbsp;(the “<strong>User</strong>“,{" "}
        <strong>“you”, “yours”</strong>) shall mean a&nbsp;person who has
        reached a&nbsp;certain age which allows, in&nbsp;accordance with the
        applicable laws, being fully liable for his/her own actions (fully
        capable) , or if underage, satisfies all the criteria listed herein, and
        having obtained the Website/Service access by&nbsp;registration and
        agreed to&nbsp;these Terms of use and other agreements and rules
        regulating the procedure for using of&nbsp;certain Services.
      </p>
      <p>
        <strong>User’s</strong>&nbsp;<strong>Account</strong>&nbsp;(the “
        <strong>Account</strong>“) shall mean the User’s profile created when
        registering the User with the Website/creating the User’s accounting
        record, which allows the User to&nbsp;obtain access to&nbsp;the Website
        and/or its Service and identifies him/her as&nbsp;a&nbsp;unique User
        of&nbsp;the Website. Under a&nbsp;certain Service there may
        be&nbsp;required creation of&nbsp;a&nbsp;separate account. The procedure
        for creation thereof is&nbsp;regulated by&nbsp;the agreements for the
        relevant Services.
      </p>
      <p>
        <strong>Content</strong>&nbsp;shall stand for the design elements,
        pictures, graphics, scripts, PC&nbsp;software (including games and
        applications), video, music, sounds and other objects either being the
        result of&nbsp;intellectual activity or&nbsp;not, the rights
        to&nbsp;which belong to&nbsp;the Company, Users, Partners or&nbsp;other
        persons.
      </p>
      <p>
        <strong>Terms of&nbsp;use</strong>&nbsp;shall mean this agreement
        determining general terms and conditions and procedures for using
        of&nbsp;the Website/Service regulating the legal relations between the
        Company and the User.
      </p>
      <p>
        The agreements regulating using of&nbsp;certain Services the User may
        obtain access to&nbsp;after registration on&nbsp;the Website shall
        be&nbsp;an&nbsp;integral part of&nbsp;the Terms of use, as&nbsp;well
        as&nbsp;other provisions and rules supplementing the terms and
        conditions hereof and/or the agreements for certain Services.
      </p>
      <p>
        Agreements for certain Services of&nbsp;the Website may contain special
        standards which have direct effect and priority as&nbsp;to&nbsp;the
        common standards of&nbsp;the Terms of use. In&nbsp;case in&nbsp;some
        agreement there are no&nbsp;provisions fully determining (clarifying)
        the rights and obligations of&nbsp;the Parties as&nbsp;to&nbsp;using
        of&nbsp;the relevant Service, the Parties shall follow the terms and
        conditions hereof.
      </p>
      <p>
        These Terms of use is&nbsp;a&nbsp;public offer of&nbsp;the Company
        intended for the User.
      </p>
      <p>
        The current version of&nbsp;the Terms of use, agreements for certain
        Services and all other provisions and rules regulating the procedure for
        using of&nbsp;the Website/Services are placed on&nbsp;the
        Website&nbsp;at:&nbsp;
        <a href="https://passport.gg/tou/">https://passport.gg/tou/</a>,
        as&nbsp;well as&nbsp;on&nbsp;the separate pages (sections) of&nbsp;the
        relevant Services.
      </p>
      <ol start="2">
        <li>
          <strong>
            {" "}
            General Terms and Conditions of&nbsp;the Functioning of&nbsp;the
            Website/Service
          </strong>
        </li>
      </ol>
      <p>
        2.1. The Company will make commercially reasonable efforts to ensure
        functioning of&nbsp;the Website/Services in&nbsp;a&nbsp;twenty-four hour
        mode, but shall not guarantee absence of&nbsp;breaks related
        to&nbsp;technical failures or&nbsp;scheduled maintenance. The Company
        shall not guarantee that the Website or&nbsp;any of&nbsp;the Services
        will function at&nbsp;any certain time in&nbsp;the future or&nbsp;that
        they will not stop working. The Company may at any time decide to cancel
        operating and maintaining the Website/Services. As we are always making
        the Website better for you, some of the features and services within
        Website/Services may be unavailable at the moment of your registration
        or any time later on; you will have access to such services as soon as
        they become available.
      </p>
      <p>
        2.2. The Website and the Services, including the functional options,
        as&nbsp;well as&nbsp;all the scripts, applications, Content and design
        of&nbsp;the Website shall be&nbsp;provided “<strong>as</strong>&nbsp;
        <strong>is</strong>“.
      </p>
      <p>
        2.3. The Company shall not provide any guarantees that the Website
        or&nbsp;the Services may fit or&nbsp;not fit for certain purposes
        of&nbsp;use. The Company may not guarantee and shall not promise any
        specific results of&nbsp;using of&nbsp;the Website and/or Services. The
        Company shall not guarantee compliance of&nbsp;the Content posted
        on&nbsp;the Website with the individual ideas of&nbsp;the User
        on&nbsp;morality and ethics.
      </p>
      <p>
        2.4. When using the Website/Services, the User shall take preventive
        measures for use of&nbsp;Content, especially of&nbsp;the Content posted
        by&nbsp;the Users and other materials and information, as&nbsp;well
        as&nbsp;when taking certain actions, including when clicking through the
        links placed on&nbsp;the Website, and when using any files, including
        software to&nbsp;avoid negative influence on&nbsp;the User’s computer
        of&nbsp;malicious software, as&nbsp;well as&nbsp;unauthorized access
        to&nbsp;the Account, password attack and other negative consequences for
        the User.
      </p>
      <p>
        2.5. The Website/Services may contain advertising and informational
        materials placed by&nbsp;the Company at&nbsp;its own discretion.
      </p>
      <p>
        2.6. By using the Website/Services, the User confirms that his age is
        sufficient for such use under the applicable laws and/or he has all
        necessary consents (e.g. parental consents) in full compliance with the
        applicable laws, including for purposes of data protection laws,
        otherwise the use of the Website/Services is prohibited.
      </p>
      <ol start="3">
        <li>
          <strong>
            {" "}
            Terms and Conditions for Obtaining Access to&nbsp;the
            Website/Services
          </strong>
        </li>
      </ol>
      <p>
        For the purpose of&nbsp;getting Access to&nbsp;the Website and certain
        Services, the User shall create an&nbsp;Account. The Company may engage
        Partners for the provision of authorization and registration services.
        The process of&nbsp;Account creation includes the following obligatory
        actions taken by&nbsp;the User:
      </p>
      <p>
        1)&nbsp;
        <u>Filling in&nbsp;of&nbsp;the questionnaire with the User’s data</u>
      </p>
      <p>
        When registering the Account, the User shall fill in&nbsp;the
        questionnaire with the data he/she considers sufficient for his/her
        identification on&nbsp;the Website/Service as&nbsp;a&nbsp;unique User,
        except for the mandatory fields of&nbsp;the questionnaire, filling
        in&nbsp;of&nbsp;which shall be&nbsp;obligatory for the User.
      </p>
      <p>
        The Company may not verify the information submitted by&nbsp;the User
        in&nbsp;any way, hereinafter referred to&nbsp;as&nbsp;the “account data”
        (unless otherwise provided for by&nbsp;the terms and conditions
        of&nbsp;provision of&nbsp;any separate Service), shall not
        be&nbsp;liable before any third parties for accuracy and reliability
        of&nbsp;the account data.
      </p>
      <p>
        In&nbsp;the course of&nbsp;filling in&nbsp;of&nbsp;the registration form
        the User shall independently create a&nbsp;login and password,
        as&nbsp;well as&nbsp;other data for the further access to&nbsp;the
        Website/Services.
      </p>
      <p>
        The User confirms that he/she is&nbsp;informed that the safety
        of&nbsp;his/her Account (accounts in&nbsp;different Services) shall
        directly depend on&nbsp;the complexity (number and variation of&nbsp;the
        symbols) of&nbsp;the password and other data which allow the User
        getting access to&nbsp;the Account. A&nbsp;login and password are
        confidential information and shall not be&nbsp;subject
        to&nbsp;disclosure, except in&nbsp;cases provided for by&nbsp;the
        current laws and/or these Terms of use. Also, the Users must keep their
        login and password secret. The Users must contact Company as soon as
        they are aware that their Account has been used without their consent.
        The Users acknowledge that Company may take any appropriate action,
        including suspension of the access to the Account. The User
        is&nbsp;recommended to&nbsp;create a&nbsp;quite complicated password
        to&nbsp;avoid the possibility of&nbsp;attack thereto by&nbsp;the third
        parties.
      </p>
      <p>
        Subsequent access to&nbsp;the Website/Service by&nbsp;a&nbsp;User
        previously registered to&nbsp;his/her Account shall be&nbsp;carried out
        by&nbsp;passing through the procedure for authorization, i.e. input
        of&nbsp;the login and password of&nbsp;the User.
      </p>
      <p>
        The Company shall be&nbsp;entitled at&nbsp;its own discretion
        to&nbsp;provide Users with an&nbsp;opportunity to&nbsp;access the
        Website by&nbsp;clicking through the link sent by&nbsp;e-mail
        as&nbsp;a&nbsp;result of&nbsp;automated authorization using cookies
        technologies.
      </p>
      <p>
        Apart from the ways of&nbsp;Account creation specified above, the User
        may be&nbsp;provided with the right to&nbsp;create an&nbsp;Account and
        use the Website/Service using the data (login and password)
        of&nbsp;electronic mailbox or&nbsp;account (profile) created by&nbsp;the
        User on&nbsp;an&nbsp;external resource, as&nbsp;well
        as&nbsp;by&nbsp;authorization on&nbsp;the external resource.
      </p>
      <p>
        The Company shall reserve the right to&nbsp;change and supplement the
        means of&nbsp;creation of&nbsp;an&nbsp;Account.
      </p>
      <p>
        The Company may confirm the receipt of the User’s online application in
        order to create an Account electronically to the e-mail address or by
        SMS message to the telephone number provided by the User (not applicable
        to the Account created by the User using his/her social media account).
      </p>
      <p>
        The User is only permitted to create one (1) Account (“prohibiting
        multi-accounts”).
      </p>
      <p>
        The Users guarantee that all information provided is accurate and up to
        date. The Users undertake to update this information on their Account as
        soon as it is modified so that it always complies with these criteria.
      </p>
      <p>
        The Users are informed and accept that the information provided when
        opening their Account is presumed to establish their identity.
      </p>
      <p>
        The Users agree to use Website/Services for personal use only and
        refrain from allowing any third party to use them unless they accept all
        the consequences thereof.
      </p>
      <p>
        2)&nbsp;
        <u>
          The User’s Consent for Use of&nbsp;the Website and certain Services
          of&nbsp;the Website
        </u>
      </p>
      <p>
        Consent to&nbsp;use the Website and certain Services of&nbsp;the Website
        on&nbsp;conditions hereof, agreements for certain Services, as&nbsp;well
        as&nbsp;on&nbsp;conditions of&nbsp;other provisions and rules regulating
        the order of&nbsp;use of&nbsp;the Website/Services, shall
        be&nbsp;expressed by&nbsp;the User via actions on&nbsp;accessing the
        specified documents. The access shall be&nbsp;effected by&nbsp;clicking
        “Sign up” or&nbsp;other button indicating agreement, which in&nbsp;sense
        shall be&nbsp;the conclusion by&nbsp;the User and the Company
        of&nbsp;the contract on&nbsp;the terms and conditions containing herein
        and other documents mentioned herein.
      </p>
      <p>
        In&nbsp;each subsequent Access to&nbsp;the Website/Service (using
        of&nbsp;the Website/Service) the User shall express his/her consent with
        the terms and conditions hereof, agreements for separate Services,
        as&nbsp;well as&nbsp;with the terms and conditions of&nbsp;other
        provisions and rules regulating the procedure for using of&nbsp;the
        Website/Services in&nbsp;the versions applied as&nbsp;at&nbsp;the moment
        of&nbsp;the actual use of&nbsp;the Website/Service.
      </p>
      <p>
        The Company shall be&nbsp;entitled to&nbsp;establish a&nbsp;special
        additional procedure for accessing a&nbsp;certain Service
        (to&nbsp;request from the User additional information and/or claim for
        taking additional actions) containing in&nbsp;the agreement for
        a&nbsp;certain Service and in&nbsp;other provisions and rules placed
        on&nbsp;the page of&nbsp;the relevant Service.
      </p>
      <p>
        <u>3) Account Transfer</u>
      </p>
      <p>
        The User shall attend to the safety of his/her login credentials that
        are necessary for access to the Account. The login and password are
        confidential information and shall not be subject to disclosure, except
        in cases provided for by applicable law and these Terms of use. The User
        is prohibited from distributing, using, or intentionally receiving
        information that allows access to the Account of another user by any
        means. Transfer of an Account and/or account data to third parties is
        not permitted. In the case that the User has received account data
        (login and password) of another user, the User is prohibited to use such
        information to log into the Account of another user.
      </p>
      <p>
        In case the Company reveals any fact or suspicion that the Account has
        been transferred or being transferred in violation of these Terms of use
        or otherwise being accessed by a third party other than the User, the
        Company shall be entitled to suspend the access to the User’s Account
        and/or to block the User’s Account.
      </p>
      <p>
        The User shall immediately notify the Company about the loss of his/her
        login and password for his/her Account or other cases of loss of control
        over the Account.
      </p>
      <p>
        <u>4) Bonus program</u>
      </p>
      <p>
        The Service may provide a bonus program. If the functionality of the
        Service provides for awarding bonuses to the User for performing certain
        actions by the COMPANY, the User is awarded bonuses when the conditions
        of the bonus program are met. Bonuses can be exchanged by the User for
        bonus incentives defined by the COMPANY. To receive bonus incentives,
        the User shall execute the appropriate command in the Service or perform
        other actions specified by the COMPANY (for example, contact the COMPANY
        by email, specify User’s registration data, etc.). The bonus program is
        intended to reward the User for performing certain actions and can be
        changed or canceled by the COMPANY at any time. The conditions for
        receiving bonuses and bonus incentives are determined by the COMPANY.
      </p>
      <p>
        <u>Referral bonus program</u>. A referral bonus program is a type of
        bonus program. The user is awarded one bonus for each new user of the
        Service who followed the User’s referral link available in Use’s
        personal account, registered in the Service and connected to the Steam
        account. The user can receive various bonus incentives determined by the
        COMPANY in exchange for the corresponding number of bonuses accrued
        based on the results of the referral bonus program.
      </p>
      <ol start="4">
        <li>
          <strong>
            {" "}
            Terms and Conditions for Restoration/Termination of&nbsp;Access
            to&nbsp;the Website/Services
          </strong>
        </li>
      </ol>
      <p>
        4.1. In&nbsp;case of&nbsp;loss of&nbsp;access to&nbsp;the
        Website/Services the User shall have an&nbsp;opportunity
        to&nbsp;independently restore such access by&nbsp;following the
        procedure stated on&nbsp;the Website/relevant Service. Upon completing
        such independent restoration of&nbsp;access to&nbsp;the Website/Services
        available for the User, the User shall be&nbsp;entitled to&nbsp;address
        to&nbsp;Company Support Service.
      </p>
      <p>
        4.2. Addressing the Company shall not necessarily imply that the access
        to&nbsp;the Website/Services will be&nbsp;reliably restored.
      </p>
      <p>
        4.3. In&nbsp;case of&nbsp;loss of&nbsp;password for access to&nbsp;the
        electronic mailbox or&nbsp;personal profile created on&nbsp;the resource
        of&nbsp;the third party and used by&nbsp;the User together with the
        login for access to&nbsp;the Website, such a&nbsp;password may
        be&nbsp;restored by&nbsp;the means provided for by&nbsp;the resource
        of&nbsp;the third party only.
      </p>
      <p>
        4.4. The User shall agree that the Company reserves the right
        to&nbsp;terminate access to&nbsp;the User’s Account (as&nbsp;well
        as&nbsp;to&nbsp;any account additionally created by&nbsp;the User within
        the framework of&nbsp;the Service) at&nbsp;any time, as&nbsp;well
        as&nbsp;take any other measures of&nbsp;limitation of&nbsp;access
        to&nbsp;the Website/Service.
      </p>
      <p>
        4.5. Access to&nbsp;the Account may be&nbsp;terminated for the following
        reasons: a) violation of&nbsp;provisions hereof and/or agreements for
        certain Services;&nbsp;b) at&nbsp;the relevant request
        of&nbsp;government authorities pursuant to&nbsp;applicable laws;&nbsp;c)
        a&nbsp;long period of&nbsp;failure to&nbsp;use the account;&nbsp;d) due
        to&nbsp;unforeseen problems of&nbsp;a&nbsp;technical nature
        or&nbsp;circumstances related to&nbsp;security; e) for any violations
        in&nbsp;use of&nbsp;the Website/Services; f) for other reasons which the
        Company considers reasonable and necessary, including for the reasons
        of&nbsp;provision of&nbsp;security for functioning of&nbsp;the Website
        or&nbsp;certain Service.
      </p>
      <p>
        4.6. The User shall agree that the Company reserves the right
        to&nbsp;terminate servicing of&nbsp;a&nbsp;User’s account
        (to&nbsp;remove the Account) which had not been used by&nbsp;the User
        for the period of more than three months.
      </p>
      <p>
        4.7. The User shall be&nbsp;entitled to&nbsp;reject use of&nbsp;his/her
        account applying a&nbsp;special interface for its removal, provided that
        such a&nbsp;function set is&nbsp;implemented by&nbsp;the Company, or by
        a request at the Company Support Service.
      </p>
      <ol start="5">
        <li>
          <strong>
            {" "}
            Conditions and Procedure for Processing of&nbsp;the User’s Account
            Data
          </strong>
        </li>
      </ol>
      <p>
        5.1. Placing the personal data when registering the Account on&nbsp;the
        Website (account within the framework of&nbsp;a&nbsp;separate Service),
        the User shall express consent for processing of&nbsp;the User’s data
        by&nbsp;the Company. Detailed means, aims and terms for processing
        of&nbsp;the User’s data, as&nbsp;well as&nbsp;other conditions
        of&nbsp;their use, are stated in&nbsp;a&nbsp;separate document
        regulating the procedure for using of&nbsp;the Users’ data (Privacy
        Policy) posted on&nbsp;the Website page&nbsp;at:&nbsp;{" "}
        <a href="https://passport.gg/privacy/">https://passport.gg/privacy/</a>.
      </p>
      <p>
        5.2. The User shall agree that, within the framework of&nbsp;certain
        Services, in&nbsp;which is&nbsp;provided creation
        of&nbsp;a&nbsp;personal profile of&nbsp;the User, the User’s data may
        be&nbsp;posted on&nbsp;a&nbsp;separate page containing the profile
        information. The User’s data posted in&nbsp;the profile shall
        be&nbsp;deemed generally available from the moment of&nbsp;its posting.
        The User shall be&nbsp;entitled to&nbsp;limit access of&nbsp;third
        parties to&nbsp;the data contained at&nbsp;the personal profile page
        using the profile settings available for the User provided that such
        a&nbsp;function set is&nbsp;implemented by&nbsp;the Company.
      </p>
      <p>
        5.3. The purpose of&nbsp;processing of&nbsp;the User’s data consists,
        including without limitation, in&nbsp;provision of&nbsp;the latter with
        the opportunity of&nbsp;full-scale use of&nbsp;the Website/Services,
        implementation of&nbsp;advertising campaigns, provision of&nbsp;targeted
        advertising and Services, carrying out of&nbsp;statistical studies and
        analysis of&nbsp;the obtained statistical data, as&nbsp;well
        as&nbsp;taking any other actions necessary for the proper provision
        of&nbsp;functional options of&nbsp;the Website/Services, etc.
      </p>
      <p>
        5.4. The User shall agree that upon the processing of&nbsp;data the
        Company shall be&nbsp;entitled to&nbsp;take the following actions with
        the data: collection, arrangement, accumulation, storage, use, transfer
        to&nbsp;third parties (including transfer of&nbsp;impersonalized
        statistical data), destruction and other actions necessary for the
        purposes of provision of the Services, use of the Website
        and&nbsp;performance of&nbsp;the Terms of use and agreements for certain
        Services.
      </p>
      <p>
        5.5. In&nbsp;the User’s access to&nbsp;the Website/Services cookies
        technology may be&nbsp;applied for the purpose of&nbsp;automated
        authorization of&nbsp;the User on&nbsp;the Website/Service, as&nbsp;well
        as&nbsp;for collection of&nbsp;statistical data, in&nbsp;particular
        on&nbsp;traffic ranking of&nbsp;the Website/Services. For more
        information, please, refer to Cookie Policy posted on&nbsp;the Website
        page&nbsp;at:&nbsp; &nbsp;
        <a href="https://passport.gg/cookie">https://passport.gg/cookie</a>
        /.
      </p>
      <p>
        5.6. The User shall be&nbsp;entitled to&nbsp;limit or&nbsp;prohibit use
        of&nbsp;cookies technology by&nbsp;application of&nbsp;the relevant
        settings of&nbsp;the browser.
      </p>
      <p>
        5.7. The Company shall be&nbsp;entitled to&nbsp;provide the User with
        an&nbsp;option to&nbsp;transfer data to&nbsp;third parties using special
        technologies (Open&nbsp;ID, etc.) provided that the User agrees with
        such transfer. In&nbsp;this regard, the Company shall not guarantee
        to&nbsp;the User the completeness and correctness of&nbsp;transfer
        of&nbsp;the account data and shall not be&nbsp;liable for data safety
        during transfer.
      </p>
      <ol start="6">
        <li>
          <strong> Term, Suspension, And Termination</strong>
        </li>
      </ol>
      <p>
        6.1. The term of these Terms of use commences on the date the User first
        indicates his/her acceptance of these Terms of use and will continue in
        effect until terminated in accordance with these Terms of use.
      </p>
      <p>
        6.2. In particular, but not exclusively, the Company has the right to
        terminate these Terms of use with the User if the User violates any
        applicable law, or breaches these Terms of use, or the User does not use
        his/her Account for a period of three (3) or more months.
      </p>
      <p>
        6.3. Both the Company and the User have the right to terminate these
        Terms of use at any time with immediate effect. The User has the right
        at any time &nbsp;to discontinue the use of his/her Account. The Company
        reserves the right at any time to suspend access to and the availability
        of Website or Services or any of its components without compensation to
        Users of any costs, losses of any kind, or other expenses, including, in
        the case of any, a single violation of the terms of these Terms of use,
        in particular, but not exclusively if the Company ceases providing
        services at the Websites and its Services.
      </p>
      <p>
        6.4. These Terms of Use may be modified by the Company at any time. Any
        amendment to the Terms of Use shall be notified to the Users. The User
        shall undertake to independently check the Terms of Use with respect to
        the amendment. If not agreed, User shall have the right to discontinue
        the use of his/her Account.
      </p>
      <p>
        6.5 In case of termination of these Terms of Use, Sections 11-15 remain
        in force.
      </p>
      <ol start="7">
        <li>
          <strong>
            {" "}
            Terms and Conditions of&nbsp;Posting and Use of&nbsp;Content, Rights
            of&nbsp;the Company to&nbsp;remove Content.
          </strong>
        </li>
      </ol>
      <p>
        7.1. Posting Content on&nbsp;the Website, the User shall grant
        to&nbsp;the Company, the Partners and other Users, under the conditions
        of&nbsp;free, non-exclusive, non-revocable, perpetual, worldwide license
        (with the right of&nbsp;sub-license), the right to&nbsp;use this Content
        in&nbsp;any ways required within the framework of&nbsp;the Services,
        including without limitation, bringing to&nbsp;general notice, review,
        modification, reproduction, translation and processing.
      </p>
      <p>
        In the case the Company and/or Partner creates a customized section on
        the Website dedicated to the Partner, its project or community, the
        Partner grants to the Company a limited, perpetual, irrevocable,
        royalty-free, worldwide license (with the right to sublicense), to use
        the names, logos, slogans, images, marketing materials and any other
        Content of the Partner that(s) was(were) provided(s) to the Company by
        the Partner or used by the Company in the respective section of the
        Website by any means within the framework of the relevant Services,
        including for the purpose of providing services to the Partner,
        customizing of the relevant Partner’s section, as well as placing such
        materials and Content in the “Partners” section or a similar section on
        the Website and other resources, in the company’s projects portfolio, in
        marketing and other materials of the Company. The company has the right
        to use the official logo and name of the Partner when referring to the
        Partner in public communications.
      </p>
      <p>
        7.2. Use by&nbsp;the User of&nbsp;the Content posted on&nbsp;the
        Website/within the framework of&nbsp;the Services by&nbsp;the Company,
        Partners, and other Users shall be&nbsp;allowed within the framework
        of&nbsp;the function set of&nbsp;the Website/Services with observance
        of&nbsp;any permits and limitations which may be&nbsp;established
        by&nbsp;the rights holder, provided that the author marks (copyright)
        or&nbsp;other author information are protected, and the name of&nbsp;the
        author is&nbsp;kept unchanged.
      </p>
      <p>
        7.3. The User shall not be&nbsp;entitled to&nbsp;download
        or&nbsp;otherwise bring to&nbsp;public notice (publish on&nbsp;the
        Website) Content and other results of&nbsp;the intellectual activity
        of&nbsp;the Users, Company, Partners and other persons who are the
        rights holders, in&nbsp;the absence of&nbsp;the obvious consent
        of&nbsp;the rights holder and/or the required extent of&nbsp;the rights
        for such actions.
      </p>
      <p>
        7.4. The Company shall reserve the right, at&nbsp;its own discretion
        to&nbsp;moderate (filter) or&nbsp;remove any information (materials)
        published by&nbsp;the User, including information (materials) violating
        the prohibitions established by&nbsp;the relevant sections hereof
        (as&nbsp;well as&nbsp;any other prohibitions and requirements contained
        in&nbsp;the applicable laws), including private messages and comments,
        to&nbsp;suspend, limit or&nbsp;terminate access to&nbsp;any Services
        at&nbsp;any time for any reason or&nbsp;without giving reasons not being
        liable for any damage which may be&nbsp;caused to&nbsp;the User
        by&nbsp;such action.
      </p>
      <p>
        7.5. In&nbsp;the case of&nbsp;the appearance on&nbsp;the Website
        or&nbsp;a&nbsp;certain Service of&nbsp;Content which, in&nbsp;the
        opinion of&nbsp;the User (rights holder), violates or&nbsp;may violate,
        or, without consent of&nbsp;the User, affects its copyright and/or
        associated rights, the User shall be&nbsp;entitled to&nbsp;address the
        Company by&nbsp;forwarding a&nbsp;statement on&nbsp;the violation
        to&nbsp;the e-mail of&nbsp;the support service, observing the
        requirements imposed by&nbsp;the Company on&nbsp;such messages. These
        requirements shall be&nbsp;imposed on&nbsp;the applicant by&nbsp;the
        Company for the purposes of&nbsp;the efficient response of&nbsp;the
        Company to&nbsp;the availability on&nbsp;the Website or&nbsp;certain
        Services of&nbsp;the Content probably violating the rights of&nbsp;the
        User (rights holder) and for the purposes of&nbsp;exclusion
        of&nbsp;violation of&nbsp;the rights of&nbsp;other Users in&nbsp;the
        instance that the Company takes measures for suppression
        of&nbsp;a&nbsp;possible violation.
      </p>
      <p>
        The statement of&nbsp;the applicant to&nbsp;the Company on&nbsp;the
        possible violation of&nbsp;his/her rights shall contain the following:
      </p>
      <ul>
        <li>precise link to&nbsp;the content location (URL address);</li>
        <li>
          confirmation of&nbsp;the applicant that he/she is&nbsp;the rights
          holder as&nbsp;to&nbsp;the works stated, or&nbsp;his/her authorized
          representative;
        </li>
        <li>any other information confirming the fact of&nbsp;violation.</li>
      </ul>
      <p>
        In&nbsp;the case that the Content is&nbsp;in&nbsp;video or&nbsp;audio
        format, the statement shall contain the full initial title of&nbsp;the
        works, the rights to&nbsp;use of&nbsp;which belongs to&nbsp;the
        applicant, as&nbsp;well as&nbsp;the title of&nbsp;the works&nbsp;posted
        on&nbsp;the Website or&nbsp;a&nbsp;certain Service.
      </p>
      <p>
        Within the framework of&nbsp;processing the statement, the Company shall
        reserve the right to&nbsp;request for the additional information and
        documents.
      </p>
      <p>
        Upon receipt of&nbsp;the information volume necessary for establishment
        of&nbsp;the fact of&nbsp;violation, the Company shall take prompt
        measures for locking and removal of&nbsp;the illegal Content.
      </p>
      <p>
        7.6. If&nbsp;within the framework of&nbsp;the Website or&nbsp;certain
        Services the User reveals that the Content posted by&nbsp;other users
        is&nbsp;obscene or&nbsp;abusive, the User shall be&nbsp;entitled
        to&nbsp;address the Company, using the means available for the User,
        with a&nbsp;request of&nbsp;removal of&nbsp;such Content. However, the
        User shall agree that the Company shall not be&nbsp;liable for Content
        which, in&nbsp;the User’s opinion, is&nbsp;obscene or&nbsp;abusive.
      </p>
      <ol start="8">
        <li>
          <strong> Rights and Obligations of&nbsp;the Company</strong>
        </li>
      </ol>
      <p>
        8.1. The Company shall have all necessary rights to&nbsp;the Content
        of&nbsp;the Company (including in&nbsp;respect of&nbsp;the software for
        computers on&nbsp;the Website, databases, information materials,
        graphics being the elements of&nbsp;the User’s interface, etc.), trade
        name, trade marks (service marks), logotypes and other distinctive marks
        of&nbsp;the Company.
      </p>
      <p>
        8.2. The technology and software underlying the Website and/or Services
        is&nbsp;the property of&nbsp;Company, Partner, and Company’s affiliates
        and partners (the “Technology”). User agrees not to&nbsp;copy, modify,
        create a&nbsp;derivative work&nbsp;of, reverse engineer, reverse
        assemble or&nbsp;otherwise attempt to&nbsp;discover any source code,
        sell, assign, sublicense, or&nbsp;otherwise transfer any right
        in&nbsp;the Technology.
      </p>
      <p>
        8.3. The Company shall carry out current management of&nbsp;the
        Website/Services, determine their structure, interface, permit
        or&nbsp;limit the access of&nbsp;the Users to&nbsp;the Website/Services,
        and exercise other vested rights.
      </p>
      <p>
        8.4. Some of&nbsp;the Services shall be&nbsp;administrated directly
        by&nbsp;the Partners, without participation of&nbsp;the Company, due
        to&nbsp;which the Company provides Users with only the technical
        opportunity for their use (access to&nbsp;the Service).
      </p>
      <p>
        8.5. As&nbsp;to&nbsp;provision of&nbsp;the option of&nbsp;interrelation
        among Users, including provision of&nbsp;Users with the opportunity
        to&nbsp;independently take any actions within the framework of&nbsp;the
        Website/Services, the Company shall be&nbsp;the party which has only
        organized the technical option of&nbsp;such interrelation, and the
        transfer, storage and provision of&nbsp;access by&nbsp;means of&nbsp;the
        Internet to&nbsp;the information, graphics and other materials provided
        by&nbsp;the Users related thereto shall be&nbsp;carried out without
        change of&nbsp;such materials or&nbsp;influence thereon by&nbsp;the
        Company.
      </p>
      <p>8.6. The Company shall be&nbsp;entitled&nbsp;to:</p>
      <p>
        8.6.1. at&nbsp;any time change the interface of&nbsp;the Website, its
        content, list of&nbsp;Services, change and add used scripts, software,
        Company Content and other objects used or&nbsp;kept on&nbsp;the Website,
        and any server applications;
      </p>
      <p>
        8.6.2. without giving any reasons remove any Content, including Content
        which, in&nbsp;opinion of&nbsp;the Company, violates and/or may violate
        applicable laws, provisions hereof or&nbsp;any agreement for
        a&nbsp;separate Service, rights of&nbsp;other Users or&nbsp;the third
        parties, cause losses thereto or&nbsp;endanger safety;
      </p>
      <p>
        8.6.3. at&nbsp;its discretion remove any information (including private
        messages of&nbsp;a&nbsp;User, comments to&nbsp;the photos
        of&nbsp;a&nbsp;User, statuses, other information and materials),
        including information posted by&nbsp;a&nbsp;User on&nbsp;the
        Website/within the framework of&nbsp;the Services in&nbsp;violation
        of&nbsp;the applicable laws or&nbsp;the provisions hereof;
      </p>
      <p>
        8.6.4. suspend, limit or&nbsp;terminate access of&nbsp;the User
        to&nbsp;all or&nbsp;any of&nbsp;the sections of&nbsp;the
        Website/Service;
      </p>
      <p>
        8.6.5. at&nbsp;its discretion remove the User’s Account, including
        in&nbsp;case of&nbsp;taking by&nbsp;the User of&nbsp;the actions
        violating the applicable laws or&nbsp;the provisions hereof;
      </p>
      <p>
        8.6.6. mail out messages to&nbsp;the Users (including e-mail messages,
        SMS messages, etc.) which are messages on&nbsp;introduction of&nbsp;new
        or&nbsp;cancellation of&nbsp;former services, approval and publishing
        of&nbsp;the new edition of&nbsp;the Terms of use or&nbsp;the agreement
        for a&nbsp;certain Service, as&nbsp;well as&nbsp;those containing
        advertising information on&nbsp;the Company Services and the Partners’
        Services.
      </p>
      <p>
        8.6.7. mail out messages to&nbsp;Users containing advertising
        of&nbsp;goods or&nbsp;services of&nbsp;the third parties, which shall
        not be&nbsp;carried out without prior consent of&nbsp;the Users.
      </p>
      <p>
        8.6.8. The Company shall not deal with consideration and settlement
        of&nbsp;the disputes and conflict situations arising out between the
        Users, as&nbsp;well as&nbsp;between the User and the Partner when using
        by&nbsp;the User of&nbsp;the Partner Service, but, at&nbsp;its own
        discretion, may assist in&nbsp;settlement of&nbsp;the conflicts which
        have arisen. The Company shall be&nbsp;entitled to&nbsp;suspend, limit
        or&nbsp;terminate access of&nbsp;a&nbsp;User to&nbsp;the
        Website/Services in&nbsp;case of&nbsp;receipt from other Users
        of&nbsp;reasoned complaints for improper conduct of&nbsp;the User
        on&nbsp;the Website.
      </p>
      <p>
        8.6.9. The Company shall reserve the right to&nbsp;concede its rights
        and obligations hereunder to&nbsp;any third party at&nbsp;its own
        discretion, having notified the User in&nbsp;the ways specified herein.
        Your rights and obligations hereunder shall be&nbsp;deemed transferred
        at&nbsp;the moment of&nbsp;posting of&nbsp;the relevant notice.
      </p>
      <p>
        8.6.10. contact you through the contact details, which you have
        provided, for the purposes related to the provision of the Services to
        you, including without limitation your identification, your
        participation in tournaments, your use of the Website, your account,
        etc.
      </p>
      <p>
        8.7. The User agrees and acknowledges that any and all rights that are
        not expressly granted hereunder are reserved by the Company and/or its
        partners (if applicable).
      </p>
      <p>
        Rights to intellectual property granted hereunder to the Users are
        licensed, but not sold, and confers no title or ownership in Website and
        its Services.
      </p>
      <ol start="9">
        <li>
          <strong> Rights and Obligations of&nbsp;the User</strong>
        </li>
      </ol>
      <p>9.1. The User shall be&nbsp;entitled&nbsp;to:</p>
      <p>
        9.1.1. arrange settings of&nbsp;the Account, change the password for
        access to&nbsp;the Account, as&nbsp;well as&nbsp;take other actions
        provided to&nbsp;the User by&nbsp;the functional options of&nbsp;the
        Website/Services;
      </p>
      <p>
        9.1.2. take other actions related to&nbsp;using of&nbsp;the
        Website/Services not prohibited by&nbsp;the applicable laws.
      </p>
      <p>
        9.1.3. Any rights not expressly granted to&nbsp;User herein are reserved
        by&nbsp;Company and/or Partners, as&nbsp;applicable.
      </p>
      <p>9.2. The User shall:</p>
      <p>
        9.2.1. observe the terms and conditions hereof and the agreements for
        certain Services, as&nbsp;well as&nbsp;the statutory provisions
        of&nbsp;the applicable laws;
      </p>
      <p>
        9.2.2. take necessary measures for ensuring the confidentiality
        of&nbsp;account data (login and password) used for access to&nbsp;the
        Account, and make sure the password is&nbsp;not saved in&nbsp;the
        browser (including when using cookies technology) in&nbsp;case
        of&nbsp;possible use of&nbsp;the computer by&nbsp;other persons;
      </p>
      <p>
        9.2.3. if&nbsp;such an&nbsp;option is&nbsp;provided for by&nbsp;the
        functions of&nbsp;the Website/Service, not post photos on&nbsp;which
        there are persons other than the User, without their prior consent,
        except for cases where such consent is&nbsp;not required
        in&nbsp;accordance with the law;
      </p>
      <p>
        9.2.4. notify the Company as&nbsp;regards all cases of&nbsp;actions
        taken in&nbsp;respect of&nbsp;the User which may be&nbsp;considered
        as&nbsp;abusive, humiliating, discrediting, etc.;
      </p>
      <p>
        9.2.5. from time to&nbsp;time independently become familiar with the
        content of&nbsp;the Terms of use and the agreements for certain Services
        and monitor the amendments made thereto.
      </p>
      <p>9.3. HEALTH OF USERS</p>
      <p>
        The User understands and agrees that continuous usage of a personal
        computer over an extended period of time may result in various
        complications of physical condition, including, without limitation,
        vision problems, scoliosis, various forms of neurosis, as well as other
        undesirable and negative effects on the User’s body.
      </p>
      <p>
        The User hereby warrants that he/she will use Website and its Services
        only for a reasonable duration with breaks for rest and that the User
        will take other measures prescribed by his/her doctor to protect his/her
        health.
      </p>
      <p>The following precautions should be taken by Users:</p>
      <ul>
        <li>
          Avoid using of Website and its Services if tired or short of sleep;
        </li>
        <li>Use Website and its Services at good distance from the screen;</li>
        <li>
          Use Website and its Services in a lit room and moderate the brightness
          of the screen;
        </li>
        <li>Take breaks of ten (10) to fifteen (15) minute every hour.</li>
      </ul>
      <ol start="10">
        <li>
          <strong> The User shall be&nbsp;prohibited from</strong>
        </li>
      </ol>
      <p>10.1. collecting personal data of&nbsp;other users;</p>
      <p>
        10.2. use of&nbsp;any automatic or&nbsp;automated means for collection
        of&nbsp;the information posted on&nbsp;the Website/within the framework
        of&nbsp;the Services;
      </p>
      <p>
        10.3. carry out propaganda or&nbsp;agitation provoking the social, race,
        national or&nbsp;religious hatred and enmity, propaganda of&nbsp;war,
        social, racial, national, religious or&nbsp;language superiority;
      </p>
      <p>
        10.4. post on&nbsp;the Website/within the framework of&nbsp;the Services
        or&nbsp;send by&nbsp;Private messages information of&nbsp;limited access
        (confidential information) of&nbsp;third parties, if&nbsp;the User does
        not have sufficient rights by&nbsp;authority of&nbsp;the law
        or&nbsp;a&nbsp;contract for disclosure of&nbsp;this information;
      </p>
      <p>
        10.5. post, reproduce, copy, process, distribute, and publish
        on&nbsp;the Website/within the framework of&nbsp;the Services, bring
        to&nbsp;the public notice, download, transfer, sell or&nbsp;otherwise
        use in&nbsp;full or&nbsp;in&nbsp;part the Content of&nbsp;the Company,
        Partners, other Users and the third parties without their prior consent,
        except for the cases established hereby or&nbsp;the agreements for
        certain Services, current applicable laws, as&nbsp;well as&nbsp;the
        cases when the right holder expressly stated its consent for free using
        of&nbsp;its own Content by&nbsp;any person;
      </p>
      <p>
        10.6. by posting the Content on&nbsp;the Website/Services, the User
        shall confirm that he/she has all the rights required, including the
        right to&nbsp;bring to&nbsp;the public notice that such posting does not
        violate and will not violate the rights and legal interests of&nbsp;the
        rights holders and third parties, and that all necessary permits and
        consents of&nbsp;the relevant rights holders and third parties have been
        properly and obviously obtained for that. If&nbsp;the User does not have
        the required rights and/or the consent of&nbsp;the rights holder,
        it&nbsp;shall be&nbsp;prohibited to&nbsp;post the Content on&nbsp;the
        Website. The User shall agree that, downloading Content on&nbsp;the
        Website, the User shall provide access thereto for the other registered
        Users by&nbsp;default. The Website shall be&nbsp;only a&nbsp;means which
        allows the User to&nbsp;carry out access and communication/bringing the
        Content to&nbsp;the public notice. Within the framework of&nbsp;the
        measures taken by&nbsp;the Company for suppression of&nbsp;violation
        by&nbsp;the users of&nbsp;the rights of&nbsp;the rights holders and
        prevention from distribution of&nbsp;false information, the Company
        shall be&nbsp;entitled to&nbsp;demand submission of&nbsp;evidence that
        the User has the required volume of&nbsp;rights for use of&nbsp;the
        Content (works) on&nbsp;the Website/within the framework of&nbsp;the
        Service. Up&nbsp;to&nbsp;receipt of&nbsp;such confirmation the specified
        works may be&nbsp;blocked;
      </p>
      <p>
        10.7. post on&nbsp;the Website/within the framework of&nbsp;the Services
        in&nbsp;public access the content of&nbsp;which is&nbsp;abusive for
        other Users or&nbsp;other persons, or&nbsp;may be&nbsp;considered
        as&nbsp;such, as&nbsp;well as&nbsp;messages, images and other materials
        discrediting the Users or&nbsp;other persons, contains threats, appeals
        to&nbsp;violence, taking illegal actions, antisocial, or&nbsp;immoral
        deeds, as&nbsp;well as&nbsp;taking any other actions contradicting the
        principles of&nbsp;public order and morality;
      </p>
      <p>
        10.8. post on&nbsp;the Website/within the framework of&nbsp;the Service
        content, which causes or&nbsp;may cause loss to&nbsp;the honor, dignity
        and business reputation of&nbsp;an&nbsp;individual or&nbsp;the business
        reputation of&nbsp;an&nbsp;organization;
      </p>
      <p>
        10.9. post on&nbsp;the Website/within the framework of&nbsp;the Services
        content containing swear words and expressions, post on&nbsp;the
        Website/within the framework of&nbsp;the Services materials
        of&nbsp;an&nbsp;erotic and/or pornographic nature or&nbsp;the hypertext
        links to&nbsp;Internet websites containing such materials;
      </p>
      <p>
        10.10. post on&nbsp;the Website/within the framework of&nbsp;the
        Services information propagandizing suicide, containing description
        of&nbsp;the means of&nbsp;suicide and any instigation to&nbsp;commit
        thereof;
      </p>
      <p>
        10.11. post on&nbsp;the Website/within the framework of&nbsp;the
        Services information related to&nbsp;occults subject and activity
        (magic, fortune telling, Satanism, love spells, spells, wizardry,
        rituals, astrology, horoscopes, etc.);
      </p>
      <p>
        10.12. post on&nbsp;the Website/within the framework of&nbsp;the
        Services advertisements and other information on&nbsp;narcotic and
        psychotropic substances, including information on&nbsp;distribution
        of&nbsp;drugs, formulas of&nbsp;their manufacture and advice
        on&nbsp;their consumption;
      </p>
      <p>
        10.13. post on&nbsp;the Website/within the framework of&nbsp;the
        Services information violating the rights of&nbsp;minor persons;
      </p>
      <p>
        10.14. post on&nbsp;the Website/within the framework of&nbsp;the
        Services information of&nbsp;a&nbsp;fraudulent nature;
      </p>
      <p>
        10.15. post on&nbsp;the Website/within the framework of&nbsp;the
        Services personal data, including the contact data of&nbsp;other Users
        or&nbsp;other persons without their prior consent;
      </p>
      <p>
        10.16. specify when registering the Account, or&nbsp;afterwards input
        the information on&nbsp;himself/herself known to&nbsp;be&nbsp;false
        or&nbsp;fictional, for the purpose of&nbsp;pretending
        to&nbsp;be&nbsp;another User and mislead the Users;
      </p>
      <p>
        10.17. post on&nbsp;the Website images of&nbsp;other persons
        or&nbsp;fictional personages, images of&nbsp;animals, things, abstract
        images and personal photos, as&nbsp;well as&nbsp;any other graphic
        images, not being the photos of&nbsp;the User posting these images;
      </p>
      <p>
        10.18. register more than one User Account by&nbsp;one and the same
        person;
      </p>
      <p>
        10.19. post on&nbsp;the Website/within the framework of&nbsp;the
        Services in&nbsp;public access without prior consent of&nbsp;the
        Company, transfer by&nbsp;private messages text messages, graphics and
        other materials containing advertisements;
      </p>
      <p>
        10.20. take actions focused on&nbsp;destabilization of&nbsp;functioning
        of&nbsp;the Website/Services, make attempts at&nbsp;unauthorized access
        to&nbsp;the management of&nbsp;the Website/Services or&nbsp;the Private
        Sections (the sections access to&nbsp;which is&nbsp;allowed only for the
        Company), as&nbsp;well as&nbsp;take any other actions of&nbsp;the same
        kind;
      </p>
      <p>
        10.21. carry out unauthorized access to&nbsp;other users’ Accounts
        by&nbsp;guessing and input of&nbsp;the password, as&nbsp;well
        as&nbsp;take attempts of&nbsp;such access;
      </p>
      <p>
        10.22. effect mail-out of&nbsp;spam&nbsp;– the mailing out
        of&nbsp;commercial, political, advertising and other information
        (including hyperlinks referring to&nbsp;the Internet websites with such
        information and/or to&nbsp;the Internet websites containing scumware)
        in&nbsp;the content;
      </p>
      <p>
        10.23. use the Website/Services for the purposes of&nbsp;search
        of&nbsp;debtors or&nbsp;for other purposes of&nbsp;such kind;
      </p>
      <p>
        10.24. post on&nbsp;the Website information promoting the advertisement
        of&nbsp;tobacco and tobacco products, drugs, narcotic substances, strong
        and low-alcohol beverages;
      </p>
      <p>
        10.25. post on&nbsp;the Website other information which, in&nbsp;the
        opinion of&nbsp;the Company does not comply with the policy and aims
        of&nbsp;the Website creation;
      </p>
      <p>
        10.26. violate the requirements hereof and the agreements for certain
        Services and the statutory provisions of&nbsp;the applicable laws.
      </p>
      <p>
        10.27. attempt to circumvent any security measures adopted on
        Website/Services, including blocking access based on IP-address;
      </p>
      <p>
        10.28. modify, adapt, decompile, disassemble, or change Website/Services
        and/or any of its components and any intellectual property access to
        which the User is granted during the course of Website/Services use;
      </p>
      <p>
        10.29. distribute for commercial or non-commercial purposes
        Website/Services and/or any of its components and any intellectual
        property access to which the User is granted during the course of
        Website/Services use, copies or screenshots thereof, either by means of
        distribution of physical media, or by means of making it available for
        download by third parties from the Internet;
      </p>
      <p>
        10.30. translate Website/Services and/or any of its components into
        other languages, or create other derivative works of Website/Services
        and/or any of its components;
      </p>
      <p>
        10.31. use Website/Services in any other manner not contemplated by
        these Terms of Use, and outside of the conventional use process.
      </p>
      <ol start="11">
        <li>
          <strong> Guarantees and Liability of&nbsp;the Parties</strong>
        </li>
      </ol>
      <p>
        11.1. The User shall guarantee that posting thereby on&nbsp;the
        Website/within the framework of&nbsp;the Services of&nbsp;the
        information, Content, other results of&nbsp;intellectual activity
        protected by&nbsp;law, their parts or&nbsp;copies, as&nbsp;well
        as&nbsp;other materials, does not violate anybody’s rights and legal
        interests.
      </p>
      <p>
        11.2. In&nbsp;case of&nbsp;claims from the third parties due
        to&nbsp;violation by&nbsp;the User of&nbsp;the terms and conditions
        hereof, to&nbsp;the extent of&nbsp;posting of&nbsp;the information
        and/or the Content of&nbsp;the third parties, the Company shall
        be&nbsp;entitled to&nbsp;submit the available User’s contact information
        within the framework permitted by&nbsp;the law to&nbsp;the persons
        applying with the claims, for the purposes of&nbsp;settlement
        of&nbsp;the occurred disagreements.
      </p>
      <p>
        11.3. The User shall be&nbsp;personally liable for any Content
        or&nbsp;other information which he/she uploads on&nbsp;the
        Website/Services or&nbsp;otherwise communicates to&nbsp;the public
        on&nbsp;the Website or&nbsp;with its help. The User shall independently
        settle the claims of&nbsp;the third parties related to&nbsp;illegal
        posting of&nbsp;Content and information.
      </p>
      <p>
        11.4. Hyperlinks to&nbsp;any website, product, service, any information
        of&nbsp;commercial and non-commercial character posted on&nbsp;the
        Website/within the framework of&nbsp;the Services or&nbsp;sent
        by&nbsp;the Users in&nbsp;the messages shall not be&nbsp;approval
        or&nbsp;advice on&nbsp;these products (services) on&nbsp;the part
        of&nbsp;the Company. The Company shall not be&nbsp;liable for the loss
        caused to&nbsp;the User as&nbsp;a&nbsp;result of&nbsp;following such
        hyperlinks.
      </p>
      <p>
        11.5. Following the Websites of&nbsp;the third parties, installation
        of&nbsp;applications and consumption of&nbsp;the services of&nbsp;the
        third parties shall be&nbsp;carried out by&nbsp;the User at&nbsp;his/her
        own risk. The provisions hereof shall not be&nbsp;applied
        in&nbsp;respect of&nbsp;the relations of&nbsp;the User and the third
        parties.
      </p>
      <p>
        11.6. Providing the User with the technical opportunity to&nbsp;use the
        Website, the Company shall not participate in&nbsp;formation of&nbsp;the
        User’s Account content and downloading of&nbsp;Content by&nbsp;the User,
        and shall not effect control over the User’s actions.
      </p>
      <p>
        11.7. The Company shall not carry out and does not have the technical
        capability to&nbsp;carry out preliminary moderation of&nbsp;the
        information and Content of&nbsp;the Users and shall not be&nbsp;liable
        for Content posted by&nbsp;the User.
      </p>
      <p>
        11.8. The Company shall not be&nbsp;liable for possible breakdowns and
        breaks in&nbsp;the Website operation and the information loss caused
        thereby, but shall take all possible efforts depending on&nbsp;the
        Company in&nbsp;order to&nbsp;avoid the aforementioned. The Company
        shall not be&nbsp;liable for any loss to&nbsp;the computer of&nbsp;the
        User, to&nbsp;the mobile device, or&nbsp;to&nbsp;any other equipment
        or&nbsp;software caused or&nbsp;related to&nbsp;using of&nbsp;the
        Website/Services or&nbsp;the websites available through the hyperlinks
        posted on&nbsp;the Website/Services.
      </p>
      <p>
        11.9. The Company shall not be&nbsp;liable for password attacks
        of&nbsp;third parties and any actions taken thereby using the User’s
        Account.
      </p>
      <p>
        11.10. The Company shall not be&nbsp;liable for any loss, including the
        lost benefit or&nbsp;the damage caused in&nbsp;relation to&nbsp;using
        of&nbsp;the Website/Services, Content or&nbsp;other materials
        to&nbsp;which the User or&nbsp;other persons have obtained access with
        the help of&nbsp;the Website, even if&nbsp;the Company has warned
        or&nbsp;mentioned the possibility of&nbsp;infliction of&nbsp;such loss
        or&nbsp;damage.
      </p>
      <p>
        11.11. The Company shall not be&nbsp;liable for any loss which may
        be&nbsp;caused to&nbsp;the User, including the loss of&nbsp;the data,
        removal of&nbsp;the Account, Content or&nbsp;termination
        of&nbsp;functioning of&nbsp;the Website/Service, taking all possible
        efforts depending on&nbsp;the Company to&nbsp;exclude or&nbsp;lower the
        risk of&nbsp;adverse consequences.
      </p>
      <p>
        11.12. The User shall be&nbsp;liable for illegal actions taken using the
        User Account, as&nbsp;well as&nbsp;in&nbsp;relation to&nbsp;posting
        of&nbsp;Content using his/her Account on&nbsp;the Website, User Profile,
        on&nbsp;the Personal Pages of&nbsp;other Users, forums, comments and
        in&nbsp;other sections of&nbsp;the Website/Services.
      </p>
      <p>
        11.13. For violation of&nbsp;the provisions hereof or&nbsp;the
        agreements for certain Services access of&nbsp;the User to&nbsp;the
        Website, certain sections of&nbsp;the Website and/or the Services may
        be&nbsp;limited, suspended or&nbsp;terminated for an&nbsp;indefinite
        term. Access may be&nbsp;restored upon the relevant written application
        of&nbsp;the User at&nbsp;the discretion of&nbsp;the Company.
      </p>
      <ol start="12">
        <li>
          <strong> Indemnity and Release</strong>
        </li>
      </ol>
      <p>
        12.1. User agrees to&nbsp;release, indemnify and hold Company and the
        Partners harmless from any from any and all losses, damages, expenses,
        including reasonable attorneys’ fees, rights, claims, actions
        of&nbsp;any kind and injury (including death) arising out
        of&nbsp;or&nbsp;relating to&nbsp;User’s use of&nbsp;the Website and/or
        Services, any User Content, User’s connection to&nbsp;the Website and/or
        Services, User’s violation of&nbsp;these Terms of&nbsp;Use
        or&nbsp;User’s violation of&nbsp;any rights of&nbsp;another.
      </p>
      <ol start="13">
        <li>
          <strong> Disclaimer of&nbsp;Warranties</strong>
        </li>
      </ol>
      <p>
        UNLESS OTHERWISE EXPRESSLY PROVIDED BY A SPECIFIC WRITTEN AGREEMENT
        REGULATING THE USE OF SERVICE, WEBSITE AND/OR SERVICE(S) IS PROVIDED “AS
        IS”. THEREFORE, USERS ACKNOWLEDGE THAT WEBSITE AND/OR SERVICE(S) MAY NOT
        MEET THEIR INDIVIDUAL PREFERENCES AND EXPECTATIONS. THE COMPANY WILL
        MAKE ALL COMMERCIALLY REASONABLE EFFORTS TO ENSURE CONTINUOUS OPERATION
        OF WEBSITE AND/OR SERVICE(S), ACCORDINGLY USERS ACKNOWLEDGE THAT WEBSITE
        AND/OR SERVICE(S) ISN’T ERROR-FREE AND MAY BE INTERRUPTED. THE COMPANY
        SHALL HAVE THE RIGHT (AND IT IS AN ESSENTIAL CONDITION OF USERS’ USE OF
        WEBSITE AND/OR SERVICE(S)) TO SUSPEND OR STOP OPERATION AND/OR ACCESS TO
        WEBSITE AND/OR SERVICE(S) OR ANY PART OF IT FOR ALL OR SOME USERS AT ANY
        TIME. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, THE COMPANY
        DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTIES OF ACCURACY, RELEVANCE,
        SAFETY, FREEDOM FROM VIRUSES, FREEDOM FROM BUGS, LEGALITY AND/OR
        RELIABILITY OF INFORMATION, DATA, MATERIALS, AS WELL AS WEBSITE AND/OR
        SERVICE(S) PROVIDED BY THE COMPANY, ITS PARTNERS, OR OTHER USERS. THE
        COMPANY DOES NOT WARRANT THAT THE PERFORMANCE OF USERS’ PERSONAL
        COMPUTERS OR OTHER DEVICES IS ADEQUATE TO USE WEBSITE AND/OR SERVICE(S).
        USERS ARE ADVISED TO DETERMINE IN ADVANCE THE COMPUTER SYSTEM’S
        REQUIREMENTS FOR WEBSITE AND/OR SERVICE(S) AND WHETHER THEIR COMPUTER
        SYSTEM MEETS THOSE REQUIREMENTS.
      </p>
      <ol start="14">
        <li>
          <strong>Liability</strong>
        </li>
      </ol>
      <p>
        <strong>
          IF THE USER RESIDES IN THE EUROPEAN UNION OR EUROPEAN ECONOMIC AREA,
          THE FOLLOWING PROVISION APPLIES TO{" "}
        </strong>
        <strong>SUCH USER</strong>
        <strong>:</strong>
      </p>
      <p>
        THE COMPANY COMMITS ITSELF TO ACT WITH THE CARE AND DILIGENCE
        CUSTOMARILY USED IN THE PROFESSION IN ORDER TO PROVIDE FOR THE
        IMPLEMENTATION OF SERVICES DELIVERED TO THE USERS.
      </p>
      <p>
        IN THE EVENT THAT COMPANY IS HELD LIABLE, COMPANY MAY GAIN EXEMPTION
        FROM SOME OR ALL OF ITS LIABILITY, HOWEVER, BY PROVING THAT THE
        NON-PERFORMANCE OR POOR PERFORMANCE OF THE CONTRACT WAS ATTRIBUTABLE TO
        THE CONSUMER, TO AN UNFORESEEABLE AND INSURMOUNTABLE FACT OF A THIRD
        PARTY, OR TO AN INSTANCE OF FORCE MAJEURE.
      </p>
      <p>
        <strong>
          IF THE USER RESIDES OUTSIDE THE EUROPEAN UNION OR EUROPEAN ECONOMIC
          AREA, THE FOLLOWING PROVISION APPLIES TO{" "}
        </strong>
        <strong>SUCH USER</strong>
        <strong>:</strong>
      </p>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY SHALL NOT
        BE LIABLE FOR DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES, LOST PROFITS,
        DAMAGES ARISING OUT OF LOSS AND/OR DESTRUCTION OF DATA, DAMAGES ARISING
        OUT OF LOSS/TERMINATION/SUSPENSION OF ACCESS TO USERS’ ACCOUNTS, LOSSES
        BY THE USER OF ACHIEVEMENTS OR PROGRESS IN THE WEBSITE AND/OR SERVICE(S)
        AS WELL AS LOSSES/DESTRUCTION/CHANGES OF THE INFORMATION PLACED BY THE
        USER AT THE FORUMS OR CHATS. IN ANY CASE, THE LIABILITY OF THE COMPANY
        TO USERS SHALL BE LIMITED TO COMPENSATION FOR ACTUAL DAMAGE, WHICH SHALL
        NOT EXCEED 100 EUROS. THE USER MAY NOT RECEIVE ANY COMPENSATION FOR LOST
        PROFITS UNDER ANY CIRCUMSTANCES. THE COMPANY SHALL NOT BE RESPONSIBLE
        FOR ANY DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES, LOST PROFITS,
        DAMAGES TO USERS OR THIRD PARTIES CAUSED BY:
      </p>
      <p>(A) USE OF OR INABILITY TO USE A WEBSITE AND/OR SERVICE(S);</p>
      <p>
        (B) UNAUTHORISED ACCESS OF ANY THIRD PARTIES TO THE USER’S PERSONAL
        INFORMATION, INCLUDING, WITHOUT LIMITATION, THE USER’S ACCOUNT, IN-GAME
        ACCOUNT WITHIN THE GAME; AND
      </p>
      <p>
        (C) STATEMENTS OR BEHAVIOUR OF ANY THIRD PARTY IN THE WEBSITE AND/OR
        SERVICE(S), IN- FORUMS OR CHATS, OR IN COMMENTS ON THE WEBSITE. THE
        COMPANY SHALL NOT BE LIABLE FOR ANY DELAY OR FAILURE TO PERFORM
        RESULTING FROM CAUSES OUTSIDE THE REASONABLE CONTROL OF THE COMPANY,
        INCLUDING, WITHOUT LIMITATION, ANY FAILURE TO PERFORM HEREUNDER DUE TO
        UNFORESEEN CIRCUMSTANCES OR CAUSES BEYOND THE COMPANY’S CONTROL, SUCH AS
        ACTS OF GOD, WAR, TERRORISM, EPIDEMIC, PANDEMIC, RIOTS, EMBARGOES, ACTS
        OF CIVIL OR MILITARY AUTHORITIES, FIRES, FLOODS, ACCIDENTS, NETWORK
        INFRASTRUCTURE FAILURES, STRIKES, OR SHORTAGES OF TRANSPORTATION
        FACILITIES, FUEL, ENERGY, LABOUR, OR MATERIALS.
      </p>
      <p>
        IF THE LIMITATION OR EXCLUSION OF LIABILITY IS PROHIBITED BY APPLICABLE
        LAW, THE COMPANY’S LIABILITY MUST BE LIMITED TO THE MAXIMUM EXTENT
        PERMITTED.
      </p>
      <ol start="15">
        <li>
          <strong> Final Provisions</strong>
        </li>
      </ol>
      <p>
        15.1. The Terms of use and agreements for the certain Services shall
        become effective from the moment of&nbsp;acceptance thereof. Conditions
        of&nbsp;joining (acceptance) to&nbsp;the Terms of use and agreements for
        the certain Services are contained in&nbsp;these Terms of use.
      </p>
      <p>
        15.2. These Terms of use and agreements for the certain Services may
        be&nbsp;modified by&nbsp;the Company without any prior notice. Any
        alterations to&nbsp;the Terms of use unilaterally made by&nbsp;the
        Company shall become effective from the day of&nbsp;publishing
        of&nbsp;such alterations on&nbsp;the Internet Website/on the pages
        of&nbsp;the relevant Services. The User shall undertake
        to&nbsp;independently check the Terms of use and the terms and
        conditions of&nbsp;the agreements for the certain Services with respect
        to&nbsp;alterations. The User’s failure to&nbsp;take the actions
        on&nbsp;familiarizing himself/herself may not be&nbsp;the ground for
        failure to&nbsp;fulfil his/her obligations and the User’s failure
        to&nbsp;observe the limitations established hereby and the agreements
        for certain Services.
      </p>
      <p>
        15.3. The invalidity of&nbsp;one or&nbsp;several provisions hereof
        and/or the agreements for certain Services admitted in&nbsp;accordance
        with the established procedure, or&nbsp;by&nbsp;the effective court
        decision, shall not cause for the Parties invalidity of&nbsp;the
        agreements as&nbsp;a&nbsp;whole. In&nbsp;case of&nbsp;the admission
        of&nbsp;one or&nbsp;several provisions invalid in&nbsp;accordance with
        the established procedure, the Parties shall undertake their obligations
        there under in&nbsp;the way closest to&nbsp;that implied by&nbsp;the
        Parties when concluding the agreement and/or agreed change.
      </p>
      <p>
        15.4. Cooperation with Legal Authorities. Company will cooperate with
        all law enforcement enquiries, subpoenas, or requests provided they are
        fully supported and documented by the law in the relevant jurisdictions.
        Company strictly follows AML (Anti-Money Laundering), KYC (Know Your
        Customer) and other banking or government policies and regulations in
        respective jurisdictions. You fully agree to assist Company in
        fulfillment of the mentioned regulations and provide any necessary
        information if such is required of you by the authorized authority.
      </p>
      <p>
        15.5. No Waiver. The failure of the Company to require or enforce strict
        performance by you of any provision of these Terms of use or the
        Company’s failure to exercise any right under these Terms of use shall
        not be construed as a waiver or relinquishment of the Company’s right to
        assert or rely upon any such provision or right in that or any other
        instance. The express waiver by the Company of any provision, condition,
        or requirement of these Terms of use shall not constitute a waiver of
        any future obligation to comply with such provision, condition or
        requirement. Except as expressly and specifically set forth in these
        Terms of use, no representations, statements, consents, waivers, or
        other acts or omissions by the Company shall be deemed a modification of
        these Terms of use nor be legally binding.
      </p>
      <p>
        15.6. Assignment. Unless such assignment is likely to result in a
        reduction in the User’s rights, the Company reserves the right to assign
        its rights and obligations arising out of these Terms of use to any
        third party in its sole discretion by notifying Users by e-mail or by
        means of publishing the amended Terms of use. The User’s rights and
        obligations arising out of these Terms of use shall be considered
        transferred to the assignee of the Company at the moment of the
        aforesaid notification or publication.
      </p>
      <p>
        The User’s rights and responsibilities under these Terms of use as well
        as the rights to access the User’s Account are personal and
        non-transferable.
      </p>
      <p>
        15.7. These Terms of use and the agreements for certain Services and
        interrelations of&nbsp;the Parties in&nbsp;connection with their
        conclusion shall be&nbsp;regulated by&nbsp;the laws of&nbsp;England and
        Wales unless otherwise expressly provided by law applicable to the User.
      </p>
      <p>
        If the User resides in France, these Terms of Use are subject to French
        Law, and any dispute arising from the formation, interpretation or
        execution of the present terms and conditions shall be subject to the
        exclusive jurisdiction of the French courts.
      </p>
      <p>
        15.8. All disputes hereunder shall be&nbsp;subject to&nbsp;settlement
        by&nbsp;means of&nbsp;correspondence and negotiations using obligatory
        pre-judicial (claim) procedure. In&nbsp;the case that no&nbsp;agreement
        is&nbsp;reached by&nbsp;the Parties by&nbsp;means of&nbsp;negotiations
        within sixty (60) calendar days from the date of&nbsp;receipt
        by&nbsp;the other Party of&nbsp;the relevant written claim, the dispute
        consideration shall be&nbsp;transferred by&nbsp;any interested party
        to&nbsp;the court at&nbsp;the location of&nbsp;the Company (with
        exception of&nbsp;admissibility of&nbsp;a&nbsp;case to&nbsp;any other
        courts).
      </p>
      <p>
        In accordance with Article 14 of Regulation 524/2013/EU, the European
        Commission provides consumers with an online dispute resolution platform
        accessible at the following address:{" "}
        <a href="https://ec.europa.eu/consumers/odr/">
          https://ec.europa.eu/consumers/odr/
        </a>
        .
      </p>
      <p>
        15.9. For the matters related to&nbsp;performance of&nbsp;the Terms of
        use, please, address to&nbsp;the Company at{" "}
        <a href="mailto:info@aurora.pm">info@aurora.pm</a>&nbsp;or in writing
        to&nbsp;
        <span>
          Harju maakond, Tallinn, Kesklinna linnaosa, Vesivärava tn 50-201,
          10152 Estonia
        </span>
        <span>.</span>
      </p>
      <p>
        15.10. Your official email for communication shall be deemed the email
        specified by you during the create an account process. We may provide
        any notice to you under these Terms of use by: (i) posting a notice on
        the Website; or (ii) sending an email to the email address then
        associated with you. Notices we provide by posting on the Website will
        be effective upon posting and notices we provide by email will be
        effective when we send the email. It is your responsibility to keep your
        email address current. You will be deemed to have received any email
        sent to the email address then associated with you when we send the
        email, whether or not you actually receive or read the email.
      </p>
      <p>
        15.11. The Website/Services may contain intellectual property of third
        parties. All title and rights in and to the such intellectual property
        are the property of the respective owners and may be protected by
        applicable copyright or other intellectual property laws and
        international treaties. These Terms of use do not grant you any rights
        to any such intellectual property. Valve, the Valve logo, Steam, the
        Steam logo, Dota, the Dota 2 logo, Counter-Strike, the Counter-Strike
        logo, are trademarks and/or registered trademarks of Valve Corporation.
      </p>{" "}
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
