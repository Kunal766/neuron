import FullMapTwo from './MapTow';
import { useState } from 'react';

const Dashboard = () => {

    const [slectedShip, setSelectedShip] = useState("ship_1");

    return (
        <div>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900">Choose ship to see its trajectory</h1>
            <div className='flex flex-row'>
                <div className='w-[200px] h-full'>
                    <label htmlFor="cars" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Choose a Ship:</label>
                    <select id="cars" name="cars" onChange={(event) => {
                        console.log()
                        setSelectedShip(event.target.value);
                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                            Array.from({ length: 100 }).map((_, index) => (<option key={index} value={"ship_" + (index + 1)}>{"ship_" + (index + 1)}</option>))
                        }
                    </select>
                </div>
                <div>
                    <FullMapTwo ship_name={slectedShip} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;

