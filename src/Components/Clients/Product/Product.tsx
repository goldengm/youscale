import React, { useState, useEffect } from 'react'
import { ProductTable, StockTable } from '../../Table/Product'
import Main from '../../Main'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import './product.style.css'

const pageName = 'product'
const see_tutorial = localStorage.getItem('see_tutorial')
const hasAlreadyViewTutorial = see_tutorial ? JSON.parse(see_tutorial) : false
export default function Product(): JSX.Element {
    const [showTutorial, setShowTutorial] = useState<boolean>(false);

    const driverObj = driver({
        onNextClick: () => {
            if (driverObj.getActiveIndex() === 2) {
                const response = confirm("En terminant vous confirmer ne plus recevoir le tutoriel sur les autres pages ?")
                if (response) {
                    localStorage.setItem('see_tutorial', JSON.stringify(true))
                    driverObj.destroy();
                }
            } else {
                driverObj.moveNext()
            }
        },
        nextBtnText: 'Suivant',
        prevBtnText: 'Retour',
        doneBtnText: 'Terminer le tutoriel',
        showProgress: true,
        allowClose: false,
        steps: [
            { element: '.add-product', popover: { title: 'Add product', description: 'Add your product here.', side: "bottom", align: 'start' } },
            { element: '.add-stock', popover: { title: 'Add product', description: 'Add your product here.', side: "bottom", align: 'start' } },
            { element: '.menu-step:nth-child(6)', popover: { title: 'Paiement Page', description: 'Description for paiement page', side: "right", align: 'start' } }
        ]
    });

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem(`tutorial_${pageName}`);
        if (hasSeenTutorial) {
            setShowTutorial(!JSON.parse(hasSeenTutorial));
        } else {
            setShowTutorial(true);
        }

        !hasAlreadyViewTutorial && driverObj.drive();
    }, []);

    const closeTutorial = () => {
        localStorage.setItem(`tutorial_${pageName}`, JSON.stringify(true));
        setShowTutorial(false);
    };


    return (
        <Main
            urlVideo={'https://www.youtube.com/watch?v=EkhWLahQ8ww'}
            name={'Product'}
            showDateFilter={false}
            showProductFilter={false}
            showTeamFilter={false}
            showTutorial={showTutorial}
            closeTutorial={closeTutorial}
        >
            <div className="content-body">
                <div className="container-fluid">
                    <div className="display-product-content">
                        <ProductTable />
                        <StockTable />
                    </div>
                </div>
            </div>
        </Main>
    )
}
