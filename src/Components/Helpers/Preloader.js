import React from 'react';

class PreloaderComponent extends React.Component {

    render() {

        return <div style={{ margin: '0 auto', width: '100%' }}>
            <img style={{ width: "65%", height: "100%", marginLeft: "19%" }} alt='preloader' src="https://admin.bookinglane.com/gifs/logo.gif" />
        </div>
    }
}

export const Preloader = PreloaderComponent;

//#region styled-components

// const Container = styled.div`
//     margin: 0 auto;
//     width: 100%;
//     /* @media (max-width: 500px) {
//         width: 94%;
//     } */
// `;
