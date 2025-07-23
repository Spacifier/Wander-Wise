import { Header } from "../../components";
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids";   
import { cn, fetchAllUsers, formatDate, getRandomAvatar } from "../lib/utils";
import { useEffect, useState } from "react";

function AllUsers(){
    const [users,setUsers] = useState([]);
    useEffect(() => {
        fetchAllUsers().then(setUsers);
    },[]);

    return (
       <main className="all-users wrapper">
            <Header
                title = "Manage Users"
                description = "Filter, sort, and access detailed user profiles"
            />

            <GridComponent dataSource={users} gridLines="None">
                <ColumnsDirective>
                    <ColumnDirective 
                        field="username"
                        headerText="Name"
                        width="200"
                        textAlign="Left"
                        template={(props) => (
                            <div className="flex items-center gap-1.5 px-4">
                                <img src={props.avatar || getRandomAvatar()} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer"/>
                                <span>{props.username}</span>
                            </div>
                        )}
                    />
                    <ColumnDirective 
                        field="email"
                        headerText="Email"
                        width="150"
                        textAlign="Left"
                    />
                    <ColumnDirective 
                        field="createdAt"
                        headerText="Date Joined"
                        width="140"
                        textAlign="Left"
                        template={({createdAt}) => formatDate(createdAt)}
                    />
                    {/* <ColumnDirective 
                        field="itineraryCreated"
                        headerText="Trip Created"
                        width="130"
                        textAlign="Left"
                    /> */}
                    <ColumnDirective 
                        field="status"
                        headerText="Type"
                        width="100"
                        textAlign="Left"
                        template={({status}) => (
                            <article className={cn('status-column', status === "user" ? 'bg-success-50' : 'bg-light-300')}>
                                <div className={cn('size-1.5 rounded-full', status === "user" ? 'bg-success-500' : 'bg-gray-500')} />
                                <h3 
                                    className={cn('font-inter text-xs font-medium', status==="user"?'text-success-700':'text-gray-500')}
                                >
                                    {status}
                                </h3>
                            </article>
                        )}
                    />
                </ColumnsDirective>
            </GridComponent>
        </main>
    );
}

export default AllUsers