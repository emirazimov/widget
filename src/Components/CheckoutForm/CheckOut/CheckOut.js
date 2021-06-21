import React from 'react';
import AdressForm from './AdressForm';
import Payment from './Payment';
import FleetForm from './FleetForm';
import Preview from './Preview';
import Confirmation from '../Confirmation';
const CheckOut = ({
  initializing,
  companyName,
  email,
  setActiveStep,
  setExpanded,
  activeStep,
  nextStep,
  backStep,
  isSuccess,
  isFetching,
}) => {
  const Form = () => {
    switch (activeStep) {
      case 0:
        return <AdressForm next={nextStep} initializing={initializing} />;
      case 1:
        return <FleetForm next={nextStep} back={backStep} />;
      case 2:
        return <Preview next={nextStep} back={backStep} />;
      case 3:
        return (
          <Payment next={nextStep} back={backStep} isSuccess={isSuccess} />
        );
      default:
        break;
    }
  };

  return (
    <>
      {activeStep === 4 ? (
        <Confirmation
          back={backStep}
          setExpanded={setExpanded}
          setActiveStep={setActiveStep}
        />
      ) : (
        <Form />
      )}
    </>
  );
};

export default CheckOut;
