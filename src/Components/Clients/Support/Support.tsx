import { SupportTable } from '../../Table/Support'
import Main from '../../Main'

export default function Support(): JSX.Element {

    const closeTutorial = () => { };

    return (
        <Main
            urlVideo={'https://www.youtube.com/watch?v=EkhWLahQ8ww'}
            name={'Support'}
            showDateFilter={false}
            showProductFilter={false}
            showTeamFilter={false}
            showTutorial={false}
            closeTutorial={closeTutorial}
        >
            <div className="content-body">
                <div className="container-fluid">
                    <div className="display-product-content">
                        <SupportTable />
                    </div>
                </div>
            </div>
        </Main>
    )
}
