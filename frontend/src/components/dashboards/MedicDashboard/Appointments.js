import React, { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Appointments = () => {
    useEffect(() => {
        const calendarTitle = document.querySelector('.fc-toolbar-title');
        const calendarButtons = document.querySelectorAll('.fc-button');
        const dayToday = document.querySelector('.fc-day-today');
        if (calendarTitle) {
            calendarTitle.style.fontFamily = 'Poppins, sans-serif';
            calendarTitle.style.color = '#FF8585';
            calendarTitle.style.fontWeight = 'bold';
            calendarTitle.style.fontSize = '18px';
        }

        if (calendarButtons) {
            calendarButtons.forEach(button => {
                button.style.fontFamily = 'Poppins, sans-serif';
                button.style.color = 'white';
                button.style.backgroundColor = '#172048';
                button.style.fontWeight = 'bold';
            });
        }

        if (dayToday){
            dayToday.style.backgroundColor = '#FF8585';
            dayToday.style.color = 'white';
        }
    }, []);

    return (
        <DefaultLayout> 
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="flex items-center justify-between gap-2 font-poppins font-bold text-[#172048] leading-none opacity-70"
                            >
                                Appointments
                            </Typography>
                        </div>
                    </div> */}
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <div className="relative">
                        <div className="top-0 left-0 p-4 w-64 h-64 bg-gray-100 text-xs">
                            <FullCalendar
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                ]}
                                initialView="dayGridMonth"
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={true}
                                height="100%"
                                className="text-xs font-poppins"
                                dayHeaderClassNames="bg-gray-200 text-[#FF8585] font-poppins"
                                eventClassNames="bg-[#FF8585] text-white font-poppins"
                                headerToolbar={{
                                    right: 'prev,next',
                                    left: 'title',
                                }}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </DefaultLayout>
    )
}

export default Appointments;
