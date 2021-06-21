import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { termsApi } from '../../api/api';

export default function TermsOfUse() {
    const [open, setOpen] = React.useState(false);
    const [term, setTerm] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        let componentMounted = true;
        if (open) {
            const fetchTerms = async () => {
                const data = await termsApi.getTermOfUse();
                if (componentMounted) {
                    setTerm(data)
                }
                fetchTerms();
            }
        }
        return () => {
            componentMounted = false;
        }
    }, [])

    let descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Button onClick={handleClickOpen} disableRipple
                style={{ height: '50px', textTransform: 'none', padding: 0, backgroundColor: 'transparent' }}>Terms</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Terms Of Use</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        1. General.
                        The Stripe Checkout service (“Stripe Checkout”) is technology that makes it easier for merchants on the Internet (“Merchants”) to collect payment from individuals like you. Stripe Checkout also makes it easy for you to store payment credentials, like credit cards and debit cards (“Payment Credentials”) with Stripe for use with Merchants who have chosen to use Stripe as their payment processor.

                        2. Using Stripe Checkout.
                        When you check out on the website of a Merchant that has Stripe Checkout enabled, we will ask you if you’d like us to remember you. When you allow us to remember you, Stripe will store certain identifying information, such as your email address and your mobile phone number (“Stripe Credentials”), and your Payment Credentials. Information stored as part of your Payment Credentials may include information such as your name, the account number and the expiration date, as well as associated information like your billing address and shipping address. The advantage of remembering you is that it will make your checkout quicker and easier if you come back to the same website, or to any of the other Merchants that use Stripe (a “Stripe Enabled Merchant”) – this can be especially handy when you’re on a mobile device or don’t have your credit card in front of you.

                        If you elect to allow us to remember you, Stripe will use cookies to link your web browser to your Stripe Credentials and recognize when you visit a Stripe Enabled Merchant. If you come to a Stripe Enabled Merchant and we don’t recognize you (for example, because you’ve cleared your cookies, logged out, or you’re using a different device), we will provide a way for you to identify yourself and login via your Stripe Credentials (for example, by sending you a verification code via SMS text message). While you are logged in, Stripe will give you the ability to make purchases using your stored Payment Credentials. Stripe may also allow you to make a purchase with your Payment Credentials by sending a message directly from the email address or phone number stored as your Stripe Credentials (for example, to authorize a purchase via SMS).

                        If you send us text messages, or have us send you one, don’t forget that your carrier might charge you for that. For more information on how we use cookies, please view our Cookie Policy.

                        3. Stripe’s Role.
                        Stripe Checkout enables you to store your Payment Credentials, but it doesn’t change anything else about your relationship with the Merchant you’re paying or your bank or credit card company. Stripe will, however, use reasonable efforts to keep your Payment Credentials secure.

                        You are ultimately responsible for the purchases you make using Stripe Checkout. Also, the Merchant is the one responsible for providing you the goods or services that you purchase using Stripe Checkout, not Stripe. Stripe Checkout may display, or link to, the terms and policies that attach to a product or service sold by a Stripe Enabled Merchant. For example, Stripe Checkout may display, or link to, a Merchant’s policies with respect to returns, refunds, and exchanges. The content of any such policies is chosen by the Merchant, and Stripe does not control, or have any responsibility for, the Merchant’s compliance with the content of its policies and terms. If you believe that a Merchant has failed to comply with its terms or policies, or any other obligation imposed by applicable law, please contact the Merchant directly.

                        4. Your Location; Making Changes.
                        When you allow us to remember you, we will assume that you are located in the country of your billing address, if one is provided, and otherwise the country of your phone number. If this country is incorrect, or you move countries, and you wish to continue to store your Payment Credentials with us, then you must contact us for instructions on how to delete your stored information, and create a new account that is associated with the correct country.

                        If you want to delete your Payment Credentials, stop storing information using Stripe Checkout, or change your settings, please contact us.

                        5. Representations and Warranties.
                        By using Stripe Checkout you confirm that you are at least 18 years of age and that you will not use Stripe Checkout for any fraudulent, unlawful or abusive purpose.

                        6. Disclaimers.
                        Stripe Checkout, including all content, software, functions, materials, and information made available on, provided in connection with or accessible through Stripe Checkout, are provided “as is.” To the fullest extent permissible by law, Stripe), make no representation or warranty of any kind whatsoever for the services or the content, materials, information and functions made accessible by Stripe Checkout, or for any breach of security associated with the transmission of sensitive information through Stripe Checkout. To the fullest extent permissible by law, Stripe disclaims any warranty of any kind with respect to the services, noninfringement, merchantability, or being fit for a particular purpose. Stripe does not warrant that the functions contained in the services will be uninterrupted or error free. Stripe shall not be responsible for any service interruptions, including, but not limited to, system failures or other interruptions that may affect the receipt, processing, acceptance, completion or settlement of payment transactions, unless such service interruption has been caused by Stripe.

                        7. Limitations of Liability; Force Majeure.
                        We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or representatives; for fraud or fraudulent misrepresentation. Nothing in this section or these terms will affect your statutory rights as a consumer.

                        Except under the circumstances stated above, in no event shall Stripe be responsible or liable to you or any third party under any circumstances for any indirect, consequential, special, punitive or exemplary, damages or losses, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses which may be incurred in connection with Stripe or the services, or any goods, services, or information purchased, received, sold, or paid for by way of the services.

                        In addition to and without limiting any of the foregoing, Stripe shall not have any liability for any failure or delay resulting from any condition beyond the reasonable control of itself, including but not limited to governmental action or acts of terrorism, earthquake, fire, flood or other acts of God, strikes or other industrial action, power failures and Internet outages.

                        8. Governing Law.
                        This Agreement is concluded in English.

                        This Agreement and any dispute or claim arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims) (a “Dispute”) will be governed by and construed in accordance with the laws of the Republic of Ireland. Any Dispute shall be finally resolved by the courts competent to adjudicate the Dispute.

                        This section is without prejudice to any overriding rights which you may be entitled to in your country of residence. If you are a consumer then the courts of your country of residence may have jurisdiction to hear any dispute that may arise out of or is related to this Agreement.

                        If you are located in the European Union, we hereby provide you, in accordance with Article 14 of EU Regulation 524/2013, with an electronic link to the Online Dispute Resolution (“ODR”) platform of the European Union. For the purposes of the same EU Regulation, we confirm that you can contact us through the following email address: notices@stripe.com, and that we do not intend to use the platform.

                        9. Modification of Terms of Service; Notices.
                        We have the right to change or add to these Terms of Service at any time, solely with prospective effect, and to change, delete, discontinue, or impose conditions on use of Stripe Checkout by posting such changes on our website . We may provide you with notice via email, postings on our website, or through other reasonable means. If you are an existing Stripe Checkout user, the changes will come into effect 10 days after we post the changes to our website, and your use of Stripe Checkout more than 10 days after we publish any such changes on our website, constitutes your acceptance of the modified Terms of Service. In the event that you do not agree with any such modification, your sole and exclusive remedy is to terminate your use of Stripe Checkout. You can access a copy of the current terms of these Terms of Service on our website at any time. You can find out when these Terms of Service were last changed by checking the “Last updated” date at the top of these Terms of Service.

                        10. Assignment.
                        You may not assign these Terms of Service or any rights or obligations hereunder without our prior written approval and any such attempted assignment shall be void. We may assign these Terms of Service and the rights and obligations hereunder, to any third party. Unless you terminate your use of Stripe Checkout, which you or your successor may do at any time, these Terms of Service shall be binding upon and inure to the benefit of Stripe and your successor.

                        11. Data.
                        By using Stripe Checkout, you agree to the Stripe Privacy Policy, which is incorporated into and forms part of these Terms of Service. You should be aware that your data may be transferred, processed and stored outside of your country (including, if you are located in the European Union, outside of the European Union), and that your data may be subject to disclosure as required by applicable law.

                        Stripe has implemented reCAPTCHA on Stripe Checkout. Use of reCAPTCHA is subject to the Google Privacy Policy and Terms of Service.

                        12. Survival.
                        You may terminate your use of Stripe Checkout at any time by ceasing to make purchases from merchants that use Stripe Checkout. Upon termination of your use of Stripe Checkout or termination of these Terms of Service for any reason, in addition to this section, the following sections shall survive termination: Sections 5 through to 13 (inclusive).

                        13. Miscellaneous.
                        Stripe’s failure to exercise or enforce any right or provision of the Terms of Service will not be considered a waiver of that right or provision. If any provision of these Terms of Service shall be adjudged by any court of competent jurisdiction to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms of Service shall otherwise remain in full force and effect and remain enforceable between the parties. Headings are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section. These Terms of Service, including Stripe’s policies applicable to Stripe Checkout at referenced above, constitutes the entire agreement between you and Stripe with respect to the use of Stripe Checkout. These Terms of Service are not intended and shall not be construed to create any rights or remedies in any parties other than you and Stripe, and no other person will have the ability to assert any rights as a third party beneficiary under these Terms of Service. These Terms of Service do not limit any rights that Stripe may have under trade secret, copyright, patent or other laws.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}