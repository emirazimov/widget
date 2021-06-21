import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { termsApi } from '../../api/api';

export default function PrivacyPolicy() {
    const [open, setOpen] = React.useState(false);
    const [privacyPolicy, setPrivacyPolicy] = React.useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
        let componentMounted = true;
        const fetchPrivacyPolicy = async () => {
            const data = await termsApi.getPrivacyPolicy();
            if (componentMounted) {
                setPrivacyPolicy(data)
            }
            fetchPrivacyPolicy()
        }
        return () => {
            componentMounted = false;
        }
    }, [])


    const descriptionElementRef = React.useRef(null);
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
                style={{ height: '50px', textTransform: 'none', padding: 0, backgroundColor: 'transparent' }}>Privacy Policy</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Privacy Policy</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        Ipsum eu magna pariatur ex eiusmod ullamco excepteur cillum culpa cupidatat labore minim culpa. In exercitation voluptate nostrud aute sunt excepteur est fugiat. Quis excepteur elit aute cupidatat. Adipisicing elit nulla eu eu qui consequat eu exercitation. Sunt ipsum cupidatat sit occaecat cupidatat tempor et elit id id amet esse labore. Duis est velit veniam cupidatat cillum sint eu voluptate aliqua nostrud minim sit.

                        Consequat laboris amet laboris amet laboris duis. Eiusmod adipisicing amet et amet deserunt mollit pariatur excepteur magna eu enim elit reprehenderit. Ex ut ex non aliqua nisi sint voluptate nisi laboris adipisicing excepteur aliqua tempor. Minim irure laboris sint voluptate aliqua proident deserunt quis id nulla nostrud ad. Ipsum sit anim ad nulla incididunt. Nostrud est reprehenderit consequat do.

                        Et fugiat minim Lorem velit do ullamco duis incididunt laboris mollit nisi sint mollit elit. Aute fugiat sunt aliquip quis dolore. Excepteur amet consectetur labore do duis enim laboris mollit anim veniam. Magna eiusmod est laboris nisi id ullamco officia incididunt nulla. Aliquip nisi est adipisicing dolor culpa proident irure. Et esse aliqua elit exercitation mollit aliquip ipsum consequat sunt sit magna aliqua cupidatat anim.

                        Esse id velit mollit ut aliqua culpa ipsum sit. Est do elit laborum proident sit. Quis id eiusmod consequat ullamco ipsum pariatur aliqua aliqua nulla enim voluptate. Consequat minim esse ut elit voluptate deserunt aute incididunt esse laborum enim ullamco. Et adipisicing enim culpa dolor duis cillum.

                        Quis minim deserunt quis eu. Voluptate et cillum fugiat non Lorem qui quis nisi et deserunt. Est adipisicing ex eiusmod anim proident ipsum esse. Magna in reprehenderit eu cupidatat ullamco dolor Lorem Lorem excepteur magna Lorem enim anim laboris. Elit consequat cillum culpa pariatur. Proident esse elit aliquip cupidatat fugiat aute nisi ipsum elit ut occaecat est non Lorem.

                        Lorem reprehenderit officia minim mollit dolore. Eiusmod ad tempor pariatur est sunt exercitation aliqua ad mollit. Elit aliqua excepteur commodo eiusmod. Occaecat magna labore mollit aliquip commodo est Lorem Lorem reprehenderit cillum. Exercitation ipsum ut aliquip aliqua. Voluptate do dolore culpa qui excepteur veniam commodo est mollit ea consectetur non. Et nulla deserunt eu officia ex ad cupidatat.

                        Laboris duis consequat id sunt nisi aliqua ad. Ipsum sit ad amet laboris mollit duis irure. Commodo laborum non quis enim dolore. Ipsum aliqua eu nisi reprehenderit voluptate exercitation tempor.

                        Ipsum qui reprehenderit aliqua irure. Nulla ut laborum aliqua qui velit proident velit dolor non aliquip sit officia culpa. Ipsum ullamco et laborum commodo ut. Est eu tempor ex incididunt dolore id laborum ea fugiat nostrud sunt consectetur. Ad officia ipsum fugiat sunt ipsum ipsum culpa nisi adipisicing. Laborum ullamco Lorem fugiat cupidatat ipsum aliquip ea consequat. Non cupidatat dolore duis veniam eu sint duis excepteur deserunt eiusmod.

                        Tempor eu amet cillum esse magna mollit laborum cillum laboris non fugiat. Esse cillum velit laborum minim non quis nostrud. Sunt culpa elit cupidatat dolor aute labore esse. Anim ex occaecat sint aliquip laborum laboris nostrud exercitation amet cupidatat nostrud minim. Nostrud est Lorem in Lorem ea proident esse culpa. Eiusmod eiusmod esse irure irure officia ex elit in. Ea voluptate voluptate in enim adipisicing proident amet qui ad duis tempor ut magna incididunt.

                        Voluptate veniam excepteur mollit eu quis velit occaecat enim qui laborum cillum incididunt esse. Dolor enim occaecat non adipisicing excepteur Lorem incididunt reprehenderit aliquip mollit aliquip sit incididunt. Aute velit culpa fugiat eu sint ea nisi cillum cillum et aliquip. Officia aliquip incididunt officia sit labore anim consequat magna officia id. Ex aliquip fugiat eiusmod enim dolore anim enim qui.
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