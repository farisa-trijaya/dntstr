<template>
  <div
    v-if="themeStore.isLoading"
    class="relative bg-gray-50 dark:bg-slate-900"
  >
    <LoadingSkeleton :row-count="10" />
  </div>
  <div
    v-else
    class="w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14"
  >
    <div
      class="flex w-full h-16 text-center items-center justify-center m-auto"
      style="
        background-image: url(https://dentestore.com/images/banner.jpg);
        padding: 90px 0 110px 0;
        background-attachment: fixed;
        background-size: 100%;
        position: relative;
      "
    >
      <h1 class="text-3xl text-gray-50 font-semibold uppercase">
        TERMS AND CONDITIONS
      </h1>
    </div>
    <div class="flex flex-col w-full px-5 py-5 text-start space-y-3">
      <h2 class="text-xl text-black dark:text-gray-50">Terms and Conditions</h2>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          INTRODUCTION:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          DENTESTORE.COM maintains the website ("Site"). The following are the
          terms of use that govern use of the Site ("Terms of Use"). By using
          the Site you expressly agree to be bound by these Terms of Use and the
          DENTESTORE.COM Privacy Policy and to follow these Terms of Use and all
          applicable laws and regulations governing use of the Site. Please read
          carefully before using the Site or placing any orders on
          DENTESTORE.COM. We recommend you should keep a copy of the Terms of
          Use for future reference. DENTESTORE.COM reserves the right to change
          these Terms of Use at any time, effective immediately upon posting on
          the Site. Please check this page of the Site periodically. We will
          note when there are updates to the Terms of Use at the bottom of the
          Terms of Use. If you violate these Terms of Use, DENTESTORE.COM may
          terminate your use of the Site, bar you from future use of the Site,
          and/or take appropriate legal action against you.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          LIMITED LICENSE:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          You are granted a limited, non-exclusive, revocable and
          non-transferable license to utilize and access the Site pursuant to
          the requirements and restrictions of these Terms of Use.
          DENTESTORE.COM may change, suspend, or discontinue any aspect of the
          Site at any time. DENTESTORE.COM may also, without notice or
          liability, impose limits on certain features and services or restrict
          your access to all or portions of the Site. You shall have no rights
          to the proprietary software and related documentation, if any,
          provided to you in order to access the Site. Except as provided in the
          Terms of Use, you shall have no right to directly or indirectly, own,
          use, loan, sell, rent, lease, license, sublicense, assign, copy,
          translate, modify, adapt, improve, or create any new or derivative
          works from, or display, distribute, perform, or in any way exploit the
          Site, or any of its contents (including software) in whole or in part.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          3. The information, products and services contained on DENTESTORE.COM
          is intended for healthcare professionals. Therefore, you will need to
          confirm that you are a healthcare professional, to register on this
          Site before placing any orders or doing any transaction and to provide
          information about yourself and your licence. By registering on
          DENTESTORE.COM, you certify that all information given is true,
          accurate, current, and complete in all respects to the best of your
          knowledge. You are required to maintain a valid license issued by one
          of the health authorities in U.S. Should any of your registration
          information change, please notify us immediately at the following
          e-mail address: customers@dentestore.com. We may also change
          registration requirements from time to time.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          SITE OPERATION:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          United States is our Country of Domicile. DENTESTORE.COM controls this
          Site from the U.S. DENTESTORE.COM makes no representation that this
          Site is appropriate for use in other locations. If you use this Site
          from other locations you are responsible for ensuring compliance with
          local laws. You may not use, export or re-export any materials from
          this Site in violation of any applicable laws or regulations,
          including, but not limited to any U.S. export laws and regulations.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          APPLICABLE LAW:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          The Laws of the United States shall govern the use of the Site and the
          Terms of Use, without regards to conflict of laws principles. All
          disputes or claims arising out of or in connection therewith shall be
          heard only by a court of competent jurisdiction in U.S.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          MULTI-CURRENCY PRICED TRANSACTION:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          The displayed price and currency selected by you, will be the same
          price and currency charged to the Card and printed on the Transaction
          Receipt.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          PURCHASES:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          DENTESTORE.COM accepts payments by Visa and MasterCard debit and
          credit cards in AED. All online purchases are also governed by the
          terms and conditions of respective merchant service providers. Please
          review respective merchant service provider’s user agreement and
          privacy policy before entering any transaction.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          INTERPRETATION:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          These Terms of Use supersede all other written and oral communications
          or agreements with regard to the subject matters discussed in these
          Terms of Use. A waiver or modification of these Terms of Use will only
          be effective if made in writing signed by an authorized officer of
          DENTESTORE.COM.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          9. If you make a payment for our products or services on this Site,
          the details you are asked to submit will be provided directly to our
          payment provider via a secured connection. You will receive the
          payment confirmation by email within 24 hours.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          OFFICE FOREIGN ASSETS CONTROL (OFAC) SANCTIONED COUNTRIES:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          DENTESTORE.COM will not trade with or provide any services to
          individuals and companies owned or controlled by, or acting for or on
          behalf of, OFAC targeted countries AND individuals, groups, and
          entities, such as terrorists and narcotics traffickers designated
          under the OFAC programs that are not country specific.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          REPRESENTATIONS BY YOU:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          By visiting the Site, you represent, warrant and covenant that (a) you
          are at least 18 years old; (b) that all materials of any kind
          submitted by you to DENTESTORE.COM through the Site or for inclusion
          on the Site will not plagiarized, violate or infringe upon the rights
          of any third-party including trade secret, copyright, trademark, trade
          dress, privacy, patent, or other personal or proprietary rights.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          PERMITTED USE:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          You agree that you are only authorized to visit, view and to retain a
          copy of pages of this Site for your own personal use, that you shall
          not duplicate, download, publish, modify or otherwise distribute the
          material on this Site for any purpose other than for personal use,
          unless otherwise specifically authorized by DENTESTORE.COM to do so.
          You also agree not to deep-link to the Site for any purpose, unless
          specifically authorized by DENTESTORE.COM to do so. The content and
          software on this Site is the property of DENTESTORE.COM.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          The card holder must retain a copy of transaction records and Merchant
          policies and rules.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          YOUR ACCOUNT:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          If you use DENTESTORE.COM Site, you are responsible for maintaining
          the confidentiality of your account and password and for restricting
          access to your account from any devices, and you agree to accept
          responsibility for all activities that occur under your account or
          password. The Site shall not be responsible or liable, directly or
          indirectly, in any way for any loss or damage of any kind incurred as
          a result of, or in connection with, your failure to comply with this
          section.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          NO COMMERCIAL USE:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          This Site may not be used by you for any commercial purposes such as
          to conduct sales of merchandise or services of any kind. You must
          obtain DENTESTORE.COM’s prior written consent to make commercial
          offers of any kind on the Site, whether by advertising, solicitations,
          links, or any other form of communication. DENTESTORE.COM will
          investigate and take appropriate legal action against anyone who
          violates this provision, including without limitation, removing the
          offending communication from the Site and barring such violators from
          use of the Site.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          LINKS AND SEARCH RESULTS:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          The Site may automatically produce search results that reference
          and/or link to third-party sites throughout the World Wide Web.
          DENTESTORE.COM has no control over these sites or the content within
          them. DENTESTORE.COM does not guarantee, represent or warrant that the
          content contained in the sites is accurate, legal and/or inoffensive.
          DENTESTORE.COM does not endorse the content of any third-party site,
          nor does it make any representation or warranty about these sites,
          including that they will not contain viruses or otherwise impact your
          computer. By using the Site to search for or link to another site, you
          agree and understand that you may not make any claim against
          DENTESTORE.COM for any damages or losses, whatsoever, resulting from
          your use of the Site to obtain search results or to link to another
          site. If you have a problem with a link from the Site, you may notify
          us at support@dentestore.com.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">MINORS:</h4>
        <p class="text-sm text-black dark:text-gray-50">
          under the age of 18 are prohibited to register as a User of this Site
          and are not allowed to transact or use the Site.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          COPYRIGHT POLICY:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          DENTESTORE.COM may terminate the privileges of any user who uses this
          Site to unlawfully transmit copyrighted material without a license,
          express consent, valid defense or fair use exemption to do so. If you
          submit information to this Site, you warrant that the information does
          not infringe the copyrights or other rights of third parties.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          INTELLECTUAL PROPERTY:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          Although DENTESTORE.COM is not responsible for the content, quality or
          accuracy of data provided by users, compilations of such data, text,
          information and other materials made available to users through
          DENTESTORE.COM’s system. The On-line Materials are DENTESTORE.COM’s
          intellectual property, and are protected by U.S. and international
          intellectual property laws. The On-line Materials may not be copied or
          redistributed either in whole or in part without prior written consent
          of DENTESTORE.COM, except as expressly and specifically permitted
          under these Terms of Use.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          The On-line Materials are and will remain the exclusive property of
          DENTESTORE.COM. All rights, titles and interests in and to the On-line
          Materials will be and remain vested solely in DENTESTORE.COM. Under no
          circumstances will you have any right, directly or indirectly, to own,
          use, copy, loan, sell, rent, lease, license, sublicense, redistribute,
          assign or otherwise convey the On- line Materials, or any rights
          thereto, except as expressly and specifically provided in the Terms of
          Use. Nothing in these Terms of Use will convey to you any right, title
          or interest, except that of a license with the express rights and
          subject to all limitations herein. Nothing in these Terms of Use
          grants you the right, directly or indirectly, to use the On-line
          Materials to create a product for resale or to use the On-line
          Materials in any way that competes with DENTESTORE.COM.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          You acknowledge and agree that DENTESTORE.COM will own all rights,
          titles and interests in and to any copy, translation, modification,
          adaptation, derivative work or improvement of the On- line Materials
          made by or for you. At DENTESTORE.COM’s request, you must execute, or
          obtain the execution of, any instrument that may be necessary to
          assign these rights, titles or interests to DENTESTORE.COM or perfect
          these rights, titles or interests in DENTESTORE.COM’s name. DISCLAIMER
          OF WARRANTY, LIMITATION OF DAMAGES. DENTESTORE.COM MAKES NO WARRANTY
          OR REPRESENTATION OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
          BUT NOT LIMITED TO WARRANTY OF TITLE OR NON-INFRINGEMENT OR IMPLIED
          WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT OR OTHER VIOLATION OF RIGHTS IN RELATION TO THE
          AVAILABILITY, ACCURACY, VALIDITY, RELIABILITY OR CONTENT OF THESE
          PAGES AND/OR THE SITE. DENTESTORE.COM ALSO DOES NOT MAKE ANY
          REPRESENTATION OR WARRANTY
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          REGARDING THE ACCURACY OR RELIABILITY OF ANY ADVICE, OPINION,
          STATEMENT OR OTHER INFORMATION THAT IS SUBMITTED, DISPLAYED OR
          UPLOADED THROUGH THE SITE BY ANY USER. DENTESTORE.COM SHALL NOT BE
          LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL
          DAMAGES, LOST PROFITS OR FOR BUSINESS INTERRUPTION ARISING OUT OF THE
          USE OF OR INABILITY TO USE THIS SITE, EVEN IF DENTESTORE.COM HAS BEEN
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT
          ALLOW EXCLUSION OF CERTAIN WARRANTIES OR LIMITATIONS OF LIABILITY, SO
          THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. THE
          LIABILITY OF DENTESTORE.COM WOULD IN SUCH CASE BE LIMITED TO THE
          GREATEST EXTENT OF LIABILITY PERMITTED BY LAW.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          VIOLATION OF TERMS OF USE:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          You understand and agree that in DENTESTORE.COM’s sole discretion, and
          without prior notice, DENTESTORE.COM may terminate your access to the
          Site, or exercise any other remedy available and remove any
          unauthorized user information, if DENTESTORE.COM believes that the
          information you provide has violated or is inconsistent with these
          Terms of Use, or violates the rights of DENTESTORE.COM, or any third
          party, or violates the law. You agree that monetary damages may not
          provide a sufficient remedy to DENTESTORE.COM for violations of these
          Terms of Use and you consent to injunctive or other equitable relief
          for such violations. DENTESTORE.COM may release user information about
          you if required by law or subpoena.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          INDEMNITY:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          You agree to indemnify and hold DENTESTORE.COM, its subsidiaries,
          affiliates, officers, agents and other partners and employees,
          harmless from any loss, liability, claim or demand, including
          reasonable attorneys’ fees, made by any third party due to or arising
          out of or relating to your use of the Site, including also your use of
          the Site to provide a link to another site or to upload content or
          other information to the Site, or your breach of the Terms of Use.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          LICENCE GRANTED TO YOU:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          By providing materials to DENTESTORE.COM, including by submitting or
          uploading content or materials for use on the Site you represent and
          warrant that you or the owner of all rights to such content or
          materials has expressly granted DENTESTORE.COM an irrevocable
          world-wide right in all languages and in perpetuity to use and exploit
          all or any part of the content and materials provided by you.
          DENTESTORE.COM may publish and distribute any such submitted content
          or materials at its sole discretion by any method now existing or
          later developed. You agree that you shall waive all claims and have no
          recourse against DENTESTORE.COM for any alleged or actual infringement
          or misappropriation of any proprietary rights in any communication,
          content or material submitted to DENTESTORE.COM. Any communication or
          materials you send to DENTESTORE.COM will be treated as
          non-confidential and non-proprietary and may be disseminated or used
          by DENTESTORE.COM for any purpose, including, but not limited to,
          developing, creating, manufacturing or marketing products or services.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          ADVERTISING:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          The Site may contain advertisements and/or sponsorships. The
          advertisers and/or sponsors that provide these advertisements and
          sponsorships are solely responsible for insuring that the materials
          submitted for inclusion on the Site are accurate and comply with all
          applicable laws. DENTESTORE.COM is not responsible for the acts or
          omissions of any advertiser or sponsor.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <h4 class="text-sm text-black dark:text-gray-50 font-bold">
          SEVERABILITY:
        </h4>
        <p class="text-sm text-black dark:text-gray-50">
          If any provision of the Terms of Use is held to be invalid, void or
          unenforceable, the remaining provisions shall nevertheless continue in
          full force and effect.
        </p>
      </div>
      <div class="relative w-full items-center space-y-3">
        <p class="text-sm text-black dark:text-gray-50">
          Headings and section titles in this Terms of Use are for convenience
          and do not define, limit, or extend any provision of this agreement
          "Terms of Use".
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeSettings();

onNuxtReady(() => {
  themeStore.enableBottomNav();
  themeStore.closeCollapseMenu();
});
useHead({
  title: "Terms",
});
</script>

<style scoped></style>
