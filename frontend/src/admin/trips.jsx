import { Header } from "../../components";

function Trips(){

    return (
       <main className="all-users wrapper">
             <Header
                title = "Trips"
                description = "View and edit AI generated travel plans"
                ctaText= "Create a trip"
                ctaUrl = "/admin/trips/create"
            />
       </main>
    );
}

export default Trips