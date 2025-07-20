import { Header } from "../../components";

function AllUsers(){
    const user = {name: 'Swapnil'}

    return (
       <main className="dashboard wrapper">
            <Header
                title = "Trips Page"
                description = "Check out our current users in real time"
            />

            All Users Page Contents
        </main>
    );
}

export default AllUsers