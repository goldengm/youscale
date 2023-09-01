import React, { useState, useEffect } from 'react'
import Main from '../../Main'
import API from './API'
import OrderSetting from './OrderSetting'
import { usePatchClientMutation } from '../../../services/api/ClientApi/ClientApi';
import { driver } from "driver.js";
import { Cient } from '../../../models';
import "driver.js/dist/driver.css";
import './setting.style.css'

interface Props {
    client: Cient | undefined
}
const pageName = 'setting'
export default function Setting({ client }: Props) {
    const [showTutorial, setShowTutorial] = useState<boolean>(client?.isBeginner ?? false);
    const [patchClient] = usePatchClientMutation()

    const driverObj = driver({
        onNextClick: () => {
            if (driverObj.getActiveIndex() === 7) {
                const response = confirm("En terminant vous confirmer ne plus recevoir le tutoriel sur les autres pages ?")
                if (response) {
                    patchClient({ isBeginner: false }).unwrap()
                        .then(res => console.log(res))
                        .catch(err => console.warn(err))
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
            {
                element: '.row .api_card:nth-child(1)', popover: {
                    title: 'Google Sheet', description: 'Integrate google sheet.', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        driverObj.moveTo(2)
                    }
                }
            },
            {
                element: '.modal-content', popover: {
                    title: 'Google Sheet', description: 'Integrate google sheet.', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        alert('Close your modal before')
                    }, onPrevClick: (drvHks) => {
                        alert('Close your modal before')
                    },
                }
            },
            {
                element: '.row .api_card:nth-child(3)', popover: {
                    title: 'Shipping Company', description: 'Add your shipping company here', side: "right", align: 'start', onPrevClick: (drvHks) => {
                        driverObj.moveTo(0)
                    },
                    onNextClick: (drvHks) => {
                        driverObj.moveTo(4)
                    }
                }
            },
            {
                element: '.modal-content', popover: {
                    title: 'Shipping Company', description: 'Add your shipping company here', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        alert('Close your modal before')
                    }, onPrevClick: (drvHks) => {
                        alert('Close your modal before')
                    },
                }
            },
            {
                element: '.status_card', popover: {
                    title: 'Status', description: 'You can manage your status here', side: "right", align: 'start', onPrevClick: (drvHks) => {
                        driverObj.moveTo(2)
                    },
                }
            },
            { element: '.column_card', popover: { title: 'Column', description: 'You can manage your column here', side: "top", align: 'start' } },
            {
                element: '.add-city-btn', popover: {
                    title: 'Add City', description: 'You can add your city here', side: "right", align: 'end',
                    onNextClick: (drvHks) => {
                        driverObj.moveTo(8)
                    }
                }
            },
            {
                element: '.modal-content', popover: {
                    title: 'Add City', description: 'You can add your city here', side: "bottom", align: 'start',
                    onNextClick: (drvHks) => {
                        alert('Close your modal before')
                    }, onPrevClick: (drvHks) => {
                        alert('Close your modal before')
                    },
                }
            },
            {
                element: '.copy-model-btn', popover: {
                    title: 'Copy Model', description: 'You can copy the model for import your city', side: "right", align: 'end', onPrevClick: (drvHks) => {
                        driverObj.moveTo(6)
                    },
                }
            },
            { element: '.configuration', popover: { title: 'Configuration', description: 'You can make your configuration', side: "right", align: 'end' } },
            { element: '.menu-step:nth-child(5)', popover: { title: 'Team', description: 'Description for team page', side: "right", align: 'start' } }
        ]
    });

    useEffect(() => {
        client?.isBeginner && driverObj.drive();
    }, [client]);

    const closeTutorial = () => {
        localStorage.setItem(`tutorial_${pageName}`, JSON.stringify(true));
        setShowTutorial(false);
    };

    return (
        <Main
            urlVideo={'https://www.youtube.com/watch?v=UtNXAwrUFok'}
            name='Setting'
            showDateFilter={false}
            showProductFilter={false}
            showTeamFilter={false}
            showTutorial={showTutorial}
            closeTutorial={closeTutorial}
        >
            <div className="content-body">
                <div className="container-fluid">
                    <API driverObj={driverObj} />
                    <OrderSetting driverObj={driverObj} />
                </div>
            </div>
        </Main>
    )
}